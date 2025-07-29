'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '/utils/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function WriteFeelingPage() {
  const [feeling, setFeeling] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await api.post(
        '/api/feelings',
        { feeling },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Your feeling has been saved ❤️');
      setTimeout(() => router.push('/dashboard'), 2000);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
      console.error('Error:', err);
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-pink-700 mb-4">Write Today’s Feeling 📝</h2>

        <textarea
          className="w-full h-40 p-4 border border-pink-400 text-pink-900 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-pink-500 placeholder:text-pink-300 font-medium text-base"          placeholder="How did you feel today?"
          value={feeling}
          onChange={(e) => setFeeling(e.target.value)}
          required
        />

        <button
          type="submit"
          className="mt-4 w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition"
        >
          Save Feeling
        </button>
      </form>

      <ToastContainer position="top-center" />
    </div>
  );
}
