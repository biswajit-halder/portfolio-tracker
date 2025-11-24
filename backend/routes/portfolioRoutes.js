import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getPortfolioSummary } from "../controllers/portfolioController.js";

const portfolioRouter = express.Router();

portfolioRouter.get('/', protect, getPortfolioSummary);

export default portfolioRouter;