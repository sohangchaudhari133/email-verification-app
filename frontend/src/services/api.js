
  import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

export const registerUser = async (userData) => {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
};

export const verifyEmail = async (code) => {
    const response = await axios.post(`${API_URL}/verify-email`, { code });
    return response.data;
};

export const requestPasswordReset = async (email) => {
    const response = await axios.post(`${API_URL}/request-reset`, { email });
    return response.data;
};

export const resetPassword = async (token, newPassword) => {
    const response = await axios.post(`${API_URL}/reset-password/${token}`, { password: newPassword });
    return response.data;
};

export const loginUser = async (credentials) => {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data;
};