// Editor.jsx
import React, { FC, useCallback, useState } from "react";
import {
	Button,
	Card,
	Form,
	Input,
	Upload,
	message,
	Select,
	Space,
	DatePicker,
} from "antd";
import {
	UploadOutlined,
	PlusOutlined,
	ArrowLeftOutlined,
} from "@ant-design/icons";
import MDEditor from "@uiw/react-md-editor";
import {
	useSaveArticleMutation,
	useUploadFileMutation,
} from "../api/editorAPI";
import { Article } from "../model/articleModel";
import { useNavigate } from "react-router-dom";
import BackButton from "@shared/ui/BackButton";
import { useSocket } from "@features/notification";
import dayjs from "dayjs";

const { Option } = Select;
const { TextArea } = Input;

const blockTypes = [
	{ value: "text", label: "Текст" },
	{ value: "image", label: "Изображение" },
	{ value: "quote", label: "Цитата" },
	{ value: "code", label: "Код" },
	{ value: "file", label: "Файл" },
];
interface EditorProps {
	article: Article;
}
const Editor: FC<EditorProps> = ({ article }) => {
	const socket = useSocket();
	const [content, setContent] = useState([]);
	const [title, setTitle] = useState("");
	const [publishAt, setPublishAt] = useState<any>();
	const [selectedType, setSelectedType] = useState("text");
	const [saveArticle] = useSaveArticleMutation();
	const [uploadFile] = useUploadFileMutation();

	const handleAddBlock = () => {
		setContent([...content, { type: selectedType, data: "" }]);
	};

	const handleUpload = async (file, blockIndex) => {
		try {
			const data = await uploadFile(file).unwrap();

			const newContent = [...content];
			newContent[blockIndex].data = data.url;
			setContent(newContent);
			message.success("Файл успешно загружен");
		} catch (error) {
			message.error("Ошибка загрузки файла");
		}
	};

	const handleSave = useCallback(async () => {
		try {
			const newArticle: any = { title, content };

			if (publishAt > dayjs()) {
				console.log(publishAt );
				newArticle.publishAt = publishAt;
				newArticle.isPublished = false;
			}

			await saveArticle(newArticle).unwrap();
			// Отправляем уведомление через сокет
			socket &&
				socket.emit("article_created", {
					title,
					description: content[0]?.data || "",
				});
		} catch (error) {
			console.error("Ошибка сохранения статьи",error);
		}
	}, [content, publishAt, saveArticle, socket, title]);

	const updateBlock = (index, newData) => {
		const newContent = [...content];
		newContent[index] = { ...newContent[index], ...newData };
		setContent(newContent);
	};

	const removeBlock = (index) => {
		setContent(content.filter((_, i) => i !== index));
	};

	const renderBlock = (block, index) => {
		switch (block.type) {
			case "text":
				return (
					<MDEditor
						value={block.data}
						onChange={(value) => updateBlock(index, { data: value })}
						height={200}
					/>
				);
			case "image":
				return (
					<Upload
						listType="picture-card"
						showUploadList={false}
						beforeUpload={(file) => {
							handleUpload(file, index);
							return false;
						}}
					>
						{block.data ? (
							<img src={block.data} alt="content" style={{ width: "100%" }} />
						) : (
							<div>
								<PlusOutlined />
								<div style={{ marginTop: 8 }}>Загрузить</div>
							</div>
						)}
					</Upload>
				);
			case "quote":
				return (
					<TextArea
						value={block.data}
						onChange={(e) => updateBlock(index, { data: e.target.value })}
						placeholder="Введите цитату"
						autoSize={{ minRows: 3 }}
					/>
				);
			case "code":
				return (
					<MDEditor
						value={block.data}
						onChange={(value) => updateBlock(index, { data: value })}
						preview="edit"
						height={200}
					/>
				);
			case "file":
				return (
					<Upload
						beforeUpload={(file) => {
							handleUpload(file, index);
							return false;
						}}
					>
						<Button icon={<UploadOutlined />}>
							{block.data ? "Файл загружен" : "Загрузить файл"}
						</Button>
					</Upload>
				);
			default:
				return null;
		}
	};

	return (
		<>
			<BackButton />
			<div style={{ padding: 24 }}>
				<Form.Item label="Заголовок статьи">
					<Input
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						placeholder="Введите заголовок"
					/>
				</Form.Item>
				<Form.Item label="Дата и время публикации">
					<DatePicker
						showTime
						onChange={(value) => {
							setPublishAt(value);
						}}
					/>
				</Form.Item>
				{content.map((block, index) => (
					<Card
						key={index}
						style={{ marginBottom: 16 }}
						title={`Блок ${index + 1} (${
							blockTypes.find((t) => t.value === block.type)?.label
						})`}
						extra={
							<Button danger onClick={() => removeBlock(index)}>
								Удалить
							</Button>
						}
					>
						{renderBlock(block, index)}
					</Card>
				))}

				<Space style={{ marginBottom: 16 }}>
					<Select
						value={selectedType}
						onChange={setSelectedType}
						style={{ width: 120 }}
					>
						{blockTypes.map((type) => (
							<Option key={type.value} value={type.value}>
								{type.label}
							</Option>
						))}
					</Select>
					<Button
						type="primary"
						icon={<PlusOutlined />}
						onClick={handleAddBlock}
					>
						Добавить блок
					</Button>
				</Space>

				<Button type="primary" onClick={handleSave} style={{ marginTop: 16 }}>
					Сохранить статью
				</Button>
			</div>
		</>
	);
};

export default Editor;
