import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';
import Navbar from '../components/Navbar';

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        navigate('/login');
        return;
      }

      try {
        const res = await api.get('/api/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(res.data);
      } catch (err) {
        console.error('Not logged in:', err.response?.data || err.message);
        navigate('/login');
      }
    };

    fetchUser();
  }, [navigate]);

  return (
    <div>
      <Navbar />

      <div className="min-h-screen bg-pink-50 p-6">
        <h1 className="text-3xl font-bold text-center text-pink-700 mb-8">
          Welcome to Your Love Dashboard 💑
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <Link to="/write-feeling">
            <div className="bg-white rounded-xl shadow p-6 text-center hover:shadow-lg transition">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">✍️ Write Today's Feeling</h2>
              <p className="text-gray-600">Share how you felt about each other today.</p>
            </div>
          </Link>

          <div className="bg-white rounded-xl shadow p-6 text-center hover:shadow-lg transition">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">📸 Upload a Memory</h2>
            <p className="text-gray-600">Upload your beautiful moment together.</p>
          </div>

          <div className="bg-white rounded-xl shadow p-6 text-center hover:shadow-lg transition">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">❤️ 365 Reasons I Love You</h2>
            <p className="text-gray-600">Write or read a reason you love each other.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
