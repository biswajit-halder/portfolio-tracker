import mongoose from "mongoose";

const StocksSchema = mongoose.Schema(
    {
        symbol: {
            type: String,
            required: true,
            uppercase: true,
            unique: true,
        },
        companyName: {
            type: String,
            required: true,
        },
        industry: {
            type: String,
            required: true,
        },
        sector: {
            type: String,
            required: true,
        },
        isin: {
            type: String,
            required: true,
        },
        status: {
            type: String,
        },
        listingDate: {
            type: Date,
            required: true,
        },
    },
    {
        timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
    }
);

StocksSchema.index({ symbol: 1 }, { unique: true });

export default mongoose.model("Stocks", StocksSchema);
