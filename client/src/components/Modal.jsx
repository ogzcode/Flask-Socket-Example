import { FaXmark } from "react-icons/fa6";

export default function Modal({ children, open, onClose, onConfirm, title, severity = "success", submitText = "Confirm", cancelText = "Cancel" }) {
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
        <div className="fixed top-0 left-0 h-full w-full bg-slate-500/20 flex justify-center items-center" style={{ zIndex: 1000 }}>
            <div className="bg-white p-6 rounded-lg shadow-md w-96">
                <div className="flex justify-between items-center" >
                    <h1 className="text-lg font-semibold text-slate-700">{title}</h1>
                    <button onClick={onClose}>
                        <FaXmark className='text-xl text-slate-500' />
                    </button>
                </div >
                <div>
                    {children}
                </div>
                <div className="flex justify-end gap-4 mt-4">
                    <button onClick={onClose} className="px-3 py-1 text-sm tracking-wide font-normal border border-stone-300 text-stone-700 rounded-md">{cancelText}</button>
                    <button onClick={onConfirm} className={`px-3 py-1 text-sm tracking-wide font-medium text-white rounded-md ${getStatusColor()}`}>{submitText}</button>
                </div>
            </div >
        </div >
    )
}