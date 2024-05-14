import { request } from "../config";

export const login = async (data) => {
    return await request.post('/login', data);
}

export const register = async (data) => {
    return await request.post('/register', data);
}

export const checkAuth = async () => {
    return await request.get('/checkAuth');
}