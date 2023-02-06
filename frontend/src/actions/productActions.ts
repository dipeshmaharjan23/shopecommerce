import { RootState } from "@/redux/store";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const getProduct = async () => {
  const dispatch = useDispatch();
  const { product } = useSelector((state: RootState) => state.product);
  try {
    const { data } = await axios.get("/api/products");
    // dispatch(product(data));
  } catch (error) {
    console.log(error);
  }
};
