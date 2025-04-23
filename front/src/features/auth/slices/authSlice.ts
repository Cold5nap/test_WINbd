import { createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem("token") || null;
const initialState = {
	token,
	isAuthenticated: !!token,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setCredentials: (state, action) => {
			state.token = action.payload;
			state.isAuthenticated = true;
			localStorage.setItem("token", action.payload);
		},
		logout: (state) => {
			state.token = null;
			state.isAuthenticated = false;
			localStorage.removeItem("token");
		},
	},
});

export const { setCredentials, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
