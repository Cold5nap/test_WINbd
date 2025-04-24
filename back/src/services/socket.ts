import {createServer} from "http";
import { Server } from "socket.io";
import { verifyTokenSocket } from "../middlewares/socketMiddleware";

export function updateNotification(article,notifications,io) {
	const notification = {
		id: Date.now(),
		type: "article_updated",
		title: article?`Обновлена статья: ${article.title}`:'Опубликована новая новость, обновите ленту',
		message: `Статья была изменена`,
		timestamp: new Date(),
		read: false,
	};

	notifications.unshift(notification);
	io.emit("new_notification", notification);
}

export function createSocket(app) {
	const server = createServer(app);
	const io = new Server(server, {
		cors: {
			origin: "http://localhost:3000",
			methods: ["GET", "POST"],
		},
	});

	const notifications = []; // Хранилище уведомлений (в реальном проекте использовать БД)
	io.use(verifyTokenSocket); // Middleware для проверки аутентификации

	io.on("connection", (socket) => {
		console.log("New client connected");

		// Отправляем историю уведомлений при подключении
		socket.emit("notifications", notifications);

		// Обработчик создания новой статьи
		socket.on("article_created", (article) => {
			const notification = {
				id: Date.now(),
				type: "new_article",
				title: `Новая статья: ${article.title}`,
				message: article.description.substring(0, 100) + "...",
				timestamp: new Date(),
				read: false,
			};

			notifications.unshift(notification); // Добавляем в начало
			if (notifications.length > 50) notifications.pop(); // Ограничиваем историю

			// Рассылаем всем подключенным клиентам
			console.log('Рассылка уведомлений',notification)
			io.emit("new_notification", notification);
		});

		// Обработчик обновления статьи
		socket.on("article_updated", (article) => {
			updateNotification(article,notifications,io)
		});

		socket.on("disconnect", () => {
			console.log("Client disconnected");
		});
	});
	server.listen(3002, () => {
		console.log('Server listening on port 3002');
	});
	return [io,notifications]
}
