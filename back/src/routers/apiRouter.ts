import express from "express";
import authRouter from "./authRouter";
import articleRouter from "./articleRouter";
import swaggerRouter from "./swaggerRouter";
import { verifyToken } from "../middlewares/authMiddleware";

const apiRouter = express.Router();

apiRouter.use(express.json());
apiRouter.use(authRouter)
apiRouter.use('/article', articleRouter)
apiRouter.use(swaggerRouter)

export default apiRouter