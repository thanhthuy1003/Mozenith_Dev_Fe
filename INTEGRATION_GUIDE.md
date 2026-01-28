# Backend & Frontend Integration Guide

## 🔗 Connection Overview

This document explains how to connect the StudyPlus backend and frontend applications.

### Backend
- **Location**: `d:\github\Mozenith-be`
- **Type**: Spring Boot REST API
- **Port**: `8080`
- **Base URL**: `http://localhost:8080/api`

### Frontend
- **Location**: `d:\github\Mozenith_Dev_Fe`
- **Type**: React + Vite + TypeScript
- **Port**: `5173`
- **API Service**: Located in `src/services/api.ts`

---

## 🚀 Setup Instructions

### 1. Backend Setup

#### Prerequisites
- Java 17+ (you have JavaSE-25 LTS)
- Maven

#### Steps
```bash
cd d:\github\Mozenith-be

# Clean and build
mvnw clean install

# Run the application
mvnw spring-boot:run
```

The backend will start on `http://localhost:8080`

---

### 2. Frontend Setup

#### Prerequisites
- Node.js 16+ 
- npm or yarn

#### Steps
```bash
cd d:\github\Mozenith_Dev_Fe

# Install dependencies (already done)
npm install

# Start development server
npm run dev
```

The frontend will start on `http://localhost:5173`

---

## 📋 API Endpoints Available

The frontend has predefined API service calls in `src/services/api.ts`:

### Authentication APIs
```typescript
authAPI.login(email, password)
authAPI.register(email, password, fullName)
authAPI.logout()
authAPI.refreshToken()
authAPI.getCurrentUser()
```

### Schedule APIs
```typescript
scheduleAPI.getAllSchedules()
scheduleAPI.getScheduleById(id)
scheduleAPI.createSchedule(data)
scheduleAPI.updateSchedule(id, data)
scheduleAPI.deleteSchedule(id)
scheduleAPI.getSchedulesByDate(date)
```

### Note APIs
```typescript
noteAPI.getAllNotes()
noteAPI.getNoteById(id)
noteAPI.createNote(data)
noteAPI.updateNote(id, data)
noteAPI.deleteNote(id)
noteAPI.getNotesBySubject(subject)
```

### Task APIs
```typescript
taskAPI.getAllTasks()
taskAPI.getTaskById(id)
taskAPI.createTask(data)
taskAPI.updateTask(id, data)
taskAPI.deleteTask(id)
taskAPI.completeTask(id)
```

### Statistics APIs
```typescript
statisticsAPI.getDashboardStats()
statisticsAPI.getStudyProgress(period)
statisticsAPI.getSubjectStats()
statisticsAPI.getWeeklyStats()
```

### User Profile APIs
```typescript
userAPI.getProfile()
userAPI.updateProfile(data)
userAPI.changePassword(oldPassword, newPassword)
```

---

## ⚙️ Configuration

### Environment Variables

The frontend uses Vite environment variables in `.env` files:

#### `.env.development`
```
VITE_API_BASE_URL=http://localhost:8080/api
VITE_APP_NAME=StudyPlus
VITE_DEBUG=true
```

#### `.env.production`
```
VITE_API_BASE_URL=https://api.studyplus.com/api
VITE_APP_NAME=StudyPlus
VITE_DEBUG=false
```

---

## 🔑 Using the API in Components

### Method 1: Using the `useApi` Hook (Recommended)

```typescript
import { useApi } from '../hooks/useApi'
import { statisticsAPI } from '../services/api'

function MyComponent() {
  const { data, loading, error, refetch } = useApi(
    () => statisticsAPI.getDashboardStats(),
    true // auto-execute on mount
  )

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return <div>{/* Display data */}</div>
}
```

### Method 2: Using the `useMutation` Hook (For POST/PUT/DELETE)

```typescript
import { useMutation } from '../hooks/useApi'
import { scheduleAPI } from '../services/api'

function CreateScheduleForm() {
  const { mutate, loading, error } = useMutation(
    (data) => scheduleAPI.createSchedule(data)
  )

  const handleSubmit = async (formData) => {
    try {
      const result = await mutate(formData)
      console.log('Schedule created:', result)
    } catch (err) {
      console.error('Error:', err)
    }
  }

  return <form onSubmit={handleSubmit}>{/* Form fields */}</form>
}
```

### Method 3: Direct API Call

```typescript
import { scheduleAPI } from '../services/api'

async function fetchSchedules() {
  try {
    const schedules = await scheduleAPI.getAllSchedules()
    console.log(schedules)
  } catch (error) {
    console.error('Failed to fetch schedules:', error)
  }
}
```

---

## 🔐 Authentication Flow

### 1. Login
```typescript
const { token, user } = await authAPI.login('user@example.com', 'password')
localStorage.setItem('token', token)
```

### 2. Auto-include Token
The API service automatically includes the token from localStorage in every request:
```typescript
headers: {
  'Authorization': `Bearer ${localStorage.getItem('token')}`
}
```

### 3. Logout
```typescript
await authAPI.logout()
localStorage.removeItem('token')
```

---

## 🧪 Testing the Connection

### 1. Check Backend is Running
```bash
curl http://localhost:8080/api/health
# or any public endpoint
```

### 2. Check Frontend API Service
Open browser DevTools → Network tab and make a request. You should see:
- Request going to: `http://localhost:8080/api/...`
- Response status: 200 or appropriate HTTP code
- Response body: JSON data

### 3. Example Test
```typescript
// In browser console
import { statisticsAPI } from './src/services/api.js'
statisticsAPI.getDashboardStats()
  .then(data => console.log(data))
  .catch(err => console.error(err))
```

---

## 🐛 Troubleshooting

### Problem: CORS Errors
**Solution**: Ensure backend has CORS configuration allowing `http://localhost:5173`

Backend configuration example (Spring Boot):
```java
@Configuration
public class CorsConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                    .allowedOrigins("http://localhost:5173")
                    .allowedMethods("*")
                    .allowedHeaders("*");
            }
        };
    }
}
```

### Problem: 404 Errors
**Solution**: Verify the endpoint exists in your backend controller

### Problem: 401 Unauthorized
**Solution**: Check that:
1. Token is properly stored in localStorage
2. Token hasn't expired
3. Backend validates token correctly

### Problem: Network Refused
**Solution**: Make sure:
1. Backend is running on port 8080
2. Frontend is running on port 5173
3. No firewall is blocking connections

---

## 📦 Component Examples

### Dashboard Component (Connected)
See `src/components/DashboardConnected.tsx` for a complete example of a component connected to the backend.

### Features
- Fetches data from `statisticsAPI.getDashboardStats()`
- Shows loading state
- Handles errors gracefully
- Uses `useApi` hook

---

## 📝 Notes

1. **Error Handling**: All API errors are caught and stored in the `error` state
2. **Loading States**: Use `loading` to show spinners/skeletons
3. **Auto-execution**: Pass `true` as second parameter to `useApi` for automatic fetch
4. **Token Management**: Tokens are automatically included if stored in localStorage
5. **Refresh Token**: Implement token refresh logic in `authAPI.refreshToken()`

---

## 🔗 Additional Resources

- [Spring Boot REST API Best Practices](https://spring.io/guides)
- [React Data Fetching Patterns](https://react.dev/learn)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-modes)

---

**Version**: 1.0.0  
**Last Updated**: January 28, 2026
