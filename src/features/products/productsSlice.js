import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProducts } from "./productsApi";

// initial state

const initialState = {
	isLoading: false,
	isError: false,
	error: "",
	products: [],
};

export const fetchProducts = createAsyncThunk(
	"products/fetchProducts",
	async (type) => {
		const products = await getProducts();

		return products;
	}
);

const productsSlice = createSlice({
	name: "products",
	initialState,
	extraReducers: (builder) => {
		builder
			.addCase(fetchProducts.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
			})
			.addCase(fetchProducts.fulfilled, (state, action) => {
				state.isLoading = false;
				state.products = action.payload;
			})

			.addCase(fetchProducts.rejected, (state, action) => {
				state.isLoading = false;
				state.products = [];
				state.isError = true;
				state.error = action.error?.message;
			});
	},
});

export default productsSlice.reducer;
