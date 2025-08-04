import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isClient, setIsClient] = useState(false); // for client-side check

  useEffect(() => {
    setIsClient(true);
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!isClient) return null;

  return (
    <nav className="bg-pink-200 text-pink-900 px-8 py-4 shadow-md flex justify-between items-center">
      <Link
        to="/dashboard"
        className="text-2xl font-extrabold tracking-wide hover:opacity-90 transition"
      >
        💖 Couple Dashboard
      </Link>

      <div className="flex items-center gap-5">
        {user ? (
          <>
            <span className="font-medium text-sm">Hi, {user.name?.split(' ')[0]}</span>
            <button
              onClick={handleLogout}
              className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-1.5 text-sm rounded-lg transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-sm font-medium hover:underline hover:text-pink-700"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="text-sm font-medium hover:underline hover:text-pink-700"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
