import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getPortfolioSummary } from "../controllers/portfolioController.js";

const portfolioRouter = express.Router();

portfolioRouter.get('/summary', protect, getPortfolioSummary);

export default portfolioRouter;