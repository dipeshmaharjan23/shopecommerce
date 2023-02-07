import React, { useEffect } from "react";
import Image from "next/image";
import { Icon } from "@iconify-icon/react";
import MetaData from "./MetaData";
// import getProduct from "../actions/productActions";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setProduct } from "@/redux/slice/productSlice";

type Props = {};

const Main = (props: Props) => {
  const dispatch = useDispatch();

  const result = async () => {
    const { data } = await axios.get("http:/localhost:5000/api/allproducts");
    // dispatch(setProduct(data));
    console.log(data);
  };

  useEffect(() => {
    result();
  });
  return (
    <>
      <MetaData title={"Buy Best Products Online"} />
      <h2 className="text-3xl ml-12 mt-4">Latest Products</h2>
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
        <span className=" text-2xl my-4 pl-4 text-gray-700">$46.54</span>
        <button className="bg-secondary-color p-2 text-white mx-12 rounded-md mb-12 mt-4">
          View Details
        </button>
      </div>
    </>
  );
};

export default Main;
