import Holding from "../models/holdingModel.js";
import Transaction from "../models/transactionModel.js";

export const getUserHoldings = async (req, res) => {
    try {
        const holdings = await Holding.find({ userId: req.user._id }).sort({
            updatedAt: -1,
        });

        res.json(holdings);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const addHolding = async (req, res) => {
    try {
        const { symbol, quantity, averageCostPerShare } = req.body;

        const newHolding = await Holding.create({
            userId: req.user._id,
            symbol,
            quantity,
            averageCostPerShare,
            purchaseDate: new Date().toISOString(),
        });

        // Create corresponding BUY transaction
        await Transaction.create({
            userId: req.user._id,
            symbol,
            type: "BUY",
            quantity,
            pricePerShare: averageCostPerShare,
            totalAmount: quantity * averageCostPerShare,
            transactionDate: new Date().toISOString()
        });

        res.status(201).json(newHolding);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const updateHolding = async (req, res) => {
    try {
        const holding = await Holding.findOne({
            _id: req.params.id,
            userId: req.user._id,
        });

        if (!holding) {
            return res.status(404).json({ message: "holding not found" });
        }

        Object.assign(holding, req.body);

        const updatedHolding = await holding.save();

        res.json(updatedHolding);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const deleteHolding = async (req, res) => {
    try {
        const holding = await Holding.findOne({
            _id: req.params.id,
            userId: req.user._id,
        });

        if (!holding) {
            return res.status(404).json({ message: "holding not found" });
        }

        const deltedHolding = await Holding.findOneAndDelete({
            _id: req.params.id,
            userId: req.user._id,
        });

        if (!deltedHolding) {
            res.status(404).json({
                message: "Holding not found or not authorized.",
            });
        } else {
            res.status(204).json({
                message: "Holding deleted.",
            });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const getHoldingById = async (req, res) => {
    try {
        const holding = await Holding.findOne({
            _id: req.params.id,
            userId: req.user._id,
        });

        if (!holding) {
            return res.status(404).json({ message: "holding not found" });
        }

        res.json(holding);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
