import express from "express";
import { getStockDetailsBySymbol, searchStocks } from "../controllers/stocksController.js";
import { protect } from "../middleware/authMiddleware.js";

const stocksRouter = express.Router();

stocksRouter.get("/search", protect, searchStocks);
stocksRouter.get("/:symbol", protect, getStockDetailsBySymbol);

export default stocksRouter;