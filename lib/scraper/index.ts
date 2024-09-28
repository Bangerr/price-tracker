"use server";
import axios from "axios";
import * as cheerio from "cheerio";
import { extractCurrency, extractDiscount, extractPrice } from "../utils";

export async function scrapeAmazonProduct(url: string) {
  if (!url) return;

  // BrightData proxy configuration
  const username = String(process.env.BRIGHT_DATA_USERNAME);
  const password = String(process.env.BRIGHT_DATA_PASSWORD);
  const port = 22225;
  const session_id = (1000000 * Math.random()) | 0;
  const options = {
    auth: {
      username: `${username}-session-${session_id}`,
      password,
    },
    host: "brd.superproxy.io",
    port,
    rejectUnauthorized: false,
  };

  try {
    // Fetch product page
    const response = await axios.get(url, options);
    const $ = cheerio.load(response.data);

    // Extract needed values from response data
    const title = $("#productTitle").text().trim();

    //const currentPrice = $("span.a-price-whole:first").text();

    const currentPrice = extractPrice(
      $(".priceToPay span.a-price-whole:first"),
      $(".a.size.base.a-color-price:first"),
      $(".a-button-selected .a-color-base:first"),
      $("#priceblock_dealprice_row:first")
    );

    const originalPrice = extractPrice(
      $("#priceblock_ourprice:first"),
      $(".a-price.a-text-price span.a-offscreen:first"),
      $("#listPrice:first"),
      $("#priceblock_dealprice:first"),
      $(".a-size-base.a-color-price:first")
    );

    const currency = extractCurrency($(".priceToPay span.a-price-symbol"));
    const discount = extractDiscount(
      $(
        ".savingPriceOverride.reinventPriceSavingsPercentageMargin.savingsPercentage:first"
      )
    );
    const data = {
      url,
      title,
      currentPrice,
      originalPrice,
      currency,
      discount,
    };
    console.log(data);
    // const data = {
    //   url,
    //   title:
    //     "Apple AirPods Max Wireless Over-Ear Headphones, Active Noise Cancelling, Transparency Mode, Personalized Spatial Audio, Dolby Atmos, Bluetooth Headphones for iPhone – Silver",
    //   currentPrice: 599,
    //   originalPrice: 699,
    //   currency: "$",
    //   discount: "-10%",
    // };

    return data;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    throw new Error(`Failed to scrape product: ${error.message}`);
  }
}
