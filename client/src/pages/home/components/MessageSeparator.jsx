import { formatTime } from "../../../utils/util"

export default function MessageSeparator({ prevDate, currentDate }) {
    const showSeparator = new Date(currentDate).toDateString() !== new Date(prevDate).toDateString();
    const isToday = new Date(currentDate).toDateString() === new Date().toDateString();

    if (!showSeparator) return null;

    return (
        <div className="text-center my-4 flex justify-center items-center">
            <div className="w-full bg-slate-200" style={{ height: "1px" }}></div>
            <p className="text-slate-500 text-xs mx-6 text-nowrap">
                {isToday ? "Today" : formatTime(new Date(currentDate))}
            </p>
            <div className="w-full bg-slate-200" style={{ height: "1px" }}></div>
        </div>
    )
}