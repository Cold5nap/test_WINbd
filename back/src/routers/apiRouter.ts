import express from "express";
import authRouter from "./authRouter";
import newsRouter from "./newsRouter";
import swaggerRouter from "./swaggerRouter";
import { verifyToken } from "../middlewares/authMiddleware";

const apiRouter = express.Router();

// Валидация по токену
newsRouter.use(verifyToken)

apiRouter.use(authRouter)
apiRouter.use(newsRouter)
apiRouter.use(swaggerRouter)

export default apiRouter