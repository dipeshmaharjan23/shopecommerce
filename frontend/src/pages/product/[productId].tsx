import { getProductDetails } from "@/actions/productActions";
import Navbar from "@/components/Navbar";
import { setProductDetails } from "@/redux/slice/productSlice";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { RootState } from "@/redux/store";
import { Icon } from "@iconify-icon/react";
type Props = {};

const productId = (props: Props) => {
  const [count, setCount] = useState(1);
  const router = useRouter();
  const dispatch = useDispatch();
  const id = router.query?.productId;
  useEffect(() => {
    const result = async () => {
      if (id) {
        const res = await getProductDetails(id);
        dispatch(setProductDetails(res.data.product));
        // console.log(res.data);
      }
    };

    result();
  }, [id]);

  const { productDetails } = useSelector((state: RootState) => state.product);
  console.log(productDetails);

  const capitalized = (word: string) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };
  return (
    <>
      <Navbar />
      <div className="flex w-[90%] h-[88vh] mx-auto ">
        <div className="flex justify-center items-center w-[50%] ">
          <Image
            src="https://thumbs.dreamstime.com/b/ssd-drive-state-solid-isolated-white-background-d-rendering-illustration-82374537.jpg"
            alt="product photo"
            width="480"
            height="480"
          />
        </div>
        <div className="flex pt-5 w-[50%] flex-col justify-start">
          <div className="w-[80%] ">
            <h1 className="text-4xl">{productDetails?.name}</h1>
            <hr className="my-8" />
            <div className="flex space-x-8">
              <div>
                <Icon
                  icon="ic:baseline-star-outline"
                  className="text-3xl text-amber-500 "
                />
                <Icon
                  icon="ic:baseline-star-outline"
                  className="text-3xl text-amber-500 "
                />
                <Icon
                  icon="ic:baseline-star-outline"
                  className="text-3xl text-amber-500 "
                />
                <Icon
                  icon="ic:baseline-star-outline"
                  className="text-3xl text-amber-500 "
                />
                <Icon
                  icon="ic:baseline-star-outline"
                  className="text-3xl text-amber-500 "
                />
              </div>
              <span className="text-xl">
                ({productDetails?.numOfReviews}) Reviews
              </span>
            </div>
            <hr className="my-5" />
            <span className="text-4xl ">${productDetails?.price}</span>
            <div className="flex space-x-16 my-4 pt-4">
              <div className="flex justify-center items-center space-x-6 ">
                <button
                  className="text-2xl bg-red-400 hover:bg-red-700 p-2 w-12 rounded-md text-white"
                  onClick={() => {
                    if (count > 1) {
                      setCount((prev) => prev - 1);
                    }
                  }}
                >
                  {" "}
                  -{" "}
                </button>
                <span className="text-2xl">{count}</span>
                <button
                  className="text-2xl p-2 w-12 bg-green-400 hover:bg-green-700 rounded-md text-white"
                  onClick={() => {
                    if (productDetails?.stock >= count)
                      setCount((prev) => prev + 1);
                  }}
                >
                  +
                </button>
              </div>
              <button className="text-2xl bg-secondary-color py-2 px-6 text-white hover:bg-slate-400 rounded-md ">
                Add to Cart
              </button>
            </div>
            <hr className="my-5" />
            <p className="text-xl">
              Status :{" "}
              {productDetails?.stock > 0 ? (
                <span className="text-xl">In Stock</span>
              ) : (
                <span className="text-xl">Not in Stock</span>
              )}
            </p>
            <hr className="my-5" />
            <p>
              <span className="text-2xl">Description</span> : <br />
              <span className="text-xl"> {productDetails?.description}</span>
            </p>
            <hr className="my-5" />
            <p className="text-xl">
              Sold By : {capitalized(productDetails?.seller)}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default productId;
