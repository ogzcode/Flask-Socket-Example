import { formatTime } from '../../../utils/util';

export default function Message({ message, isUserMessage }) {
    return (
        <div className={`mb-6 flex flex-col ${isUserMessage ? 'justify-end' : 'justify-start'}`}>
            <div>
                <div className={`flex items-end gap-2 mb-2 ${isUserMessage ? 'flex-row-reverse' : ''}`}>
                    <span className="text-xs font-light text-slate-600">{formatTime(message.created_at)}</span>
                </div>
                <div className={`w-max rounded-lg
                        ${isUserMessage ? 'bg-teal-500 float-end text-white rounded-tr-none' : 'text-slate-700 border border-teal-500 rounded-tl-none'}`}
                >
                    <span className='inline-block p-2 text-sm'>{message.message}</span>
                </div>
            </div>
        </div>
    )
}