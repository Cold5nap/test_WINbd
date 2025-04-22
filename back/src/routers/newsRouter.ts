import express from "express";
import { News } from "../models/newsModel";
import { verifyToken } from "../middlewares/authMiddleware";

const newsRouter = express.Router();
const path = "";
const idParam = "/:id";
const pathWithID = path + idParam;

newsRouter.use(verifyToken);

//отложенная публикация
// newsRouter.post('/delayed', async (req, res) => {
// 	const news = await News.create(req.body);
// 	res.json(news);
// });

newsRouter.get(path, async (req, res) => {
	const news = await News.find();
	res.json(news);
});

newsRouter.get(pathWithID, async (req, res) => {
	const news = await News.findById(req.params.id);
	res.json(news);
});

newsRouter.post(path, async (req, res) => {
	// const { title, text } = req.body;
	const news = await News.create(req.body);
	res.json({ message: "Успешно добавлено", news });
});

newsRouter.put(pathWithID, async (req, res) => {
	const news = await News.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	});
	res.json({ message: "Успешно обновлено", news });
});
newsRouter.delete(pathWithID, async (req, res) => {
	await News.findByIdAndDelete(req.params.id);
	res.json({ message: "Успешно удалено" });
});
export default newsRouter;
