import { FaXmark } from "react-icons/fa6";

export default function ConfirmDialog({ open, onClose, onConfirm, title, message, severity = "success" }) {
    if (!open) return null

    const getStatusColor = () => {
        switch (severity) {
            case "danger":
                return "bg-red-500"
            case "success":
                return "bg-green-500"
            case "warning":
                return "bg-yellow-500"
            case "info":
                return "bg-blue-500"
            default:
                return "bg-red-500"
        }
    }
    return (
        <div className="fixed top-0 left-0 h-full w-full bg-stone-500/20 flex justify-center items-center" style={{ zIndex: 1000 }}>
            <div className="bg-white p-6 rounded-lg shadow-md w-96">
                <div className="flex justify-between items-center" >
                    <h1 className="text-lg font-semibold text-stone-800">{title}</h1>
                    <button onClick={onClose}>
                        <FaXmark className='text-xl text-stone-700' />
                    </button>
                </div >
                <p className="text-stone-700 break-all mt-4">{message}</p>
                <div className="flex justify-end gap-4 mt-4">
                    <button onClick={onClose} className="px-3 py-1 text-sm tracking-wide font-medium border border-stone-300 text-stone-700 rounded-md">Cancel</button>
                    <button onClick={onConfirm} className={`px-3 py-1 text-sm tracking-wide font-medium text-white rounded-md ${getStatusColor()}`}>Confirm</button>
                </div>
            </div >
        </div >
    )
}