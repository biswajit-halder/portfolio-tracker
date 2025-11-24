import Holding from '../models/holdingModel.js'
import { getPricesBatch, trendingSymbols } from '../services/stockService.js';

export const getPortfolioSummary = async (req, res) => {
    try {
        // Total investment amount
        const holdings = await Holding.find({ userId: req.user._id });

        let totalInvestment = 0;
        if (holdings) {
            totalInvestment = holdings.reduce((acc, item) => acc += item.quantity * item.averageCostPerShare, 0);
        }

        // Current portfolio value
        const symbols = ['RELIANCE.NS', 'TCS.NS', 'INFY.NS', 'WIPRO.NS'];
        const currentPrices = await getPricesBatch(symbols)
        console.log("currentPrices", currentPrices)
        // Total gain/loss (absolute and percentage)


        // Best/worst performing holding


        // One important consideration
    } catch (error) {

    }
}