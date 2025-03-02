import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NODE_ENV === 'production'
    ? 'https://dripfit-backend.vercel.app/' // Replace with your actual backend URL
    : 'http://localhost:3001',
});

export default instance;