import { FaXmark } from "react-icons/fa6";
import clsx from "clsx";

export default function Panel({ children, open, onClose,title = "", size = "md" }) {
    if (!open) return null

    const getSize = () => {
        switch (size) {
            case "sm":
                return "w-1/3"
            case "md":
                return "w-1/2"
            case "lg":
                return "w-2/3"
            default:
                return "w-1/3"
        }
    }

    return (
        <div className="fixed top-0 left-0 h-full w-full bg-slate-500/20 flex justify-center items-center" style={{ zIndex: 1000 }}>
            <div className={clsx("bg-white p-6 rounded-lg shadow-md", getSize())}>
                <div className="flex justify-between items-center" >
                    <h1 className="text-lg font-medium text-slate-800">{title}</h1>
                    <button onClick={onClose}>
                        <FaXmark className='text-xl text-slate-500' />
                    </button>
                </div >
                <div>
                    {children}
                </div>
            </div >
        </div >
    )
}