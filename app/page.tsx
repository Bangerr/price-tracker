import HeroCarousel from "@/components/HeroCarousel";
import Searchbar from "@/components/Searchbar";
import Image from "next/image";
import React from "react";

const Home = () => {
  return (
    <>
      <section className="px-6 md:px-20 py-24">
        <div className="flex max-xl:flex-col flex-row gap-16">
          <div className="flex flex-col justify-center">
            <p className="flex gap-2 text-sm font-medium text-blue-500">
              Tracking
              <Image
                src="/assets/icons/arrow-right.svg"
                alt="arrow-right"
                width={16}
                height={16}
              />
            </p>
            <h1 className="mt-4 text-6xl leading-[72px] font-bold tracking-[-1.2px] text-gray-900">
              Prepare for <span className="text-blue-500">Black Friday</span>
            </h1>
            <p className="mt-6">
              Price Tracker is a powerful tool designed to help users monitor
              and track the prices of products across various online stores. By
              simply inputting the link of any product, users can instantly
              retrieve comprehensive details such as the product's name, price,
              and other essential information.
            </p>
            <Searchbar />
          </div>
          <HeroCarousel />
        </div>
      </section>

      <section className="flex flex-col gap-10 px-6 md:px-20 py-24">
        <h2 className="text-secondary text-[32px] font-semibold">Trending</h2>
        <div className="flex flex-wrap gap-x-8 gap-y-16">
          {["Apple Iphone 16", "Book", "Sneakers"].map((product, index) => (
            <div key={index}>{product}</div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
