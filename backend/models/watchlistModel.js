import mongoose from "mongoose";

const WatchlistSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    symbol: {
        type: String,
        required: true,
        uppercase: true
    }
}, {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" }
});

// Ensure a user can't add the same symbol twice
WatchlistSchema.index({ userId: 1, symbol: 1 }, { unique: true });

export default mongoose.model('Watchlist', WatchlistSchema);