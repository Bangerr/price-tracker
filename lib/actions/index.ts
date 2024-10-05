"use server";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../db";
import Product from "../models/product.model";
import { scrapeAmazonProduct } from "../scraper";
import { auth } from "@/auth";

export async function scrapeAndStoreProduct(productUrl: string) {
  const session = await auth();
  const user = session?.user;
  console.log("User data:", user?.email, user?.id);

  if (!user) {
    throw new Error(`No user found!!!!`);
  }

  if (!productUrl) return;

  try {
    connectToDatabase();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const scrapedProduct = await scrapeAmazonProduct(productUrl);
    if (!scrapedProduct) return;

    let product = scrapedProduct;
    const existingProduct = await Product.findOne({ url: scrapedProduct.url });

    const newProduct = await Product.findOneAndUpdate(
      {
        url: scrapedProduct.url,
      },
      {
        $set: product,
        $addToSet: {
          users: {
            userId: user.id,
            email: user.email,
          },
        },
      },
      { upsert: true, new: true }
    );

    revalidatePath(`/products/${newProduct._id}`);

    return scrapedProduct;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(`Failed to create/update product: ${error.message}`);
  }
}

export async function getAllProducts() {
  const session = await auth();
  const user = session?.user;
  console.log("User data:", user?.email, user?.id);

  if (!user) return null;

  try {
    connectToDatabase();

    const id = user?.id;

    console.log("ID: ", id);

    const filter: any = {};

    if (id) {
      filter["users.userId"] = id;
    }

    const products = await Product.find(filter);

    console.log(`Found ${products.length} products for user ${id}`);

    revalidatePath("/");

    return products;
  } catch (error: any) {
    throw new Error(`Failed to fetch products: ${error.message}`);
  }
}

export async function delleteProductById(productId: string) {
  try {
    await Product.deleteOne({ id: productId });
    console.log(`Product deleted: ${productId}`);
  } catch (error: any) {
    throw new Error(`Failed to delete product: ${error.message}`);
  }
}

// async function migrateProducts() {
//   try {
//     await connectToDatabase();

//     const result = await Product.updateMany(
//       { users: { $exists: false } },
//       { $set: { users: [] } }
//     );

//     console.log(`Updated ${result.modifiedCount} documents`);
//   } catch (error) {
//     console.error("Migration failed:", error);
//   } finally {
//     process.exit();
//   }
// }

// migrateProducts();
