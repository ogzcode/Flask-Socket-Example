import React, { useEffect, useState } from 'react'
import { getAllUsers } from '../../services/api/user'
import { BsPersonCircle } from "react-icons/bs";
import { socket } from '../../services/socket';
import { getAuthenticatedUser } from '../../services/tokenServices';
import { Header } from './Header';
import UserBox from './components/UserBox';

import { useChatStore } from '../../store/useChatStore';

export const UserSide = () => {
    const authUser = getAuthenticatedUser()
    const [users, setUsers] = useState(null)
    const [search, setSearch] = useState('');
    const { roomId, updateSelectedUser } = useChatStore()

    useEffect(() => {
        socket.on('get_users', (data) => {
            setUsers(data.users)
        })

        return () => {
            socket.off('get_users')
        }
    }, [])

    useEffect(() => {
        if (search !== '') {
            const fetchUser = async () => {
                const res = await getAllUsers(search)
                setUsers(res.data.users)
            }
            fetchUser()
        }
    }, [search]);


    const handleJoin = (user) => {

        socket.emit('join', {
            receiver_id: user.id,
            sender_id: authUser.id,
            old_room_id: roomId
        });

        if (search !== "") {
            socket.emit("get_users", { user_id: authUser.id })
            setSearch('')
        }

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
                <div className='px-4 pt-2 pb-6 border-b border-slate-200'>
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        type="text"
                        placeholder="Search..."
                        className="border border-slate-400 text-slate-700 rounded-md px-4 py-2 w-full outline-none focus:border-teal-500 focus:outline-teal-300 outline-offset-1"
                    />
                </div>
            </div>
            <div className="p-4 flex-grow overflow-y-auto">
                <div className="">
                    {users?.map((item, index) => (
                        <UserBox
                            key={index}
                            item={item}
                            onSelectUser={handleJoin}
                            isSearch={search !== ""}
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