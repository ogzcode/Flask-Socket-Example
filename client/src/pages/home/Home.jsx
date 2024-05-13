import { useEffect, useState } from "react"
import { socket } from "../../services/socket";

import { getAuthenticatedUser } from "../../services/tokenServices";

import { UserSide } from "./UserSide";
import { ChatSide } from "./ChatSide";

export const Home = () => {
    const authUser = getAuthenticatedUser()
    const [selectedUser, setSelectedUser] = useState(null)
    const [isConnected, setIsConnected] = useState(socket.connected)
    const [roomId, setRoomId] = useState(null)

    useEffect(() => {

        socket.connect()

        socket.on('connect', () => {
            setIsConnected(true)
            console.log('connected')
            socket.emit("get_users", { user_id: authUser.id })
        })
        socket.on('disconnect', () => {
            console.log('disconnected')
            socket.emit('leave', { disconnected_id: authUser.id })
            setIsConnected(false)
        })

        return () => {
            socket.off('connect')
            socket.off('disconnect')
        }
    }, [])

    return (
        <div
            className="min-h-screen grid grid-cols-3 gap-8 p-12">
            <UserSide selectedUser={selectedUser} onChangeSelectedUser={setSelectedUser} roomId={roomId}/>
            <ChatSide selectedUser={selectedUser} roomId={roomId} onChangeRoomId={setRoomId} />
        </div>
    )
}