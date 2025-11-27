import mongoose from 'mongoose';

const priceAlertSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    symbol: {
        type: String,
        required: true
    },
    targetPrice: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        enum: ['above', 'below'],
        required: true
    },
    currentPrice: {
        type: Number,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    triggered: {
        type: Boolean,
        default: false
    },
    triggeredAt: {
        type: Date
    }
}, {
    timestamps: true
});

export default mongoose.model('PriceAlert', priceAlertSchema);