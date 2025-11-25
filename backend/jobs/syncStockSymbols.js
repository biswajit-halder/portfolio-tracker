import { connectDB } from "../config/db.js";
import StockSymbol from "../models/stockSymbolModel.js";
import { getAllStockSymbols } from "../services/stockService.js";

try {
    await connectDB();
    const symbols = await getAllStockSymbols();

    if (Array.isArray(symbols)) {
        for (let symbol of symbols) {
            const filter = { symbol };
            const update = {
                symbol,
            };
            const options = {
                new: true,
                upsert: true,
                setDefaultsOnInsert: true,
            };

            const newStockSymbol = await StockSymbol.findOneAndUpdate(
                filter,
                update,
                options
            );

            console.log(`Synced: ${newStockSymbol.symbol}`);
        }
        console.log("Stock symbols sync completed!");
    }
    process.exit(0); // Exit with success
} catch (error) {
    console.error("Error ::", error.message);
    process.exit(1); // Exit with error
}
