import React, { useState } from 'react';
import { socket } from '../../../services/socket';
import { getAuthenticatedUser } from '../../../services/tokenServices';
import { useChatStore } from '../../../store/useChatStore';

export default function MessageInput() {
    const [message, setMessage] = useState('')
    const authUser = getAuthenticatedUser()
    const { selectedUser, roomId } = useChatStore()

    const handleSendMessage = () => {
        if (!message) return

        socket.emit('message', {
            receiver_id: selectedUser.id,
            sender_id: authUser.id,
            message: message,
            room_id: roomId
        })
        setMessage('')
    }

    return (
        <div className="flex gap-6 w-full p-4" style={{ position: "sticky", bottom: "" }}>
            <input
                type="text"
                className="h-full w-full text-slate-700 border border-slate-400 rounded-md px-4 py-2 outline-none focus:border-teal-500 focus:outline-teal-300 outline-offset-1"
                value={message}
                onChange={e => setMessage(e.target.value)}
            />
            <button className="h-full bg-teal-500 text-white rounded px-6 font-semibold" onClick={() => handleSendMessage()}>Send</button>
        </div>
    )
}