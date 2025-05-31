import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../redux/cartSlice.js";
import userReducer from "../redux/userSlice.js";

const store = configureStore({
    reducer: {
        cart: cartReducer,
        user: userReducer
    }
});

export default store;