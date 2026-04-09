 import React from 'react';
import Navbar from './Navbar';

const Hero1 = () => {
  const trending = [1, 2, 3, 4, 5, 6, 7, 8];
  const originals = [1, 2, 3, 4, 5, 6];

  return (
    <div className="relative min-h-screen bg-[#141414] overflow-x-hidden text-white">
      <Navbar />

      {/* --- HERO SECTION --- */}
      <div className="relative h-[85vh] md:h-[95vh] w-full overflow-hidden bg-black">
        <img 
          src="https://images.alphacoders.com/133/1333425.png" 
          alt="Stranger Things" 
          className="w-full h-full object-cover brightness-[70%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-transparent"></div>
        <div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-[#141414] to-transparent"></div>

        <div className="absolute top-[30%] md:top-[35%] left-4 md:left-12 max-w-[90%] md:max-w-2xl z-10">
          <h1 className="text-4xl md:text-7xl font-extrabold mb-4 drop-shadow-xl">Stranger Things</h1>
          <p className="text-sm md:text-lg font-medium mb-6 line-clamp-3">
            A young boy vanishes, a small town uncovers a mystery involving secret experiments and terrifying supernatural forces.
          </p>
          <div className="flex items-center space-x-3">
            <button className="bg-white text-black px-8 py-2 rounded hover:bg-white/80 transition font-bold text-lg">Play</button>
            <button className="bg-gray-500/50 text-white px-8 py-2 rounded hover:bg-gray-500/30 transition font-bold text-lg backdrop-blur-sm">More Info</button>
          </div>
        </div>
      </div>

      {/* --- MOVIE ROWS SECTION --- */}
      <div className="relative z-20 -mt-24 pl-4 md:pl-12 space-y-12 pb-10">
        
        {/* Row 1: Trending Now (Horizontal Posters) */}
        <div>
          <h2 className="text-xl md:text-2xl font-bold mb-4">Trending Now</h2>
          <div className="flex space-x-3 overflow-x-scroll no-scrollbar pr-10">
            {trending.map((item) => (
              <div key={item} className="min-w-[200px] md:min-w-[280px] h-28 md:h-40 bg-zinc-800 rounded-md overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300">
                <img src={`https://picsum.photos/seed/${item + 20}/400/225`} className="w-full h-full object-cover" alt="movie" />
              </div>
            ))}
          </div>
        </div>

        {/* --- ADVERTISEMENT CARD --- */}
        <div className="mr-4 md:mr-12 my-10 p-10 rounded-xl bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 flex flex-col md:flex-row items-center justify-between shadow-2xl">
          <div>
            <h2 className="text-3xl font-extrabold mb-2">Watch Everywhere</h2>
            <p className="text-gray-400 text-lg">Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.</p>
          </div>
          <button className="mt-6 md:mt-0 bg-red-600 px-8 py-3 rounded font-bold hover:bg-red-700 transition">
            Learn More
          </button>
        </div>

        {/* Row 2: Netflix Originals (Vertical Posters) */}
        <div>
          <h2 className="text-xl md:text-2xl font-bold mb-4">Netflix Originals</h2>
          <div className="flex space-x-3 overflow-x-scroll no-scrollbar pr-10">
            {originals.map((item) => (
              <div key={item} className="min-w-[160px] md:min-w-[220px] h-[240px] md:h-[330px] bg-zinc-800 rounded-md overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300 border border-zinc-800">
                <img src={`https://picsum.photos/seed/${item + 80}/300/450`} className="w-full h-full object-cover" alt="original" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- FOOTER SECTION --- */}
      <footer className="max-w-6xl mx-auto px-4 py-20 text-gray-500">
        <div className="flex space-x-6 mb-8 text-white">
          <i className="fab fa-facebook-f cursor-pointer hover:text-gray-400 text-2xl"></i>
          <i className="fab fa-instagram cursor-pointer hover:text-gray-400 text-2xl"></i>
          <i className="fab fa-twitter cursor-pointer hover:text-gray-400 text-2xl"></i>
          <i className="fab fa-youtube cursor-pointer hover:text-gray-400 text-2xl"></i>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
          <ul className="space-y-3">
            <li className="hover:underline cursor-pointer">Audio Description</li>
            <li className="hover:underline cursor-pointer">Investor Relations</li>
            <li className="hover:underline cursor-pointer">Legal Notices</li>
          </ul>
          <ul className="space-y-3">
            <li className="hover:underline cursor-pointer">Help Center</li>
            <li className="hover:underline cursor-pointer">Jobs</li>
            <li className="hover:underline cursor-pointer">Cookie Preferences</li>
          </ul>
          <ul className="space-y-3">
            <li className="hover:underline cursor-pointer">Gift Cards</li>
            <li className="hover:underline cursor-pointer">Terms of Use</li>
            <li className="hover:underline cursor-pointer">Corporate Information</li>
          </ul>
          <ul className="space-y-3">
            <li className="hover:underline cursor-pointer">Media Center</li>
            <li className="hover:underline cursor-pointer">Privacy</li>
            <li className="hover:underline cursor-pointer">Contact Us</li>
          </ul>
        </div>

        <button className="border border-gray-500 px-2 py-1 mt-8 hover:text-white transition">Service Code</button>
        <p className="mt-8 text-xs">© 1997-2026 Netflix, Inc. (Jatin's Project)</p>
      </footer>
    </div>
  );
};

export default Hero1;