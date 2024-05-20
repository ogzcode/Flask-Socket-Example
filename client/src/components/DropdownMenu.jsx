import { PiDotsThreeCircleVertical } from 'react-icons/pi';
import { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';

export default function DropdownMenu({ items }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClick = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClick);

        return () => {
            document.removeEventListener("mousedown", handleClick);
        }
    }, [])

    return (
        <div ref={dropdownRef} className="relative">
            <PiDotsThreeCircleVertical
                onClick={() => setIsOpen(!isOpen)}
                className="text-3xl text-slate-700 cursor-pointer"
            />
            {
                isOpen && (
                    <div className="absolute top-8 right-0 bg-white shadow-md rounded-lg border border-gray-200">
                        <ul className="flex flex-col gap-2">
                            {items.map((item, index) => (
                                <li key={index} className={clsx(
                                    "flex items-center justify-start gap-2 px-4 py-2 min-w-20 text-sm text-slate-700 hover:bg-slate-50 cursor-pointer text-nowrap",
                                    item.itemStyle
                                )}
                                    onClick={() => item.onClickFunc()}>
                                    {item.icon()}
                                    {item.text}
                                </li>
                            ))}
                        </ul>
                    </div>
                )
            }
        </div>
    )
}