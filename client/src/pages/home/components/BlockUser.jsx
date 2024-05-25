import { useState, useEffect } from "react";
import { getBlockedUsers, unblockUser } from "../../../services/api/block";
import { useToast } from "../../../context/useToast";
import { TbUserHexagon } from "react-icons/tb";
import unblock from "../../../assets/image/unblock.svg"


export const BlockUser = () => {
    const [users, setUsers] = useState([]);
    const { showToast } = useToast();
    const [pending, setPending] = useState(false);

    const fetchData = async () => {
        try {
            const { data } = await getBlockedUsers();
            setUsers(data.users);
        } catch (error) {
            showToast({ message: error.response.data.message, type: "error" });
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleUnblockUser = async (data) => {
        setPending(true);
        try {
            await unblockUser(data);
            fetchData();
            showToast({ message: "User unblocked successfully", type: "success" });
        } catch (error) {
            showToast({ message: error.response.data.message, type: "error" });
        }
        setPending(false);
    }

    return (
        <div className="mt-4 max-h-64 overflow-y-auto pr-2">
            {users?.map((user) => (
                <div key={user.id} className="flex justify-between items-center mb-4 border border-stone-300 p-2 rounded">
                    <div className="flex items-center gap-3">
                        <TbUserHexagon className="inline-block text-3xl text-stone-700" />
                        <p className="text-base text-stone-700">{user.username}</p>
                    </div>
                    <button
                        className="text-xs p-1.5 bg-teal-500 rounded flex items-center gap-1 text-white"
                        onClick={() => handleUnblockUser({ blocked_id: user.id })}
                        disabled={pending}
                    >
                        {
                            !pending ?
                                <img src={unblock} alt="unblock" className="w-4 h-4" /> :
                                <div role="status">
                                    <svg aria-hidden="true" className="w-4 h-4 text-teal-50 animate-spin fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                    </svg>
                                    <span class="sr-only">Loading...</span>
                                </div>
                        }
                        <span className="font-medium text-white">Unblock</span>
                    </button>
                </div>
            ))}
            {
                users.length === 0 && <p className="border border-stone-300 p-2 rounded-md text-stone-800">No blocked users</p>
            }
        </div>
    )
}