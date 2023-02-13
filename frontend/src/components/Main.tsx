import React, { useEffect, useState } from "react";
import MetaData from "./MetaData";
import { getProduct } from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import { setErrors, setProduct } from "@/redux/slice/productSlice";
import Cart from "./Cart";
import { RootState } from "@/redux/store";
import Loader from "./Loader";
import { useAlert } from "react-alert";

type Props = {};

const Main = (props: Props) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { allProducts, loading } = useSelector(
    (state: RootState) => state.product
  );
  // console.log(allProducts);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getProduct();
        dispatch(setProduct(res));
        alert.success("success");
      } catch (err) {
        dispatch(setErrors(err));
        alert.error(err);
      }
    };

    fetchProduct();
    // console.log(fetchProduct());
  }, [getProduct]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={"Buy Best Products Online"} />
          <h2 className="text-3xl ml-12 mt-4">Latest Products</h2>
          <div className="flex">
            {allProducts &&
              allProducts.products.map((item: any) => {
                return (
                  <React.Fragment key={item.id}>
                    <Cart productDetails={item} />
                  </React.Fragment>
                );
              })}
          </div>
        </>
      )}
    </>
  );
};

export default Main;
