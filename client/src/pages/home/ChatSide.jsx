import React, { useState, useEffect, useRef } from 'react'
import { getAuthenticatedUser } from '../../services/tokenServices'
import { socket } from '../../services/socket'

import EmptyChat from './components/EmptyChat';
import MessageInput from './components/MessageInput';
import MessageSeparator from './components/MessageSeparator';
import Message from './components/Message';
import MessageHeader from './components/MessageHeader';
import { useChatStore } from '../../store/useChatStore';

export const ChatSide = () => {
    const authUser = getAuthenticatedUser()
    const [messageList, setMessageList] = useState([]);
    const { selectedUser, updateRoomId } = useChatStore()

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
            updateRoomId(data.room_id)
        })

        socket.on('message', (data) => {
            setMessageList(prev => [...prev, data.message])

            if (data.message.sender_id !== authUser.id) {
                socket.emit("mark_as_read", { room_id: data.room_id, message_id: data.message.id })
            }
        })

        return () => {
            socket.off('join')
            socket.off('message')
        }
    }, [])


    return (
        <div className="col-span-3 flex flex-col border rounded-xl border-slate-200 bg-white"
            style={{ height: 'calc(100vh - 6rem)', position: 'relative' }}
        >
            {
                selectedUser ? (
                    <>
                        <MessageHeader />
                        <div className="h-full px-4 pt-4 font-medium tracking-wide overflow-y-scroll flex-grow">
                            {messageList.map((msg, index) => {
                                return (
                                    <React.Fragment key={msg.id}>
                                        {index > 0 && <MessageSeparator prevDate={messageList[index - 1].created_at} currentDate={msg.created_at} />}

                                        <Message
                                            message={msg}
                                            isUserMessage={msg.sender_id === authUser.id}
                                        />
                                    </React.Fragment>
                                );
                            })}

                            <div ref={messagesEndRef} />
                            {
                                messageList.length === 0 && <EmptyChat emptyType="withUser" />
                            }
                        </div>
                        <MessageInput />
                    </>
                ) : (
                    <EmptyChat emptyType="main" />
                )
            }
        </div>
    )
}