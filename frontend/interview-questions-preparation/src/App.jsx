import { useState } from 'react'
import Dashboard from './pages/Dashboard'
import './App.css'
import LoginSignUp from './pages/LoginSignup'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"



function App() {
  const [count, setCount] = useState(0)
  const isLoggedIn = false;
  return (
   <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} />}
        />
        <Route path="/login" element={<LoginSignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
