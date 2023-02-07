// import { RootState } from "@/redux/store";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setProduct } from "@/redux/slice/productSlice";

const getProduct = () => {
  // const { product } = useSelector((state: RootState) => state.product);
  const dispatch = useDispatch();

  const result = async () => {
    const { data } = await axios.get("/api/allproducts");
    dispatch(setProduct(data));
  };
};

export default getProduct;
