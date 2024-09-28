"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../db";
import Product from "../models/product.model";
import { scrapeAmazonProduct } from "../scraper";

export async function scrapeAndStoreProduct(productUrl: string) {
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
      product,
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
  try {
    connectToDatabase();

    const products = await Product.find();

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
