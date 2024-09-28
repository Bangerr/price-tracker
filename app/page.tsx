import Searchbar from "@/components/Searchbar";
import Image from "next/image";
import React from "react";

const Home = () => {
  return (
    <>
      <section className="px-6 md:px-20 py-24">
        <div className="flex max-xl:flex-col flex-row gap-16">
          <div className="flex flex-col justify-center w-full">
            <h1 className="mt-4 text-2xl font-bold tracking-[-1.2px] text-gray-900">
              Preparing for Black Friday
            </h1>

            <Searchbar />
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
