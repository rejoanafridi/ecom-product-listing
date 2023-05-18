import { createSlice } from "@reduxjs/toolkit";

// initial state

const initialState = {
	search: "",
};

const filterSlice = createSlice({
	name: "filters",
	initialState,
	reducers: {
		addSearch: (state, action) => {
			state.search = action.payload;
		},
	},
});

export default filterSlice.reducer;

export const { addSearch } = filterSlice.actions;
