#!/bin/bash
# Vercel Deployment Checklist & Helper Script

echo "=========================================="
echo "  Mozenith Frontend - Deployment Guide"
echo "=========================================="
echo ""

# Check requirements
echo "✓ Checking System Requirements..."
echo ""

# Check Node.js
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    echo "  ✅ Node.js: $NODE_VERSION"
else
    echo "  ❌ Node.js: NOT INSTALLED"
    echo "     Install from: https://nodejs.org"
    exit 1
fi

# Check npm
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm -v)
    echo "  ✅ npm: $NPM_VERSION"
else
    echo "  ❌ npm: NOT INSTALLED"
    exit 1
fi

# Check Git
if command -v git &> /dev/null; then
    GIT_VERSION=$(git --version)
    echo "  ✅ Git: Installed"
else
    echo "  ❌ Git: NOT INSTALLED"
    echo "     Install from: https://git-scm.com"
    exit 1
fi

echo ""
echo "✓ Checking Project Files..."
echo ""

# Check critical files
FILES=(
    "package.json"
    "tsconfig.json"
    "vite.config.ts"
    "vercel.json"
    ".env.production"
    "src/main.tsx"
    "src/App.tsx"
    "src/services/api.ts"
)

for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "  ✅ $file"
    else
        echo "  ❌ $file: MISSING"
    fi
done

echo ""
echo "=========================================="
echo "  Next Steps for Deployment"
echo "=========================================="
echo ""

echo "📋 STEP 1: Prepare Code"
echo "   Run these commands:"
echo "   $ npm install"
echo "   $ npm run build"
echo "   $ npm run preview"
echo ""

echo "📋 STEP 2: Push to GitHub"
echo "   $ git add ."
echo "   $ git commit -m 'Deploy to Vercel'"
echo "   $ git push origin main"
echo ""

echo "📋 STEP 3: Deploy to Vercel"
echo ""
echo "   Option A: Git Integration (Recommended)"
echo "   1. Go to https://vercel.com"
echo "   2. Click 'Add New' → 'Project'"
echo "   3. Import your GitHub repository"
echo "   4. Add Environment Variables:"
echo "      - VITE_API_BASE_URL=https://api.mozenith.com/api"
echo "   5. Click 'Deploy'"
echo ""
echo "   Option B: Vercel CLI"
echo "   $ npm install -g vercel"
echo "   $ vercel login"
echo "   $ vercel --prod"
echo ""

echo "📋 STEP 4: Verify Deployment"
echo "   1. Check Vercel dashboard"
echo "   2. Visit your live URL"
echo "   3. Test all pages load"
echo "   4. Check API connections"
echo "   5. Test on mobile device"
echo ""

echo "=========================================="
echo "  Environment Variables"
echo "=========================================="
echo ""
echo "Set these in Vercel Dashboard:"
echo ""
echo "Production:"
echo "  VITE_API_BASE_URL=https://api.mozenith.com/api"
echo ""
echo "Staging (Optional):"
echo "  VITE_API_BASE_URL=https://staging-api.mozenith.com/api"
echo ""

echo "=========================================="
echo "  Documentation Files"
echo "=========================================="
echo ""
echo "📖 DEPLOYMENT_READY.md"
echo "   Summary of deployment status and checklist"
echo ""
echo "📖 VERCEL_DEPLOYMENT.md"
echo "   Detailed deployment instructions"
echo ""
echo "📖 DEPLOYMENT_COMMANDS.md"
echo "   Quick command reference"
echo ""
echo "📖 INTEGRATION_GUIDE.md"
echo "   Backend API integration guide"
echo ""

echo "=========================================="
echo "  Build Information"
echo "=========================================="
echo ""
echo "Run this to see build details:"
echo "  $ npm run build"
echo ""

echo "=========================================="
echo ""
echo "Ready to deploy? 🚀"
echo ""
echo "Questions? See the documentation files in the project root."
echo ""
