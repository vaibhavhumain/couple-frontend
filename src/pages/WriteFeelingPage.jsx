import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Mood options with extra metadata
const moods = [
  { label: 'Happy 😊', value: 'Happy', message: 'Happiness is contagious — spread the joy!', emoji: '😊' },
  { label: 'Sad 😢', value: 'Sad', message: 'It’s okay to feel sad. Take your time. 🌧️', emoji: '😢' },
  { label: 'Excited 🤩', value: 'Excited', message: 'Life is full of surprises. Let’s celebrate! 🎉', emoji: '🤩' },
  { label: 'Angry 😡', value: 'Angry', message: 'Take a deep breath, you’ve got this. 🔥', emoji: '😡' },
  { label: 'Romantic 💖', value: 'Romantic', message: 'Love is in the air. Cherish the moment 💌', emoji: '💖' },
  { label: 'Grateful 🙏', value: 'Grateful', message: 'Gratitude turns what we have into enough 🌟', emoji: '🙏' },
  { label: 'Anxious 😰', value: 'Anxious', message: 'You are safe. You are strong. You will get through 💪', emoji: '😰' },
  { label: 'Neutral 😐', value: 'Neutral', message: 'A calm day is a good day too 🧘‍♂️', emoji: '😐' },
];

// Map moods to background color classes
const moodBackgroundMap = {
  Happy: 'bg-yellow-100',
  Sad: 'bg-blue-100',
  Excited: 'bg-orange-100',
  Angry: 'bg-red-100',
  Romantic: 'bg-pink-100',
  Grateful: 'bg-green-100',
  Anxious: 'bg-gray-200',
  Neutral: 'bg-slate-100',
};

export default function WriteFeelingPage() {
  const [feeling, setFeeling] = useState('');
  const [mood, setMood] = useState('');
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
      toast.error('Please login first');
      navigate('/login');
    } else {
      setToken(storedToken);
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!feeling.trim()) {
      toast.error('Please write your feeling!');
      return;
    }

    if (!mood) {
      toast.error('Please select a mood!');
      return;
    }

    try {
      await api.post(
        '/api/feelings',
        { feeling, mood },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Your feeling has been saved ❤️');
      setFeeling('');
      setMood('');
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (err) {
      console.error('Error saving feeling:', err);
      toast.error(err.response?.data?.message || 'Something went wrong');
    }
  };

  const bgClass = moodBackgroundMap[mood] || 'bg-pink-50';
  const selectedMood = moods.find((m) => m.value === mood);

  return (
    <div className={`min-h-screen ${bgClass} flex items-center justify-center p-6 transition-all duration-300`}>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md animate-fade-in"
      >
        <h2 className="text-2xl font-bold text-pink-700 mb-6 text-center">
          Write Today’s Feeling 📝
        </h2>

        <label className="block mb-2 text-pink-700 font-medium">Select Your Mood</label>
        <select
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          required
          className="w-full p-2 border border-pink-400 text-pink-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 mb-4"
        >
          <option value="" disabled>Select a mood</option>
          {moods.map((m) => (
            <option key={m.value} value={m.value}>
              {m.label}
            </option>
          ))}
        </select>

        {/* Mood message display */}
        {selectedMood && (
          <div className="text-center mb-4 animate-fade-in">
            <div className="text-4xl mb-1">{selectedMood.emoji}</div>
            <p className="text-pink-600 font-medium italic">{selectedMood.message}</p>
          </div>
        )}

        <textarea
          placeholder="How did you feel today?"
          value={feeling}
          onChange={(e) => setFeeling(e.target.value)}
          required
          className="w-full h-40 p-4 border border-pink-400 text-pink-900 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-pink-500 placeholder:text-pink-300 font-medium text-base"
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
