import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { addTransaction, deleteTransaction, getAllTransactions } from "../controllers/transactionsController.js";

const transactionRouter = express.Router();

transactionRouter.get('/', protect, getAllTransactions);

transactionRouter.post('/', protect, addTransaction);

transactionRouter.delete('/:id', protect, deleteTransaction);

export default transactionRouter;
