import { request } from "../config";

export const login = async (email, password) => {
    return await request.post('/login', { email, password });
}

export const register = async (email, password, username ) => {
    return await request.post('/register', { email, password, username });
}