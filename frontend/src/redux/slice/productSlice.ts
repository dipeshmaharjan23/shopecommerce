import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IProduct {
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
  products?: any;
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
  errors: any;
}

const initialState = {
  loading: true,
  resPerPage: 3,
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
  errors: [],
  productDetails: {
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
    stock: 0,
    numOfReviews: 0,
    reviews: {
      user: "",
      rating: 0,
      name: "",
      comment: "",
    },
  },
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProduct(state: IProd, action: { type: string; payload: IProducts }) {
      state.allProducts = action.payload;
      state.loading = false;
    },
    setErrors(state, action) {
      state.errors = action.payload;
      state.loading = false;
    },
    setProductDetails(state, action) {
      state.productDetails = action.payload;
    },
    setResPerPage(state, action) {
      state.resPerPage = action.payload;
    },
  },
});

export const { setProduct, setErrors, setProductDetails, setResPerPage } =
  productSlice.actions;
export default productSlice.reducer;
