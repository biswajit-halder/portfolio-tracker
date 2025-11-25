import mongoose from "mongoose";

const StocksSchema = mongoose.Schema(
    {
        symbol: {
            type: String,
            required: true,
            uppercase: true,
            unique: true
        },
        companyName: {
            type: String,
            required: true
        },
        industry: {
            type: String,
            required: true
        },
        sector: {
            type: String,
            required: true
        },
        isin: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true
        },
        listingDate: {
            type: Date,
            required: true
        }
    },
    {
        timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" }
    }
);

// Add text index for fast searching
StocksSchema.index({ symbol: 1, companyName: 1 });
StocksSchema.index({ companyName: "text", symbol: "text" });

export default mongoose.model("Stocks", StocksSchema);
