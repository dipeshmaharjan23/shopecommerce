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
// import Pagination from "react-js-pagination";

type Props = {};

const Main = (props: Props) => {
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

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getProduct(currentPage);
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
  }, [getProduct, currentPage]);

  // const [postPerPage] = useState(4);

  // const indexOfLastPost = currentPage * resPerPage;
  // const indexOfFirstPost = indexOfLastPost - resPerPage;
  // const currentPost = allProducts.products.slice(
  //   indexOfFirstPost,
  //   indexOfLastPost
  // );
  console.log(currentPage);
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
          {/* {allProducts && (
            <div className="flex justify-center mt-5">
              <Pagination>
                activePage={currentPage}
                itemsCountPerPage={resPerPage}
                totalItemsCount={allProducts?.productCount}
                onChange={setCurrentPageNo}
                nextPageText={"Next"}
                prevPageText={"Prev"}
                firstPageText={"First"}
                lastPageText={"Last"}
                innerClass={"flex mx-2"}
                activeClass={"flex"}
              </Pagination>
            </div>
          )} */}
          <div className="flex justify-center items-center mt-40">
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
