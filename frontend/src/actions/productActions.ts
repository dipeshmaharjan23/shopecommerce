// import { RootState } from "@/redux/store";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setProduct, setProductCount } from "@/redux/slice/productSlice";

const getProduct = () => {
  const dispatch = useDispatch();

  const result = async () => {
    const { data } = await axios.get("/api/allproducts");
    dispatch(setProduct(data));
    dispatch(setProductCount(data.productCount));
  };
};

export default getProduct;
