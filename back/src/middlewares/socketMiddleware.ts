import { Config } from "../config";
import jwt from "jsonwebtoken";

export const verifyTokenSocket = (socket, next) => {
	const token = socket.handshake.auth.token;
	jwt.verify(token, Config.secret, (err, decoded) => {
		if (err) next(new Error("Authentication error"));
		next();
	});
};
