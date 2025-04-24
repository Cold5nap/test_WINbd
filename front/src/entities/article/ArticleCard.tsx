import React, { FC } from "react";
import { List, Card, Typography, Tag, Space, Button } from "antd";
import { Article, ArticleContent } from "@features/article"; // Импортируйте ваш интерфейс
import { ArrowRightOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import FileDownload from "@shared/ui/FileDownload";

const { Title, Text } = Typography;
interface ArticleCardProps {
	article: Article;
	onDelete: () => void;
	deleteLoading: boolean;
}
const ArticleCard: FC<ArticleCardProps> = ({
	article,
	onDelete,
	deleteLoading,
}) => {
	const navigate = useNavigate();
	// Функция для рендеринга контента статьи в зависимости от типа
	const renderContentItem = (item: ArticleContent) => {
		switch (item.type) {
			case "text":
				return <ReactMarkdown>{item.data}</ReactMarkdown>;
			case "image":
				return (
					<img src={item.data} alt="content" style={{ maxWidth: "100%" }} />
				);
			case "quote":
				return (
					<blockquote style={{ fontStyle: "italic" }}>{item.data}</blockquote>
				);
			case "file":
				return <FileDownload url={item.data} />;
			case "code":
				return (
					<pre
						style={{
							background: "#f5f5f5",
							padding: "10px",
							borderRadius: "4px",
						}}
					>
						<code>{item.data}</code>
					</pre>
				);
			default:
				return <Text>{item.data}</Text>;
		}
	};
	return (
		<Card
			style={{ width: "100%" }}
			title={
				<Space>
					<Title level={4} style={{ margin: 0 }}>
						{article.title}
					</Title>
					{article.isPublished ? (
						<Tag color="green">Опубликовано</Tag>
					) : (
						<Tag color="orange">Ожидает</Tag>
					)}
				</Space>
			}
			extra={
				<Space>
					<Text type="secondary">
						{new Date(article.publishAt).toLocaleDateString()}
					</Text>

					<Button
						variant="outlined"
						color="danger"
						icon={<DeleteOutlined />}
						onClick={onDelete}
						loading={deleteLoading}
					></Button>
					<Button
						icon={<ArrowRightOutlined />}
						onClick={() => navigate("/article/" + article._id)}
						// type="outlined"
					>
						Просмотреть
					</Button>
				</Space>
			}
		>
			<List
				dataSource={article.content}
				renderItem={(contentItem, index) => (
					<List.Item key={index}>{renderContentItem(contentItem)}</List.Item>
				)}
			/>
		</Card>
	);
};
export default ArticleCard;
