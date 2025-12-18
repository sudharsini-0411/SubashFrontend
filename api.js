import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export const api = {
  // User APIs
  async createUser(userData) {
    const response = await apiClient.post('/users', userData);
    return response.data;
  },

  async loginUser(credentials) {
    const response = await apiClient.post('/users/login', credentials);
    return response.data;
  },

  async getAllUsers() {
    const response = await apiClient.get('/users');
    return response.data;
  },

  // Recharge APIs
  async createRecharge(rechargeData) {
    const response = await apiClient.post('/recharges', rechargeData);
    return response.data;
  },

  async getUserRecharges(userId) {
    const response = await apiClient.get(
      `/recharges?userId=${encodeURIComponent(userId)}`
    );
    return response.data;
  },

  // Plan APIs
  async getAllPlans() {
    const response = await apiClient.get('/plans');
    return response.data;
  },

  async createPlan(plan) {
    const response = await apiClient.post('/plans', plan);
    return response.data;
  },

  async updatePlan(id, plan) {
    const response = await apiClient.put(`/plans/${id}`, plan);
    return response.data;
  },

  async deletePlan(id) {
    const response = await apiClient.delete(`/plans/${id}`);
    return response.data;
  }
};
