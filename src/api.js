import axios from 'axios';

const api = axios.create({
  baseURL: 'https://couple-backend-93st.onrender.com',
  withCredentials: true, // Optional: if using cookies/sessions
});

export default api;
