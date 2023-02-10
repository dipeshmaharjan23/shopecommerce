import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Icon } from "@iconify-icon/react";
import MetaData from "./MetaData";
import { getProduct } from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setProduct } from "@/redux/slice/productSlice";
import Cart from "./Cart";
import { RootState } from "@/redux/store";

type Props = {};

const Main = (props: Props) => {
  const dispatch = useDispatch();

  const { allProducts } = useSelector((state: RootState) => state.product);
  console.log(allProducts);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await getProduct();
      // setAllProducts(res);
      dispatch(setProduct(res));
    };

    fetchProduct();
    // console.log(fetchProduct());
  }, []);
  return (
    <>
      <MetaData title={"Buy Best Products Online"} />
      <h2 className="text-3xl ml-12 mt-4">Latest Products</h2>
      <div className="flex">
        {allProducts &&
          allProducts.products.map((item: any) => {
            return <Cart key={item.id} />;
          })}
      </div>
    </>
  );
};

export default Main;
