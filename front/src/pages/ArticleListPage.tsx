import { ArrowRightOutlined, PlusOutlined } from "@ant-design/icons";
import { ArticleList, useGetArticlesQuery } from "@features/article";
import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const ArticleListPage = () => {
	const navigate = useNavigate();
	const { data: articles, isLoading } = useGetArticlesQuery();
	const addArticleHandler = () => {
		navigate("/edit");
	};
	return (
		<>
			<Button type="primary" icon={<PlusOutlined />} onClick={addArticleHandler}>
				Добавить статью
			</Button>
			<ArticleList articles={articles} loading={isLoading} />
		</>
	);
};
export default ArticleListPage;
