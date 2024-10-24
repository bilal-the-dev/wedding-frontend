import axios from 'axios';

const AUTH_URL = import.meta.env.VITE_APP_BACKEND_URL;

const axiosInstance = axios.create({
    baseURL: AUTH_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
});

export default axiosInstance;
