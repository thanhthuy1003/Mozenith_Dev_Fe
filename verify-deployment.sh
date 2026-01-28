#!/bin/bash
# Mozenith Frontend - Pre-Deployment Verification Script

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Mozenith Frontend - Pre-Deployment Verification"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

CHECKS_PASSED=0
CHECKS_TOTAL=0

check() {
    CHECKS_TOTAL=$((CHECKS_TOTAL + 1))
    if eval "$1"; then
        echo "✅ $2"
        CHECKS_PASSED=$((CHECKS_PASSED + 1))
    else
        echo "❌ $2"
    fi
}

# System Requirements
echo "📋 System Requirements"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
check "command -v node &> /dev/null" "Node.js installed"
check "command -v npm &> /dev/null" "npm installed"
check "command -v git &> /dev/null" "Git installed"
echo ""

# Project Files
echo "📁 Project Files"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
check "[ -f package.json ]" "package.json exists"
check "[ -f tsconfig.json ]" "tsconfig.json exists"
check "[ -f vite.config.ts ]" "vite.config.ts exists"
check "[ -f vercel.json ]" "vercel.json exists"
check "[ -f .env.production ]" ".env.production exists"
check "[ -d src ]" "src/ directory exists"
check "[ -d src/components ]" "src/components/ directory exists"
check "[ -d src/services ]" "src/services/ directory exists"
check "[ -d src/hooks ]" "src/hooks/ directory exists"
echo ""

# API Integration
echo "🔗 API Integration"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
check "[ -f src/services/api.ts ]" "API service exists"
check "[ -f src/hooks/useApi.ts ]" "useApi hook exists"
check "[ -f src/components/Auth.tsx ]" "Auth component exists"
echo ""

# Documentation
echo "📚 Documentation"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
check "[ -f README.md ]" "README.md exists"
check "[ -f VERCEL_DEPLOYMENT.md ]" "VERCEL_DEPLOYMENT.md exists"
check "[ -f INTEGRATION_GUIDE.md ]" "INTEGRATION_GUIDE.md exists"
check "[ -f DEPLOYMENT_COMMANDS.md ]" "DEPLOYMENT_COMMANDS.md exists"
check "[ -f MANIFEST.md ]" "MANIFEST.md exists"
echo ""

# Build Configuration
echo "⚙️ Build Configuration"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
check "grep -q '\"build\": \"vite build\"' package.json" "Build script configured"
check "grep -q '\"dev\": \"vite\"' package.json" "Dev script configured"
check "grep -q '\"react\"' package.json" "React dependency exists"
echo ""

# Environment Setup
echo "🔑 Environment Setup"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
check "[ -f .env ]" ".env file exists"
check "[ -f .env.development ]" ".env.development exists"
check "grep -q 'VITE_API_BASE_URL' .env.production" "API URL configured"
echo ""

# Build Test
echo "🏗️ Build Test"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if [ -d node_modules ]; then
    echo "✅ Dependencies installed"
    CHECKS_PASSED=$((CHECKS_PASSED + 1))
else
    echo "⚠️  Dependencies not installed (run: npm install)"
fi
CHECKS_TOTAL=$((CHECKS_TOTAL + 1))

if npm run build &> /dev/null; then
    echo "✅ Build passes"
    CHECKS_PASSED=$((CHECKS_PASSED + 1))
else
    echo "❌ Build fails (run: npm run build)"
fi
CHECKS_TOTAL=$((CHECKS_TOTAL + 1))

if [ -d dist ]; then
    echo "✅ Build output exists"
    CHECKS_PASSED=$((CHECKS_PASSED + 1))
else
    echo "❌ Build output missing"
fi
CHECKS_TOTAL=$((CHECKS_TOTAL + 1))

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 Verification Results"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Checks Passed: $CHECKS_PASSED/$CHECKS_TOTAL"
echo ""

if [ $CHECKS_PASSED -eq $CHECKS_TOTAL ]; then
    echo "✨ All checks passed! Ready to deploy! 🚀"
    echo ""
    echo "Next steps:"
    echo "  1. git add ."
    echo "  2. git commit -m 'Deploy to Vercel'"
    echo "  3. git push origin main"
    echo "  4. Go to vercel.com and import repo"
    exit 0
else
    MISSING=$((CHECKS_TOTAL - CHECKS_PASSED))
    echo "⚠️  $MISSING check(s) failed"
    echo ""
    echo "Please fix the issues above and try again."
    exit 1
fi
