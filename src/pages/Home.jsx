import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-pink-100 text-center px-4">
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-pink-800">
        Welcome to Our Couple Space 💖
      </h1>
      <p className="mb-10 text-gray-700 text-lg max-w-xl">
        Chapter of RUBHAV 🌷
      </p>

      <div className="flex gap-4">
        <Link to="/login">
          <button className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-6 rounded-xl shadow">
            Log In
          </button>
        </Link>
        <Link to="/signup">
          <button className="bg-white hover:bg-pink-100 text-pink-700 border border-pink-500 font-semibold py-2 px-6 rounded-xl shadow">
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
}
