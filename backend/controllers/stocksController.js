import { getEquityDetails } from "../services/stockService";

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
                totalTradedVolume: stockDetails.tradeInfo.totalTradedVolume,
                totalTradedValue: stockDetails.tradeInfo.totalTradedValue,
                weekHigh: stockDetails.priceInfo.weekHighLow.max,
                weekLow: stockDetails.priceInfo.weekHighLow.min,
                pe: stockDetails.metadata.pdSymbolPe,
                marketCap: stockDetails.tradeInfo.totalMarketCap,
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
