import { User } from "../models/userModel";
import express from "express";
import jwt from 'jsonwebtoken';
import { Config } from "../config";

const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
	const { login, password } = req.body;
	const newUser = await User.create({ login, password });
	res.json({ message: "Успешно авторизирован.", newUser });
});

authRouter.post("/login", async (req, res) => {
	const { login, password } = req.body;
	const user = await User.findOne({ login });
	const message = "Неверный логин или пароль";
	if (!user) {
		return res.status(401).json({ message });
	}
	const isMatch = await user.comparePassword(password);
	if (!isMatch) {
		return res.status(401).json({ message });
	}
	const token = jwt.sign({ userId: user.id }, Config.secret, { expiresIn: '1h' });
	res.json({ message: "Успешно авторизирован.", token });
});

export default authRouter;
