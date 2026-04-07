 import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import UserDash from './UserDash'; 
import AdminDash from './AdminDash';
import './App.css'

// Simple Hero Section
const Home = () => (
  <div className="py-24 text-center bg-blue-600 text-white px-4">
    <h1 className="text-5xl font-bold mb-4">Find Your Dream Job</h1>
    <p className="text-xl opacity-90 mb-8">Connecting talented students with top recruiters in Bhopal.</p>
    <Link to="/register" className="bg-white text-blue-600 px-8 py-3 rounded font-bold hover:bg-gray-100 transition inline-block shadow-md">
      GET STARTED
    </Link>
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
    window.location.href = '/login'; // Simple redirect
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans bg-white text-gray-800">
        
        {/* --- NAVBAR --- */}
        <header className="border-b bg-white sticky top-0 z-50">
          <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-blue-600 tracking-tight">JobWay</Link>
            
            <div className="hidden md:flex items-center gap-6 text-sm font-semibold">
              <Link to="/" className="hover:text-blue-600">Home</Link>
              {isLoggedIn && role === 'employee' && (
                <Link to="/user-dash" className="hover:text-blue-600">My Dashboard</Link>
              )}
              {isLoggedIn && role === 'recruiter' && (
                <Link to="/admin-dash" className="text-blue-600 font-bold underline">Admin Panel</Link>
              )}
            </div>

            <div className="flex items-center gap-4">
              {!isLoggedIn ? (
                <>
                  <Link to="/login" className="text-sm font-semibold hover:text-blue-600">Login</Link>
                  <Link to="/register" className="bg-blue-600 text-white px-5 py-2 rounded text-sm font-bold hover:bg-blue-700 transition">
                    Sign Up
                  </Link>
                </>
              ) : (
                <button 
                  onClick={handleLogout} 
                  className="bg-red-50 text-red-600 border border-red-100 px-5 py-2 rounded text-sm font-bold hover:bg-red-100 transition"
                >
                  Logout
                </button>
              )}
            </div>
          </nav>
        </header>

        {/* --- MAIN CONTENT --- */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setRole={setRole} />} />
            
            {/* Protected Routes */}
            <Route 
              path="/user-dash" 
              element={isLoggedIn && role === 'employee' ? <UserDash /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/admin-dash" 
              element={isLoggedIn && role === 'recruiter' ? <AdminDash /> : <Navigate to="/login" />} 
            />
          </Routes>
        </main>

        {/* --- FOOTER --- */}
        <footer className="bg-gray-50 border-t py-10 px-6 mt-10">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="font-bold text-gray-900">JobWay Portal</p>
              <p className="text-sm text-gray-500">Helping Bhopal's talent grow.</p>
            </div>
            <p className="text-xs text-gray-400 uppercase tracking-widest">© 2026 Bhopal, MP</p>
          </div>
        </footer>

      </div>
    </Router>
  );
}

export default App;