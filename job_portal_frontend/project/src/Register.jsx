 import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [formData, setFormData] = useState({ username: '', email: '', password: '', phone: '', city: '' });
  const [files, setFiles] = useState({ profile_pic: null, resume: null });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    data.append('profile_pic', files.profile_pic);
    data.append('resume', files.resume);

    try {
      await axios.post('http://127.0.0.1:8000/api/register/', data);
      alert("Employee Registered!");
    } catch (err) { alert("Registration Failed!"); }
  };

  return (
    <div className="flex justify-center p-10 bg-gray-50 min-h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-2xl w-[450px] space-y-4">
        <h2 className="text-2xl font-black text-blue-600 text-center uppercase">Employee Signup</h2>
        <input type="text" placeholder="Username" className="w-full p-3 border rounded-xl" onChange={e => setFormData({...formData, username: e.target.value})} />
        <input type="email" placeholder="Email" className="w-full p-3 border rounded-xl" onChange={e => setFormData({...formData, email: e.target.value})} />
        <input type="text" placeholder="Phone" className="w-full p-3 border rounded-xl" onChange={e => setFormData({...formData, phone: e.target.value})} />
        <input type="text" placeholder="City" className="w-full p-3 border rounded-xl" onChange={e => setFormData({...formData, city: e.target.value})} />
        <input type="password" placeholder="Password" className="w-full p-3 border rounded-xl" onChange={e => setFormData({...formData, password: e.target.value})} />
        
        <div>
          <label className="text-xs font-bold text-gray-500 uppercase">Profile Pic</label>
          <input type="file" onChange={e => setFiles({...files, profile_pic: e.target.files[0]})} className="w-full text-sm mt-1" />
        </div>
        <div>
          <label className="text-xs font-bold text-gray-500 uppercase">Resume (PDF)</label>
          <input type="file" onChange={e => setFiles({...files, resume: e.target.files[0]})} className="w-full text-sm mt-1" />
        </div>
        
        <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold shadow-lg hover:bg-blue-700">Register as Employee</button>
      </form>
    </div>
  );
}

export default Register;