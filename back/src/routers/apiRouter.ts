import express from "express";
import authRouter from "./authRouter";
import newsRouter from "./newsRouter";
import swaggerRouter from "./swaggerRouter";
import { verifyToken } from "../middlewares/authMiddleware";

const apiRouter = express.Router();

apiRouter.use(express.json());
apiRouter.use(authRouter)
apiRouter.use('/news', newsRouter)
apiRouter.use(swaggerRouter)

export default apiRouter