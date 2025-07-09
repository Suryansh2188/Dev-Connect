/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import axios from 'axios';

function Profile() {
  const [form, setForm] = useState({ name: '', bio: '', avatar: '' });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false); // ✅ New state

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setForm({
          name: res.data.name,
          bio: res.data.bio || '',
          avatar: res.data.avatar || ''
        });
      } catch (err) {
        alert('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true); // ✅ Start loading
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/api/users/profile`, form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('✅ Profile updated');
    } catch (err) {
      alert('❌ Update failed');
    } finally {
      setUpdating(false); // ✅ End loading
    }
  };

  if (loading)
    return <div className="text-center p-6 text-gray-600">Loading profile...</div>;

  return (
    <div className="max-w-2xl mt-10 mx-auto px-4">
      <div className="max-w-xl mt-2 backdrop-blur-sm mx-auto rounded-xl shadow-lg px-4">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-100">My Profile</h2>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Avatar Preview */}
          <div className="flex-shrink-0 self-center md:self-start">
            <img
              src={
                form.avatar ||
                'https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png'
              }
              alt="avatar"
              className="w-32 h-32 rounded-full border-4 border-blue-600 object-cover"
            />
          </div>

          {/* Profile Form */}
          <form onSubmit={handleSubmit} className="flex-1 space-y-4">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Name"
              className="w-full p-2 border bg-white border-gray-300 rounded"
            />
            <input
              name="avatar"
              value={form.avatar}
              onChange={handleChange}
              placeholder="Avatar URL"
              className="w-full p-2 border bg-white border-gray-300 rounded"
            />
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              placeholder="Short bio"
              className="w-full p-2 border bg-white border-gray-300 rounded"
              rows={3}
            />
            <button
              type="submit"
              disabled={updating} // ✅ Disabled while updating
              className={`w-full text-white py-2 rounded transition ${
                updating
                  ? 'bg-blue-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {updating ? 'Updating...' : 'Update Profile'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
