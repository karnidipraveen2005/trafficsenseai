import axios from 'axios';
import { clearAuthSession, getToken } from './utils/auth';

const api = axios.create({
    // URL prefix since we have set up the Vite proxy for /api
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Intercept requests to add the auth token if one exists
api.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            clearAuthSession();
        }
        return Promise.reject(error);
    },
);

export default api;
