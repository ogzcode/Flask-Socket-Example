import { formatTime } from "../../../utils/util"
import { BsPersonCircle } from 'react-icons/bs'

export default function UserBox({ item, selectedUser, onSelectUser, isSearch }) {
    const user = isSearch ? item : item?.user

    return (
        <div key={user?.id}
            className={`flex items-center gap-2 px-4 py-3 mb-4 cursor-pointer relative rounded-md border border-slate-200  
            hover:bg-slate-50 ${selectedUser?.id === user?.id ? 'bg-slate-50 border-teal-500' : ''}`}
            onClick={() => onSelectUser(user)}
        >
            <BsPersonCircle className="inline-block text-3xl text-gray-500" />
            <div>
                <h3 className='text-slate-800 text-base font-semibold'>{user?.username}</h3>
                {
                    isSearch ?
                        <p className='text-xs text-slate-500'>{user?.email}</p> :
                         <p className='text-xs text-slate-500'>{item?.last_message_date ? item?.last_message : "No message"}</p>
                }
            </div>
            {item?.last_message && <p className='text-xs text-gray-500 absolute right-3 top-4'>{formatTime(item?.last_message_date)}</p>}
            {
                item?.unread_messages_count > 0 && (
                    <div className='absolute -right-3 -top-3 bg-teal-500 text-white rounded-full w-6 h-6 flex justify-center items-center'>
                        <p className='text-xs'>{item?.unread_messages_count}</p>
                    </div>
                )

            }
        </div>
    )
}