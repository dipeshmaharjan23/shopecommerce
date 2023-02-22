import React, { useEffect, useState } from "react";
import MetaData from "./MetaData";
import { getProduct } from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import {
  setErrors,
  setProduct,
  setResPerPage,
} from "@/redux/slice/productSlice";
import Cart from "./Cart";
import { RootState } from "@/redux/store";
import Loader from "./Loader";
import { useAlert } from "react-alert";
import Pagination from "./Pagination";
import { useRouter } from "next/router";
// import Pagination from "react-js-pagination";

type Props = {
  keyword?: string | undefined;
};

const Main = ({ keyword }: Props) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { allProducts, loading, resPerPage } = useSelector(
    (state: RootState) => state.product
  );

  const [currentPage, setCurrentPage] = useState(1);

  const setCurrentPageNo = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  // console.log(allProducts.productCount);
  // console.log("keyword", keyword);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getProduct(currentPage, keyword);
        dispatch(setProduct(res));
        dispatch(setResPerPage(res?.resPerPage));
        alert.success("success");
        console.log(res);
      } catch (err) {
        dispatch(setErrors(err));
        alert.error(err);
      }
    };

    fetchProduct();
    // console.log(fetchProduct());
  }, [getProduct, currentPage, keyword]);

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

          <div className="absolute bottom-12 left-[45%] transform ">
            <Pagination
              postPerPage={resPerPage}
              totalPosts={allProducts?.productCount}
              paginate={setCurrentPageNo}
              currentPage={currentPage}
            />
          </div>
        </>
      )}
    </>
  );
};

export default Main;
