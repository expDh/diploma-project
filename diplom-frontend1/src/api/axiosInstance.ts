// src/api/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:4200', // адрес твоего бекенда
  withCredentials: true, // обязательно, чтобы браузер отправлял куки
});

export default axiosInstance;
