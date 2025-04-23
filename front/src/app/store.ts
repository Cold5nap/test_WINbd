import { configureStore } from "@reduxjs/toolkit";
import { editorApi } from "@features/article";
import { authApi } from "@features/auth";
import { authReducer } from "@features/auth";
export default configureStore({
	reducer: {
		[editorApi.reducerPath]: editorApi.reducer,
		[authApi.reducerPath]: authApi.reducer,
		auth: authReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware()
			.concat(editorApi.middleware)
			.concat(authApi.middleware),
});
