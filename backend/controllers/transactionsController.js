import Transaction from "../models/transactionModel.js";

export const getAllTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find({
            userId: req.user._id,
        }).sort({
            updatedAt: -1,
        });

        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const addTransaction = async (req, res) => {
    try {
        const { symbol, type, quantity, pricePerShare } = req.body;

        const newTransaction = await Transaction.create({
            userId: req.user._id,
            symbol,
            type,
            quantity,
            pricePerShare,
            transactionDate: new Date().toISOString(),
        });

        res.status(201).json(newTransaction);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const deleteTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findOne({
            _id: req.params.id,
            userId: req.user._id,
        });

        if (!transaction) {
            return res.status(404).json({ message: "Transaction not found" });
        }

        const deletedTransaction = await Transaction.findOneAndDelete({
            _id: req.params.id,
            userId: req.user._id,
        });

        if (!deletedTransaction) {
            res.status(404).json({
                message: "Transaction not found or not authorized.",
            });
        } else {
            res.status(204).json({
                message: "Transaction deleted.",
            });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
