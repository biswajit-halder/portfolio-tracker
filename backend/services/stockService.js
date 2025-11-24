import YahooFinance from "yahoo-finance2";

const yahooFinance = new YahooFinance();

export const getCurrentPrice = async (symbol) => {
    try {
        const results = await yahooFinance.quote(symbol);
        return results;
    } catch (error) {
        throw new Error(`Failed to fetch stock prices: ${error.message}`);
    }
}

export const getPricesBatch = async (symbols) => {
    try {
        // const requests = symbols.map(symbol => yahooFinance.quote(symbol));
        // const prices = await Promise.all(requests);

        const prices = await yahooFinance.quote(symbols);
        return prices;
    } catch (error) {
        throw new Error(`Failed to fetch stock prices: ${error.message}`);
    }
}

export const getStockQuote = async (symbol) => {

}

export const trendingSymbols = async (region = 'US') => {
    try {
        const trending = await yahooFinance.trendingSymbols();
        console.log("api res::", trending)
        return trending;
    } catch (error) {
        throw new Error(`Failed to fetch trendings: ${error.message}`);
    }
}