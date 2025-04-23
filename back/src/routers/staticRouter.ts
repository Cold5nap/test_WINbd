import express from "express";
import { upload } from "../services/static";

const staticRouter = express.Router();

// Роут для загрузки файлов
staticRouter.post("/api/upload", upload.single("file"), (req, res) => {
	res.json({ url: `/uploads/${req.file.filename}` });
});

// Отдача статических файлов
staticRouter.use("/uploads", express.static("uploads"));

export default staticRouter;
