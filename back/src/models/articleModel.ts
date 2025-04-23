import { Schema, model } from "mongoose";

const ArticleSchema = new Schema({
	title: { type: String, required: true },
	// text: { type: String, required: true },
	isPublished: { type: Boolean, default: true },
	publishAt: { type: Date, default: Date.now },
	content: [
		{
			type: {
				type: String,
				enum: ["text", "image", "quote", "code", "file"],
				default: "text",
			},
			data: String,
			// createdAt: Date,
		},
	],
});

export const Article = model("Article", ArticleSchema);
