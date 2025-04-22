import mongoose from "mongoose";
import { Config } from "../config";

// Подключение к MongoDB

// Подключение к MongoDB
export function connectToMongodb() {
	mongoose
		.connect(Config.mongodbURI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then(() => console.log("📡 Connected to MongoDB"))
		.catch((err) => console.error("❌ MongoDB connection error:", err));
}
