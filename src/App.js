import React from 'react'
import { Routes, Route, Link, Navigate } from 'react-router-dom'
import Landing from './components/Landing.js'
import Login from './components/Login.js'
import Signup from './components/SignUp.js'
import Dashboard from './components/Dashboard.js'
import Tickets from './components/Ticket.js'
import ProtectedRoute from './components/ProtectedRouted.js'
import { getSession, logout } from './services/authService.js'
import ToastProvider from './components/ToastProvider.js'


export default function App(){
const session = getSession()


return (
<ToastProvider>
<div className="app-root">
<header className="site-header">
<div className="container header-inner">
<Link to="/" className="brand">TicketApp</Link>
<nav className="main-nav">
{session ? (
<>
<Link to="/dashboard">Dashboard</Link>
<Link to="/tickets">Tickets</Link>
<button className="link-btn" onClick={()=>{ logout(); window.location.href='/'}}>Logout</button>
</>
) : (
<>
<Link to="/auth/login">Login</Link>
<Link to="/auth/signup" className="btn-primary">Get Started</Link>
</>
)}
</nav>
</div>
</header>
<main className="container main-content">
    <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/tickets" element={<ProtectedRoute><Tickets /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
</main>


<footer className="site-footer">
    <div className="container footer-inner">
        <p>© {new Date().getFullYear()} TicketApp — Built by SimiDaniels</p>
        <nav>
            <Link to="/">Home</Link>
            <Link to="/auth/login">Login</Link>
        </nav>
    </div>
</footer>
</div>
</ToastProvider>
)
}