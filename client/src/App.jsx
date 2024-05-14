import { Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './App.css'

import { Login } from './pages/auth/Login.jsx'
import Register from './pages/auth/Register.jsx'
import { Home } from './pages/home/Home.jsx'

import AuthLayout from './pages/auth/AuthLayout.jsx'

import { getToken } from "./services/tokenServices.js"

import { checkAuth } from './services/api/auth.js'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const token = getToken()
    if (token) {
      checkAuth()
        .then(() => setIsAuthenticated(true))
        .catch(() => setIsAuthenticated(false))
    }
  }, [])

  return (
    <div className="min-h-screen font-poppins" style={{ backgroundImage: "linear-gradient(to bottom, #e6e9f0 0%, #eef1f5 100%)" }}>
      <Routes>
        {
          isAuthenticated ? (
            <>
              <Route path="/login" element={<Navigate to="/" />} />
              <Route path="/" element={<Home />} /></>
          ) : (
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<Navigate to="/login" />} />
            </Route>
          )
        }
      </Routes>
    </div>
  )
}

export default App
