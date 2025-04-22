import express from "express";
import apiRouter from "./routers/apiRouter";
import staticRouter from "./routers/staticRouter";
import { connectToMongodb } from "./services/dbconnection";
import { cronPublishedNews } from "./services/cron";

const app = express();
const port = 3000;

connectToMongodb();
cronPublishedNews();

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});

app.use("/api", apiRouter);
app.use(staticRouter);
