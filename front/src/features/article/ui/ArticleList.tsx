import React from "react";
import { List } from "antd";
import { Article } from "../model/articleModel"; // Импортируйте ваш интерфейс
import ArticleCard from "@entities/article/ArticleCard";
import { useDeleteArticleMutation } from "../api/editorAPI";

const { Item } = List;
interface ArticleListProps {
	articles?: Article[];
	loading?: boolean;
}

const ArticleList: React.FC<ArticleListProps> = ({ articles, loading }) => {
	const [deleteArticle,{isLoading}] = useDeleteArticleMutation()
	const deleteHandler = async (id:string) => {
		await deleteArticle(id).unwrap()
	}
	return (
		<List
			loading={loading}
			dataSource={articles}
			renderItem={(article) => (
				<Item>
					<ArticleCard deleteLoading={isLoading} article={article} onDelete={()=>deleteHandler(article._id)} />
				</Item>
			)}
		/>
	);
};

export default ArticleList;
