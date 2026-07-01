# CareerHive — local CI script (same steps as GitHub Actions)
$ErrorActionPreference = "Stop"

Write-Host "==> Installing dependencies..."
npm ci

Write-Host "==> Building..."
$env:CI = "true"
if (-not $env:PUBLIC_URL) { $env:PUBLIC_URL = "/CareerHive" }
npm run build

Write-Host "==> Running tests..."
npm test -- --watchAll=false --passWithNoTests

Write-Host "==> Adding SPA fallback..."
Copy-Item build/index.html build/404.html -Force

Write-Host "CI passed — build ready in ./build"
