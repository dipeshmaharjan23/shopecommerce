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
  products: any;
  productCount: number;
  count: number;
  success: boolean;
}

interface IProd {
  loading: boolean;
  allProducts: IProducts;
  // products?: IProduct[];
  // productCount?: number;
  // count?: number;
  // success?: boolean;
}

const initialState = {
  loading: true,
  allProducts: {
    products: [
      {
        success: false,
        count: 0,
        productCount: 0,
        loading: true,
        products: [
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
      },
    ],
    productCount: 0,
    count: 0,
    success: false,
  },
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProduct(state: IProd, action: { type: string; payload: any }) {
      state.allProducts = action.payload;
      state.loading = false;
    },
  },
});

export const { setProduct } = productSlice.actions;
export default productSlice.reducer;
