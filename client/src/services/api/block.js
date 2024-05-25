import { request } from "../config";

export const blockUser = async (data) => {
    return await request.post(`/blockUser`, data);
}

export const unblockUser = async (data) => {
    return await request.post(`/unBlockUser`, data);
}

export const getBlockedUsers = async () => {
    return await request.get(`/getBlockedUsers`);
}