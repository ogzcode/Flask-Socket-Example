import React, { useState } from 'react'
import chat from "../../assets/chat.png"

import { removeToken, removeAuthenticatedUser, getAuthenticatedUser } from '../../services/tokenServices'

export const Header = () => {
    const authUser = getAuthenticatedUser()
    const handleLogout = () => {
        removeToken()
        removeAuthenticatedUser()
        window.location.reload()
    }

    return (
        <header className="col-span-3 px-8 bg-white shadow-sm rounded-md flex justify-between items-center h-16">
            <div className='flex items-center gap-4'>
                <img src={chat} alt="chat" className="w-10 h-10" />
                <h1 className='text-2xl font-light text-slate-700 tracking-wider'><span className='text-teal-600 font-bold'>F</span>Chat</h1>
            </div>
            <div className="header-right">
                <span className='bg-teal-100 text-teal-500 px-4 py-2 rounded-md font-semibold mr-4'>{authUser.username}</span>
                <button
                    className="bg-red-500 text-white px-4 py-2 rounded-md"
                    onClick={handleLogout}>Logout</button>
            </div>
        </header>
    )
}