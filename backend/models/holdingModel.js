import mongoose from "mongoose";

const HoldingSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    symbol: {
        type: String,
        required: true,
        uppercase: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 0
    },
    averageCostPerShare: {
        type: Number,
        required: true,
        min: 0
    },
    purchaseDate: {
        type: Date,
        required: true
    },
    notes: {
        type: String,
        required: false
    }
}, {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" }
});

export default mongoose.model('Holding', HoldingSchema);