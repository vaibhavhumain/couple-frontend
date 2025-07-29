'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isClient, setIsClient] = useState(false); // ✅ for SSR-safe rendering

  useEffect(() => {
    setIsClient(true); // ✅ ensure client-only render
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  if (!isClient) return null; // ✅ prevent SSR mismatch flash

  return (
    <nav className="bg-pink-200 text-pink-900 px-8 py-4 shadow-md flex justify-between items-center">
      <Link
        href="/dashboard"
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
            <Link href="/login" className="text-sm font-medium hover:underline hover:text-pink-700">Login</Link>
            <Link href="/signup" className="text-sm font-medium hover:underline hover:text-pink-700">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}
