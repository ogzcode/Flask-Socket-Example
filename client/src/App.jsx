import { Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './App.css'

import { Login } from './pages/auth/Login.jsx'
import { Home } from './pages/home/Home.jsx'

import { getToken } from "./services/tokenServices.js"

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const token = getToken()
    setIsAuthenticated(token !== null)
  }, [])

  return (
    <div className="bg-stone-50 min-h-screen">
      <Routes>
        {
          isAuthenticated ? (
            <>
              <Route path="/login" element={<Navigate to="/" />} />
              <Route path="/" element={<Home />} /></>
          ) : (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Navigate to="/login" />} />
            </>
          )
        }
      </Routes>
    </div>
  )
}

export default App
