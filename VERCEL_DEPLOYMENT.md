# Deploy Mozenith Frontend to Vercel

## 📋 Prerequisites

1. **Vercel Account** - Sign up at [vercel.com](https://vercel.com)
2. **GitHub Account** - Repository should be pushed to GitHub
3. **Git** - For version control

## 🚀 Deployment Methods

### Method 1: Git Integration (Recommended)

This method automatically deploys on every push to your repository.

#### Step 1: Push Code to GitHub

```bash
# Initialize git (if not already done)
cd d:\github\Mozenith_Dev_Fe
git init
git add .
git commit -m "Initial commit"

# Add your GitHub repository
git remote add origin https://github.com/yourusername/studyplus-fe.git
git branch -M main
git push -u origin main
```

#### Step 2: Connect to Vercel

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. Select **"Import Git Repository"**
4. Find and select your `studyplus-fe` repository
5. Click **"Import"**

#### Step 3: Configure Environment Variables

In Vercel Dashboard:

1. Go to **Project Settings** → **Environment Variables**
2. Add the following variables:

```
VITE_API_BASE_URL=https://your-backend-api.com/api
```

For different environments:
- **Production**: `https://api.mozenith.com/api`
- **Staging**: `https://staging-api.mozenith.com/api`
- **Development**: `http://localhost:8080/api`

#### Step 4: Deploy

Click **"Deploy"** button. Vercel will:
- Build your project: `npm run build`
- Generate optimized output in `dist/`
- Deploy to Vercel's CDN
- Provide you with a live URL

---

### Method 2: Vercel CLI (Manual Deployment)

For more control during deployment.

#### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

#### Step 2: Login to Vercel

```bash
vercel login
```

#### Step 3: Deploy

```bash
cd d:\github\Mozenith_Dev_Fe

# First deployment (links project)
vercel

# Subsequent deployments
vercel --prod
```

---

## 🔧 Configuration

### Vercel Configuration File

The `vercel.json` file contains:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "vite",
  "env": {
    "VITE_API_BASE_URL": {
      "description": "Backend API base URL"
    }
  }
}
```

### Environment Variables

Set these in Vercel Dashboard → **Settings** → **Environment Variables**:

#### Production
```
VITE_API_BASE_URL=https://api.mozenith.com/api
```

#### Preview (Staging)
```
VITE_API_BASE_URL=https://staging-api.mozenith.com/api
```

---

## 📊 Build & Optimization

Vercel automatically:

✅ Optimizes images  
✅ Minifies JavaScript  
✅ Removes unused code (tree-shaking)  
✅ Compresses assets  
✅ Provides CDN distribution  

### Build Metrics

After deployment, check:
- **Build Time**: Should be < 5 minutes
- **Bundle Size**: Aim for < 200KB (gzipped)
- **Performance**: Use Lighthouse for scoring

View in Vercel Dashboard → **Analytics**

---

## 🔐 Security

### CORS Configuration

Since frontend and backend are on different domains:

**Backend (Spring Boot)** needs CORS setup:

```java
@Configuration
public class CorsConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                    .allowedOrigins(
                        "https://studyplus.vercel.app",
                        "https://*.vercel.app"
                    )
                    .allowedMethods("*")
                    .allowedHeaders("*")
                    .allowCredentials(true);
            }
        };
    }
}
```

### Token Management

Tokens stored in localStorage are secure when using HTTPS (which Vercel provides by default).

---

## 🧪 Testing Before Deployment

### Local Build Test

```bash
cd d:\github\Mozenith_Dev_Fe

# Build locally
npm run build

# Preview production build
npm run preview
```

Visit `http://localhost:4173` and test all features.

### Test API Calls

```javascript
// In browser console
fetch('https://api.mozenith.com/api/schedules')
  .then(r => r.json())
  .then(d => console.log(d))
  .catch(e => console.error(e))
```

---

## 📈 Monitoring Deployments

### View Deployment Status

Vercel Dashboard → **Deployments** tab shows:
- ✅ Successful deployments
- ⏳ In-progress builds
- ❌ Failed deployments

### View Logs

Click on any deployment to see:
- Build logs
- Error messages
- Performance metrics

### Automatic Rollback

If deployment fails, Vercel automatically keeps the previous version live.

---

## 🔄 Continuous Deployment (CD)

### Auto-Deploy on Push

Once connected to GitHub:

1. **Main branch** → Automatically deploys to Production
2. **Other branches** → Creates Preview deployments
3. **Pull Requests** → Automatic preview URLs for testing

### Disable Auto-Deploy

Vercel Dashboard → **Settings** → **Git** → Disable auto-deploy

Then deploy manually via Vercel CLI or dashboard.

---

## 🚨 Troubleshooting

### Build Fails

**Check:**
- `npm run build` works locally
- All dependencies are in `package.json`
- No TypeScript errors: `npm run lint`

### 404 Errors After Deployment

**Solution:** Add `vercel.json` rewrites:

```json
{
  "rewrites": [
    { "source": "/:path*", "destination": "/index.html" }
  ]
}
```

### API Calls Fail (CORS)

**Solution:** 
1. Check backend CORS configuration
2. Verify `VITE_API_BASE_URL` is correct in environment variables
3. Ensure backend is accessible from internet (not localhost)

### Static Files Missing

**Solution:**
- All static files must be in `public/` folder
- Reference them as `/filename` in code
- Check `dist/` folder exists after build

---

## 📱 Custom Domain

### Add Custom Domain

1. Vercel Dashboard → **Settings** → **Domains**
2. Enter your domain (e.g., `studyplus.com`)
3. Update DNS records per Vercel instructions
4. Wait for DNS propagation (5-48 hours)

### SSL Certificate

Vercel provides FREE SSL certificates automatically for all domains.

---

## 💡 Best Practices

1. **Use Environment Variables** - Never hardcode URLs or secrets
2. **Test Preview Deployments** - Review before production
3. **Monitor Performance** - Check Core Web Vitals
4. **Enable Security Headers** - Vercel does this by default
5. **Set up Analytics** - Track user behavior and errors
6. **Use Git Tags** - Tag releases for easy rollback

---

## 📝 Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] `vercel.json` configured
- [ ] `package.json` has build script
- [ ] Environment variables set in Vercel
- [ ] Backend CORS allows Vercel domain
- [ ] Local build works: `npm run build`
- [ ] Preview build works: `npm run preview`
- [ ] No console errors in browser
- [ ] API calls working in preview
- [ ] All pages responsive on mobile
- [ ] Lighthouse score > 80

---

## 🔗 Useful Links

- [Vercel Docs](https://vercel.com/docs)
- [Vite Deployment](https://vitejs.dev/guide/static-deploy.html#vercel)
- [Environment Variables](https://vercel.com/docs/projects/environment-variables)
- [Custom Domains](https://vercel.com/docs/concepts/projects/domains/add-a-domain)

---

## 🎉 Post-Deployment

### After successful deployment:

1. **Test in Production** - Visit your live URL
2. **Monitor Analytics** - Track user behavior
3. **Set up Error Tracking** - Use Sentry or similar
4. **Enable Performance Monitoring** - Vercel Analytics
5. **Celebrate!** 🎊

---

**Version:** 1.0.0  
**Last Updated:** January 28, 2026
