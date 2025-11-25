import { connectDB } from "../config/db.js";
import Stocks from "../models/stocksModel.js";
import StockSymbol from "../models/stockSymbolModel.js";
import { getEquityDetails } from "../services/stockService.js";

const BATCH_SIZE = 10; // Process 10 at a time
const DELAY_BETWEEN_BATCHES = 1000; // 1 second delay between batches

try {
    await connectDB();
    const symbols = await StockSymbol.find({}).select("symbol -_id");

    for (let i = 0; i < symbols.length; i += BATCH_SIZE) {
        const batch = symbols.slice(i, i + BATCH_SIZE);

        const promises = batch.map(async ({ symbol }) => {
            try {
                const stockDetails = await getEquityDetails(symbol);

                if (!stockDetails.error) {
                    const filter = { symbol };
                    const update = {
                        companyName: stockDetails.info.companyName,
                        industry: stockDetails.info.industry,
                        sector: stockDetails.industryInfo.sector,
                        isin: stockDetails.info.isin,
                        status: stockDetails.metadata.status,
                        listingDate: stockDetails.info.listingDate,
                    };
                    const options = {
                        new: true,
                        upsert: true,
                        setDefaultsOnInsert: true,
                    };

                    const newStockDetails = await Stocks.findOneAndUpdate(
                        filter,
                        update,
                        options
                    );

                    console.log(`Synced: ${newStockDetails.symbol}`);
                } else {
                    console.log(`Details not found for: ${symbol}`);
                }
            } catch (error) {
                console.error(`Error syncing ${symbol}:`, error.message);
            }
        });

        await Promise.all(promises);

        // Delay between batches to avoid rate limiting
        if (i + BATCH_SIZE < symbols.length) {
            await new Promise((resolve) =>
                setTimeout(resolve, DELAY_BETWEEN_BATCHES)
            );
        }
    }

    console.log("Stock details sync completed!");
    process.exit(0);
} catch (error) {
    console.error("Error ::", error.message);
    process.exit(1);
}
