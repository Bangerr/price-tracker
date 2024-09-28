"use client";
import React from "react";
import Image from "next/image";
import trash from "@/public/assets/icons/trash.svg";
import { delleteProductById } from "@/lib/actions";

type Props = {
  productId: string;
};

const DeleteProductButton = ({ productId }: Props) => {
  const handleDelete = async () => {
    try {
      await delleteProductById(productId);
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error) {
      console.log(`${error}`);
    }
  };

  return (
    <div
      className="relative w-full hover:cursor-pointer mb-3 h-5"
      onClick={handleDelete}>
      <Image
        className="absolute right-0 bottom-0 hover:scale-[115%] animate duration-100 ease-out"
        src={trash}
        alt="trash"
        width={20}
        height={20}
      />
    </div>
  );
};

export default DeleteProductButton;
