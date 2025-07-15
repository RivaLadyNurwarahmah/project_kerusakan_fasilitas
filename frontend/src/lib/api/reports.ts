import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export async function getReportStatistics() {
  const response = await api.get('/report/statistics');
  return response.data.data;
}

export async function getReportsByStatus(status: string) {
  const response = await api.get(`/report/by-status/${status}`);
  return response.data.data;
}

export async function updateReportStatus(
  reportId: number,
  status: string,
  catatan: string
) {
  const response = await api.put(`/report/${reportId}/status`, {
    status,
    catatan,
  });
  return response.data;
}

export default api;
