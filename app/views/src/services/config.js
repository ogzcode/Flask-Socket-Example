import axios from 'axios';
import { getToken, setToken, removeToken } from './tokenServices';

export const request = axios.create({
    baseURL: 'http://localhost:5000',
    headers: {
        'Content-Type': 'application/json',
    }
});


export const setupInterceptors = () => {
    request.interceptors.request.use(
        (config) => {
            const token = getToken();
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    request.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            if (error.response.status === 401) {
                removeToken();
                window.location.reload();
            }
            return Promise.reject(error);
        }
    );
}