import api from './api';

export const stocksService = {
    search: async (query) => {
        const response = await api.get(`/api/stocks/search?q=${query}`);
        return response.data;
    },

    getDetails: async (symbol) => {
        const response = await api.get(`/api/stocks/${symbol}`);
        return response.data;
    },

    searchStocks: async (query) => {
        const response = await api.get(`/api/stocks/search?q=${query}`);
        return response.data;
    },

    getWatchlist: async () => {
        const response = await api.get('/api/watchlist');
        return response.data;
    },

    addToWatchlist: async (symbol) => {
        const response = await api.post('/api/watchlist', { symbol });
        return response.data;
    },

    removeFromWatchlist: async (symbol) => {
        const response = await api.delete(`/api/watchlist/${symbol}`);
        return response.data;
    }
};