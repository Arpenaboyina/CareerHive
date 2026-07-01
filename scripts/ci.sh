#!/usr/bin/env bash
# CareerHive — local CI script (same steps as GitHub Actions)
set -e

echo "==> Installing dependencies..."
npm ci

echo "==> Building..."
export CI=true
export PUBLIC_URL="${PUBLIC_URL:-/CareerHive}"
npm run build

echo "==> Running tests..."
npm test -- --watchAll=false --passWithNoTests

echo "==> Adding SPA fallback..."
cp build/index.html build/404.html

echo "✓ CI passed — build ready in ./build"
