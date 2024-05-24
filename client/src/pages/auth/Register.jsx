import React, { useState } from 'react';
import * as yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';

import { Input } from "../../components/Input";

import { register as registerReq } from "../../services/api/auth";

import { useToast } from '../../context/useToast';

const schema = yup.object().shape({
    username: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(5).required()
});

export default function Register() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const { showToast } = useToast()

    const [showPassword, setShowPassword] = useState(false)

    const navigate = useNavigate()

    const handleRegister = async (data) => {
        try {
            const response = await registerReq(data)
            navigate('/login')
        } catch (error) {
            showToast({ message: error.response.data.message, type: 'error' })
        }
    }


    return (
        <div className='h-full flex justify-center items-center flex-col relative'>
            <h1 className='mb-2 text-3xl font-semibold text-slate-600 text-center'>Sign Up</h1>
            <h3 className='italic text-slate-500 mb-6 font-light lg:text-base text-sm'>Welcome! Please register to join the chat.</h3>
            <p className='absolute lg:right-4 top-4 text-slate-500 text-sm '>
                Already have an account? <Link to='/login' className='text-teal-600'>Sign in</Link>
            </p>
            <form onSubmit={handleSubmit(handleRegister)} className='flex flex-col w-full px-8'>
                <div className='mb-6'>
                    <label htmlFor="email" className='text-slate-600 block mb-1'>Username</label>
                    <Input
                        label="username"
                        register={register}
                        placeholder="Username"
                        required
                        error={errors.email}
                    />
                </div>
                <div className='mb-6'>
                    <label htmlFor="email" className='text-slate-600 block mb-1'>Email</label>
                    <Input
                        label="email"
                        register={register}
                        placeholder="Email"
                        required
                        error={errors.email}
                    />
                </div>
                <div className='relative'>
                    <label htmlFor="password" className='text-slate-600 block mb-1'>Password</label>
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className='absolute right-2 top-2 text-slate-500'
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>

                    <Input
                        label="password"
                        register={register}
                        placeholder="Password"
                        required
                        error={errors.password}
                        type={showPassword ? "text" : "password"}
                    />
                </div>
                <button type="submit" className='bg-teal-500 mt-6 mx-auto text-white p-2 rounded-md w-60 transition hover:bg-teal-600'>Sign Up</button>
            </form>
        </div>
    )
}