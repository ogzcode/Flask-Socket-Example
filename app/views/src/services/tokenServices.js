export const getToken = () => {
    return JSON.parse(localStorage.getItem('chat-token'))
}

export const setToken = (token) => {
    localStorage.setItem('chat-token', JSON.stringify(token));
}

export const removeToken = () => {
    localStorage.removeItem('chat-token');
}

export const getAuthenticatedUser = () => {
    return JSON.parse(localStorage.getItem('chat-user'));
}

export const setAuthenticatedUser = (user) => {
    localStorage.setItem('chat-user', JSON.stringify(user));
}

export const removeAuthenticatedUser = () => {
    localStorage.removeItem('chat-user');
}

