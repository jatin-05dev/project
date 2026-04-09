import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const MoviePlayer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const videoRef = useRef(null);
  
  // Jo data TVShows page se aaya hai usko nikalna
  const movieData = location.state?.movie;

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("00:00");
  const [duration, setDuration] = useState("00:00");

  // Agar movie ka data nahi mila toh wapas bhej do
  useEffect(() => {
    if (!movieData) {
      navigate(-1);
    }
  }, [movieData, navigate]);

  // Time format helper (00:00)
  const formatTime = (time) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const togglePlay = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgress = () => {
    const current = videoRef.current.currentTime;
    const total = videoRef.current.duration;
    setProgress((current / total) * 100);
    setCurrentTime(formatTime(current));
    setDuration(formatTime(total));
  };

  // Helper for Media URLs
  const getFullUrl = (path) => {
    if (!path) return "";
    if (path.startsWith('http')) return path;
    return `http://127.0.0.1:8000${path}`;
  };

  if (!movieData) return null;

  return (
    <div className="h-screen w-screen bg-black flex overflow-hidden font-sans">
      
      {/* --- MAIN PLAYER SECTION --- */}
      <div className="flex-1 relative group bg-black">
        
        {/* Top Overlay */}
        <div className="absolute top-0 left-0 w-full p-8 z-50 bg-gradient-to-b from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center space-x-4 text-white hover:scale-105 transition"
          >
            <span className="text-3xl">←</span>
            <div>
               <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-[0.2em]">Now Playing</p>
               <h1 className="text-xl font-black italic tracking-tighter uppercase leading-none">
                 {movieData.title} <span className="text-red-600 ml-2">| {movieData.category}</span>
               </h1>
            </div>
          </button>
        </div>

        {/* The Video Element */}
        <video 
          ref={videoRef}
          onTimeUpdate={handleProgress}
          autoPlay
          className="w-full h-full object-contain"
          poster={getFullUrl(movieData.image)}
          src={movieData.video_file ? getFullUrl(movieData.video_file) : movieData.video_url}
        />

        {/* BOTTOM CONTROLS OVERLAY */}
        <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          
          {/* Progress Bar */}
          <div 
            className="w-full h-1.5 bg-white/20 rounded-full mb-6 cursor-pointer relative overflow-hidden group/bar"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const pos = (e.clientX - rect.left) / rect.width;
              videoRef.current.currentTime = pos * videoRef.current.duration;
            }}
          >
            <div 
              style={{ width: `${progress}%` }} 
              className="h-full bg-red-600 shadow-[0_0_15px_rgba(220,38,38,0.8)]"
            ></div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8 text-white">
              <button onClick={togglePlay} className="text-3xl hover:scale-125 transition text-white">
                {isPlaying ? '⏸' : '▶'}
              </button>
              
              <div className="flex items-center space-x-2 group/vol">
                <span className="text-xl">🔊</span>
                <input 
                  type="range" min="0" max="1" step="0.1" 
                  className="w-20 accent-red-600 h-1"
                  onChange={(e) => { videoRef.current.volume = e.target.value }}
                />
              </div>

              <span className="text-sm font-mono text-zinc-300 font-bold tracking-tighter">
                {currentTime} / {duration}
              </span>
            </div>

            <div className="flex items-center space-x-6 text-white text-xl">
              <button className="hover:text-red-600 transition">💬</button>
              <button className="hover:text-red-600 transition text-2xl" onClick={() => videoRef.current.requestFullscreen()}>⛶</button>
            </div>
          </div>
        </div>
      </div>

      {/* --- SIDEBAR: "INFO" --- */}
      <div className="w-80 bg-[#050505] border-l border-white/5 p-8 hidden lg:flex flex-col">
        <h3 className="text-white font-black italic text-xs uppercase tracking-[0.3em] mb-8 border-b border-red-600 pb-2">Description</h3>
        
        <div className="space-y-6">
          <div className="aspect-[2/3] w-full rounded-xl overflow-hidden border border-white/10 shadow-2xl">
             <img src={getFullUrl(movieData.image)} className="w-full h-full object-cover" alt="Poster" />
          </div>
          <div>
            <h4 className="text-white font-black uppercase italic text-lg leading-tight">{movieData.title}</h4>
            <p className="text-green-500 font-bold text-xs mt-1">98% Match • {new Date(movieData.created_at).getFullYear()}</p>
            <p className="text-zinc-500 text-xs mt-4 leading-relaxed font-medium">
              Streaming in high quality. Make sure your internet connection is stable for 4K experience.
            </p>
          </div>
        </div>

        <div className="mt-auto bg-zinc-900/50 p-4 rounded-xl border border-white/5 backdrop-blur-md">
           <p className="text-[9px] text-zinc-500 font-black mb-2 tracking-widest uppercase">Format Details</p>
           <p className="text-white font-black text-sm italic tracking-tighter">DOLBY VISION • ATMOS</p>
        </div>
      </div>
    </div>
  );
};

export default MoviePlayer;