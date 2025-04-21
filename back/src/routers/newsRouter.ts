import { User } from "../models/userModel";
import express from "express";
import jwt from "jsonwebtoken";
import { Config } from "../config";
import { News } from "../models/newsModel";

const newsRouter = express.Router();
const path = "/news";
const idParam = '/:id'
const pathWithID = path + idParam

newsRouter.get(path, async (req, res) => {
	const news = await News.find()
	res.json(news)

});
newsRouter.get(pathWithID, async (req, res) => {
	const news = await News.findById(req.params.id)
	res.json(news)
});
newsRouter.post(path, async (req, res) => {
	const { title, text } = req.body;
	const news = await News.create({ title, text });
	res.json({ message: "Успешно добавлено", news });
});
newsRouter.put(path, async (req, res) => {
	const news = await News.findByIdAndUpdate(req.body._id)
	res.json({message:'Успешно обновлено',news})
});
newsRouter.delete(pathWithID, async (req, res) => {
	await News.findByIdAndDelete(req.params.id)
	res.json({message:'Успешно удалено'})
});

export default newsRouter;
