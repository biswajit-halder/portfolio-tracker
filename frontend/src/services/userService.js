import api from './api';

export const userService = {
    updateProfile: async (profileData) => {
        const response = await api.put('/user/profile', profileData);
        return response.data;
    },

    changePassword: async (passwordData) => {
        const response = await api.put('/user/password', passwordData);
        return response.data;
    },

    updatePreferences: async (preferences) => {
        const response = await api.put('/user/preferences', preferences);
        return response.data;
    },

    getProfile: async () => {
        const response = await api.get('/user/profile');
        return response.data;
    },

    deleteAccount: async () => {
        const response = await api.delete('/user/account');
        return response.data;
    }
};