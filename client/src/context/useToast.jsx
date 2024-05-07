import { createContext, useState, useContext } from "react";

export const ToastContext = createContext();

export const useToast = () => {
    return useContext(ToastContext);
}

export const ToastProvider = ({ children }) => {
    const [toast, setToast] = useState(null);

    const showToast = ({message, type}) => {
        if (toast) return;

        setToast({ message, type });
        setTimeout(() => {
            setToast(null);
        }, 2000);
    }

    const getStyleByType = (type, isText=false) => {
        switch (type) {
            case "success":
                return isText ? "text-emerald-500" : "bg-emerald-500";
            case "error":
                return isText ? "text-red-500" : "bg-red-500";
            case "warning":
                return isText ? "text-yellow-500" : "bg-yellow-500";
            case "info":
                return isText ? "text-blue-500" : "bg-blue-500";
            default:
                return isText ? "text-gray-500" : "bg-gray-500";
        }
    }

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            {toast && (
                <div className={`fixed bottom-4 right-4 bg-white/85 shadow-xl flex items-center min-h-16 min-w-64 max-w-80 p-2 rounded-md gap-4`}>
                    <div className={`self-stretch w-1.5 rounded ${getStyleByType(toast.type)}`}></div>
                    <div>
                        <p className={`${getStyleByType(toast.type, true)} font-semibold`}>{toast.type.replace(/^\w/, (c) => c.toUpperCase())}</p>
                        <p className="text-wrap text-sm text-slate-700 font-medium">{toast.message}</p>
                    </div>
                </div>
            )}
        </ToastContext.Provider>
    )
}