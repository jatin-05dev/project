 import { Link, useNavigate } from 'react-router-dom';
import logo from "./assets/N/IN.jpg";
import logo1 from "./assets/N/Netflix.png";

function Nav() {
  const navigate = useNavigate();

  return (
    <div
      className="relative h-screen bg-cover bg-center" // h-195 ko h-screen kar sakte ho full view ke liye
      style={{ backgroundImage: `url(${logo})` }}
    >
      <div className="absolute inset-0 bg-black/60"></div>

      <nav className="relative z-10">
        <ul className="flex justify-around items-center">
          <li>
            <Link to="/">
              <img className="h-20" src={logo1} alt="Logo" />
            </Link>
          </li>

          <div className="flex gap-5 py-5">
            <li>
              <button className="px-5 py-2 rounded-sm bg-orange-700 text-white">
                English
              </button>
            </li>
            <li>
              {/* Login Page par jaane ke liye */}
              <button 
                onClick={() => navigate('/login')}
                className="px-5 py-2 rounded-sm bg-orange-700 text-white"
              >
                Log In
              </button>
            </li>
          </div>
        </ul>
      </nav>

      <div className="relative text-center mt-40">
        <h1 className="text-white font-bold text-6xl">Unlimited movies,<br /> shows and more</h1>
        <p className="text-white font-bold text-2xl mt-4">Starts at 149. Cancel any time</p>
      </div>

      <div className="flex justify-center mt-10">
        {/* Finish Sign Up par click karne se SignUp page khulega */}
        <button 
          onClick={() => navigate('/signup')}
          className="relative px-15 py-4 rounded-sm bg-orange-700 text-white hover:bg-orange-800 transition"
        >
          <p className="text-2xl font-bold">Finish sign up</p>
        </button>
      </div> 
    </div>
  );
}

export default Nav;