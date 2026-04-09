 import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './Nav'; // Purana Landing Nav
import Hero from './Hero'; // Purana Hero
import Faq from './Faq';
import Footer from './Footer';
import Login from './Login';
import SignUp from './SignUp';
import Navbar from './Navbar'; // Naya Dynamic Navbar
import Hero1 from './Hero1'; // Naya Stranger Things Hero
import "./App.css";
import TVShows from './TVShows';
import Movies from './Movies';
import NewPopular from './NewPopular';
import AdminDashboard from './AdminDashboard';
import MoviePlayer from './MoviePlayer';
function App() {
  return (
    <Router>
      <Routes>
        {/* 1. Landing Page (Jo Login se pehle dikhta hai) */}
        <Route path="/" element={
          <>
            <Nav />
            <Hero />
            <Faq />
            <Footer />
          </>
        } />

        {/* 2. Real Netflix Home (Login ke baad wala Dashboard) */}
        <Route path="/home" element={
          <div className="bg-[#141414] min-h-screen">
            <Navbar />
            <Hero1 />
            {/* Yahan aap Row components add kar sakte hain */}
          </div>
        } />

        {/* 3. Authentication Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        
        {/* Individual components testing ke liye (Optional) */}
        <Route path="/navbar-test" element={<Navbar />} />
        <Route path="/hero-test" element={<Hero1 />} />
        <Route path="/tv-shows" element={<TVShows />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/new-and-popular" element={<NewPopular />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/MoviePlayer" element={<MoviePlayer />} />

      </Routes>
    </Router>
  );
}

export default App;