 import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Premium alerts ke liye
import Navbar from './Navbar';
import Footer from './Footer';

const TVShows = () => {
  const [tvShows, setTvShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:8000/api/content/');
        const onlyTV = res.data.filter(item => 
          item.content_type === 'tv_show' || (item.content_type && item.content_type.toLowerCase().includes('tv'))
        );
        setTvShows(onlyTV);
      } catch (err) {
        console.error("Backend connect nahi ho pa raha:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, []);

  const categories = [...new Set(tvShows.map(item => item.category || "New Releases"))];

  const getFullUrl = (path) => {
    if (!path) return "https://via.placeholder.com/300x450?text=No+Poster";
    if (path.startsWith('http')) return path;
    return `http://127.0.0.1:8000${path}`;
  };

  // --- UPDATED PLAY LOGIC WITH PAYMENT CHECK ---
  const handlePlay = (show) => {
    // 1. LocalStorage se user ka status check karo
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    // 2. Agar user ne payment ki hai (isPaid: true)
    if (currentUser && currentUser.isPaid === true) {
      navigate('/MoviePlayer', { state: { movie: show } });
    } else {
      // 3. Agar payment nahi ki, toh Plan choose karne ko bolo
      Swal.fire({
        title: 'Premium Content',
        text: 'Ye TV Show dekhne ke liye subscription plan zaroori hai.',
        icon: 'lock',
        background: '#141414',
        color: '#fff',
        showCancelButton: true,
        confirmButtonColor: '#E50914',
        cancelButtonColor: '#333',
        confirmButtonText: 'View Plans',
        cancelButtonText: 'Maybe Later'
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/new-and-popular'); // Plans page par bhejo
        }
      });
    }
  };

  return (
    <div className="bg-[#141414] min-h-screen text-white overflow-x-hidden font-sans">
      <Navbar />

      {/* --- HEADER --- */}
      <div className="pt-24 px-4 md:px-12 flex items-center space-x-8">
        <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-tighter italic">TV Shows</h1>
        <div className="relative">
          <select className="bg-black border border-white text-white text-xs py-1 px-4 cursor-pointer font-bold outline-none appearance-none pr-8">
            <option>Genres</option>
            {categories.map(cat => <option key={cat}>{cat}</option>)}
          </select>
          <div className="absolute right-2 top-2 pointer-events-none text-[10px]">▼</div>
        </div>
      </div>

      {/* --- HERO SECTION --- */}
      <div className="relative h-[65vh] w-full mt-4">
        <img src="https://wallpapercave.com/wp/wp5939223.jpg" className="w-full h-full object-cover brightness-[50%]" alt="Hero" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-transparent to-transparent"></div>
        <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-[#141414] to-transparent"></div>
        <div className="absolute top-[25%] left-4 md:left-12 max-w-xl">
          <h2 className="text-6xl md:text-8xl font-black mb-4 italic text-red-600 tracking-tighter">DARK</h2>
          <p className="text-sm md:text-lg mb-6 line-clamp-3 text-gray-300 font-medium leading-relaxed">
            Time travel, mystery, and a missing child. Explore the interconnected lives of four families.
          </p>
          <div className="flex space-x-3">
            <button 
              onClick={() => handlePlay({title: "Dark", image: "https://wallpapercave.com/wp/wp5939223.jpg"})}
              className="bg-white text-black px-10 py-3 rounded font-black hover:bg-zinc-200 transition"
            >
              ▶ PLAY
            </button>
            <button className="bg-gray-500/50 text-white px-10 py-3 rounded font-bold backdrop-blur-sm">ⓘ MORE INFO</button>
          </div>
        </div>
      </div>

      {/* --- DYNAMIC ROWS --- */}
      <div className="relative z-10 pb-20 space-y-16 -mt-16">
        {loading ? (
          <div className="text-center py-20 text-zinc-500 font-bold animate-pulse">Loading...</div>
        ) : (
          tvShows.length > 0 ? (
            categories.map((cat) => (
              <div key={cat} className="pl-4 md:pl-12">
                <h2 className="text-xl md:text-2xl font-bold mb-6 flex items-center">
                  <span className="w-1 h-8 bg-red-600 mr-3"></span> {cat}
                </h2>
                <div className="flex space-x-6 overflow-x-scroll no-scrollbar pr-10 pb-4">
                  {tvShows
                    .filter(show => (show.category || "New Releases") === cat)
                    .map((show) => (
                      <div 
                        key={show.id} 
                        onClick={() => handlePlay(show)} 
                        className="min-w-[160px] md:min-w-[230px] flex flex-col space-y-3 cursor-pointer group"
                      >
                        <div className="aspect-[2/3] w-full bg-zinc-900 rounded-lg overflow-hidden border border-zinc-800 group-hover:scale-105 transition-all duration-300 shadow-2xl">
                          <img 
                            src={getFullUrl(show.image)} 
                            className="w-full h-full object-cover group-hover:brightness-50 transition duration-500" 
                            alt={show.title}
                            onError={(e) => { e.target.src = "https://via.placeholder.com/300x450?text=TV+Show" }}
                          />
                        </div>
                        <div className="px-1">
                          <h3 className="text-sm md:text-md font-bold text-zinc-100 truncate group-hover:text-red-500 transition uppercase tracking-tight">
                            {show.title}
                          </h3>
                          <p className="text-[10px] md:text-xs text-green-500 font-semibold">{show.category || "TV Show"}</p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20 italic text-zinc-600">No TV Shows found.</div>
          )
        )}
      </div>
      <Footer />
    </div>
  );
};

export default TVShows;