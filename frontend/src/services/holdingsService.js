import api from './api';

const validateId = (id) => {
    if (!id || typeof id !== 'string') throw new Error('Invalid ID');
    if (!/^[a-zA-Z0-9]+$/.test(id)) throw new Error('Invalid ID format');
    return id;
};

export const holdingsService = {
    getAll: async () => {
        const response = await api.get('/api/holdings');
        return response.data;
    },

    getById: async (id) => {
        const validId = validateId(id);
        const response = await api.get(`/api/holdings/${validId}`);
        return response.data;
    },

    create: async (holdingData) => {
        const response = await api.post('/api/holdings', holdingData);
        return response.data;
    },

    update: async (id, holdingData) => {
        const validId = validateId(id);
        const response = await api.put(`/api/holdings/${validId}`, holdingData);
        return response.data;
    },

    delete: async (id) => {
        const validId = validateId(id);
        const response = await api.delete(`/api/holdings/${validId}`);
        return response.data;
    }
};