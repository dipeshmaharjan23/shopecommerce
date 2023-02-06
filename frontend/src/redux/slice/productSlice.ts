import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IProduct {
  name: string;
  price: number;
  description: string;
  ratings: number;
  image: {
    public_id: string;
    url: string;
  };
  category: string;
  seller: string;
  stock: string;
  numOfReviews: number;
  reviews: {
    user: string;
    rating: number;
    name: string;
    comment: string;
  };
}
interface IProducts {
  product: IProduct[];
  productCount: number;
  loading: boolean;
}

const initialState = {
  product: [
    {
      name: "",
      price: 0,
      description: "",
      ratings: 0,
      image: {
        public_id: "",
        url: "",
      },
      category: "",
      seller: "",
      stock: "",
      numOfReviews: 0,
      reviews: {
        user: "",
        rating: 0,
        name: "",
        comment: "",
      },
    },
  ],
  productCount: 0,
  loading: true,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProduct(
      state: IProducts,
      action: { type: string; payload: IProduct[] }
    ) {
      state.product = action.payload;
      state.loading = false;
    },
    setProductCount(state: IProducts, action: PayloadAction<number>) {
      state.productCount = action.payload;
    },
  },
});

export const { setProduct } = productSlice.actions;
export default productSlice.reducer;
