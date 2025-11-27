import api from './api';

export const transactionsService = {
    getAll: async (filters = {}) => {
        const params = new URLSearchParams();
        if (filters.symbol) params.append('symbol', filters.symbol);
        if (filters.type) params.append('type', filters.type);
        if (filters.startDate) params.append('startDate', filters.startDate);
        if (filters.endDate) params.append('endDate', filters.endDate);
        
        const response = await api.get(`/api/transactions?${params.toString()}`);
        return response.data;
    },

    create: async (transactionData) => {
        const response = await api.post('/api/transactions', transactionData);
        return response.data;
    },

    delete: async (id) => {
        const response = await api.delete(`/api/transactions/${id}`);
        return response.data;
    }
};