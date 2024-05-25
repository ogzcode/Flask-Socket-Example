import React, { useEffect, useState } from 'react'
import { BsPersonCircle } from "react-icons/bs";
import { socket } from '../../services/socket';
import { getAuthenticatedUser } from '../../services/tokenServices';
import { Header } from './Header';
import UserBox from './components/UserBox';
import SearchInput from './components/SearchInput';

import { useChatStore } from '../../store/useChatStore';

export const UserSide = () => {
    const authUser = getAuthenticatedUser()
    const [users, setUsers] = useState(null)
    const [isSearching, setIsSearching] = useState(false)
    const { roomId, updateSelectedUser } = useChatStore()

    useEffect(() => {
        socket.on('get_users', (data) => {
            console.log(data.users)
            setUsers(data.users)
        })

        return () => {
            socket.off('get_users')
        }
    }, [])


    const handleJoin = (user) => {
        socket.emit('join', {
            receiver_id: user.id,
            sender_id: authUser.id,
            old_room_id: roomId
        });

        socket.emit("get_users", { user_id: authUser.id })

        updateSelectedUser(user)
    }

    return (
        <div className="bg-white shadow-sm col-span-1 flex flex-col justify-between rounded-xl overflow-hidden relative"
            style={{ height: 'calc(100vh - 6rem)', position: 'relative' }}
        >
            <div className=''>
                <div className='flex items-center p-4 gap-4'>
                    <div>
                        <BsPersonCircle className="text-4xl text-teal-600" />
                    </div>
                    <div>
                        <p className="text-base font-semibold text-slate-800">{authUser?.username}</p>
                        <p className="text-xs text-slate-500">{authUser?.email}</p>
                    </div>
                </div>
                <SearchInput onChangeUsers={setUsers} onChangeIsSearching={setIsSearching} />
            </div>
            <div className="p-4 flex-grow overflow-y-auto">
                <div className="">
                    {users?.map((item, index) => (
                        <UserBox
                            key={index}
                            item={item}
                            onSelectUser={handleJoin}
                            isSearch={isSearching}
                        />
                    ))}
                </div>
            </div>

            <div className='sticky bottom-0'>
                <Header />
            </div>
        </div>
    )
}