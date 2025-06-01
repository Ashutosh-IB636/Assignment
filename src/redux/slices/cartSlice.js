import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartProducts: {}, // Use object for serializability
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      // This will overwrite if product.id already exists (no duplicates)
      state.cartProducts[product.id] = product.quantity;
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      delete state.cartProducts[productId];
    },
    clearCart: (state) => {
      state.cartProducts = {};
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
