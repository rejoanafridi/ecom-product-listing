import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../features/products/productsSlice";
import cartReducer from "../features/cart/cartSlice";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
	reducer: {
		auth: authReducer,
		products: productsReducer,
		cartItems: cartReducer,
	},
});
