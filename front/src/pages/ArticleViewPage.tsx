import {
	ArticleViewer,
	useGetArticleQuery,
} from "@features/article";
import React from "react";
import { useParams } from "react-router-dom";

const ArticleViewPage = () => {
	const { id } = useParams();
	const { data: article, isLoading } = useGetArticleQuery(id || "", {
		skip: !id,
	});
	return <ArticleViewer article={article} isLoading={isLoading} />;
};
export default ArticleViewPage;
