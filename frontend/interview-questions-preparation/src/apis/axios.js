import axios from 'axios';

const backendBaseUrl = axios.create({
  baseURL: import.meta.env.VITE_BACK_END,
  headers: {
    'Content-Type': 'application/json',
  },
});


export default backendBaseUrl;