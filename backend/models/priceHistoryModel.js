import mongoose from "mongoose";

const PriceHistorySchema = mongoose.Schema({
    symbol: {
        type: String,
        required: true,
        uppercase: true,
        unique: true
    },
    currentPrice: {
        type: Number,
        required: true,
        min: 0
    },
    previousClose: {
        type: Number,
        required: true,
        min: 0
    },
    open: {
        type: Number,
        required: true,
        min: 0
    },
    high: {
        type: Number,
        required: true,
        min: 0
    },
    low: {
        type: Number,
        required: true,
        min: 0
    },
    volume: {
        type: Number,
        required: true,
        min: 0
    }
}, {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" }
});

export default mongoose.model('PriceHistory', PriceHistorySchema);