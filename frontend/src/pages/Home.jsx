import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <div className="flex flex-col items-center justify-center text-center mt-36 px-4 relative z-10">
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
    </>
  );
}

export default Home;
