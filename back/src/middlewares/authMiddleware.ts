import jwt from "jsonwebtoken";
import { Config } from "../config";

export function verifyToken(req, res, next) {
	const token = req.headers["token"];
	if (!token)
		return res
			.status(401)
			.json({ message: "Необходима авторизация" });

	jwt.verify(token, Config.secret, (err, decoded) => {
		if (err) return res.status(401).json({ message: "Неверный токен авторизации" });
		req.user = decoded;
		next();
	});
}
