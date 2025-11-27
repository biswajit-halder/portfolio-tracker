export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: '/api/auth/login',
        REGISTER: '/api/auth/register',
        REFRESH: '/api/auth/refresh'
    },
    PORTFOLIO: {
        SUMMARY: '/api/portfolio/summary',
        PERFORMANCE: '/api/portfolio/performance'
    },
    HOLDINGS: {
        LIST: '/api/holdings',
        CREATE: '/api/holdings',
        UPDATE: (id) => `/api/holdings/${id}`,
        DELETE: (id) => `/api/holdings/${id}`
    },
    TRANSACTIONS: {
        LIST: '/api/transactions',
        CREATE: '/api/transactions',
        DELETE: (id) => `/api/transactions/${id}`
    },
    STOCKS: {
        SEARCH: '/api/stocks/search',
        DETAILS: (symbol) => `/api/stocks/${symbol}`
    },
    WATCHLIST: {
        LIST: '/api/watchlist',
        ADD: '/api/watchlist',
        REMOVE: (symbol) => `/api/watchlist/${symbol}`
    },
    USER: {
        PROFILE: '/api/user/profile',
        PASSWORD: '/api/user/password',
        PREFERENCES: '/api/user/preferences'
    }
};

export const TRANSACTION_TYPES = {
    BUY: 'buy',
    SELL: 'sell'
};

export const CURRENCIES = {
    INR: 'INR',
    USD: 'USD',
    EUR: 'EUR'
};

export const THEMES = {
    LIGHT: 'light',
    DARK: 'dark',
    AUTO: 'auto'
};