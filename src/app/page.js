'use client';

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-pink-100 text-center">
      <h1 className="text-4xl font-bold mb-6 text-pink-800">Welcome to Our Couple Space 💖</h1>
      <p className="mb-10 text-gray-700 text-lg">A place to share love, memories, and moments — every single day.</p>

      <div className="flex gap-4">
        <button
          onClick={() => router.push('/login')}
          className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-6 rounded-xl shadow"
        >
          Log In
        </button>
        <button
          onClick={() => router.push('/signup')}
          className="bg-white hover:bg-pink-100 text-pink-700 border border-pink-500 font-semibold py-2 px-6 rounded-xl shadow"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}
  