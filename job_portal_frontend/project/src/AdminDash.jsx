 import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminDash() {
  const [apps, setApps] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [newJob, setNewJob] = useState({ title: '', salary: '', city: '', description: '' });

  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };

  const fetchData = async () => {
    try {
      const appRes = await axios.get('http://127.0.0.1:8000/api/applications/', { headers });
      const jobRes = await axios.get('http://127.0.0.1:8000/api/jobs/');
      setApps(appRes.data);
      setJobs(jobRes.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchData(); }, []);

  const handleStatus = async (id, status) => {
    try {
      await axios.post(`http://127.0.0.1:8000/api/applications/${id}/update_status/`, { status }, { headers });
      fetchData(); 
    } catch (err) { alert("Error"); }
  };

  const handleAddOrUpdateJob = async (e) => {
    e.preventDefault();
    try {
      if (editingJob) {
        await axios.put(`http://127.0.0.1:8000/api/jobs/${editingJob.id}/`, newJob, { headers });
      } else {
        await axios.post('http://127.0.0.1:8000/api/jobs/', newJob, { headers });
      }
      setNewJob({ title: '', salary: '', city: '', description: '' });
      setEditingJob(null);
      setShowForm(false);
      fetchData();
    } catch (err) { alert("Error saving job"); }
  };

  const deleteJob = async (id) => {
    if (window.confirm("Delete?")) {
      await axios.delete(`http://127.0.0.1:8000/api/jobs/${id}/`, { headers });
      fetchData();
    }
  };

  return (
    <div className="p-5 font-mono text-sm text-black">
      
      {/* HEADER */}
      <div className="border-b-2 border-black pb-3 mb-5 flex justify-between items-center">
        <h1 className="text-xl font-bold uppercase">Admin Panel</h1>
        <button 
          onClick={() => { setShowForm(!showForm); setEditingJob(null); }}
          className="border border-black px-4 py-1 hover:bg-black hover:text-white"
        >
          {showForm ? "CLOSE FORM" : "ADD NEW JOB"}
        </button>
      </div>

      {/* BASIC FORM */}
      {showForm && (
        <form onSubmit={handleAddOrUpdateJob} className="border border-black p-4 mb-5 space-y-3 bg-white">
          <p className="font-bold border-b border-black inline-block mb-2">JOB DETAILS</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input type="text" placeholder="TITLE" className="border border-gray-400 p-2 outline-none" value={newJob.title} onChange={(e) => setNewJob({...newJob, title: e.target.value})} required />
            <input type="text" placeholder="SALARY" className="border border-gray-400 p-2 outline-none" value={newJob.salary} onChange={(e) => setNewJob({...newJob, salary: e.target.value})} required />
            <input type="text" placeholder="CITY" className="border border-gray-400 p-2 outline-none" value={newJob.city} onChange={(e) => setNewJob({...newJob, city: e.target.value})} required />
            <textarea placeholder="DESCRIPTION" className="border border-gray-400 p-2 md:col-span-3 h-20 outline-none" value={newJob.description} onChange={(e) => setNewJob({...newJob, description: e.target.value})} required />
          </div>
          <button type="submit" className="bg-black text-white px-6 py-2 font-bold uppercase">Save Job</button>
        </form>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* JOB LISTINGS */}
        <div>
          <h2 className="font-bold uppercase mb-3 underline">Job Listings ({jobs.length})</h2>
          <table className="w-full border-collapse border border-black text-xs text-left">
            <thead>
              <tr className="bg-gray-200 border-b border-black">
                <th className="p-2 border-r border-black">Role</th>
                <th className="p-2 border-r border-black">Info</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map(job => (
                <tr key={job.id} className="border-b border-black last:border-0">
                  <td className="p-2 border-r border-black font-bold">{job.title}</td>
                  <td className="p-2 border-r border-black uppercase">{job.city} / {job.salary}</td>
                  <td className="p-2 space-x-2">
                    <button onClick={() => { setEditingJob(job); setNewJob(job); setShowForm(true); }} className="underline hover:text-blue-600">Edit</button>
                    <button onClick={() => deleteJob(job.id)} className="underline hover:text-red-600">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* CANDIDATES */}
        <div>
          <h2 className="font-bold uppercase mb-3 underline">Candidate Pipeline</h2>
          <div className="border border-black bg-white">
            {apps.map(app => (
              <div key={app.id} className="p-3 border-b border-black last:border-0 flex justify-between items-center">
                <div>
                  <p className="font-bold uppercase">{app.user_name || "User"}</p>
                  <p className="text-[10px] text-gray-600">FOR: {app.job_title}</p>
                </div>
                <div className="flex gap-2">
                  {app.status === 'Pending' ? (
                    <>
                      <button onClick={() => handleStatus(app.id, 'Accepted')} className="border border-black px-2 py-1 hover:bg-gray-100">Accept</button>
                      <button onClick={() => handleStatus(app.id, 'Rejected')} className="border border-black px-2 py-1 hover:bg-gray-100">Reject</button>
                    </>
                  ) : (
                    <span className="font-bold uppercase text-[10px] bg-gray-100 px-2">{app.status}</span>
                  )}
                </div>
              </div>
            ))}
            {apps.length === 0 && <p className="p-5 text-gray-400">Empty queue</p>}
          </div>
        </div>

      </div>
    </div>
  );
}

export default AdminDash;