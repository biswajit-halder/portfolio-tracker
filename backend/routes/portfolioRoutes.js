import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getPortfolioSummary, getPortfolioPerformance } from "../controllers/portfolioController.js";

const portfolioRouter = express.Router();

portfolioRouter.get('/summary', protect, getPortfolioSummary);
portfolioRouter.get('/performance', protect, getPortfolioPerformance);

export default portfolioRouter;