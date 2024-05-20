import { useEffect, useState } from "react"
import { socket } from "../../services/socket";

import { getAuthenticatedUser } from "../../services/tokenServices";

import { UserSide } from "./UserSide";
import { ChatSide } from "./ChatSide";

export const Home = () => {
    const authUser = getAuthenticatedUser()

    useEffect(() => {

        socket.connect()

        socket.on('connect', () => {
            socket.emit("get_users", { user_id: authUser.id })
        })
        socket.on('disconnect', () => {
            socket.emit('leave', { disconnected_id: authUser.id })
        })

        return () => {
            socket.off('connect')
            socket.off('disconnect')
        }
    }, [])

    return (
        <div
            className="min-h-screen grid grid-cols-4 gap-8 p-12">
            <UserSide />
            <ChatSide />
        </div>
    )
}