import express from "express";
import apiRouter from "./routers/apiRouter";
import staticRouter from "./routers/staticRouter";
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const app = express();
const port = 3000;

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});

app.use("/api", apiRouter);
app.use(staticRouter);
