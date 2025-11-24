import Holding from '../models/holdingModel.js'
import { getEquitiesBatch } from '../services/stockService.js';

export const getPortfolioSummary = async (req, res) => {
    try {
        // Fetch all holdings for the user
        const holdings = await Holding.find({ userId: req.user._id });

        if (!holdings || holdings.length === 0) {
            return res.status(200).json({
                totalInvestment: 0,
                currentPortfolioValue: 0,
                totalGainLoss: 0,
                totalGainLossPercentage: 0,
                bestPerformer: null,
                worstPerformer: null,
                assetAllocation: []
            });
        }

        // Calculate total investment amount
        let totalInvestment = 0;
        totalInvestment = holdings.reduce((acc, item) => acc + (item.quantity * item.averageCostPerShare), 0);

        // Get current prices for all symbols
        const symbols = holdings.map(holding => holding.symbol);
        const currentStocksInfo = await getEquitiesBatch(symbols);

        // Create a map of quantities by symbol for easy lookup
        const quantitiesMap = {};
        holdings.forEach(holding => {
            quantitiesMap[holding.symbol] = holding.quantity;
        });

        // Create a map of average costs by symbol
        const averageCostMap = {};
        holdings.forEach(holding => {
            averageCostMap[holding.symbol] = holding.averageCostPerShare;
        });

        // Calculate current portfolio value and individual holding metrics
        let currentPortfolioValue = 0;
        const holdingMetrics = [];

        currentStocksInfo.forEach(stockInfo => {
            if (stockInfo && stockInfo.priceInfo && stockInfo.priceInfo.lastPrice) {
                const symbol = stockInfo.info.symbol;
                const lastPrice = stockInfo.priceInfo.lastPrice;
                const quantity = quantitiesMap[symbol];
                const averageCost = averageCostMap[symbol];

                if (quantity && averageCost) {
                    const investmentAmount = quantity * averageCost;
                    const currentValue = quantity * lastPrice;
                    const gainLoss = currentValue - investmentAmount;
                    const gainLossPercentage = (gainLoss / investmentAmount) * 100;

                    currentPortfolioValue += currentValue;

                    holdingMetrics.push({
                        symbol,
                        quantity,
                        averageCost,
                        currentPrice: lastPrice,
                        investmentAmount,
                        currentValue,
                        gainLoss,
                        gainLossPercentage
                    });
                }
            }
        });

        // Calculate total gain/loss
        const totalGainLoss = currentPortfolioValue - totalInvestment;
        const totalGainLossPercentage = totalInvestment > 0 ? (totalGainLoss / totalInvestment) * 100 : 0;

        // Find best and worst performing holdings
        let bestPerformer = null;
        let worstPerformer = null;

        if (holdingMetrics.length > 0) {
            bestPerformer = holdingMetrics.reduce((prev, current) =>
                current.gainLossPercentage > prev.gainLossPercentage ? current : prev
            );

            worstPerformer = holdingMetrics.reduce((prev, current) =>
                current.gainLossPercentage < prev.gainLossPercentage ? current : prev
            );
        }

        // Calculate asset allocation (percentage of each holding in total portfolio)
        const assetAllocation = holdingMetrics.map(metric => ({
            symbol: metric.symbol,
            value: metric.currentValue,
            percentage: currentPortfolioValue > 0 ? (metric.currentValue / currentPortfolioValue) * 100 : 0
        }));

        res.status(200).json({
            totalInvestment: parseFloat(totalInvestment.toFixed(2)),
            currentPortfolioValue: parseFloat(currentPortfolioValue.toFixed(2)),
            totalGainLoss: parseFloat(totalGainLoss.toFixed(2)),
            totalGainLossPercentage: parseFloat(totalGainLossPercentage.toFixed(2)),
            bestPerformer: bestPerformer ? {
                symbol: bestPerformer.symbol,
                gainLossPercentage: parseFloat(bestPerformer.gainLossPercentage.toFixed(2)),
                gainLoss: parseFloat(bestPerformer.gainLoss.toFixed(2))
            } : null,
            worstPerformer: worstPerformer ? {
                symbol: worstPerformer.symbol,
                gainLossPercentage: parseFloat(worstPerformer.gainLossPercentage.toFixed(2)),
                gainLoss: parseFloat(worstPerformer.gainLoss.toFixed(2))
            } : null,
            assetAllocation
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};