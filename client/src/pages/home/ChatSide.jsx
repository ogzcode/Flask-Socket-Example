import React, { useState, useEffect, useRef } from 'react'
import { getAuthenticatedUser } from '../../services/tokenServices'
import { socket } from '../../services/socket'
import { formatTime } from '../../utils/util';

import EmptyChat from './components/EmptyChat';


export const ChatSide = ({ selectedUser, roomId, onChangeRoomId }) => {
    const authUser = getAuthenticatedUser()
    const [message, setMessage] = useState('')
    const [messageList, setMessageList] = useState([]);

    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messageList])


    useEffect(() => {
        socket.on('join', (data) => {
            setMessageList(data.messages)
            onChangeRoomId(data.room_id)
        })

        socket.on('message', (data) => {
            setMessageList(prev => [...prev, data.message])
            console.log("Message Data " + data.message)
            
            if (data.message.sender_id !== authUser.id) {
                /* socket.emit('notification', {
                    receiver_id: data.message.sender_id,
                    message: 'New Message from ' + authUser.username
                }) */
                socket.emit("mark_as_read", { room_id: data.room_id, message_id: data.message.id})
            }
        })

        socket.on("notification", (data) => {
            console.log("Notification Data " + data.message)
        })

        return () => {
            socket.off('join')
            socket.off('message')
            socket.off('notification')
        }
    }, [])

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
        <div className="col-span-2 flex flex-col border rounded-xl border-slate-200 bg-white"
            style={{ height: 'calc(100vh - 6rem)', position: 'relative' }}
        >
            {
                selectedUser ? (
                    <>
                        <div className="h-full px-4 pt-4 font-medium tracking-wide overflow-y-scroll flex-grow">
                            {messageList.map((msg, index) => (
                                <div key={index} className={`mb-6 flex flex-col ${msg.sender_id === authUser?.id ? 'justify-end' : 'justify-start'}`}>
                                    <div>
                                        <div className={`flex items-end gap-2 mb-2 ${msg.sender_id === authUser?.id ? 'flex-row-reverse' : ''}`}>
                                            <span className="text-xs font-light text-slate-600">{formatTime(msg.created_at)}</span>
                                        </div>
                                        <div className={`w-max relative rounded-md
                                            ${msg.sender_id === authUser?.id ? 'bg-teal-500 float-end text-white' : 'text-slate-700 border border-teal-500'}`}
                                        >
                                            <span className='inline-block p-2 text-sm'>{msg.message}</span>
                                            <span className={`message-triangle ${msg.sender_id === authUser?.id ? 'triangle-right' : 'triangle-left'}`}></span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                            {
                                messageList.length === 0 && <EmptyChat emptyType="withUser" />
                            }
                        </div>
                        <div className="flex gap-6 w-full p-4" style={{ position: "sticky", bottom: "" }}>
                            <input
                                type="text"
                                className="h-full w-full border border-slate-400 text-slate-800 outline-none rounded px-2 py-2"
                                value={message}
                                onChange={e => setMessage(e.target.value)}
                            />
                            <button className="h-full bg-teal-500 text-white rounded px-6 font-semibold" onClick={() => handleSendMessage()}>Send</button>
                        </div>
                    </>
                ) : (
                    <EmptyChat emptyType="main" />
                )
            }
        </div>
    )
}