# Quick Deployment Commands

## Vercel Deployment Checklists

### Before Deployment Checklist

```bash
# 1. Ensure code is clean
git status

# 2. Run linter (if configured)
npm run lint

# 3. Test local build
npm run build

# 4. Preview production build locally
npm run preview

# 5. Check all features work
# - Visit http://localhost:4173
# - Test API connections
# - Check responsive design
```

### Git Push to GitHub

```bash
# Stage all changes
git add .

# Commit with message
git commit -m "Ready for Vercel deployment"

# Push to main branch
git push origin main

# OR force push (use with caution)
git push --force origin main
```

### Vercel CLI Deployment

```bash
# Install Vercel CLI (one-time)
npm install -g vercel

# Login (one-time)
vercel login

# First deployment (links to Vercel)
cd d:\github\Mozenith_Dev_Fe
vercel

# Production deployment
vercel --prod

# Deploy with environment variables
vercel --prod --env VITE_API_BASE_URL=https://api.mozenith.com/api
```

### Set Environment Variables

```bash
# Using Vercel CLI
vercel env add VITE_API_BASE_URL

# Pull environment variables from Vercel
vercel env pull .env.local

# Push environment variables to Vercel
vercel env push
```

---

## Post-Deployment Verification

```bash
# Test your live deployment
curl https://studyplus.vercel.app

# Check if API is working
curl https://studyplus.vercel.app/api/health

# View Vercel logs
vercel logs

# Inspect deployment
vercel inspect
```

---

## Rollback Previous Version

```bash
# List deployments
vercel list

# Rollback to previous deployment
vercel rollback

# Or specify deployment ID
vercel rollback <deployment-id>
```

---

## Environment Variables Management

### Add Single Variable
```bash
vercel env add VITE_API_BASE_URL
# Enter value: https://api.mozenith.com/api
```

### Add Multiple Variables
```bash
vercel env add VITE_API_BASE_URL https://api.mozenith.com/api
vercel env add VITE_DEBUG false
vercel env add VITE_APP_NAME Mozenith
```

### View All Variables
```bash
vercel env list
```

### Remove Variable
```bash
vercel env rm VITE_API_BASE_URL
```

---

## Useful Vercel Commands

```bash
# View current project info
vercel project ls

# Switch project
vercel switch

# View deployment details
vercel inspect <deployment-url>

# View build logs
vercel logs <deployment-url>

# Cancel deployment
vercel cancel

# Remove project
vercel remove
```

---

## Troubleshooting Commands

```bash
# Clear cache
vercel projects --cwd

# Rebuild and deploy
vercel --force

# Deploy in debug mode
vercel --debug

# Check Vercel CLI version
vercel --version

# Update Vercel CLI
npm install -g vercel@latest
```

---

## CI/CD Integration

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  Deploy-Production:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          production: true
```

---

## Quick Reference

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview prod build locally |
| `vercel` | Deploy to preview |
| `vercel --prod` | Deploy to production |
| `vercel env list` | View environment variables |
| `vercel logs` | View deployment logs |
| `vercel rollback` | Rollback to previous version |

---

**Last Updated:** January 28, 2026
