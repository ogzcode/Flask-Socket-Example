import React, { useState, useEffect } from 'react'
import { getAuthenticatedUser } from '../../services/tokenServices'
import { BsPersonCircle } from "react-icons/bs";
import { socket } from '../../services/socket'
import { formatTime } from '../../utils/util';


export const ChatSide = ({ selectedUser }) => {
    const authUser = getAuthenticatedUser()
    const [message, setMessage] = useState('')
    const [roomId, setRoomId] = useState(null)
    const [messageList, setMessageList] = useState([])

    useEffect(() => {
        socket.on('join', (data) => {
            setMessageList(data.messages)
            setRoomId(data.room_id)
        })

        socket.on('message', (data) => {
            setMessageList(prev => [...prev, data])
        })

        return () => {
            socket.off('join')
            socket.off('message')
        }
    }, [])

    const handleSendMessage = () => {
        socket.emit('message', {
            receiver_id: selectedUser.id,
            sender_id: authUser.id,
            message: message,
            room_id: roomId
        })

        setMessage('')

    }


    return (
        <div className="col-span-2 flex flex-col border rounded-md border-slate-200 bg-white">
            {
                selectedUser ? (
                    <>
                        <div className="h-[40rem] overflow-y-scroll mb-4 px-4 pt-4 font-medium tracking-wide">
                            {messageList.map((msg, index) => (
                                <div key={index} className={`mb-6 flex flex-col ${msg.sender_id === authUser.id ? 'justify-end' : 'justify-start'}`}>
                                    <div>
                                        <div className={`flex items-end gap-2 mb-2 ${msg.sender_id === authUser.id ? 'flex-row-reverse' : ''}`}>
                                            <span className="text-xs text-slate-600">{formatTime(msg.created_at)}</span>
                                        </div>
                                        <div className={`w-max relative rounded-md
                                            ${msg.sender_id === authUser.id ? 'bg-teal-500 float-end text-white' : 'text-slate-700 border border-teal-500'}`}
                                        >
                                            <span className='inline-block p-2 text-sm'>{msg.message}</span>
                                            <span className={`message-triangle ${msg.sender_id === authUser.id ? 'triangle-right' : 'triangle-left'}`}></span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {
                                messageList.length === 0 && (
                                    <div className="flex justify-center items-center h-full">
                                        <span className="text-gray-400">No messages yet</span>
                                    </div>
                                )
                            }
                        </div>
                        <div className="h-[2.5rem] flex gap-6 px-4">
                            <input
                                type="text"
                                className="h-full w-full border border-slate-400 text-slate-800 outline-none rounded px-2"
                                value={message}
                                onChange={e => setMessage(e.target.value)}
                            />
                            <button className="h-full bg-teal-500 text-white rounded px-6 font-semibold" onClick={() => handleSendMessage()}>Send</button>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex justify-center items-center">
                        <span className="text-xl text-gray-400">Select a user to start chat</span>
                    </div>
                )
            }
        </div>
    )
}