import mongoose from "mongoose";

const StockSymbolSchema = mongoose.Schema(
    {
        symbol: {
            type: String,
            required: true,
            uppercase: true,
            unique: true,
            index: true
        }
    },
    {
        timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" }
    }
);

export default mongoose.model("StockSymbol", StockSymbolSchema);
