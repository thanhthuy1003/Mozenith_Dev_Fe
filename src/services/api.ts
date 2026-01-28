/**
 * API Service - Centralized API calls for Mozenith
 * Connects to backend API endpoints
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api'

// Create axios-like HTTP client
const apiClient = {
  async get(endpoint: string) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    return handleResponse(response)
  },

  async post(endpoint: string, data?: any) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: data ? JSON.stringify(data) : undefined
    })
    return handleResponse(response)
  },

  async put(endpoint: string, data?: any) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: data ? JSON.stringify(data) : undefined
    })
    return handleResponse(response)
  },

  async delete(endpoint: string) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    return handleResponse(response)
  }
}

async function handleResponse(response: Response) {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Network error' }))
    throw new Error(error.message || `Error: ${response.status}`)
  }
  return response.json()
}

// ===== Authentication APIs =====
export const authAPI = {
  login: (email: string, password: string) =>
    apiClient.post('/auth/login', { email, password }),

  register: (email: string, password: string, fullName: string) =>
    apiClient.post('/auth/register', { email, password, fullName }),

  logout: () =>
    apiClient.post('/auth/logout'),

  refreshToken: () =>
    apiClient.post('/auth/refresh-token'),

  getCurrentUser: () =>
    apiClient.get('/auth/me')
}

// ===== Schedule/Class APIs =====
export const scheduleAPI = {
  getAllSchedules: () =>
    apiClient.get('/schedules'),

  getScheduleById: (id: string) =>
    apiClient.get(`/schedules/${id}`),

  createSchedule: (data: any) =>
    apiClient.post('/schedules', data),

  updateSchedule: (id: string, data: any) =>
    apiClient.put(`/schedules/${id}`, data),

  deleteSchedule: (id: string) =>
    apiClient.delete(`/schedules/${id}`),

  getSchedulesByDate: (date: string) =>
    apiClient.get(`/schedules/date/${date}`)
}

// ===== Note APIs =====
export const noteAPI = {
  getAllNotes: () =>
    apiClient.get('/notes'),

  getNoteById: (id: string) =>
    apiClient.get(`/notes/${id}`),

  createNote: (data: any) =>
    apiClient.post('/notes', data),

  updateNote: (id: string, data: any) =>
    apiClient.put(`/notes/${id}`, data),

  deleteNote: (id: string) =>
    apiClient.delete(`/notes/${id}`),

  getNotesBySubject: (subject: string) =>
    apiClient.get(`/notes/subject/${subject}`)
}

// ===== Task/Assignment APIs =====
export const taskAPI = {
  getAllTasks: () =>
    apiClient.get('/tasks'),

  getTaskById: (id: string) =>
    apiClient.get(`/tasks/${id}`),

  createTask: (data: any) =>
    apiClient.post('/tasks', data),

  updateTask: (id: string, data: any) =>
    apiClient.put(`/tasks/${id}`, data),

  deleteTask: (id: string) =>
    apiClient.delete(`/tasks/${id}`),

  completeTask: (id: string) =>
    apiClient.put(`/tasks/${id}/complete`)
}

// ===== Statistics APIs =====
export const statisticsAPI = {
  getDashboardStats: () =>
    apiClient.get('/statistics/dashboard'),

  getStudyProgress: (period?: string) =>
    apiClient.get(`/statistics/progress${period ? `?period=${period}` : ''}`),

  getSubjectStats: () =>
    apiClient.get('/statistics/subjects'),

  getWeeklyStats: () =>
    apiClient.get('/statistics/weekly')
}

// ===== User Profile APIs =====
export const userAPI = {
  getProfile: () =>
    apiClient.get('/users/profile'),

  updateProfile: (data: any) =>
    apiClient.put('/users/profile', data),

  changePassword: (oldPassword: string, newPassword: string) =>
    apiClient.post('/users/change-password', { oldPassword, newPassword })
}

export default apiClient
