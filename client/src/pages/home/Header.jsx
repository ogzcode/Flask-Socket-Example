import { useState } from "react";
import chat from "../../assets/chat.png"

import { AiOutlineLogout } from "react-icons/ai";
import { BiUser } from "react-icons/bi";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { FaUserAltSlash } from "react-icons/fa";

import { useForm } from "react-hook-form";
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";

import { useToast } from "../../context/useToast";
import { removeToken, removeAuthenticatedUser } from '../../services/tokenServices'

import { deleteAccount, updatePassword } from "../../services/api/user";

import ConfirmDialog from "../../components/ConfirmDialog";
import DropdownMenu from '../../components/DropdownMenu';
import Modal from "../../components/Modal";
import { Input } from "../../components/Input";
import Panel from "../../components/Panel";
import { BlockUser } from "./components/BlockUser";

const schema = yup.object().shape({
    newPassword: yup.string().min(5, "Password must be longer than 5 characters").required("New password is required"),
    oldPassword: yup.string().min(5, "Password must be longer than 5 characters").required("Old password is required")
});


export const Header = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema)
    });
    const [open, setOpen] = useState(false);
    const [passwordModal, setPasswordModal] = useState(false);
    const [blockedModal, setBlockedModal] = useState(false);
    const { showToast } = useToast();
    const items = [
        {
            text: "Update Password",
            onClickFunc: () => setPasswordModal(true),
            icon: () => <BiUser className="inline-block text-xl text-indigo-700" />,
            itemStyle: "text-indigo-600 hover:bg-indigo-50"
        },
        {
            text: "Blocked Users",
            onClickFunc: () => setBlockedModal(true),
            icon: () => <FaUserAltSlash className="inline-block text-xl text-teal-700" />,
            itemStyle: "text-teal-600 hover:bg-teal-50"
        },
        {
            text: "Delete Account",
            onClickFunc: () => setOpen(true),
            icon: () => <RiDeleteBin2Fill className="inline-block text-xl text-rose-500" />,
            itemStyle: "text-rose-600 hover:bg-rose-50"
        },
        {
            text: "Logout",
            onClickFunc: () => handleLogout(),
            icon: () => <AiOutlineLogout className="inline-block text-xl text-red-500" />,
            itemStyle: "text-red-600 hover:bg-red-50"
        }
    ]

    const handleLogout = () => {
        removeToken()
        removeAuthenticatedUser()
        window.location.reload()
    }

    const handleDeleteAccount = async () => {
        try {
            await deleteAccount()
            removeToken()
            removeAuthenticatedUser()
            showToast({ message: "Account deleted successfully", type: "success" });
            window.location.reload()
        } catch (error) {
            showToast({ message: "Failed to delete account", type: "error" });
        }
    }

    const handleUpdatePassword = async (data) => {
        try {
            await updatePassword(data)
            showToast({ message: "Password updated successfully", type: "success" });
            setPasswordModal(false)
        } catch (error) {
            showToast({ message: error.response.data.message, type: "error" });
        }

        reset({})
        setPasswordModal(false)
    }

    return (
        <div className="px-6 py-4 bg-white shadow-sm rounded-md border-t flex justify-between items-center">
            <div className='flex items-center gap-2'>
                <img src={chat} alt="chat" className="w-6 h-6" />
                <h1 className='text-lg font-light text-slate-700 tracking-wider'><span className='text-teal-600 font-bold'>F</span>Chat</h1>
            </div>
            <div>
                <DropdownMenu items={items} position='top' />
            </div>

            <ConfirmDialog
                open={open}
                onClose={() => setOpen(false)}
                title="Delete Account"
                message="Are you sure you want to delete your account?"
                severity="danger"
                onConfirm={() => handleDeleteAccount()}
            />

            <Modal
                open={passwordModal}
                onClose={() => {
                    setPasswordModal(false)
                    reset({})
                }}
                title="Update Password"
                submitText="Update"
                onConfirm={handleSubmit(handleUpdatePassword)}
                severity="info"
            >
                <div className='flex flex-col w-full'>
                    <div className='mt-4'>
                        <label htmlFor="newPassword" className='text-slate-600 block mb-1'>New Password</label>
                        <Input
                            label="newPassword"
                            register={register}
                            placeholder="New Password"
                            required
                            error={errors.newPassword}
                        />
                    </div>
                    <div className='my-8'>
                        <label htmlFor="oldPassword" className='text-slate-600 block mb-1'>Old Password</label>
                        <Input
                            label="oldPassword"
                            register={register}
                            placeholder="Old Password"
                            required
                            error={errors.oldPassword}
                        />
                    </div>
                </div>
            </Modal>

            <Panel
                open={blockedModal}
                onClose={() => setBlockedModal(false)}
                size="sm"
                title="Blocked Users"
            >
                <BlockUser />
            </Panel>
        </div>
    )
}