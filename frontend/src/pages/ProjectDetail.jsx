/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";

function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(true); // ✅ page loading
  const [commentLoading, setCommentLoading] = useState(false); // ✅ comment post loading

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // ✅ start page loading
        const [projectRes, commentRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/api/projects/${id}`),
          axios.get(`${import.meta.env.VITE_API_URL}/api/projects/${id}/comments`),
        ]);
        setProject(projectRes.data);
        setComments(commentRes.data);
      } catch (err) {
        alert("Failed to load project or comments");
      } finally {
        setLoading(false); // ✅ done loading
      }
    };

    fetchData();
  }, [id, reload]);

  const handleCommentSubmit = async (e, projectId) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      setCommentLoading(true); // ✅ show comment loading
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/projects/${projectId}/comments`,
        { text: newComment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewComment("");
      setReload(!reload); // Triggers re-fetch
    } catch (err) {
      alert("Failed to post comment");
    } finally {
      setCommentLoading(false); // ✅ hide button loading
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!confirm("Delete this comment?")) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/comments/${commentId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setReload(!reload);
    } catch (err) {
      alert("Failed to delete comment");
    }
  };

  if (loading)
    return (
      <div className="p-6 text-center text-gray-300 animate-pulse">
        Loading project details...
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto mt-10 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Project Info */}
        <div className="bg-gray-300 h-fit backdrop-blur-md bg-opacity-75 shadow rounded p-6">
          <h2 className="text-3xl font-bold text-blue-800 mb-4">
            {project.title}
          </h2>
          <p className="text-gray-700 mb-4">{project.description}</p>
          <p className="text-sm text-gray-600">
            Created by: <strong>{project.user?.name || "Unknown"}</strong>
          </p>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 text-blue-600 underline hover:text-blue-800"
          >
            🔗 Visit Project
          </a>
        </div>

        {/* Right: Comments Section */}
        <div className="shadow rounded p-6 h-fit bg-gray-300 backdrop-blur-md bg-opacity-75 flex flex-col">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Feedback</h3>

          {/* Scrollable Comments List */}
          <div className="flex-1 overflow-y-auto border-t pt-2 pr-2 max-h-80 text-sm text-gray-700">
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
                        {dayjs(comment.createdAt).format("MMM D, YYYY h:mm A")}
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

          {/* Add Comment Form */}
          {token && (
            <form
              onSubmit={(e) => handleCommentSubmit(e, project._id)}
              className="mt-3 flex gap-2 border-t pt-3"
            >
              <input
                type="text"
                className="flex-1 border px-2 py-1 rounded"
                placeholder="Write a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                required
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-3 rounded hover:bg-blue-700 disabled:opacity-60"
                disabled={commentLoading}
              >
                {commentLoading ? "Posting..." : "Post"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectDetail;
