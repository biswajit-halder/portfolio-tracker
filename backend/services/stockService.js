import { NseIndia } from 'stock-nse-india';

const nseIndia = new NseIndia();

/**
 * Get current equity details (price, market cap, etc.)
 * @param {string} symbol - Stock symbol (e.g., 'RELIANCE')
 * @returns {Promise<Object>} Equity details
 */
export const getEquityDetails = async (symbol) => {
    try {
        const details = await nseIndia.getEquityDetails(symbol);
        return details;
    } catch (error) {
        throw new Error(`Failed to fetch equity details for ${symbol}: ${error.message}`);
    }
};

/**
 * Get multiple equity details in batch
 * @param {string[]} symbols - Array of stock symbols
 * @returns {Promise<Object[]>} Array of equity details
 */
export const getEquitiesBatch = async (symbols) => {
    try {
        const requests = symbols.map(symbol => nseIndia.getEquityDetails(symbol));
        const equities = await Promise.all(requests);
        return equities;
    } catch (error) {
        throw new Error(`Failed to fetch batch equity details: ${error.message}`);
    }
};

/**
 * Get historical data for a stock
 * @param {string} symbol - Stock symbol
 * @param {Object} range - Date range { start: Date, end: Date }
 * @returns {Promise<Object[]>} Historical price data
 */
export const getEquityHistoricalData = async (symbol, range) => {
    try {
        const historicalData = await nseIndia.getEquityHistoricalData(symbol, range);
        return historicalData;
    } catch (error) {
        throw new Error(`Failed to fetch historical data for ${symbol}: ${error.message}`);
    }
};

/**
 * Get intraday trading data for a stock
 * @param {string} symbol - Stock symbol
 * @returns {Promise<Object[]>} Intraday data
 */
export const getEquityIntradayData = async (symbol) => {
    try {
        const intradayData = await nseIndia.getEquityIntradayData(symbol);
        return intradayData;
    } catch (error) {
        throw new Error(`Failed to fetch intraday data for ${symbol}: ${error.message}`);
    }
};

/**
 * Get corporate information for a stock
 * @param {string} symbol - Stock symbol
 * @returns {Promise<Object>} Corporate info (promoter holding, board members, etc.)
 */
export const getEquityCorporateInfo = async (symbol) => {
    try {
        const corporateInfo = await nseIndia.getEquityCorporateInfo(symbol);
        return corporateInfo;
    } catch (error) {
        throw new Error(`Failed to fetch corporate info for ${symbol}: ${error.message}`);
    }
};

/**
 * Get trading statistics for a stock
 * @param {string} symbol - Stock symbol
 * @returns {Promise<Object>} Trade info (52 week high/low, volume, etc.)
 */
export const getEquityTradeInfo = async (symbol) => {
    try {
        const tradeInfo = await nseIndia.getEquityTradeInfo(symbol);
        return tradeInfo;
    } catch (error) {
        throw new Error(`Failed to fetch trade info for ${symbol}: ${error.message}`);
    }
};

/**
 * Get options chain data for a stock
 * @param {string} symbol - Stock symbol
 * @returns {Promise<Object>} Options chain data
 */
export const getEquityOptionChain = async (symbol) => {
    try {
        const optionChain = await nseIndia.getEquityOptionChain(symbol);
        return optionChain;
    } catch (error) {
        throw new Error(`Failed to fetch option chain for ${symbol}: ${error.message}`);
    }
};

/**
 * Get all NSE stock symbols
 * @returns {Promise<string[]>} Array of all stock symbols
 */
export const getAllStockSymbols = async () => {
    try {
        const symbols = await nseIndia.getAllStockSymbols();
        return symbols;
    } catch (error) {
        throw new Error(`Failed to fetch all stock symbols: ${error.message}`);
    }
};

/**
 * Get all market indices
 * @returns {Promise<Object[]>} Array of market indices
 */
export const getEquityStockIndices = async () => {
    try {
        const indices = await nseIndia.getEquityStockIndices();
        return indices;
    } catch (error) {
        throw new Error(`Failed to fetch stock indices: ${error.message}`);
    }
};

/**
 * Get index historical data
 * @param {string} index - Index name (e.g., 'NIFTY 50')
 * @param {Object} range - Date range { start: Date, end: Date }
 * @returns {Promise<Object[]>} Historical index data
 */
export const getIndexHistoricalData = async (index, range) => {
    try {
        const historicalData = await nseIndia.getIndexHistoricalData(index, range);
        return historicalData;
    } catch (error) {
        throw new Error(`Failed to fetch index historical data for ${index}: ${error.message}`);
    }
};

/**
 * Get index intraday data
 * @param {string} index - Index name
 * @returns {Promise<Object[]>} Intraday index data
 */
export const getIndexIntradayData = async (index) => {
    try {
        const intradayData = await nseIndia.getIndexIntradayData(index);
        return intradayData;
    } catch (error) {
        throw new Error(`Failed to fetch index intraday data for ${index}: ${error.message}`);
    }
};

/**
 * Get top gainers and losers for an index
 * @param {string} index - Index name (e.g., 'NIFTY 50')
 * @returns {Promise<Object>} Gainers and losers data
 */
export const getGainersAndLosersByIndex = async (index) => {
    try {
        const gainersLosers = await nseIndia.getGainersAndLosersByIndex(index);
        return gainersLosers;
    } catch (error) {
        throw new Error(`Failed to fetch gainers/losers for ${index}: ${error.message}`);
    }
};

/**
 * Get most actively traded equities
 * @returns {Promise<Object[]>} Most active equities
 */
export const getMostActiveEquities = async () => {
    try {
        const activeEquities = await nseIndia.getMostActiveEquities();
        return activeEquities;
    } catch (error) {
        throw new Error(`Failed to fetch most active equities: ${error.message}`);
    }
};