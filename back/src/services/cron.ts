import cron from "node-cron";
import { Article } from "../models/articleModel";

export async function cronPublishedArticle() {
	// Проверка каждую минуту
	cron.schedule("* * * * *", async () => {
		let updates = await Article.updateMany(
			{ isPublished: false, publishAt: { $lte: new Date() } },
			{ $set: { isPublished: true } }
		);
		if (updates.modifiedCount > 0) {
			console.log("Опубликовано новостей: " + updates.modifiedCount);
		}
	});
}
