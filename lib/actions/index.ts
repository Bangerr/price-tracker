"use server";

import { scrapeAmazonProduct } from "../scraper";

export async function scrapeAndStoreProduct(productUrl: string) {
  if (!productUrl) return;

  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const scrapedProduct = await scrapeAmazonProduct(productUrl);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(`Failed to create/update product: ${error.message}`);
  }
}
