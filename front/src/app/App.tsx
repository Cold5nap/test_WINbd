// App.jsx
import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "@features/auth";
import MainLayout from "@widgets/layout/MainLayout";
import ArticleEditorPage from "@pages/ArticleEditorPage";
import ArticleListPage from "@pages/ArticleListPage";
import ArticleViewPage from "@pages/ArticleViewPage";
import LoginPage from "@pages/LoginPage";

const App = () => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Routes>
					<Route path="/login" element={<LoginPage />} />
					<Route element={<ProtectedRoute />}>
						<Route element={<MainLayout />}>
							<Route path="edit/:id?" element={<ArticleEditorPage />} />
							<Route index element={<ArticleListPage />} />
							<Route path="article/:id" element={<ArticleViewPage />} />
						</Route>
					</Route>
				</Routes>
			</BrowserRouter>
		</Provider>
	);
};

export default App;
