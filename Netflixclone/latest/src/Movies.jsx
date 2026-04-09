 import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Alerts ke liye
import Navbar from './Navbar';
import Footer from './Footer';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:8000/api/content/');
        const onlyMovies = res.data.filter(item => 
          item.content_type === 'movie' || (item.content_type && item.content_type.toLowerCase().includes('movie'))
        );
        setMovies(onlyMovies);
      } catch (err) {
        console.error("Backend Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  const categories = [...new Set(movies.map(m => m.category || "Trending Now"))];

  const getFullUrl = (path) => {
    if (!path) return "https://via.placeholder.com/400x225?text=No+Poster";
    if (path.startsWith('http')) return path;
    return `http://127.0.0.1:8000${path}`;
  };

  // --- UPDATED PLAY LOGIC ---
  const handlePlay = (movie) => {
    // 1. Current user ka data nikalna
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    // 2. Check karna ki user logged in hai AUR uska status 'isPaid' true hai ya nahi
    if (currentUser && currentUser.isPaid === true) {
      // Agar paid hai toh seedha player par
      navigate('/MoviePlayer', { state: { movie: movie } });
    } else {
      // Agar paid nahi hai toh sexy alert dikhao
      Swal.fire({
        title: 'Premium Movie',
        text: 'Ye dekhne ke liye subscription zaroori hai boss!',
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
          navigate('/new-and-popular'); // Plans waale page ka route
        }
      });
    }
  };

  return (
    <div className="bg-[#141414] min-h-screen text-white overflow-x-hidden font-sans">
      <Navbar />

      <div className="pt-24 px-4 md:px-12 flex items-center space-x-8">
        <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-tighter italic">Movies</h1>
        <div className="relative">
          <select className="bg-black border border-white text-white text-xs py-1 px-4 cursor-pointer font-bold outline-none appearance-none pr-8">
            <option>Genres</option>
            {categories.map(cat => <option key={cat}>{cat}</option>)}
          </select>
          <div className="absolute right-2 top-2 pointer-events-none text-[10px]">▼</div>
        </div>
      </div>

      <div className="relative h-[75vh] w-full mt-4">
        <img 
          src="https://images.alphacoders.com/131/1312301.jpeg" 
          alt="Featured Movie" 
          className="w-full h-full object-cover brightness-[50%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-transparent to-transparent"></div>
        <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-[#141414] to-transparent"></div>

        <div className="absolute top-[30%] left-4 md:left-12 max-w-xl z-10">
          <h2 className="text-5xl md:text-7xl font-black mb-4 italic text-red-600 tracking-tighter">SPIDER-MAN</h2>
          <p className="text-sm md:text-lg mb-6 line-clamp-3 text-gray-300 font-medium">
            With Spider-Man's identity now revealed, Peter asks Doctor Strange for help. Dangerous foes from other worlds start to appear.
          </p>
          <div className="flex space-x-3">
            <button 
              onClick={() => handlePlay({title: "Spider-Man", image: "https://images.alphacoders.com/131/1312301.jpeg"})}
              className="bg-white text-black px-10 py-3 rounded font-black hover:bg-zinc-200 transition"
            >
              ▶ PLAY
            </button>
            <button className="bg-gray-500/50 text-white px-10 py-3 rounded font-bold backdrop-blur-sm">ⓘ MORE INFO</button>
          </div>
        </div>
      </div>

      <div className="relative z-10 -mt-20 pb-16 space-y-16">
        {loading ? (
          <div className="text-center py-20 text-zinc-600 font-bold animate-pulse">SYNCING WITH DATABASE...</div>
        ) : (
          categories.map((cat) => (
            <div key={cat} className="pl-4 md:pl-12 group/row">
              <h2 className="text-xl md:text-2xl font-bold mb-6 hover:text-red-600 transition cursor-pointer flex items-center">
                <span className="w-1 h-8 bg-red-600 mr-3"></span> {cat}
              </h2>
              <div className="flex space-x-6 overflow-x-scroll no-scrollbar pr-10 pb-4">
                {movies
                  .filter(movie => (movie.category || "Trending Now") === cat)
                  .map((movie) => (
                    <div 
                      key={movie.id} 
                      onClick={() => handlePlay(movie)}
                      className="min-w-[220px] md:min-w-[320px] flex flex-col space-y-3 cursor-pointer group"
                    >
                      <div className="aspect-video w-full bg-zinc-900 rounded-lg overflow-hidden border border-zinc-800 group-hover:border-zinc-500 transition-all duration-300 group-hover:scale-105 shadow-2xl">
                        <img 
                          src={getFullUrl(movie.image)} 
                          className="w-full h-full object-cover group-hover:brightness-50 transition duration-500" 
                          alt={movie.title}
                          onError={(e) => { e.target.src = "https://via.placeholder.com/400x225?text=Movie+Poster" }}
                        />
                      </div>
                      <div className="px-1">
                        <h3 className="text-sm md:text-md font-bold text-zinc-100 truncate group-hover:text-red-500 transition uppercase tracking-tight">
                          {movie.title}
                        </h3>
                        <div className="flex items-center justify-between mt-1 text-[10px] md:text-xs font-semibold text-zinc-500">
                          <span className="text-green-500">New Release</span>
                          <span className="bg-zinc-800 px-2 py-0.5 rounded text-zinc-400 uppercase">
                            {movie.category || "Movie"}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mx-4 md:mx-12 my-10 p-10 rounded-2xl bg-gradient-to-r from-zinc-900 to-black border border-zinc-800 flex flex-col md:flex-row items-center justify-between shadow-2xl">
        <div>
          <h2 className="text-3xl font-black italic text-white uppercase tracking-tighter">4K Ultra HD Streaming</h2>
          <p className="text-gray-400 text-lg max-w-lg mt-2 font-medium">Upgrade to premium and experience cinematic quality at home.</p>
        </div>
        <button 
          onClick={() => navigate('/new-and-popular')}
          className="mt-6 md:mt-0 bg-red-600 px-10 py-4 rounded-md font-black hover:bg-red-700 transition shadow-[0_0_20px_rgba(220,38,38,0.4)]"
        >
          UPGRADE NOW
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default Movies;