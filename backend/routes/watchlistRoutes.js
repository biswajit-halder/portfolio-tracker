import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { addToWatchlist, deleteFromWatchlist, getWatchlist } from "../controllers/watchlistController.js";

const watchlistRouter = express.Router();

watchlistRouter.get("/", protect, getWatchlist);

watchlistRouter.post("/", protect, addToWatchlist);

watchlistRouter.delete("/:symbol", protect, deleteFromWatchlist);

export default watchlistRouter;
