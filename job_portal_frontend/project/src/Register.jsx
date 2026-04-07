 import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [formData, setFormData] = useState({ username: '', email: '', password: '', phone: '', city: '' });
  const [files, setFiles] = useState({ profile_pic: null, resume: null });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    if (files.profile_pic) data.append('profile_pic', files.profile_pic);
    if (files.resume) data.append('resume', files.resume);

    try {
      await axios.post('http://127.0.0.1:8000/api/register/', data);
      alert("Registration Successful! You can now login.");
    } catch (err) { 
      alert("Registration Failed: " + (err.response?.data?.error || "Something went wrong")); 
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[90vh] bg-gray-50 px-4 py-12">
      <div className="bg-white p-8 md:p-10 rounded-xl border border-gray-200 shadow-sm w-full max-w-[500px]">
        
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Create Account</h2>
          <p className="text-sm text-gray-500 mt-1 font-medium">Join JobWay to explore opportunities</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1.5 ml-1">Username</label>
              <input 
                type="text" 
                placeholder="johndoe" 
                className="w-full px-4 py-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm transition" 
                onChange={e => setFormData({...formData, username: e.target.value})} 
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1.5 ml-1">Email Address</label>
              <input 
                type="email" 
                placeholder="john@example.com" 
                className="w-full px-4 py-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm transition" 
                onChange={e => setFormData({...formData, email: e.target.value})} 
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1.5 ml-1">Phone</label>
              <input 
                type="text" 
                placeholder="+91..." 
                className="w-full px-4 py-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm transition" 
                onChange={e => setFormData({...formData, phone: e.target.value})} 
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1.5 ml-1">City</label>
              <input 
                type="text" 
                placeholder="Bhopal" 
                className="w-full px-4 py-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm transition" 
                onChange={e => setFormData({...formData, city: e.target.value})} 
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1.5 ml-1">Password</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                className="w-full px-4 py-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm transition" 
                onChange={e => setFormData({...formData, password: e.target.value})} 
                required
              />
            </div>
          </div>

          <hr className="my-6 border-gray-100" />

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Profile Picture</label>
              <input 
                type="file" 
                onChange={e => setFiles({...files, profile_pic: e.target.files[0]})} 
                className="block w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" 
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Resume (PDF Only)</label>
              <input 
                type="file" 
                onChange={e => setFiles({...files, resume: e.target.files[0]})} 
                className="block w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" 
              />
            </div>
          </div>

          <button className="w-full mt-6 bg-gray-900 text-white py-3 rounded font-bold text-sm uppercase tracking-wide hover:bg-gray-800 transition shadow-sm">
            Create Employee Account
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;