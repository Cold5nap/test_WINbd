import express from "express";
import { Article } from "../models/articleModel";
import { verifyToken } from "../middlewares/authMiddleware";

const articleRouter = express.Router();
const path = "";
const idParam = "/:id";
const pathWithID = path + idParam;

articleRouter.use(verifyToken);


articleRouter.get(path, async (req, res) => {
	const article = await Article.find().sort({ publishAt: -1 }).exec();
	res.json(article);
});

articleRouter.get(pathWithID, async (req, res) => {
	const article = await Article.findById(req.params.id);
	res.json(article);
});

articleRouter.post(path, async (req, res) => {
	// const { title, text } = req.body;
	const article = await Article.create(req.body);
	res.json({ message: "Успешно добавлено", article });
});

articleRouter.put(pathWithID, async (req, res) => {
	const article = await Article.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	});
	res.json({ message: "Успешно обновлено", article });
});
articleRouter.delete(pathWithID, async (req, res) => {
	await Article.findByIdAndDelete(req.params.id);
	res.json({ message: "Успешно удалено" });
});
export default articleRouter;
