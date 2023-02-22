// import { RootState } from "@/redux/store";
import axios from "axios";

// get all products
export const getProduct = (
  currentPage?: number,
  keyword?: string | undefined
) => {
  return axios
    .get(`api/allproducts?keyword=${(keyword = "")}&page=${currentPage}`)
    .then((response) => response.data);
};

export const getProductDetails = (id: string | string[]) => {
  return axios.get(`api/product/${id}`);
};
