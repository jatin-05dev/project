 import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
// In components ko aap alag file mein banayenge
import UserDash from './UserDash'; 
import AdminDash from './AdminDash';
import './App.css'

const Home = () => (
  <div className="py-32 text-center bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
    <h1 className="text-6xl font-black uppercase tracking-tighter">Find Your Dream Job</h1>
    <p className="mt-4 text-xl opacity-80 text-blue-100 font-medium">Trusted by 10,000+ Students in Bhopal</p>
    <div className="mt-10">
       <Link to="/register" className="bg-white text-blue-600 px-10 py-4 rounded-full font-black shadow-2xl hover:scale-105 transition inline-block">GET STARTED</Link>
    </div>
  </div>
);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedRole = localStorage.getItem('role');
    
    if (token && savedRole) {
      setIsLoggedIn(true);
      setRole(savedRole);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setRole(null);
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans bg-gray-50">
        
        {/* --- NAVBAR --- */}
        <header className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50">
          <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <Link to="/" className="text-3xl font-black text-blue-600 italic tracking-tighter">JOBWAY</Link>
            
            <div className="flex items-center gap-8 font-bold text-gray-700 uppercase text-sm tracking-widest">
              <Link to="/" className="hover:text-blue-600 transition">Home</Link>
              {/* FIX: role === 'employee' use karein */}
              {isLoggedIn && role === 'employee' && <Link to="/user-dash" className="hover:text-blue-600 transition">Dashboard</Link>}
              {/* FIX: role === 'recruiter' use karein */}
              {isLoggedIn && role === 'recruiter' && <Link to="/admin-dash" className="hover:text-blue-600 transition font-black text-blue-600">★ Admin Panel</Link>}
            </div>

            <div className="flex gap-4">
              {!isLoggedIn ? (
                <>
                  <Link to="/login" className="px-6 py-2 font-bold text-gray-600 hover:text-blue-600 transition">Login</Link>
                  <Link to="/register" className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold shadow-lg hover:bg-blue-700 transition">Sign Up</Link>
                </>
              ) : (
                <button onClick={handleLogout} className="bg-red-500 text-white px-6 py-2 rounded-full font-bold hover:bg-red-600 shadow-md transition transform active:scale-95">Logout</button>
              )}
            </div>
          </nav>
        </header>

        {/* --- BODY --- */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setRole={setRole} />} />
            
            {/* Protected Routes - FIX: Roles match Login.jsx */}
            <Route path="/user-dash" element={role === 'employee' ? <UserDash /> : <Navigate to="/login" />} />
            <Route path="/admin-dash" element={role === 'recruiter' ? <AdminDash /> : <Navigate to="/login" />} />
          </Routes>
        </main>

        {/* --- FOOTER --- */}
        <footer className="bg-gray-950 text-gray-500 py-12 px-6">
          <div className="max-w-7xl mx-auto text-center border-t border-gray-800 pt-8">
            <p className="font-black text-white mb-2 tracking-widest uppercase">JOBWAY PORTAL</p>
            <p className="text-xs uppercase tracking-tighter">Bhopal Hub, Madhya Pradesh | © 2026</p>
          </div>
        </footer>

      </div>
    </Router>
  );
}

export default App;