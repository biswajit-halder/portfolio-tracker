import Watchlist from "../models/watchlistModel.js";

export const getWatchlist = async (req, res) => {
    try {
        const watchlist = await Watchlist.find({ userId: req.user._id });

        res.json(watchlist);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const addToWatchlist = async (req, res) => {
    try {
        const { symbol } = req.body;

        const newWatchlist = await Watchlist.create({
            userId: req.user._id,
            symbol,
        });

        res.status(201).json(newWatchlist);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const deleteFromWatchlist = async (req, res) => {
    try {
        const deltedWatchlist = await Watchlist.findOneAndDelete({
            userId: req.user._id,
            symbol: req.params.symbol,
        });

        if (!deltedWatchlist) {
            res.status(404).json({
                message: "Watchlist entry not found or not authorized.",
            });
        } else {
            res.status(204).json({
                message: "Watchlist entry deleted.",
            });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
