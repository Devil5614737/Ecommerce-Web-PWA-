import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IData } from "@/pages/api/shoes";

export interface ProductsState {
  products: IData[];
}

const initialState: ProductsState = {
  products: [],
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    allProducts: (state, action: PayloadAction<IData[]>) => {
      const { payload } = action;
      state.products = payload;
    },
    filterByColor: (state, action: PayloadAction<string>) => {
      const { payload } = action;
      const filtered =
        payload === ""
          ? state.products
          : state.products.filter((item) => item.color === payload);
      state.products = filtered;
    },
    sortByPriceLowToHigh: (state) => {
      state.products = state.products.sort((a, b) => a.price - b.price);
    },
    sortByPriceHightToLow: (state) => {
      state.products = state.products.sort((a, b) => b.price - a.price);
    },
    filterByPriceRange: (state, action: PayloadAction<object>) => {
      const { payload:{max,min} } = action as {
        payload:{
          min:number,
          max:number
        }
      };
      state.products = state.products.filter(
        (item) => item.price >= min && item.price <= max
      );
  
      // const filtered = state.products.filter(
      //   (product) => product.price <= payload
      // );
      // state.products = filtered;
    },
  },
});

export const {
  allProducts,
  filterByColor,
  sortByPriceLowToHigh,
  sortByPriceHightToLow,
  filterByPriceRange,
} = productsSlice.actions;
export default productsSlice.reducer;
