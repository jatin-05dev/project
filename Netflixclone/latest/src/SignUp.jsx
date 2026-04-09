 import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Alerts ke liye

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    
    // 1. Pehle se saved users ko nikalna
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    
    // Check karna ki user pehle se toh nahi hai
    const userExists = existingUsers.find(u => u.email === email);
    if (userExists) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ye email pehle se registered hai!',
        background: '#141414',
        color: '#fff'
      });
      return;
    }

    // 2. Naya user object (isPaid: false ke saath)
    const newUser = { 
      email, 
      password, 
      isPaid: false // By default naya user unpaid rahega
    };

    // 3. Wapas save karna
    existingUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(existingUsers));
    
    Swal.fire({
      icon: 'success',
      title: 'Account Created!',
      text: 'Ab login karke apna plan choose karein.',
      background: '#141414',
      color: '#fff',
      confirmButtonColor: '#E50914'
    }).then(() => {
      navigate('/login');
    });
  };

  return (
    <div className="min-h-screen bg-black flex justify-center items-center font-sans">
      <form onSubmit={handleSignUp} className="bg-zinc-900/50 p-10 rounded-lg w-96 border border-zinc-800 backdrop-blur-sm">
        <h2 className="text-white text-3xl font-black mb-8 italic uppercase tracking-tighter">Sign Up</h2>
        
        <input 
          type="email" 
          placeholder="Email Address" 
          required
          className="w-full p-4 mb-4 bg-zinc-800 text-white rounded outline-none border border-transparent focus:border-red-600 transition-all font-medium"
          onChange={(e) => setEmail(e.target.value)}
        />
        
        <input 
          type="password" 
          placeholder="Password" 
          required
          className="w-full p-4 mb-8 bg-zinc-800 text-white rounded outline-none border border-transparent focus:border-red-600 transition-all font-medium"
          onChange={(e) => setPassword(e.target.value)}
        />
        
        <button className="w-full bg-red-600 text-white py-4 font-black uppercase italic tracking-widest rounded hover:bg-red-700 transition shadow-lg shadow-red-600/20">
          Get Started
        </button>
        
        <p className="text-zinc-500 text-sm mt-6 text-center font-medium">
          Already have an account? <span onClick={() => navigate('/login')} className="text-white hover:underline cursor-pointer">Log In</span>
        </p>
      </form>
    </div>
  );
};

export default SignUp;