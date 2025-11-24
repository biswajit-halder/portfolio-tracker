import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { addTransaction, deleteTransaction, getAllTransactions } from "../controllers/transactionsController.js";

const transactionsRouter = express.Router();

transactionsRouter.get('/', protect, getAllTransactions);

transactionsRouter.post('/', protect, addTransaction);

transactionsRouter.delete('/:id', protect, deleteTransaction);

export default transactionsRouter;
