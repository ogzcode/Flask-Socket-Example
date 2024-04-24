import React, { useEffect, useState } from 'react'
import { getContactedUser, getAllUsers } from '../../services/api/user'
import { BsSearch, BsChatFill, BsPersonCircle } from "react-icons/bs";
import { formatTime } from '../../utils/util';
import { socket } from '../../services/socket';
import { getAuthenticatedUser } from '../../services/tokenServices';

export const UserSide = ({ selectedUser, onChangeSelectedUser }) => {
    const authUser = getAuthenticatedUser()
    const [users, setUsers] = useState(null)
    const [tab, setTab] = useState('chats')
    const [search, setSearch] = useState('')

    useEffect(() => {
        if (tab === 'chats') {
            setSearch('')
            getContactedUser()
                .then(res => {
                    setUsers(res.data.contacted_users)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }, [tab]);

    useEffect(() => {
        if (search !== '' && tab === 'all') {
            const fetchUser = async () => {
                const res = await getAllUsers(search)
                setUsers(res.data.users)
            }
            fetchUser()
        }
    }, [search]);

    const getActiveTabStyle = (tabName) => {
        return tab === tabName ? 'bg-teal-500 text-white' : 'text-teal-600'
    }

    const handleJoin = (user) => {
        socket.emit('join', {
            receiver_id: user.id,
            sender_id: authUser.id
        });
        
        if (tab === 'all') {
            setTab('chats')
            setSearch('')
            setUsers(null)
        }
        else {
            onChangeSelectedUser(user)
        }
    }

    return (
        <div className="min-h-[45rem] bg-white shadow-sm col-span-1 rounded-xl overflow-hidden">
            <div className="">
                <div className="flex h-[3rem]">
                    <button className={'flex-1 flex justify-center items-center gap-2 font-semibold border-b border-b-teal-500 ' + getActiveTabStyle("chats")} onClick={() => setTab('chats')}>
                        <BsChatFill className="inline-block text-xl" />
                        <span>Chats</span>
                    </button>
                    <button className={'flex-1 flex justify-center items-center gap-2 font-semibold border-b border-b-teal-500 ' + getActiveTabStyle("all")} 
                        onClick={() => {setTab('all'); setUsers(null)}}>
                        <BsSearch className="inline-block text-xl" />
                        <span>All</span>
                    </button>
                </div>
                <div className="h-[42rem] p-6">
                    {tab === 'all' && (
                        <div className="">
                            <input
                                type="text"
                                placeholder="Search..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                className='border border-slate-400 rounded-md px-4 py-2 w-full mt-2 mb-6'
                            />
                            <div className="search-results">
                                {users && users?.map(item => (
                                    <div key={item?.id}
                                        className='flex items-center gap-4 p-4 mb-6 cursor-pointer relative rounded-md border border-slate-200  hover:bg-slate-50'
                                        onClick={() => handleJoin(item)}>
                                        <BsPersonCircle className="inline-block text-4xl text-teal-600" />
                                        <h3 className='text-slate-800 text-lg font-semibold'>{item?.username}</h3>
                                    </div>
                                ))}
                                {
                                    !users && (
                                        <div className="flex justify-center items-center h-32">
                                            <p className="text-slate-500">No users found</p>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    )}
                    {tab === 'chats' && (
                        <div className="">
                            {users?.map(item => (
                                <div key={item?.user?.id}
                                    className={`flex items-center gap-4 p-4 mb-6 cursor-pointer relative rounded-md border border-slate-200  hover:bg-slate-50 ${selectedUser?.id === item?.user?.id ? 'bg-slate-50' : ''}`}
                                    onClick={() => handleJoin(item?.user)}>
                                    <BsPersonCircle className="inline-block text-4xl text-teal-600" />
                                    <div>
                                        <h3 className='text-slate-800 text-lg font-semibold'>{item?.user?.username}</h3>
                                        <p className='text-sm text-slate-500'>{item?.last_message ? item?.last_message?.message : "No message"}</p>
                                    </div>
                                    {item?.last_message && <p className='text-xs text-gray-500 absolute right-3 top-3'>{formatTime(item?.last_message?.created_at)}</p>}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}