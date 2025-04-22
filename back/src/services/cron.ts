import cron from "node-cron";
import { News } from "../models/newsModel";

export async function cronPublishedNews() {
	// Проверка каждую минуту
	cron.schedule("* * * * *", async () => {
		let updates = await News.updateMany(
			{ isPublished: false, publishAt: { $lte: new Date() } },
			{ $set: { isPublished: true } }
		);
		if (updates.modifiedCount > 0) {
			console.log("Опубликовано новостей: " + updates.modifiedCount);
		}
	});
}
