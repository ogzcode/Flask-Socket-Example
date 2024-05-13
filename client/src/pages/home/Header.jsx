import React, { useState } from 'react'
import chat from "../../assets/chat.png"

import { BsBoxArrowRight } from "react-icons/bs";

import { removeToken, removeAuthenticatedUser, getAuthenticatedUser } from '../../services/tokenServices'

export const Header = () => {
    const authUser = getAuthenticatedUser()
    const handleLogout = () => {
        removeToken()
        removeAuthenticatedUser()
        window.location.reload()
    }

    return (
        <div className="px-6 py-4 bg-white shadow-sm rounded-md border-t flex justify-between items-center">
            <div className='flex items-center gap-2'>
                <img src={chat} alt="chat" className="w-6 h-6" />
                <h1 className='text-lg font-light text-slate-700 tracking-wider'><span className='text-teal-600 font-bold'>F</span>Chat</h1>
            </div>
            <div className="header-right">
                <button
                    className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition"
                    onClick={handleLogout}>
                    <BsBoxArrowRight className='text-xl' />
                </button>
            </div>
        </div>
    )
}