// src/layouts/PublicLayout.jsx
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import bgImage from "../assets/dev-bg.jpg";
import { Link } from "react-router-dom";

function PublicLayout() {
  //   const location = useLocation();
  //   const isHome = location.pathname === '/';

  return (
    <div
      className="min-h-screen px-4 py-10 bg-cover bg-center relative"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      {/* Optional overlay for contrast */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Navbar */}
      {/* <Navbar /> */}

      {/* Hero section only on Home */}
      {/* {isHome && (
        <div className="flex flex-col items-center justify-center text-center pt-32 px-4 relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-100 mb-6">
            Welcome to <span className="text-blue-600">DevConnect</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mb-8">
            Showcase your projects, connect with developers, and grow your
            portfolio.
          </p>

          <div className="flex space-x-4 justify-center">
            <Link
              to="/register"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Get Started
            </Link>
            <Link
              to="/projects"
              className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition"
            >
              Browse Projects
            </Link>
          </div>
        </div>
      )} */}

      {/* Public page content (Login, Register, etc.) */}
      <div className="relative z-10 px-4 py-8">
        <Outlet />
      </div>
    </div>
  );
}

export default PublicLayout;
