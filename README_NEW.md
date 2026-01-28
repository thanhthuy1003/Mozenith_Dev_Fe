# Mozenith - Frontend Application

> Nền tảng quản lý học tập thông minh với các công cụ đa chức năng

**Status**: ✅ Production Ready | **Build**: ✅ Passing | **Deployment**: ✅ Ready for Vercel

## 📋 Table of Contents

- [Features](#-features)
- [Quick Start](#-quick-start)
- [Installation](#-installation)
- [Development](#-development)
- [Build & Deploy](#-build--deploy)
- [Project Structure](#-project-structure)
- [Backend Integration](#-backend-integration)
- [Documentation](#-documentation)
- [Troubleshooting](#-troubleshooting)

## 🚀 Features

✅ **Responsive Design** - Works on all devices  
✅ **Modern UI** - Beautiful gradient design with animations  
✅ **Dashboard** - Real-time statistics and analytics  
✅ **Pricing Plans** - Multiple tier selection  
✅ **Backend Integration** - Connected API service layer  
✅ **Authentication** - Login/Register with token management  
✅ **Performance** - Optimized bundle size (~162KB)  
✅ **TypeScript** - Full type safety  

### Page Sections

1. **Navigation** - Sticky navbar with responsive menu
2. **Hero** - Eye-catching banner with stats
3. **Features** - 6 main features with icons
4. **Dashboard** - Interactive stats preview
5. **Statistics** - Progress charts and metrics
6. **Pricing** - 3 pricing tiers
7. **Footer** - Contact info and links

## 💻 Quick Start

### Prerequisites
- Node.js v16+
- npm v8+

### Run Development Server

```bash
cd d:\github\Mozenith_Dev_Fe
npm install
npm run dev
```

Visit `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

### Deploy to Vercel

```bash
git push origin main
# Then go to vercel.com and import repository
```

See [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) for details.

## 📦 Installation

### 1. Install Dependencies
```bash
npm install
```

This installs:
- `react@18.2.0` - UI framework
- `react-dom@18.2.0` - React DOM binding
- `lucide-react@0.292.0` - Icon library
- `typescript` - Type checking
- `vite` - Build tool

### 2. Configure Environment

Create `.env.local`:
```env
VITE_API_BASE_URL=http://localhost:8080/api
VITE_DEBUG=true
```

### 3. Start Development Server
```bash
npm run dev
```

## 💻 Development

### Available Scripts

```bash
# Start dev server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter (if configured)
npm run lint
```

### Environment Variables

| Variable | Dev | Prod |
|----------|-----|------|
| `VITE_API_BASE_URL` | `http://localhost:8080/api` | `https://api.mozenith.com/api` |
| `VITE_DEBUG` | `true` | `false` |
| `VITE_APP_NAME` | `StudyPlus` | `StudyPlus` |

### Hot Module Replacement

Vite provides instant HMR - changes reflect immediately in browser.

## 📦 Build & Deploy

### Production Build

```bash
npm run build
```

Output:
```
dist/index.html                    0.48 kB │ gzip:  0.34 kB
dist/assets/index.css             15.11 kB │ gzip:  3.50 kB
dist/assets/index.js             162.32 kB │ gzip: 51.30 kB
```

### Preview Build Locally

```bash
npm run preview
```

Visit `http://localhost:4173`

### Deploy Options

#### Option 1: Vercel (Recommended)

**Automatic (Git Integration)**
```bash
# Push to GitHub
git push origin main

# Go to vercel.com → Import → Select repo → Deploy
```

**Manual (Vercel CLI)**
```bash
npm install -g vercel
vercel login
vercel --prod
```

#### Option 2: Docker

```bash
docker build -t studyplus-fe .
docker run -p 5173:5173 studyplus-fe
```

#### Option 3: Any Static Host

Copy `dist/` folder contents to your web server.

## 📁 Project Structure

```
.
├── src/
│   ├── components/           # React components
│   │   ├── Navigation.tsx    # Top navbar
│   │   ├── Hero.tsx          # Hero section
│   │   ├── Features.tsx      # Features grid
│   │   ├── Dashboard.tsx     # Dashboard preview
│   │   ├── Statistics.tsx    # Stats section
│   │   ├── Pricing.tsx       # Pricing page
│   │   ├── Footer.tsx        # Footer
│   │   ├── Auth.tsx          # Login/Register forms
│   │   └── *.css             # Component styles
│   ├── services/             # API services
│   │   └── api.ts            # API client
│   ├── hooks/                # Custom hooks
│   │   └── useApi.ts         # API hook
│   ├── App.tsx               # Main component
│   ├── App.css               # Global styles
│   ├── main.tsx              # Entry point
│   └── index.css             # Base styles
├── public/                   # Static assets
├── dist/                     # Production build (generated)
├── index.html                # HTML template
├── vite.config.ts            # Vite config
├── tsconfig.json             # TypeScript config
├── package.json              # Dependencies
├── vercel.json               # Vercel config
├── .env                      # Default env vars
├── .env.development          # Dev env vars
├── .env.production           # Prod env vars
└── README.md                 # This file
```

## 🔗 Backend Integration

### API Service

The app includes a complete API service layer:

```typescript
// src/services/api.ts
export const authAPI = { ... }
export const scheduleAPI = { ... }
export const noteAPI = { ... }
export const taskAPI = { ... }
export const statisticsAPI = { ... }
export const userAPI = { ... }
```

### Using API in Components

#### Method 1: useApi Hook (For Data Fetching)

```typescript
import { useApi } from '@/hooks/useApi'
import { statisticsAPI } from '@/services/api'

function MyComponent() {
  const { data, loading, error } = useApi(
    () => statisticsAPI.getDashboardStats(),
    true // auto-execute on mount
  )

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  return <div>{data}</div>
}
```

#### Method 2: useMutation Hook (For Creating/Updating)

```typescript
import { useMutation } from '@/hooks/useApi'
import { authAPI } from '@/services/api'

function LoginForm() {
  const { mutate: login, loading } = useMutation(
    (data) => authAPI.login(data.email, data.password)
  )

  const handleSubmit = async (data) => {
    const result = await login(data)
    localStorage.setItem('token', result.token)
  }

  return <form onSubmit={handleSubmit}>{...}</form>
}
```

### API Endpoints Required

Backend must provide:

```
POST   /api/auth/login              Login
POST   /api/auth/register           Register
POST   /api/auth/logout             Logout
GET    /api/auth/me                 Get current user

GET    /api/schedules               List all schedules
POST   /api/schedules               Create schedule
PUT    /api/schedules/:id           Update schedule
DELETE /api/schedules/:id           Delete schedule

GET    /api/notes                   List all notes
POST   /api/notes                   Create note
PUT    /api/notes/:id               Update note
DELETE /api/notes/:id               Delete note

GET    /api/tasks                   List all tasks
POST   /api/tasks                   Create task
PUT    /api/tasks/:id               Update task
DELETE /api/tasks/:id               Delete task

GET    /api/statistics/dashboard    Dashboard stats
GET    /api/statistics/progress     Study progress
GET    /api/statistics/subjects     Subject stats

GET    /api/users/profile           Get user profile
PUT    /api/users/profile           Update profile
```

See [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md) for more details.

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| [DEPLOYMENT_READY.md](./DEPLOYMENT_READY.md) | Deployment status and checklist |
| [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) | Detailed Vercel deployment guide |
| [DEPLOYMENT_COMMANDS.md](./DEPLOYMENT_COMMANDS.md) | Quick command reference |
| [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md) | Backend API integration |

## 🧪 Troubleshooting

### Issue: Port 5173 already in use

```bash
npm run dev -- --port 3000
```

### Issue: API calls failing

Check:
1. Backend running on `http://localhost:8080`
2. `VITE_API_BASE_URL` is correct in `.env`
3. Backend CORS allows frontend origin
4. Token is valid (check localStorage)

### Issue: Build fails

```bash
# Clean install
rm -rf node_modules package-lock.json
npm install

# Check TypeScript
npm run lint

# Try building again
npm run build
```

### Issue: Components not rendering

1. Check browser console for errors
2. Verify all imports are correct
3. Check CSS is loading (`dist/assets/index-*.css`)

## 🔒 Security

✅ **No Hardcoded Secrets** - All sensitive data in environment variables  
✅ **HTTPS** - Vercel provides free HTTPS  
✅ **Token Management** - Secure localStorage usage  
✅ **CORS Ready** - Configured for cross-origin requests  
✅ **XSS Protection** - React escapes content by default  

## 🎨 Design

- **Color Scheme**: Orange (#ff9800) gradient design
- **Typography**: System fonts for performance
- **Spacing**: Consistent 8px grid
- **Animations**: Smooth transitions and effects
- **Breakpoints**: Mobile (< 768px), Tablet (768-1024px), Desktop (> 1024px)

## 📊 Performance

- **Bundle Size**: 162 KB (gzipped: 51 KB)
- **Build Time**: ~4.5 seconds
- **Modules**: 1366 optimized modules
- **Lighthouse**: Target score 90+

## 🔄 Contributing

1. Create feature branch: `git checkout -b feature/my-feature`
2. Make changes
3. Test locally: `npm run build && npm run preview`
4. Push to GitHub: `git push origin feature/my-feature`
5. Create Pull Request

## 📄 License

MIT License - See LICENSE file

## 📞 Support

- **Documentation**: See files in project root
- **Issues**: Create GitHub issue
- **Questions**: See INTEGRATION_GUIDE.md

## 🎉 Getting Help

1. **Build Issues**: See [Troubleshooting](#-troubleshooting)
2. **Deployment**: See [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)
3. **API Integration**: See [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md)
4. **Commands**: See [DEPLOYMENT_COMMANDS.md](./DEPLOYMENT_COMMANDS.md)

---

**Version**: 1.0.0  
**Status**: ✅ Production Ready  
**Last Updated**: January 28, 2026  
**Framework**: React 18 + Vite + TypeScript
