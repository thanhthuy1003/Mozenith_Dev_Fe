@echo off
REM Vercel Deployment Checklist & Helper Script for Windows

setlocal enabledelayedexpansion

cls
echo.
echo ==========================================
echo   Mozenith Frontend - Deployment Guide
echo ==========================================
echo.

REM Check Node.js
echo Checking System Requirements...
echo.

node -v >nul 2>&1
if %errorlevel% equ 0 (
    for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
    echo   [OK] Node.js: !NODE_VERSION!
) else (
    echo   [ERROR] Node.js: NOT INSTALLED
    echo   Install from: https://nodejs.org
    pause
    exit /b 1
)

REM Check npm
npm -v >nul 2>&1
if %errorlevel% equ 0 (
    for /f "tokens=*" %%i in ('npm -v') do set NPM_VERSION=%%i
    echo   [OK] npm: !NPM_VERSION!
) else (
    echo   [ERROR] npm: NOT INSTALLED
    pause
    exit /b 1
)

REM Check Git
git --version >nul 2>&1
if %errorlevel% equ 0 (
    echo   [OK] Git: Installed
) else (
    echo   [ERROR] Git: NOT INSTALLED
    echo   Install from: https://git-scm.com
    pause
    exit /b 1
)

echo.
echo Checking Project Files...
echo.

REM Check critical files
if exist package.json (echo   [OK] package.json) else (echo   [ERROR] package.json: MISSING)
if exist tsconfig.json (echo   [OK] tsconfig.json) else (echo   [ERROR] tsconfig.json: MISSING)
if exist vite.config.ts (echo   [OK] vite.config.ts) else (echo   [ERROR] vite.config.ts: MISSING)
if exist vercel.json (echo   [OK] vercel.json) else (echo   [ERROR] vercel.json: MISSING)
if exist .env.production (echo   [OK] .env.production) else (echo   [ERROR] .env.production: MISSING)
if exist src\main.tsx (echo   [OK] src\main.tsx) else (echo   [ERROR] src\main.tsx: MISSING)
if exist src\App.tsx (echo   [OK] src\App.tsx) else (echo   [ERROR] src\App.tsx: MISSING)
if exist src\services\api.ts (echo   [OK] src\services\api.ts) else (echo   [ERROR] src\services\api.ts: MISSING)

echo.
echo ==========================================
echo   Next Steps for Deployment
echo ==========================================
echo.

echo Step 1: Prepare Code
echo   Run these commands:
echo   $ npm install
echo   $ npm run build
echo   $ npm run preview
echo.

echo Step 2: Push to GitHub
echo   $ git add .
echo   $ git commit -m "Deploy to Vercel"
echo   $ git push origin main
echo.

echo Step 3: Deploy to Vercel
echo.
echo   Option A: Git Integration ^(Recommended^)
echo   1. Go to https://vercel.com
echo   2. Click 'Add New' -^> 'Project'
echo   3. Import your GitHub repository
echo   4. Add Environment Variables:
echo      - VITE_API_BASE_URL=https://api.mozenith.com/api
echo   5. Click 'Deploy'
echo.
echo   Option B: Vercel CLI
echo   $ npm install -g vercel
echo   $ vercel login
echo   $ vercel --prod
echo.

echo Step 4: Verify Deployment
echo   1. Check Vercel dashboard
echo   2. Visit your live URL
echo   3. Test all pages load
echo   4. Check API connections
echo   5. Test on mobile device
echo.

echo ==========================================
echo   Environment Variables
echo ==========================================
echo.
echo Set these in Vercel Dashboard:
echo.
echo Production:
echo   VITE_API_BASE_URL=https://api.mozenith.com/api
echo.

echo ==========================================
echo   Documentation Files
echo ==========================================
echo.
echo DEPLOYMENT_READY.md
echo   Summary of deployment status and checklist
echo.
echo VERCEL_DEPLOYMENT.md
echo   Detailed deployment instructions
echo.
echo DEPLOYMENT_COMMANDS.md
echo   Quick command reference
echo.
echo INTEGRATION_GUIDE.md
echo   Backend API integration guide
echo.

echo ==========================================
echo.
echo Ready to deploy?
echo.
echo Questions? See the documentation files in the project root.
echo.

echo Would you like to start the build process now? (Y/N)
set /p choice=
if /i "%choice%"=="Y" (
    echo.
    echo Building project...
    call npm run build
    echo.
    echo Build complete! Check the dist/ folder.
    echo.
    echo Next: Push to GitHub and deploy to Vercel
    pause
) else (
    echo.
    echo Deployment guide ready!
    echo Run: npm run build
    echo Then push to GitHub and deploy to Vercel
    pause
)
