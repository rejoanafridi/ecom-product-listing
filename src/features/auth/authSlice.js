import { createSlice } from "@reduxjs/toolkit";
import { login } from "./authApi";

const authSlice = createSlice({
	name: "auth/login",
	initialState: {
		username: "",
		password: "",
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
		saveUserInfo(state, action) {
			state.username = action.payload.username;
			state.password = action.payload.password;
		},
		userLogOut: (state, action) => {
			state.token = null;
		},
	},
});

export const {
	loginStart,
	loginSuccess,
	loginFailure,
	saveUserInfo,
	userLogOut,
} = authSlice.actions;

export const loginUser = (username, password) => async (dispatch) => {
	try {
		dispatch(loginStart());
		const token = await login(username, password);
		dispatch(loginSuccess(token));
		dispatch(saveUserInfo({ username: username, password: password }));
	} catch (error) {
		dispatch(loginFailure(error.message));
	}
};

export default authSlice.reducer;
