 import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login({ setIsLoggedIn, setRole }) {
  const [creds, setCreds] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://127.0.0.1:8000/api/login/', creds);
      
      localStorage.setItem('token', res.data.access);
      
      // Role logic: Backend se 'is_recruiter' boolean aana chahiye
      const userRole = res.data.is_recruiter ? 'recruiter' : 'employee';
      localStorage.setItem('role', userRole);
      
      setIsLoggedIn(true);
      setRole(userRole);

      // Dashboard routing
      if (userRole === 'recruiter') {
        navigate('/admin-dash');
      } else {
        navigate('/user-dash');
      }
    } catch (err) {
      alert("Login Failed: " + (err.response?.data?.error || "Check your credentials"));
    }
  };

  return (
    <div className="flex justify-center items-center py-20 bg-gray-50 min-h-[80vh]">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded border shadow-sm w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-600 uppercase">Login to JobWay</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-600">Username</label>
            <input 
              type="text" 
              placeholder="Enter username" 
              className="w-full p-2 border rounded outline-none focus:border-blue-500" 
              onChange={e => setCreds({...creds, username: e.target.value})} 
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-600">Password</label>
            <input 
              type="password" 
              placeholder="Enter password" 
              className="w-full p-2 border rounded outline-none focus:border-blue-500" 
              onChange={e => setCreds({...creds, password: e.target.value})} 
              required
            />
          </div>
        </div>

        <button className="w-full mt-6 bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700 transition">
          LOG IN
        </button>
        
        <div className="mt-6 pt-4 border-t text-center">
          <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">
            Recruiters Test Access: 'admin123'
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;