/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";

function MyProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ loading state

  const [activeComments, setActiveComments] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const headers = { Authorization: `Bearer ${token}` };

  const fetchProjects = async () => {
    try {
      setLoading(true); // ✅ start loading
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/projects/me`,
        { headers }
      );
      setProjects(Array.isArray(res.data) ? res.data : [res.data]);
    } catch (err) {
      alert("Failed to fetch projects");
    } finally {
      setLoading(false); // ✅ stop loading
    }
  };

  const fetchComments = async (projectId) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/projects/${projectId}/comments`
      );
      setComments(res.data);
      setActiveComments(projectId);
    } catch (err) {
      alert("Failed to load comments");
    }
  };

  const handleCommentSubmit = async (e, projectId) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/projects/${projectId}/comments`,
        { text: newComment },
        { headers }
      );
      setNewComment("");
      fetchComments(projectId);
    } catch (err) {
      alert("Failed to add comment");
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!confirm("Delete this comment?")) return;
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/comments/${commentId}`,
        { headers }
      );
      setComments(comments.filter((c) => c._id !== commentId));
    } catch (err) {
      alert("Failed to delete comment");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/projects/${id}`, {
        headers,
      });
      setProjects(projects.filter((p) => p._id !== id));
    } catch (err) {
      alert("Delete failed");
    }
  };

  useEffect(() => {
    fetchProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="max-w-6xl mx-auto mt-10">
      <h2 className="text-3xl text-white font-bold mb-6 text-center">
        📁 My Projects
      </h2>
      <div className="flex justify-end mb-4">
        <a
          href="/projects/new"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          + Add New Project
        </a>
      </div>

      {loading ? (
        <p className="text-center text-gray-300 italic animate-pulse">
          Loading your projects...
        </p>
      ) : projects.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((project) => (
            <div key={project._id} className="p-4 bg-gray-300 shadow rounded">
              <h3 className="text-xl font-semibold">{project.title}</h3>
              <p className="text-gray-600">
                {project.description.slice(0, 100)}...
              </p>
              <a
                href={project.link}
                target="_blank"
                className="text-blue-500 underline mt-2"
                rel="noopener noreferrer"
              >
                Visit
              </a>

              <div className="mt-3 flex justify-between">
                <a
                  href={`/projects/${project._id}/edit`}
                  className="text-sm text-yellow-600 hover:underline"
                >
                  View & Edit
                </a>
                <button
                  onClick={() => handleDelete(project._id)}
                  className="text-sm cursor-pointer text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>

              <button
                onClick={() =>
                  activeComments === project._id
                    ? setActiveComments(null)
                    : fetchComments(project._id)
                }
                className="mt-4 flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8h2a2 2 0 012 2v7l-4-4H7a2 2 0 01-2-2V8a2 2 0 012-2h2"
                  />
                </svg>
                <span className="font-medium">
                  {activeComments === project._id
                    ? "Hide Comments"
                    : "View Comments"}
                </span>
                <span className="text-xs bg-indigo-200 text-indigo-700 px-2 py-0.5 rounded-full">
                  {project.comments.length}
                </span>
              </button>

              {activeComments === project._id && (
                <div className="mt-3 border-t pt-2 text-sm overflow-y-auto max-h-52 text-gray-700">
                  <h4 className="font-semibold mb-1">Comments:</h4>
                  {comments.length ? (
                    comments.map((comment) => (
                      <div key={comment._id} className="mb-2">
                        <div className="flex justify-between">
                          <span>
                            <span className="font-medium">
                              {comment.user?.name || "User"}:
                            </span>{" "}
                            {comment.text}
                            <span className="text-xs text-gray-500 block">
                              {dayjs(comment.createdAt).format(
                                "MMM D, YYYY h:mm A"
                              )}
                            </span>
                          </span>
                          {comment.user?._id === userId && (
                            <button
                              onClick={() => handleDeleteComment(comment._id)}
                              className="text-xs text-red-500 hover:underline"
                            >
                              Delete
                            </button>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 italic">No comments yet.</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No projects yet.</p>
      )}
    </div>
  );
}

export default MyProjects;
