import api from './api';

export const stocksService = {
    search: async (query) => {
        const response = await api.get(`/api/stocks/search?q=${query}`);
        return response.data;
    },

    getDetails: async (symbol) => {
        const response = await api.get(`/api/stocks/${symbol}`);
        return response.data;
    }
};