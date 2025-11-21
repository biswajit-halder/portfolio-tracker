import express from "express";
import { addHolding, deleteHolding, getHoldingById, getUserHoldings, updateHolding } from "../controllers/holdingsController.js";
import { protect } from "../middleware/authMiddleware.js";

const holdingRouter = express.Router();

holdingRouter.get("/", protect, getUserHoldings);

holdingRouter.post("/", protect, addHolding);

holdingRouter.put("/:id", protect, updateHolding);

holdingRouter.delete("/:id", protect, deleteHolding);

holdingRouter.get("/:id", protect, getHoldingById);

export default holdingRouter;
