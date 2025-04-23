import express from "express";
import apiRouter from "./routers/apiRouter";
import staticRouter from "./routers/staticRouter";
import { connectToMongodb } from "./services/dbconnection";
import { cronPublishedArticle } from "./services/cron";
import cors from "cors";
import morgan from 'morgan'
import { createSocket } from "./services/socket";


const app = express();
const port = 3001;


createSocket(app)
connectToMongodb();
cronPublishedArticle();

app.use(cors());

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});

app.use(morgan('combined'));
app.use("/api", apiRouter);
app.use(staticRouter);
