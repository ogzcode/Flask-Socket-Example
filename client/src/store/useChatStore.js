import { create } from 'zustand';

export const useChatStore = create((set) => ({
    selectedUser: null,
    roomId: null,
    updateSelectedUser: (user) => set({ selectedUser: user }),
    updateRoomId: (roomId) => set({ roomId }),
}));
