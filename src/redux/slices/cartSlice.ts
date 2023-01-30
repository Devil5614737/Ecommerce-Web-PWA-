import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IData } from "@/pages/api/shoes";

interface CartState {
  cartItems: IData[];
}

const initialState: CartState = {
  cartItems:
    typeof window !== "undefined" && localStorage
      ? JSON.parse(localStorage.getItem("cart") || "[]")
      : [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IData>) => {
      const { payload } = action;
      const existingItemIndex = state.cartItems.findIndex(
        (item) => item.id === payload.id
      );
      if (existingItemIndex !== -1) {
        state.cartItems[existingItemIndex].quantity += payload.quantity;
      } else {
        state.cartItems.push(payload);
      }
      setLocalStorage(state);
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.cartItems = state.cartItems.filter(
        (cartItem) => cartItem.id !== action.payload
      );
      setLocalStorage(state);
    },
    // Update quantity of an item in the cart
    cartQuantity: (
      state,
      action: PayloadAction<{ cartItemId: number; qty: number }>
    ) => {
      state.cartItems = state.cartItems.map((item) =>
        item.id === action.payload.cartItemId
          ? { ...item, quantity: action.payload.qty }
          : item
      );
    },
  },
});

export const { addToCart, removeFromCart, cartQuantity } = cartSlice.actions;
export default cartSlice.reducer;

// Function to set cart items in local storage
function setLocalStorage(state: CartState) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem("cart", JSON.stringify(state.cartItems));
  }
}
