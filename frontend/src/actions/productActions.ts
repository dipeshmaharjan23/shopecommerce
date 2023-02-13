// import { RootState } from "@/redux/store";
import axios from "axios";

// get all products
export const getProduct = () => {
  return axios.get("api/allproducts").then((response) => response.data);
};

export const getProductDetails = (id: string | string[]) => {
  return axios.get(`api/product/${id}`);
};
