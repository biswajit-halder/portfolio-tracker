import { getEquityDetails, getEquitiesBatch } from "../services/stockService.js";
import StockSymbol from "../models/stockSymbolModel.js";

export const getStockDetailsBySymbol = async (req, res) => {
    try {
        const stockDetails = await getEquityDetails(req.params.symbol);

        if (!stockDetails.error) {
            res.status(200).json({
                symbol: stockDetails.info.symbol,
                companyName: stockDetails.info.companyName,
                industry: stockDetails.info.industry,
                sector: stockDetails.industryInfo.sector,
                currentPrice: stockDetails.priceInfo.lastPrice,
                open: stockDetails.priceInfo.open,
                high: stockDetails.priceInfo.intraDayHighLow.max,
                low: stockDetails.priceInfo.intraDayHighLow.min,
                previousClose: stockDetails.priceInfo.previousClose,
                change: stockDetails.priceInfo.change,
                changePercent: stockDetails.priceInfo.pChange,
                totalTradedVolume: stockDetails.tradeInfo?.totalTradedVolume,
                totalTradedValue: stockDetails.tradeInfo?.totalTradedValue,
                weekHigh: stockDetails.priceInfo.weekHighLow.max,
                weekLow: stockDetails.priceInfo.weekHighLow.min,
                pe: stockDetails.metadata.pdSymbolPe,
                marketCap: stockDetails.tradeInfo?.totalMarketCap,
                isin: stockDetails.info.isin,
                listingDate: stockDetails.info.listingDate,
                status: stockDetails.metadata.status,
                lowerCircuit: stockDetails.priceInfo.lowerCP,
                upperCircuit: stockDetails.priceInfo.upperCP,
            });
        } else {
            res.status(404).json({ message: "No stocks found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const searchStocks = async (req, res) => {
    try {
        const { q } = req.query;

        if (!q || q.trim().length < 2) {
            return res.status(400).json({ message: "Query must be at least 2 characters" });
        }

        const stocks = await StockSymbol.find({
            $or: [
                { symbol: { $regex: q, $options: 'i' } },
                { companyName: { $regex: q, $options: 'i' } }
            ]
        }).limit(10);

        const symbols = stocks.map(stock => stock.symbol);
        const stocksDetails = await getEquitiesBatch(symbols);

        const stocksWithDetails = stocksDetails.map(stockDetails => ({
            symbol: stockDetails.info.symbol,
            companyName: stockDetails.info.companyName,
            industry: stockDetails.info.industry,
            sector: stockDetails.industryInfo.sector,
            currentPrice: stockDetails.priceInfo.lastPrice,
            change: stockDetails.priceInfo.change,
            changePercent: stockDetails.priceInfo.pChange
        }));

        res.status(200).json(stocksWithDetails);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
