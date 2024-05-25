import { useState, useRef, useEffect } from "react"
import { getAllUsers } from "../../../services/api/user";
import { socket } from "../../../services/socket";
import { getAuthenticatedUser } from "../../../services/tokenServices";

import { useChatStore } from "../../../store/useChatStore";

export default function SearchInput({ onChangeUsers, onChangeIsSearching }) {
    const [search, setSearch] = useState('')
    const authUser = getAuthenticatedUser()
    const { selectedUser } = useChatStore()
    const prevSelectedUser = useRef(selectedUser)

    useEffect(() => {
        if (search !== '') {
            const fetchUser = async () => {
                const res = await getAllUsers(search)
                onChangeUsers(res.data.users)
            }
            fetchUser()

            onChangeIsSearching(true)
        }
        else if (search === "" && selectedUser === prevSelectedUser.current) {
            onChangeIsSearching(false)
            socket.emit('get_users', { user_id: authUser.id })
        }
    }, [search]);

    useEffect(() => {
        if (selectedUser && selectedUser !== prevSelectedUser.current) {
            setSearch('')
            onChangeIsSearching(false)
            prevSelectedUser.current = selectedUser
        }
    }, [selectedUser])


    return (
        <div className='px-4 pt-2 pb-6 border-b border-slate-200'>
            <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="Search..."
                className="border border-slate-400 text-slate-700 rounded-md px-4 py-2 w-full outline-none focus:border-teal-500 focus:outline-teal-300 outline-offset-1"
            />
        </div>
    )
}