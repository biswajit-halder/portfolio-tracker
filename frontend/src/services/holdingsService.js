import api from './api';

export const holdingsService = {
    getAll: async () => {
        const response = await api.get('/api/holdings');
        return response.data;
    },

    getById: async (id) => {
        const response = await api.get(`/api/holdings/${id}`);
        return response.data;
    },

    create: async (holdingData) => {
        const response = await api.post('/api/holdings', holdingData);
        return response.data;
    },

    update: async (id, holdingData) => {
        const response = await api.put(`/api/holdings/${id}`, holdingData);
        return response.data;
    },

    delete: async (id) => {
        const response = await api.delete(`/api/holdings/${id}`);
        return response.data;
    }
};