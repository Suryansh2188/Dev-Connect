import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateProject() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    link: '',
  });
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/projects`,
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('✅ Project posted!');
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || '❌ Failed to post project');
    }
  };

  return (
    <div className="max-w-xl mt-2 backdrop-blur-sm mx-auto rounded-xl shadow-lg px-4">
      <h2 className="text-2xl font-semibold text-center text-white mb-4">Create New Project</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-1 font-medium text-gray-100">Project Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full border bg-white border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            className="w-full border bg-white border-gray-300 px-4 py-2 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            className="w-full border bg-white border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://github.com/your-project"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Submit Project
        </button>
      </form>
    </div>
  );
}

export default CreateProject;
