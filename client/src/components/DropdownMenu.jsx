import { PiDotsThreeCircleVertical } from 'react-icons/pi';
import { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';

export default function DropdownMenu({ items, position = "bottom" }) {
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

    const getPositionStyle = () => {
        switch (position) {
            case "bottom":
                return "top-8 right-0";
            case "top":
                return "bottom-8 right-0";
            default:
                return "top-8 right-0";
        }
    }

    return (
        <div ref={dropdownRef} className="relative">
            <PiDotsThreeCircleVertical
                onClick={() => setIsOpen(!isOpen)}
                className="text-3xl text-slate-700 cursor-pointer"
            />
            {
                isOpen && (
                    <div className={clsx("absolute bg-white shadow-md rounded-lg border border-gray-200", getPositionStyle())}>
                        <ul className="flex flex-col gap-2">
                            {items.map((item, index) => (
                                <li key={index} className={clsx(
                                    "flex items-center justify-start gap-2 px-4 py-2 min-w-20 text-sm cursor-pointer text-nowrap",
                                    item.itemStyle ? item.itemStyle : "text-slate-700 hover:bg-slate-50"
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