import express from "express";
import { addHolding, deleteHolding, getHoldingById, getUserHoldings, updateHolding } from "../controllers/holdingsController.js";
import { protect } from "../middleware/authMiddleware.js";

const holdingsRouter = express.Router();

holdingsRouter.get("/", protect, getUserHoldings);

holdingsRouter.post("/", protect, addHolding);

holdingsRouter.put("/:id", protect, updateHolding);

holdingsRouter.delete("/:id", protect, deleteHolding);

holdingsRouter.get("/:id", protect, getHoldingById);

export default holdingsRouter;
