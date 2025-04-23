import { createApi } from "@reduxjs/toolkit/query/react";
import { Article } from "../model/articleModel";
import { baseQueryWithReauth } from "@features/auth/utils/reauthUtils";

export const editorApi = createApi({
	reducerPath: "editorApi",
	baseQuery: baseQueryWithReauth,
	tagTypes: ["Article"],
	endpoints: (builder) => ({
		getArticles: builder.query<Article[], void>({
			query: () => `article`,
			providesTags: ["Article"],
		}),
		getArticle: builder.query<Article, string>({
			query: (id) => `article/${id}`,
			providesTags: ["Article"],
		}),
		saveArticle: builder.mutation({
			query: (article) => ({
				url: "article",
				method: "POST",
				body: article,
			}),
			invalidatesTags: ["Article"],
		}),
		deleteArticle: builder.mutation({
			query: (id) => ({
				url: "article/"+id,
				method: "DELETE",
			}),
			invalidatesTags: ["Article"],
		}),
		uploadFile: builder.mutation({
			query: (file) => {
				const formData = new FormData();
				formData.append("file", file);
				return {
					url: "upload",
					method: "POST",
					body: formData,
				};
			},
		}),
	}),
});

export const {
	useGetArticlesQuery,
	useGetArticleQuery,
	useSaveArticleMutation,
	useUploadFileMutation,
	useDeleteArticleMutation,
} = editorApi;
