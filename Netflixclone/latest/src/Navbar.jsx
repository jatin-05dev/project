 import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Scroll logic
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) setIsScrolled(true);
      else setIsScrolled(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 z-[100] w-full flex items-center justify-between px-4 md:px-12 py-3 transition-all duration-500 ${isScrolled ? "bg-[#141414] shadow-2xl" : "bg-transparent bg-gradient-to-b from-black/90 to-transparent"}`}>
      
      {/* LEFT SIDE: Logo & Menu Links */}
      <div className="flex items-center space-x-8">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" 
          className="h-5 md:h-7 cursor-pointer active:scale-95 transition" 
          alt="Netflix" 
          onClick={() => navigate('/')}
        />
        <ul className="hidden lg:flex space-x-5 text-sm text-gray-200">
          <li onClick={() => navigate('/')} className="cursor-pointer hover:text-gray-400 transition font-semibold text-white">Home</li>
          <li onClick={() => navigate('/tv-shows')} className="cursor-pointer hover:text-gray-400 transition">TV Shows</li>
          <li onClick={() => navigate('/movies')} className="cursor-pointer hover:text-gray-400 transition">Movies</li>
          <li onClick={() => navigate('/new-and-popular')} className="cursor-pointer hover:text-gray-400 transition">New & Popular</li>
          <li className="cursor-pointer hover:text-gray-400 transition">My List</li>
        </ul>
      </div>
      
      {/* RIGHT SIDE */}
      <div className="flex items-center space-x-5 text-white">
        
        {/* 1. SEARCH BAR */}
        <div className={`flex items-center border transition-all duration-500 px-2 py-1 ${showSearch ? 'w-40 md:w-64 border-white bg-black/60' : 'w-10 border-transparent'}`}>
          <button onClick={() => setShowSearch(!showSearch)} className="focus:outline-none text-lg hover:scale-110 transition active:scale-90">
            🔍
          </button>
          {showSearch && (
            <input 
              autoFocus
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Titles, people, genres" 
              className="bg-transparent border-none outline-none text-xs ml-2 w-full placeholder:text-gray-500 text-white"
            />
          )}
        </div>

        <button className="hidden sm:inline text-sm font-medium hover:text-gray-300 transition">Children</button>
        <button className="text-xl hover:scale-110 transition">🔔</button>

        {/* 2. PROFILE ICON (Fixed Error Link) */}
        <div className="relative group">
          <div className="flex items-center space-x-2 cursor-pointer py-2">
            <div className="h-8 w-8 rounded overflow-hidden border border-transparent group-hover:border-white transition-all duration-300 shadow-md bg-blue-600 flex items-center justify-center font-bold">
              {/* MAINE YE IMAGE CHANGE KAR DI HAI TAAKI 400 ERROR NA AAYE */}
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" 
                alt="Profile" 
                className="w-full h-full object-cover"
                onError={(e) => { e.target.style.display = 'none'; }} // Fallback agar ye bhi na chale
              />
              <span className="absolute text-[10px]">J</span>
            </div>
            <span className="text-[10px] transition-transform duration-300 group-hover:rotate-180">▼</span>
          </div>

          {/* Dropdown Menu */}
          <div className="absolute right-0 top-[90%] w-44 bg-black/95 border border-zinc-800 pt-4 pb-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 shadow-2xl translate-y-2 group-hover:translate-y-0">
            <div className="absolute -top-2 right-4 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-black/95"></div>
            
            <div className="px-4 py-2 hover:bg-zinc-800/50 flex items-center space-x-3 cursor-pointer transition">
               <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center text-[10px] font-bold text-white">J</div>
               <span className="text-xs text-gray-300">Jatin</span>
            </div>
            
            <div className="border-t border-zinc-800 mt-2 pt-2">
                <button className="w-full text-left px-4 py-2 text-xs text-gray-300 hover:underline">Account</button>
                <button className="w-full text-left px-4 py-2 text-xs text-gray-300 hover:underline">Help Center</button>
            </div>
            
            <div className="border-t border-zinc-800 mt-2 pt-2">
              <button onClick={() => navigate('/login')} className="w-full text-center text-xs font-bold text-white hover:underline py-2">
                Sign out of Netflix
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;