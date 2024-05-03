import React, { useState } from 'react'
import { login } from "../../services/api/auth"
import { setToken, setAuthenticatedUser } from '../../services/tokenServices'

export const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
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
        <div className='min-h-screen w-full flex justify-center items-center flex-col'>
            <h1 className='mb-4 text-xl font-semibold'>Login</h1>
            <form onSubmit={handleSubmit} className='flex flex-col '>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='border border-slate-400 mb-2 p-2 rounded-md w-60'
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='border border-slate-400 mb-2 p-2 rounded-md w-60'
                />
                <button type="submit"
                    className='bg-blue-500 text-white p-2 rounded-md w-60 hover:bg-blue-600'
                >Login</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    )
}