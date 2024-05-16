import { TbUserHexagon } from "react-icons/tb";
import DropdownMenu from "../../../components/DropdownMenu";
import { BiBlock } from "react-icons/bi";
import { RiDeleteBin2Fill } from "react-icons/ri";

export default function MessageHeader({ selectedUser }) {
    const items = [
        {
            text: "Delete",
            onClickFunc: () => console.log("Delete"),
            icon: () => <RiDeleteBin2Fill className="inline-block text-xl text-slate-700" />,
            itemStyle: "text-red-500"
        },
        {
            text: "Block",
            onClickFunc: () => console.log("Block"),
            icon: () => <BiBlock className="inline-block text-xl text-slate-700" />,
            itemStyle: "text-red-500"
        }
    ]
    return (
        <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 shadow ">
            <div className="flex items-center gap-2">
                <TbUserHexagon className="inline-block text-4xl text-slate-700" />
                <div>
                    <p className="font-medium text-base text-slate-700">{selectedUser.username}</p>
                    <p className="text-xs text-slate-500">{selectedUser.email}</p>
                </div>
            </div>
            <DropdownMenu items={items} />
        </div>
    )
}