import { useEffect, useState } from "react"
import { socket } from "../../services/socket";

import { UserSide } from "./UserSide";
import { Header } from "./Header";
import { ChatSide } from "./ChatSide";

export const Home = () => {
    const [selectedUser, setSelectedUser] = useState(null)
    const [isConnected, setIsConnected] = useState(socket.connected)

    useEffect(() => {

        socket.connect()

        socket.on('connect', () => {
            setIsConnected(true)
            console.log('connected')
        })
        socket.on('disconnect', () => {
            console.log('disconnected')
            setIsConnected(false)
        })

        return () => {
            socket.off('connect')
            socket.off('disconnect')
        }
    }, [])

    return (
        <div
            className="grid grid-cols-3 gap-8 p-12">
            <Header />
            <UserSide selectedUser={selectedUser} onChangeSelectedUser={setSelectedUser} />
            <ChatSide selectedUser={selectedUser} />
        </div>
    )
}