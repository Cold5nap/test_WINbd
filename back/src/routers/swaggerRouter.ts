import express from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerRouter = express.Router();
const swaggerOptions = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "test winbd",
			version: "1.0.0",
			description: "Создание новостей, авторизация по токену",
		},
		servers: [{ url: "http://localhost:3000" }],
	},
	apis: ['./src/docs/**/*.yaml'], // Path to the API docs (adjust as needed)
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);
swaggerRouter.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default swaggerRouter;
