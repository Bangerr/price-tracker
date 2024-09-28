"use client";
import { scrapeAndStoreProduct } from "@/lib/actions";
import React, { FormEvent, useState } from "react";

const isValidAmazonProductUrl = (url: string) => {
  //   const browser = await puppeteer.connect({
  //     browserWSEndpoint: `wss://${process.env.BRIGHT_DATA_AUTH}@brd.superproxy.io:22225`,
  //   });
  //   const page = await browser.newPage();
  //   await page.setViewport({ width: 1920, height: 1080 });

  //   await page.goto(url, { waitUntil: "networkidle0" });
  //   await new Promise((resolve) => setTimeout(resolve, 1000));

  //   const html = page.content();

  //   console.log("html", html);

  try {
    const parsedURL = new URL(url);
    const hostname = parsedURL.hostname;

    if (
      hostname.includes("amazon.com") ||
      hostname.includes("amazon.") ||
      hostname.includes("amazon.de") ||
      hostname.endsWith("amazon")
    ) {
      return true;
    }
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return false;
  }
  return false;
};

const Searchbar = () => {
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValidLink = isValidAmazonProductUrl(searchValue);

    if (!isValidLink)
      return alert("Please provide a valid Amazon Product link.");

    try {
      setIsLoading(true);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const product = await scrapeAndStoreProduct(searchValue);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      action=""
      className="flex flex-wrap gap-4 mt-12"
      onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter Product link"
        className="flex-1 min-w-[200px] w-full p-3 border border-gray-300 rounded-lg shadow-xs text-base text-gray-500 focus:outline-none"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <button
        disabled={searchValue === "" ? true : false}
        type="submit"
        className="bg-gray-900 border border-gray-900 rounded-lg shadow-xs px-5 py-3 text-white text-base font-semibold hover:opacity-90 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-40">
        {isLoading ? "Searching..." : "Search"}
      </button>
    </form>
  );
};

export default Searchbar;
