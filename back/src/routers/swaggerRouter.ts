import express from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerRouter = express.Router();
const swaggerOptions = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "NEWS",
			version: "1.0.0",
			description: "Создание новостей, авторизация по токену",
		},
		servers: [{ url: "http://localhost:3000" }],
	},
	apis: ["./routers/*.ts"], // Path to the API docs (adjust as needed)
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);
swaggerRouter.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default swaggerRouter;
