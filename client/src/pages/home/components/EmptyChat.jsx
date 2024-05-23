import chat1 from "../../../assets/image/chat-1.svg"
import personelText from "../../../assets/image/personal-text.svg"

export default function EmptyChat({ emptyType }) {
    if (emptyType === 'main') {
        return (
            <div className="flex-1 flex justify-center items-center flex-col">
                <img src={chat1} alt="chat" className="w-1/2 h-1/2"  />
                <span className="text-lg text-slate-600 mt-8">Select a user to start chat</span>
            </div>
        )
    }
    else if (emptyType === 'withUser') {
        return (
            <div className="flex justify-center items-center h-full flex-col">
                <img src={personelText} alt="chat" className="w-1/2 h-1/2" />
                <span className="text-slate-600 mt-8">No messages yet</span>
            </div>
        )
    }
}