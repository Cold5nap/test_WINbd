import cron from "node-cron";
import { Article } from "../models/articleModel";
import { updateNotification } from "./socket";

export async function cronPublishedArticle(socket,notifications) {
	// Проверка каждую минуту
	cron.schedule("* * * * *", async () => {
		let updates = await Article.updateMany(
			{ isPublished: false, publishAt: { $lte: new Date() } },
			{ $set: { isPublished: true } }
		);
		if (updates.modifiedCount > 0) {
			console.log("Опубликовано новостей: " + updates.modifiedCount);
			updateNotification(undefined,notifications,socket)
		}
	});
}
