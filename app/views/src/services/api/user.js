import { request } from "../config.js";

export const getContactedUser = async () => {
    return await request.get(`/getContactedUsers`);
}; 

export const getAllUsers = async (searchQuery) => {
    return await request.get(`/getAllUsers` , { params: { search: searchQuery } }    
    );
}