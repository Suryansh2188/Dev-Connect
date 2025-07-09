import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/projects`
        );
        setProjects(res.data);
      } catch (err) {
        console.error("Failed to fetch projects", err);
      }
    };

    fetchProjects();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredProjects = projects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchTerm) ||
      project.user?.name?.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="overflow-auto mt-2 backdrop-blur-sm h-[27rem] max-w-6xl mx-auto px-4">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-200 p-2">
        🌐 Explore Projects
      </h2>

      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search by project or user..."
          className="p-2 text-sm border rounded-full w-full max-w-md bg-amber-50"
          onChange={handleSearchChange}
          value={searchTerm}
        />
      </div>

      {filteredProjects.length ? (
        <div className="flex flex-wrap -m-4 justify-center">
          {filteredProjects.map((project) => (
            <div key={project._id} className="p-4 lg:w-1/3 w-full">
              <div className="h-full bg-gray-300 backdrop-blur-md bg-opacity-75 px-8 pt-8 pb-6 rounded-lg overflow-hidden shadow-lg flex flex-col justify-between">
                <div>
                  <h2 className="tracking-widest text-xl title-font font-medium text-black mb-1">
                    {project.user?.name || "CATEGORY"}
                  </h2>
                  <h1 className="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">
                    {project.title}
                  </h1>
                  <p className="leading-relaxed mb-3">
                    {project.description.slice(0, 100)}...
                  </p>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-500 inline-flex items-center hover:text-indigo-700 transition duration-200"
                  >
                    Visit Project
                    <svg
                      className="w-4 h-4 ml-2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14"></path>
                      <path d="M12 5l7 7-7 7"></path>
                    </svg>
                  </a>
                </div>

                <div className="mt-6 text-right">
                  <button
                    onClick={() => navigate(`/projects/${project._id}`)}
                    className="text-sm text-indigo-600 hover:text-indigo-800 cursor-pointer font-semibold bg-amber-50 px-4 py-2 rounded-full transition duration-200 hover:bg-amber-100"
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-100 text-lg mt-10">
          No matching projects found.
        </p>
      )}
    </div>
  );
}

export default Projects;
