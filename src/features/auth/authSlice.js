import { createSlice } from "@reduxjs/toolkit";
import { login } from "./authApi";

const authSlice = createSlice({
	name: "auth/login",
	initialState: {
		token: null,
		error: null,
		isLoading: false,
	},
	reducers: {
		loginStart(state) {
			state.isLoading = true;
			state.error = null;
		},
		loginSuccess(state, action) {
			state.isLoading = false;
			state.token = action.payload;
		},
		loginFailure(state, action) {
			state.isLoading = false;
			state.error = action.payload;
		},
	},
});

export const { loginStart, loginSuccess, loginFailure } = authSlice.actions;

export const loginUser = (username, password) => async (dispatch) => {
	try {
		dispatch(loginStart());
		const token = await login(username, password);
		dispatch(loginSuccess(token));
	} catch (error) {
		dispatch(loginFailure(error.message));
	}
};

export default authSlice.reducer;
