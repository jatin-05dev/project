 import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('stats');

  // --- 1. DATA STATES ---
  const [content, setContent] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null); 
  const [selectedVideo, setSelectedVideo] = useState(null); // Naya state video file ke liye
  const [plans, setPlans] = useState([]); 
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const localUsers = localStorage.getItem('users');
    if (localUsers) {
      setUsers(JSON.parse(localUsers));
    } else {
      setUsers([{ id: 1, name: "Rahul Kumar", email: "rahul@example.com", plan: "Premium", status: "Active" }]);
    }
  }, [activeTab]);

  useEffect(() => { 
    fetchContent(); 
    fetchPlans(); 
  }, []);

  const fetchContent = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:8000/api/content/');
      setContent(res.data);
    } catch (err) { console.log("Content Fetch Error:", err); }
  };

  const fetchPlans = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:8000/api/plans/');
      setPlans(res.data);
    } catch (err) { console.log("Plans Fetch Error:", err); }
  };

  // --- 3. MODAL & CRUD LOGIC ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});

  const openModal = (type, item = null) => {
    setModalType(type);
    setEditingId(item ? item.id : null);
    setSelectedFile(null);
    setSelectedVideo(null); // Reset video selection
    if (item) { 
      setFormData(item); 
    } else {
      setFormData(type === 'movie' ? 
        { title: '', content_type: 'movie', category: 'Trending Movies', trailer_url: '', video_url: '' } : 
        { name: '', price: '', quality: '', screens: '' }
      );
    }
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    try {
      if (modalType === 'movie') {
        const data = new FormData();
        data.append('title', formData.title);
        data.append('content_type', formData.content_type);
        data.append('category', formData.category);
        data.append('trailer_url', formData.trailer_url || '');
        data.append('video_url', formData.video_url || ''); // Naya URL field
        
        if (selectedFile) data.append('image', selectedFile);
        if (selectedVideo) data.append('video_file', selectedVideo); // Naya Video File field

        if (editingId) { await axios.put(`http://127.0.0.1:8000/api/content/${editingId}/`, data); } 
        else { await axios.post('http://127.0.0.1:8000/api/content/', data); }
        fetchContent();
      } else {
        if (editingId) {
          await axios.put(`http://127.0.0.1:8000/api/plans/${editingId}/`, formData);
        } else {
          await axios.post('http://127.0.0.1:8000/api/plans/', formData);
        }
        fetchPlans();
      }
      setIsModalOpen(false);
      setEditingId(null);
    } catch (err) { alert("Error: " + JSON.stringify(err.response?.data)); }
  };

  const handleDelete = async (type, id) => {
    if (window.confirm("Bhai, pakka delete karna hai?")) {
      try {
        const url = type === 'movie' ? `content/${id}/` : `plans/${id}/`;
        await axios.delete(`http://127.0.0.1:8000/api/${url}`);
        type === 'movie' ? fetchContent() : fetchPlans();
      } catch (err) { alert("Delete fail ho gaya!"); }
    }
  };

  return (
    <div className="flex h-screen bg-[#0b0b0b] text-gray-200 font-sans overflow-hidden">
      {/* SIDEBAR */}
      <div className="w-72 bg-[#141414] border-r border-zinc-800 flex flex-col shadow-2xl z-50">
        <div className="p-8 pb-12">
          <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="Netflix" className="w-32" />
          <p className="text-[10px] text-zinc-500 font-bold tracking-[0.3em] mt-2 ml-1 uppercase">Admin Control</p>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          {[{ id: 'stats', label: 'Dashboard', icon: '🏠' }, { id: 'movies', label: 'Content', icon: '🎥' }, { id: 'plans', label: 'Plans', icon: '💎' }, { id: 'users', label: 'Users', icon: '👤' }, { id: 'settings', label: 'Settings', icon: '⚙️' }].map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} 
              className={`w-full flex items-center space-x-4 px-4 py-3 rounded-xl transition-all duration-300 ${activeTab === tab.id ? 'bg-red-600 text-white shadow-lg shadow-red-900/40' : 'hover:bg-zinc-800/50 text-zinc-400'}`}>
              <span className="text-sm">{tab.icon}</span>
              <span className="capitalize font-semibold text-sm">{tab.label}</span>
            </button>
          ))}
        </nav>
        <div className="p-6 border-t border-zinc-800/50">
           <div className="bg-zinc-900/50 p-4 rounded-2xl mb-4 flex items-center space-x-3">
             <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-red-600 to-red-800 flex items-center justify-center font-bold italic shadow-lg">J</div>
             <div><p className="text-xs font-bold text-white uppercase tracking-tighter">Jatin (SuperAdmin)</p></div>
           </div>
           <button onClick={() => navigate('/')} className="w-full py-3 rounded-xl bg-zinc-800 hover:bg-red-600 transition-all font-bold text-sm">Logout</button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto bg-gradient-to-b from-[#141414] to-[#0b0b0b]">
        <div className="p-10">
          {activeTab === 'stats' && (
            <div className="animate-in fade-in duration-500">
               <h2 className="text-2xl font-black italic uppercase tracking-widest mb-8">Overview</h2>
               <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <StatCard title="Total Revenue" value="₹12.4L" icon="💰" color="text-red-500" />
                <StatCard title="Subscribers" value={users.length} icon="👤" color="text-blue-500" />
                <StatCard title="Active Streams" value="842" icon="🔥" color="text-orange-500" />
                <StatCard title="Server" value="99.9%" icon="⚡" color="text-green-500" />
              </div>
            </div>
          )}

          {activeTab === 'movies' && (
            <div className="bg-zinc-900/30 border border-zinc-800 rounded-[32px] p-8 animate-in slide-in-from-bottom-4 duration-500">
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-2xl font-black italic uppercase tracking-widest">Content Manager</h2>
                <button onClick={() => openModal('movie')} className="bg-red-600 px-6 py-2 rounded-xl text-sm font-bold shadow-lg shadow-red-900/40 hover:bg-red-700">+ Add Content</button>
              </div>
              <table className="w-full text-left">
                <thead className="text-zinc-600 text-[10px] uppercase border-b border-zinc-800/50">
                  <tr><th className="pb-4">Poster</th><th className="pb-4">Title</th><th className="pb-4">Type</th><th className="pb-4">Category</th><th className="pb-4 text-right">Actions</th></tr>
                </thead>
                <tbody>
                  {content.map(m => (
                    <tr key={m.id} className="border-b border-zinc-800/10 hover:bg-white/[0.02] transition">
                      <td className="py-4"><img src={m.image} className="w-10 h-14 object-cover rounded" alt="poster" /></td>
                      <td className="py-4 font-bold text-white">{m.title}</td>
                      <td className="py-4 text-[10px] font-black text-red-600 uppercase italic">{m.content_type}</td>
                      <td className="py-4 text-sm text-zinc-400">{m.category}</td>
                      <td className="py-4 text-right space-x-4">
                        <button onClick={() => openModal('movie', m)} className="text-blue-500 hover:text-blue-400 text-xs font-bold">EDIT</button>
                        <button onClick={() => handleDelete('movie', m.id)} className="text-red-600 hover:text-red-500 text-xs font-bold">DELETE</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'plans' && (
            <div className="bg-zinc-900/30 border border-zinc-800 rounded-[32px] p-8 animate-in slide-in-from-bottom-4 duration-500">
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-2xl font-black italic uppercase tracking-widest">Subscription Plans</h2>
                <button onClick={() => openModal('plan')} className="bg-red-600 px-6 py-2 rounded-xl text-sm font-bold shadow-lg">+ Add Plan</button>
              </div>
              <table className="w-full text-left">
                <thead className="text-zinc-600 text-[10px] uppercase border-b border-zinc-800/50">
                  <tr><th className="pb-4">Name</th><th className="pb-4">Price</th><th className="pb-4">Quality</th><th className="pb-4">Screens</th><th className="pb-4 text-right">Actions</th></tr>
                </thead>
                <tbody>
                  {plans.map(p => (
                    <tr key={p.id} className="border-b border-zinc-800/10 hover:bg-white/[0.02] transition">
                      <td className="py-4 font-bold text-white">{p.name}</td>
                      <td className="py-4 text-sm text-zinc-400">₹{p.price}</td>
                      <td className="py-4 text-[10px] font-black text-red-600 uppercase italic">{p.quality}</td>
                      <td className="py-4 text-sm text-zinc-400">{p.screens}</td>
                      <td className="py-4 text-right space-x-4">
                        <button onClick={() => openModal('plan', p)} className="text-blue-500 hover:text-blue-400 text-xs font-bold">EDIT</button>
                        <button onClick={() => handleDelete('plan', p.id)} className="text-red-600 hover:text-red-500 text-xs font-bold">DELETE</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'users' && (
             <div className="bg-zinc-900/30 border border-zinc-800 rounded-[32px] p-8 animate-in fade-in duration-500">
               <h2 className="text-2xl font-black italic uppercase tracking-widest mb-10">User Database</h2>
               <table className="w-full text-left">
                 <thead className="text-zinc-600 text-[10px] uppercase border-b border-zinc-800/50">
                   <tr><th className="pb-4">User Details</th><th className="pb-4">Plan</th><th className="pb-4">Status</th></tr>
                 </thead>
                 <tbody>
                   {users.map((u, index) => (
                     <tr key={index} className="border-b border-zinc-800/10 hover:bg-white/[0.02] transition">
                       <td className="py-4 font-bold text-white">{u.name || u.email.split('@')[0]}<p className="text-[10px] text-zinc-500">{u.email}</p></td>
                       <td className="py-4 text-sm text-zinc-400">{u.plan || 'Free'}</td>
                       <td className="py-4"><span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${u.status === 'Active' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>{u.status || 'Inactive'}</span></td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-6">
          <div className="bg-[#141414] w-full max-w-md border border-zinc-800 rounded-[40px] p-10 shadow-3xl">
             <h2 className="text-2xl font-black italic uppercase mb-8 underline decoration-red-600 underline-offset-8 decoration-4">{editingId ? 'Edit Entry' : 'Add New Entry'}</h2>
             <div className="space-y-4 text-white">
                {modalType === 'movie' ? (
                  <>
                    <input value={formData.title || ''} onChange={e => setFormData({...formData, title:e.target.value})} className="w-full bg-zinc-900 border border-zinc-800 p-4 rounded-2xl text-sm outline-none" placeholder="Movie Title" />
                    
                    <div className="flex flex-col space-y-1">
                      <label className="text-[10px] font-bold text-zinc-500 uppercase ml-1">Poster Image</label>
                      <input type="file" onChange={e => setSelectedFile(e.target.files[0])} className="text-xs text-zinc-400 bg-zinc-900 p-3 rounded-xl border border-zinc-800 cursor-pointer" />
                    </div>

                    <div className="flex flex-col space-y-1">
                      <label className="text-[10px] font-bold text-zinc-500 uppercase ml-1">Movie Video File (MP4)</label>
                      <input type="file" accept="video/*" onChange={e => setSelectedVideo(e.target.files[0])} className="text-xs text-zinc-400 bg-zinc-900 p-3 rounded-xl border border-zinc-800 cursor-pointer" />
                    </div>

                    <div className="flex gap-4">
                      <select value={formData.content_type || 'movie'} onChange={e => setFormData({...formData, content_type:e.target.value})} className="flex-1 bg-zinc-900 border border-zinc-800 p-4 rounded-2xl text-sm outline-none"><option value="movie">Movie</option><option value="tv_show">TV Show</option></select>
                      <select value={formData.category || 'Trending Movies'} onChange={e => setFormData({...formData, category:e.target.value})} className="flex-1 bg-zinc-900 border border-zinc-800 p-4 rounded-2xl text-sm outline-none"><option value="Trending Movies">Trending</option><option value="Blockbuster Action Movies">Action</option><option value="Comedy Hits">Comedy</option></select>
                    </div>

                    <input value={formData.trailer_url || ''} onChange={e => setFormData({...formData, trailer_url:e.target.value})} className="w-full bg-zinc-900 border border-zinc-800 p-4 rounded-2xl text-sm outline-none" placeholder="Trailer URL (YouTube)" />
                    <input value={formData.video_url || ''} onChange={e => setFormData({...formData, video_url:e.target.value})} className="w-full bg-zinc-900 border border-zinc-800 p-4 rounded-2xl text-sm outline-none" placeholder="External Video URL" />
                  </>
                ) : (
                  <>
                    <input value={formData.name || ''} onChange={e => setFormData({...formData, name:e.target.value})} className="w-full bg-zinc-900 border border-zinc-800 p-4 rounded-2xl text-sm outline-none" placeholder="Plan Name" />
                    <input value={formData.price || ''} onChange={e => setFormData({...formData, price:e.target.value})} className="w-full bg-zinc-900 border border-zinc-800 p-4 rounded-2xl text-sm outline-none" placeholder="Price" />
                    <input value={formData.quality || ''} onChange={e => setFormData({...formData, quality:e.target.value})} className="w-full bg-zinc-900 border border-zinc-800 p-4 rounded-2xl text-sm outline-none" placeholder="Quality (4K, 1080p)" />
                    <input value={formData.screens || ''} onChange={e => setFormData({...formData, screens:e.target.value})} className="w-full bg-zinc-900 border border-zinc-800 p-4 rounded-2xl text-sm outline-none" placeholder="Screens Count" />
                  </>
                )}
             </div>
             <div className="mt-10 flex space-x-4">
               <button onClick={handleSave} className="flex-1 bg-red-600 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-red-700">Confirm Action</button>
               <button onClick={() => { setIsModalOpen(false); setEditingId(null); }} className="px-8 bg-zinc-800 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-zinc-700">Back</button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

const StatCard = ({ title, value, icon, color }) => (
  <div className="bg-zinc-900/30 border border-zinc-800 p-6 rounded-3xl group">
    <div className="flex justify-between items-start mb-4">
      <div className="w-12 h-12 rounded-2xl bg-zinc-900 flex items-center justify-center text-xl group-hover:scale-110 transition">{icon}</div>
      <span className="text-[10px] font-black text-zinc-700 uppercase italic">Live</span>
    </div>
    <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-1">{title}</p>
    <p className={`text-3xl font-black ${color}`}>{value}</p>
  </div>
);

export default AdminDashboard;