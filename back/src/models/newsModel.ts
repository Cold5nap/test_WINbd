import { Schema, model } from "mongoose";
import { hash, compare } from "bcrypt";

const NewsSchema = new Schema({
	title: { type: String, required: true },
	text: { type: String, required: true },
});



export const News = model("News", NewsSchema);
