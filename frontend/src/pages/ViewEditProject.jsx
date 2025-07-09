/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function ViewEditProject() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    link: "",
  });
  const [loading, setLoading] = useState(false); // ✅ loading state

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/projects/${id}`);
        setForm(res.data);
      } catch (err) {
        alert("❌ Failed to load project");
        navigate("/");
      }
    };
    fetchProject();
  }, [id, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // ✅ start loading
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/projects/${id}`,
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("✅ Project updated!");
      navigate("/my-projects");
    } catch (err) {
      alert(err.response?.data?.message || "❌ Failed to update project");
    } finally {
      setLoading(false); // ✅ stop loading
    }
  };

  return (
    <div className="max-w-xl mt-2 backdrop-blur-sm mx-auto rounded-xl shadow-lg px-4">
      <h2 className="text-3xl font-semibold text-center text-white mb-6">View & Edit Project</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-1 font-medium text-gray-100">Project Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            disabled={loading}
            className="w-full border bg-white border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            placeholder="Enter project title"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-100">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            disabled={loading}
            className="w-full border bg-white border-gray-300 px-4 py-2 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            placeholder="Write a detailed project description..."
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-100">GitHub / Live Link</label>
          <input
            name="link"
            value={form.link}
            onChange={handleChange}
            disabled={loading}
            className="w-full border bg-white border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            placeholder="https://github.com/your-project"
            required
          />
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            disabled={loading}
            onClick={() => navigate("/my-projects")}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ViewEditProject;
