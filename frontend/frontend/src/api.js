// src/api.js
import axios from 'axios';

const API_URL = 'http://localhost:8000/api'; // Adjust this if your backend URL is different

export const fetchUsers = async () => {
  const response = await axios.get(`${API_URL}/getusers`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });
  return response.data;
};

export const createUser = async (userData) => {
  const response = await axios.post(`${API_URL}/createusers`, userData);
  return response.data;
};

export const updateUser = async (id, userData) => {
  const response = await axios.put(`${API_URL}/updateusers/${id}`, userData, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });
  return response.data;
};

export const deleteUser = async (id) => {
  await axios.delete(`${API_URL}/deleteusers/${id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });
};

export const fetchUserActivity = async () => {
  const response = await axios.get(`${API_URL}/analytics/user-activity`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });
  return response.data;
};
