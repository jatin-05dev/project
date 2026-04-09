 import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Premium look ke liye

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    // 1. LocalStorage se saare users nikalna
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // 2. User ko dhoondhna email aur password ke base par
    const userFound = users.find(u => u.email === email && u.password === password);

    if (userFound) {
      // Login details save karna
      localStorage.setItem('isLoggedIn', 'true');
      
      // Poora user object save kar rahe hain (jisme email, password aur isPaid false/true hai)
      localStorage.setItem('currentUser', JSON.stringify(userFound)); 
      
      Swal.fire({
        icon: 'success',
        title: 'Login Successful!',
        text: `Welcome back, ${userFound.email.split('@')[0]}!`,
        background: '#141414',
        color: '#fff',
        confirmButtonColor: '#E50914',
        timer: 2000,
        showConfirmButton: false
      }).then(() => {
        // --- ADMIN CHECK LOGIC ---
        if (userFound.email === "admin@netflix.com") {
          navigate('/admin'); 
        } else {
          navigate('/home'); 
        }
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Access Denied',
        text: 'Email ya Password galat hai, bhai!',
        background: '#141414',
        color: '#fff',
        confirmButtonColor: '#E50914',
      });
    }
  };

  return (
    <div className="min-h-screen bg-black flex justify-center items-center font-sans">
      {/* Background overlay for a better look */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bca1-07e3f8eb1468/netflix-logo-v3.jpg" 
          className="w-full h-full object-cover opacity-50"
          alt="bg"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      <form 
        onSubmit={handleLogin} 
        className="relative z-10 bg-black/75 p-12 rounded-lg w-[400px] border border-zinc-800 shadow-2xl"
      >
        <h2 className="text-white text-4xl font-black mb-8 italic uppercase tracking-tighter">Sign In</h2>
        
        <input 
          type="email" 
          placeholder="Email address" 
          required
          className="w-full p-4 mb-4 bg-zinc-800 text-white rounded outline-none border-b-2 border-transparent focus:border-red-600 transition-all font-medium"
          onChange={(e) => setEmail(e.target.value)}
        />
        
        <input 
          type="password" 
          placeholder="Password" 
          required
          className="w-full p-4 mb-8 bg-zinc-800 text-white rounded outline-none border-b-2 border-transparent focus:border-red-600 transition-all font-medium"
          onChange={(e) => setPassword(e.target.value)}
        />
        
        <button className="w-full bg-red-600 text-white py-4 font-black uppercase italic tracking-widest rounded hover:bg-red-700 transition shadow-lg">
          Sign In
        </button>

        <div className="flex justify-between items-center mt-6 text-zinc-500 text-xs font-bold">
          <div className="flex items-center">
            <input type="checkbox" id="remember" className="mr-1 accent-red-600" />
            <label htmlFor="remember">Remember me</label>
          </div>
          <span className="hover:underline cursor-pointer">Need help?</span>
        </div>

        <p className="text-zinc-500 text-sm mt-12 font-medium">
          New to Netflix? <span onClick={() => navigate('/signup')} className="text-white hover:underline cursor-pointer font-bold">Sign up now.</span>
        </p>
      </form>
    </div>
  );
};

export default Login;