// ArticleViewer.jsx
import React from "react";
import { Card, Typography, Spin } from "antd";
import ReactMarkdown from "react-markdown";
import BackButton from "@shared/ui/BackButton";

const { Title, Text } = Typography;

const ArticleViewer = ({ article, isLoading }) => {
	const renderBlock = (block, index) => {
		switch (block.type) {
			case "text":
				return <ReactMarkdown key={index}>{block.data}</ReactMarkdown>;
			case "image":
				return (
					<img
						key={index}
						src={block.data}
						alt="content"
						style={{ maxWidth: "100%" }}
					/>
				);
			case "quote":
				return (
					<blockquote key={index}>
						<Text italic>{block.data}</Text>
					</blockquote>
				);
			case "code":
				return (
					<pre key={index}>
						<code>{block.data}</code>
					</pre>
				);
			case "file":
				return (
					<div key={index}>
						<a href={block.data} target="_blank" rel="noopener noreferrer">
							Скачать файл
						</a>
					</div>
				);
			default:
				return null;
		}
	};

	if (isLoading) return <Spin />;

	return (
		<>
			<BackButton />
			<div style={{ padding: 24 }}>
				<Title level={2}>{article?.title}</Title>
				{article?.content?.map((block, index) => (
					<Card key={index} style={{ marginBottom: 16 }}>
						{renderBlock(block, index)}
					</Card>
				))}
			</div>
		</>
	);
};

export default ArticleViewer;
