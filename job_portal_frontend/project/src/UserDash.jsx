 import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserDash() {
  const [jobs, setJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]); // Applied jobs list
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("home"); // Sidebar control
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Your application for Web Developer was viewed.", date: "2 mins ago" },
    { id: 2, message: "New Job Alert: Python Developer in Bhopal", date: "1 hour ago" }
  ]);

  const token = localStorage.getItem('token');

  // Backend se data lana
  useEffect(() => {
    const fetchData = async () => {
      try {
        const jobsRes = await axios.get('http://127.0.0.1:8000/api/jobs/');
        setJobs(jobsRes.data);

        if (token) {
          const appliedRes = await axios.get('http://127.0.0.1:8000/api/my-applications/', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setAppliedJobs(appliedRes.data);
        }
      } catch (err) {
        console.error("Data fetch error", err);
      }
    };
    fetchData();
  }, [token]);

  const handleApply = async (jobId) => {
    if (!token) {
      alert("Pehle Login karein!");
      return;
    }
    try {
      await axios.post(`http://127.0.0.1:8000/api/apply/${jobId}/`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Applied Successfully!");
      // List update logic
      const appliedRes = await axios.get('http://127.0.0.1:8000/api/my-applications/', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAppliedJobs(appliedRes.data);
    } catch (err) {
      alert("Error: " + (err.response?.data?.error || "Already Applied!"));
    }
  };

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // --- SECTIONS ---

  const HomeSection = () => (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <h1 className="text-4xl font-black italic tracking-tighter text-gray-800">JOBS FOR YOU</h1>
        <input 
          type="text" 
          placeholder="Search City or Title..." 
          className="border-2 border-gray-200 p-4 rounded-2xl w-full md:w-96 shadow-sm outline-none focus:border-blue-500 transition"
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredJobs.length > 0 ? filteredJobs.map(job => (
          <div key={job.id} className="p-8 bg-white border border-gray-100 rounded-[2rem] shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2">
            <h3 className="text-2xl font-black text-gray-800 uppercase mb-2">{job.title}</h3>
            <p className="text-blue-600 font-black text-xl mb-1">₹ {job.salary}</p>
            <p className="text-gray-400 font-bold mb-8 uppercase text-sm tracking-wider">{job.city}</p>
            <button 
              onClick={() => handleApply(job.id)} 
              className={`w-full py-4 rounded-2xl font-black shadow-lg transition active:scale-95 ${
                appliedJobs.some(aj => aj.job === job.id) 
                ? "bg-gray-200 text-gray-500 cursor-not-allowed" 
                : "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200"
              }`}
            >
              {appliedJobs.some(aj => aj.job === job.id) ? "APPLIED" : "APPLY NOW"}
            </button>
          </div>
        )) : <p className="text-center col-span-full py-10 font-bold text-gray-400">NO JOBS FOUND...</p>}
      </div>
    </div>
  );

  const AppliedSection = () => (
    <div className="max-w-3xl">
      <h2 className="text-3xl font-black mb-8 italic uppercase text-gray-800">My Applications</h2>
      <div className="space-y-4">
        {appliedJobs.length > 0 ? appliedJobs.map(app => (
          <div key={app.id} className="p-6 bg-white rounded-3xl shadow-md border-l-8 border-blue-600 flex justify-between items-center">
            <div>
              <h4 className="font-black text-xl uppercase">{app.job_title}</h4>
              <p className="text-gray-400 font-bold">Status: <span className="text-blue-600 uppercase">{app.status || 'Pending'}</span></p>
            </div>
            <div className="text-right">
              <p className="text-xs font-bold text-gray-300 italic">{app.applied_at || 'Recently'}</p>
            </div>
          </div>
        )) : <p className="font-bold text-gray-400">Aapne abhi tak kisi job ke liye apply nahi kiya hai.</p>}
      </div>
    </div>
  );

  const NotificationSection = () => (
    <div className="max-w-2xl">
      <h2 className="text-3xl font-black mb-8 italic uppercase text-gray-800">Notifications</h2>
      <div className="space-y-4">
        {notifications.map(n => (
          <div key={n.id} className="p-5 bg-blue-50 rounded-2xl flex gap-4 items-center border border-blue-100">
            <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse"></div>
            <div>
              <p className="font-bold text-gray-800">{n.message}</p>
              <p className="text-xs text-gray-400">{n.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const ResumeSection = () => (
    <div className="max-w-2xl bg-white p-10 rounded-[3rem] shadow-xl border-2 border-dashed border-gray-200 text-center">
      <h2 className="text-2xl font-black mb-4 uppercase">My Resume</h2>
      <p className="text-gray-400 font-bold mb-8 italic">Upload your latest CV to attract top recruiters.</p>
      <input type="file" id="cv" className="hidden" />
      <label htmlFor="cv" className="bg-black text-white px-10 py-4 rounded-2xl font-black cursor-pointer hover:bg-gray-800 transition block w-fit mx-auto">
        UPLOAD NEW PDF
      </label>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      {/* Sidebar */}
      <div className="w-24 md:w-64 bg-white border-r border-gray-100 flex flex-col p-6 gap-10 shadow-sm">
        <div className="text-2xl font-black italic tracking-tighter text-blue-600 hidden md:block">JOBPORTAL</div>
        <nav className="flex flex-col gap-2">
          {['home', 'applied', 'notifications', 'resume'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`p-4 rounded-2xl font-black text-left uppercase transition-all ${
                activeTab === tab ? "bg-blue-600 text-white shadow-lg shadow-blue-200" : "text-gray-400 hover:bg-gray-100"
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 md:p-12 overflow-y-auto">
        {activeTab === 'home' && <HomeSection />}
        {activeTab === 'applied' && <AppliedSection />}
        {activeTab === 'notifications' && <NotificationSection />}
        {activeTab === 'resume' && <ResumeSection />}
      </div>
    </div>
  );
}

export default UserDash;