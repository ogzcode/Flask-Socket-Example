import { useState } from "react";
import { TbUserHexagon } from "react-icons/tb";
import { BiBlock } from "react-icons/bi";
import { RiDeleteBin2Fill } from "react-icons/ri";

import DropdownMenu from "../../../components/DropdownMenu";
import ConfirmDialog from "../../../components/ConfirmDialog";

import { deleteChat } from "../../../services/api/message";

import { useChatStore } from "../../../store/useChatStore";
import { getAuthenticatedUser } from "../../../services/tokenServices";
import { useToast } from "../../../context/useToast";
import { socket } from "../../../services/socket";

export default function MessageHeader() {
    const [open, setOpen] = useState(false);
    const { selectedUser, roomId, updateRoomId, updateSelectedUser } = useChatStore();
    const authUser = getAuthenticatedUser();
    const { showToast } = useToast();
    

    const items = [
        {
            text: "Block",
            onClickFunc: () => console.log("Block"),
            icon: () => <BiBlock className="inline-block text-xl text-indigo-700" />,
            itemStyle: "text-indigo-600 hover:bg-indigo-50"
        },
        {
            text: "Delete Chat",
            onClickFunc: () => setOpen(true),
            icon: () => <RiDeleteBin2Fill className="inline-block text-xl text-red-500" />,
            itemStyle: "text-red-600 hover:bg-red-50"
        }
    ]

    const handleDeleteChat = async () => {
        try {
            socket.emit('leave', { disconnected_id: authUser.id })
            await deleteChat(roomId);
            socket.emit("get_users", { user_id: authUser.id })
            updateRoomId(null);
            updateSelectedUser(null);
            showToast({ message: "Chat deleted successfully", type: "success" });
        } catch (error) {
            console.log(error);
            showToast({ message: "Failed to delete chat", type: "error" });
        }

        setOpen(false);
    }

    return (
        <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 shadow ">
            <div className="flex items-center gap-2">
                <TbUserHexagon className="inline-block text-4xl text-slate-700" />
                <div>
                    <p className="font-medium text-base text-slate-700">{selectedUser.username}</p>
                    <p className="text-xs text-slate-500">{selectedUser.email}</p>
                </div>
            </div>
            <DropdownMenu items={items} />

            <ConfirmDialog
                open={open}
                onClose={() => setOpen(false)}
                onConfirm={handleDeleteChat}
                title="Delete Chat"
                message="Are you sure you want to delete this chat?"
                severity="danger"
            />
        </div>
    )
}