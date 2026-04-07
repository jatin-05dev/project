 import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserDash() {
  const [jobs, setJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("home");
  const [userProfile, setUserProfile] = useState(null);

  const token = localStorage.getItem('token');
  const BASE_URL = 'http://127.0.0.1:8000';

  useEffect(() => {
    fetchData();
    if (token) fetchProfile();
  }, [token]);

  const fetchData = async () => {
    try {
      const jobsRes = await axios.get(`${BASE_URL}/api/jobs/`);
      setJobs(jobsRes.data);
      if (token) {
        const appRes = await axios.get(`${BASE_URL}/api/applications/`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAppliedJobs(appRes.data);
      }
    } catch (err) { console.error(err); }
  };

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/profile/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUserProfile(res.data);
    } catch (err) { console.error(err); }
  };

  const handleApply = async (jobId) => {
    if (!token) return alert("Pehle login karein!");
    try {
      await axios.post(`${BASE_URL}/api/jobs/${jobId}/apply/`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Applied!");
      fetchData();
    } catch (err) { alert("Error applying"); }
  };

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // --- SECTIONS ---

  const HomeSection = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center border border-black p-3 bg-white">
        <h2 className="font-bold uppercase underline">Jobs Available</h2>
        <input 
          type="text" 
          placeholder="SEARCH CITY/TITLE..." 
          className="border border-black p-1 text-xs outline-none uppercase"
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredJobs.map(job => {
          const isApplied = appliedJobs.some(aj => aj.job === job.id);
          return (
            <div key={job.id} className="p-4 border border-black bg-white">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold uppercase">{job.title}</h3>
                <span className="font-bold text-xs">₹{job.salary}</span>
              </div>
              <p className="text-gray-500 text-[10px] font-bold uppercase mb-4">Location: {job.city}</p>
              <button 
                onClick={() => handleApply(job.id)}
                disabled={isApplied}
                className={`w-full py-2 border border-black font-bold text-xs uppercase transition-all ${
                  isApplied ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-black text-white hover:bg-white hover:text-black"
                }`}
              >
                {isApplied ? "Applied Already" : "Apply Now"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );

  const AppliedSection = () => (
    <div className="border border-black bg-white overflow-hidden">
      <div className="p-3 border-b border-black bg-gray-100">
        <h2 className="text-xs font-bold uppercase">My Applications</h2>
      </div>
      {appliedJobs.map(app => (
        <div key={app.id} className="p-4 border-b border-black last:border-0 flex justify-between items-center">
          <div>
            <p className="font-bold uppercase text-xs">{app.job_title}</p>
            <p className="text-[10px] mt-1">Status: <span className="underline">{app.status || 'Pending'}</span></p>
          </div>
          <span className="text-[10px] text-gray-500 font-bold uppercase">
            {new Date(app.applied_at).toLocaleDateString()}
          </span>
        </div>
      ))}
      {appliedJobs.length === 0 && <p className="p-10 text-center text-xs uppercase">No applications yet.</p>}
    </div>
  );

  const ResumeSection = () => (
    <div className="border border-black bg-white p-5">
      <h2 className="font-bold uppercase underline mb-5">Database Resume</h2>
      {userProfile?.resume ? (
        <div className="space-y-4">
          <div className="border border-black p-3 flex justify-between items-center">
            <span className="text-xs font-bold uppercase">Resume_File.pdf</span>
            <a 
              href={userProfile.resume.startsWith('http') ? userProfile.resume : `${BASE_URL}${userProfile.resume}`} 
              target="_blank" 
              rel="noreferrer"
              className="border border-black px-4 py-1 text-xs font-bold hover:bg-black hover:text-white"
            >
              OPEN PDF
            </a>
          </div>
          <iframe 
            src={userProfile.resume.startsWith('http') ? userProfile.resume : `${BASE_URL}${userProfile.resume}`} 
            className="w-full h-96 border border-black"
            title="Resume"
          />
        </div>
      ) : (
        <p className="text-xs uppercase text-center py-10">No resume found in DB.</p>
      )}
    </div>
  );

  return (
    <div className="flex min-h-screen bg-white font-mono text-black">
      {/* SIDEBAR */}
      <div className="w-56 border-r border-black flex flex-col p-5">
        <div className="mb-10">
          <h1 className="text-xl font-bold uppercase border-b-2 border-black pb-2 tracking-tighter">Job_Portal</h1>
        </div>
        
        <nav className="flex-1 space-y-2">
          {['home', 'applied', 'resume'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`w-full p-2 text-left text-xs font-bold uppercase transition-all border ${
                activeTab === tab ? "bg-black text-white border-black" : "border-white hover:border-black"
              }`}
            >
              [{tab}]
            </button>
          ))}
        </nav>

        <div className="pt-5 border-t border-black">
           <button 
             onClick={() => {localStorage.clear(); window.location.reload();}}
             className="w-full text-left text-[10px] font-bold text-red-600 uppercase hover:underline"
           >
             Logout_Session
           </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-8">
        {activeTab === 'home' && <HomeSection />}
        {activeTab === 'applied' && <AppliedSection />}
        {activeTab === 'resume' && <ResumeSection />}
      </div>
    </div>
  );
}

export default UserDash;