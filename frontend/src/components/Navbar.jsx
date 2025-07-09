import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const location = useLocation();

  // Auto-close menu when route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="absolute top-0 left-0 w-full bg-[#040E1F] text-white z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold">
          DevConnect
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/" className="hover:text-blue-400">Home</Link>
          <Link to="/projects" className="hover:text-blue-400">Projects</Link>

          {token ? (
            <>
              <Link to="/profile" className="hover:text-blue-400">Profile</Link>
              <Link to="/my-projects" className="hover:text-blue-400">My Projects</Link>
              <button onClick={handleLogout} className="hover:text-red-400 ml-2">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-400">Login</Link>
              <Link to="/register" className="hover:text-blue-400">Register</Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="md:hidden text-white focus:outline-none"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu (with animation) */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-col px-6 pb-4 space-y-2">
          <Link to="/projects" className="hover:text-blue-400">Projects</Link>

          {token ? (
            <>
              <Link to="/profile" className="hover:text-blue-400">Profile</Link>
              <Link to="/my-projects" className="hover:text-blue-400">My Projects</Link>
              <button onClick={handleLogout} className="hover:text-red-400">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-400">Login</Link>
              <Link to="/register" className="hover:text-blue-400">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;



