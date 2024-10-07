"use server";

import { revalidatePath } from "next/cache";
import client, { connectToDatabase } from "../db";
import Product from "../models/product.model";
import { scrapeAmazonProduct } from "../scraper";
import { auth } from "@/auth";

export async function scrapeAndStoreProduct(productUrl: string) {
  const dbName = "test";
  const collectionName = "products";
  const database = client.db(dbName);
  const collection = database.collection(collectionName);

  const session = await auth();
  const user = session?.user;
  console.log("User data:", user?.email, user?.id);

  if (!user) {
    throw new Error(`No user found!!!!`);
  }

  if (!productUrl) return;

  try {
    //connectToDatabase();
    const scrapedProduct = await scrapeAmazonProduct(productUrl);
    if (!scrapedProduct) return;

    const product = scrapedProduct;
    console.log(product);
    //const existingProduct = await Product.findOne({ url: scrapedProduct.url });

    const now = new Date();

    const newProduct = await collection.updateOne(
      { url: scrapedProduct.url },
      {
        $set: {
          ...scrapedProduct,
          updatedAt: now,
        },

        $setOnInsert: { createdAt: now },
        $addToSet: {
          users: {
            userId: user.id,
            email: user.email,
          },
        },
      },
      { upsert: true }
    );

    // const newProduct = await Product.findOneAndUpdate(
    //   {
    //     url: scrapedProduct.url,
    //   },
    //   {
    //     $set: product,
    //     $addToSet: {
    //       users: {
    //         userId: user.id,
    //         email: user.email,
    //       },
    //     },
    //   },
    //   { upsert: true, new: true }
    // );

    console.log("Upsert result:", newProduct);

    revalidatePath(`/products`);
    const insertedProduct = await collection.findOne({
      url: scrapedProduct.url,
    });
    console.log("Inserted/Updated product:", insertedProduct);

    return scrapedProduct;
  } catch (error: any) {
    console.error(`Failed to create/update product: ${error.message}`);
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
