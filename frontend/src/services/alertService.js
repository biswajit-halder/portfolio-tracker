import api from './api';

export const alertService = {
    createAlert: async (alertData) => {
        const response = await api.post('/alerts', alertData);
        return response.data;
    },

    getAlerts: async () => {
        const response = await api.get('/alerts');
        return response.data;
    },

    deleteAlert: async (alertId) => {
        const response = await api.delete(`/alerts/${alertId}`);
        return response.data;
    }
};