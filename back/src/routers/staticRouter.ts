import express from "express";

const staticRouter = express.Router();

staticRouter.get("/", (req, res) => {
	res.send("Hello World!");
});

export default staticRouter