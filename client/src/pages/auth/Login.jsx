import React, { useState } from 'react'
import * as yup from 'yup'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link } from 'react-router-dom';

import { login } from "../../services/api/auth"
import { setToken, setAuthenticatedUser } from '../../services/tokenServices'

import { Input } from "../../components/Input"

const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(5).required()
});

export const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const [showPassword, setShowPassword] = useState(false)

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const response = await login(email, password)
            const { token, user } = response.data
            setToken(token)
            setAuthenticatedUser(user)
            window.location.reload()
        } catch (error) {
            setError(error.response.data.message)
        }
    }

    return (
        <div className='h-full flex justify-center items-center flex-col relative'>
            <h1 className='mb-2 text-3xl font-semibold text-slate-600 text-center'>Login</h1>
            <h3 className='italic text-slate-500 mb-6 font-light'>Welcome back! Please sign in to join the chat.</h3>
            <p className='absolute right-4 top-4 text-slate-500 text-sm'>
                Don't have an account? <Link to='/register' className='text-teal-600'>Register</Link>
            </p>
            <form onSubmit={handleSubmit(handleLogin)} className='flex flex-col w-full px-8'>
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
                <button type="submit" className='bg-teal-500 mt-6 mx-auto text-white p-2 rounded-md w-60 transition hover:bg-teal-600'>Login</button>
            </form>
        </div>
    )
}