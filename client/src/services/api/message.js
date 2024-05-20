import { request } from "../config";

export const deleteChat = async (room_id) => {
    return await request.delete('/deleteChat?room_id=' + room_id);
}