  import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminDash() {
  const [apps, setApps] = useState([]);
  const [jobs, setJobs] = useState([]); // Jobs list for CRUD
  const [showForm, setShowForm] = useState(false);
  const [editingJob, setEditingJob] = useState(null); // Edit track karne ke liye
  const [newJob, setNewJob] = useState({ title: '', salary: '', city: '', description: '' });

  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };

  // --- FETCH DATA ---
  const fetchData = async () => {
    try {
      const appRes = await axios.get('http://127.0.0.1:8000/api/all-apps/', { headers });
      const jobRes = await axios.get('http://127.0.0.1:8000/api/jobs/');
      setApps(appRes.data);
      setJobs(jobRes.data);
    } catch (err) {
      console.error("Fetch error", err);
    }
  };

  useEffect(() => { fetchData(); }, []);

  // --- APPLICATION ACTIONS (LOCK AFTER ACTION) ---
  const handleStatus = async (id, status) => {
    try {
      await axios.post(`http://127.0.0.1:8000/api/app-status/${id}/`, { status }, { headers });
      alert(`Application ${status}!`);
      fetchData(); 
    } catch (err) {
      alert("Status update failed");
    }
  };

  // --- JOB CRUD ACTIONS ---
  const handleAddOrUpdateJob = async (e) => {
    e.preventDefault();
    try {
      if (editingJob) {
        // UPDATE Logic
        await axios.put(`http://127.0.0.1:8000/api/jobs/${editingJob.id}/`, newJob, { headers });
        alert("Job Updated!");
      } else {
        // CREATE Logic
        await axios.post('http://127.0.0.1:8000/api/add-job/', newJob, { headers });
        alert("Job Posted!");
      }
      setNewJob({ title: '', salary: '', city: '', description: '' });
      setEditingJob(null);
      setShowForm(false);
      fetchData();
    } catch (err) {
      alert("Error saving job!");
    }
  };

  const deleteJob = async (id) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/jobs/${id}/`, { headers });
        fetchData();
      } catch (err) {
        alert("Delete failed!");
      }
    }
  };

  const startEdit = (job) => {
    setEditingJob(job);
    setNewJob({ title: job.title, salary: job.salary, city: job.city, description: job.description });
    setShowForm(true);
    window.scrollTo(0, 0);
  };

  return (
    <div className="p-10 bg-gray-50 min-h-screen font-sans text-gray-900">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-black italic tracking-tighter uppercase">Admin Console</h1>
        <button 
          onClick={() => { setShowForm(!showForm); setEditingJob(null); setNewJob({title:'', salary:'', city:'', description:''}); }}
          className="bg-black text-white px-8 py-4 rounded-2xl font-black hover:bg-gray-800 transition shadow-xl"
        >
          {showForm ? "CLOSE" : "+ POST NEW JOB"}
        </button>
      </div>

      {/* JOB FORM (CREATE/EDIT) */}
      {showForm && (
        <form onSubmit={handleAddOrUpdateJob} className="bg-white p-8 rounded-[2.5rem] shadow-2xl mb-12 border-4 border-blue-600 animate-in slide-in-from-top duration-500">
          <h2 className="text-xl font-black mb-6 uppercase text-blue-600">{editingJob ? 'Edit Vacancy' : 'New Vacancy'}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <input type="text" placeholder="Job Title" className="p-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-blue-500 outline-none transition" value={newJob.title} onChange={(e) => setNewJob({...newJob, title: e.target.value})} required />
            <input type="text" placeholder="Salary" className="p-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-blue-500 outline-none transition" value={newJob.salary} onChange={(e) => setNewJob({...newJob, salary: e.target.value})} required />
            <input type="text" placeholder="City" className="p-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-blue-500 outline-none transition" value={newJob.city} onChange={(e) => setNewJob({...newJob, city: e.target.value})} required />
            <textarea placeholder="Job Description" className="p-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-blue-500 outline-none transition md:col-span-3 h-32" value={newJob.description} onChange={(e) => setNewJob({...newJob, description: e.target.value})} required />
          </div>
          <button type="submit" className="mt-8 w-full bg-blue-600 text-white py-5 rounded-2xl font-black uppercase tracking-tighter hover:bg-blue-700 transition shadow-lg shadow-blue-200 text-lg">
            {editingJob ? "SAVE CHANGES" : "PUBLISH NOW"}
          </button>
        </form>
      )}

      {/* MANAGE JOBS (LISTING FOR EDIT/DELETE) */}
      <section className="mb-20">
        <h2 className="text-2xl font-black mb-6 uppercase italic">Active Vacancies</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {jobs.map(job => (
            <div key={job.id} className="p-6 bg-white rounded-3xl shadow-sm border border-gray-100 flex justify-between items-center">
              <div>
                <p className="font-black text-lg uppercase leading-tight">{job.title}</p>
                <p className="text-gray-400 font-bold text-xs uppercase">{job.city} • ₹{job.salary}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => startEdit(job)} className="p-3 bg-gray-100 rounded-xl hover:bg-blue-100 hover:text-blue-600 transition">✏️</button>
                <button onClick={() => deleteJob(job.id)} className="p-3 bg-gray-100 rounded-xl hover:bg-red-100 hover:text-red-600 transition">🗑️</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* APPLICATIONS SECTION */}
      <section>
        <h2 className="text-2xl font-black mb-6 uppercase italic flex items-center gap-2">
          Applications Inbox
          <span className="bg-red-500 text-white text-[10px] px-2 py-1 rounded-full">{apps.filter(a => a.status === 'Pending').length} PENDING</span>
        </h2>
        <div className="space-y-4">
          {apps.map(app => {
            const isProcessed = app.status === 'Accepted' || app.status === 'Rejected';
            return (
              <div key={app.id} className={`p-6 rounded-[2rem] flex flex-col md:flex-row justify-between items-center border transition-all ${isProcessed ? 'bg-gray-100 opacity-70 border-gray-200' : 'bg-white shadow-xl border-transparent hover:scale-[1.01]'}`}>
                <div>
                  <p className="font-black text-xl uppercase tracking-tighter">{app.user_name || app.user.username}</p>
                  <p className="text-blue-600 font-bold uppercase text-xs">Target: {app.job_title || app.job.title}</p>
                  {isProcessed && <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase mt-2 inline-block ${app.status === 'Accepted' ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-700'}`}>{app.status}</span>}
                </div>

                {!isProcessed ? (
                  <div className="flex gap-3 mt-4 md:mt-0">
                    <button onClick={() => handleStatus(app.id, 'Accepted')} className="bg-green-600 text-white px-8 py-3 rounded-2xl font-black hover:bg-green-700 transition shadow-lg shadow-green-100 uppercase text-xs">Accept</button>
                    <button onClick={() => handleStatus(app.id, 'Rejected')} className="bg-red-500 text-white px-8 py-3 rounded-2xl font-black hover:bg-red-600 transition shadow-lg shadow-red-100 uppercase text-xs">Reject</button>
                  </div>
                ) : (
                  <div className="text-gray-400 font-black italic uppercase text-xs mt-4 md:mt-0 underline decoration-2">Processed & Logged</div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default AdminDash;