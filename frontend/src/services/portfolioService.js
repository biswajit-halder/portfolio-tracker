import api from './api';

export const portfolioService = {
    getSummary: async () => {
        const response = await api.get('/api/portfolio/summary');
        return response.data;
    },

    getPerformance: async () => {
        const response = await api.get('/api/portfolio/performance');
        return response.data;
    }
};