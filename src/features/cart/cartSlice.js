import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addCartItem, getCartItems } from "./cartApi";

// initial state

const initialState = {
	isLoading: false,
	isError: false,
	error: "",
	cart: [],
	cartProducts: [],
};

export const fetchCartItem = createAsyncThunk(
	"cart/fetchCartItems",
	async () => {
		const cartItems = await getCartItems();

		return cartItems;
	}
);

export const buyCartItem = createAsyncThunk("cart/buyNow", async (data) => {
	const cartItem = await addCartItem(data);
	return cartItem;
});

const cartItemsSlice = createSlice({
	name: "cartItems",
	reducers: {
		addToCart: (state, action) => {
			state.cartProducts = action.payload;
		},
		addBuyProducts: (state, action) => {
			state.cart = action.payload;
		},
	},
	initialState,
	extraReducers: (builder) => {
		builder
			.addCase(fetchCartItem.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
			})
			.addCase(fetchCartItem.fulfilled, (state, action) => {
				state.isLoading = false;
				state.cart = action.payload;
			})

			.addCase(fetchCartItem.rejected, (state, action) => {
				state.isLoading = false;
				state.cart = [];
				state.isError = true;
				state.error = action.error?.message;
			})
			.addCase(buyCartItem.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
			})
			.addCase(buyCartItem.fulfilled, (state, action) => {
				state.isLoading = false;
				state.cart = action.payload;
			})

			.addCase(buyCartItem.rejected, (state, action) => {
				state.isLoading = false;
				state.cart = [];
				state.isError = true;
				state.error = action.error?.message;
			});
	},
});

export default cartItemsSlice.reducer;
export const { addToCart, addBuyProducts } = cartItemsSlice.actions;
