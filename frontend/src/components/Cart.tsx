import React from "react";
import Image from "next/image";
import { Icon } from "@iconify-icon/react";
import { IProduct } from "@/redux/slice/productSlice";
import Link from "next/link";

type Props = {
  productDetails?: any;
};

const Cart = ({ productDetails }: Props) => {
  console.log(productDetails._id);
  const handleClick = (id: string) => {};
  return (
    <>
      <div className=" shadow-zinc-600 border-2 w-[25rem] mx-12 mt-8 h-auto flex flex-col justify-center">
        <div className="flex justify-center h-auto">
          <Image
            src="https://thumbs.dreamstime.com/b/ssd-drive-state-solid-isolated-white-background-d-rendering-illustration-82374537.jpg"
            alt="product photo"
            width="280"
            height="280"
          />
        </div>
        <p className="mx-auto mt-4 text-gray-700">
          512 GB Solid Storage Mermory Card Sandisk Ultra
        </p>
        <div className="flex space-x-2 mt-6 pl-4">
          <Icon
            icon="ic:baseline-star-outline"
            className="text-2xl text-amber-500 "
          />
          <Icon
            icon="ic:baseline-star-outline"
            className="text-2xl text-amber-500"
          />
          <Icon
            icon="ic:baseline-star-outline"
            className="text-2xl text-amber-500"
          />
          <Icon
            icon="ic:baseline-star-outline"
            className="text-2xl text-amber-500"
          />
          <Icon
            icon="ic:baseline-star-outline"
            className="text-2xl text-amber-500"
          />
          <p className="pl-4 text-gray-700">(5 Reviews)</p>
        </div>
        <span className=" text-2xl my-4 pl-4 text-gray-700">
          ${productDetails.price}
        </span>
        <Link href={`/${productDetails._id}`}>
          <button className="bg-secondary-color p-2 text-white mx-12 rounded-md mxb-12 mt-4">
            View Details
          </button>
        </Link>
      </div>
    </>
  );
};

export default Cart;
