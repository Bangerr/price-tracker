import Searchbar from "@/components/Searchbar";
import { getAllProducts } from "@/lib/actions";
import React from "react";
import DeleteProductButton from "@/components/DeleteProductButton";

const Home = async () => {
  const products = await getAllProducts();

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

      <section className="px-6 md:px-20 py-24">
        <h1 className="text-3xl font-semibold mb-8">Selected Items</h1>

        <div className="flex flex-wrap gap-5 justify-between">
          {products?.map((product) => (
            <div
              key={product.id}
              className="flex-[1_0_25%] mr-[10px] leading-10 max-w-[300px] px-5 py-5 border border-black ">
              <DeleteProductButton productId={product.id} />
              <a
                href={product.url}
                target="_blank"
                className="hover:cursor-pointer hover:scale-95 animate duration-100 ease-out">
                <h1 className="flex flex-row justify-between">
                  <span className="font-semibold text-xl mr-5">Title:</span>
                  <p>{product.title}</p>
                </h1>
                <div className="flex flex-row justify-between">
                  <span className="font-semibold text-xl mr-5">
                    Current Price:
                  </span>
                  <p>{product.currentPrice}</p>
                </div>
                <div className="flex flex-row justify-between">
                  <span className="font-semibold text-xl mr-5">
                    Original Price:
                  </span>
                  <p>{product.originalPrice}</p>
                </div>
                <div className="flex flex-row justify-between">
                  <span className="font-semibold text-xl mr-5">Curreny:</span>
                  <p>{product.currency}</p>
                </div>
                <div className="flex flex-row justify-between">
                  <span className="font-semibold text-xl mr-5">
                    Discount Percentage:
                  </span>
                  <p>{product.discount}</p>
                </div>
                <div className="flex flex-row justify-between">
                  <span className="font-semibold text-xl mr-5">URL:</span>
                  <p className="text-blue-400 hover:cursor-pointer">Link</p>
                </div>
              </a>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
