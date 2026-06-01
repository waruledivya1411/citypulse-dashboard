# Push CityPulse commits one at a time to GitHub (run after signing in as waruledivya1411)
# Usage: .\push-incremental.ps1

$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

$commits = @(
    "accf8f5",  # chore: scaffold Vite React TypeScript project with Tailwind
    "6de755c",  # feat: define sensor types and Mumbai monitoring site configuration
    "d81e337",  # feat: integrate Open-Meteo API for live environmental sensor data
    "a28bd5d",  # style: add global theme and reusable Card and Badge components
    "9edc6af",  # feat: build app shell with sidebar, header, and live data banner
    "e231d28",  # feat: add useCityData hook with filters, KPIs, and 15-minute refresh
    "84dd61a",  # feat: add overview dashboard with KPIs, trend charts, and alerts
    "c6f2960",  # feat: add Leaflet map with markers, filters, and sensor detail panel
    "1ceb7a0",  # feat: add map explorer page combining map and sensor sidebar
    "af5f745",  # feat: add analytics page with zone comparison and solar charts
    "78142e5",  # feat: wire multi-view SPA with overview, map, and analytics routes
    "4040bdf"   # docs: add comprehensive README and favicon
)

Write-Host "Pushing $($commits.Count) commits to origin/main (one per step)...`n" -ForegroundColor Cyan

$i = 1
foreach ($sha in $commits) {
    $msg = git log -1 --format=%s $sha
    Write-Host "[$i/$($commits.Count)] $sha — $msg" -ForegroundColor Yellow
    git push origin "${sha}:main"
    if ($LASTEXITCODE -ne 0) {
        Write-Host "`nPush failed. Sign in as waruledivya1411 (repo owner), then run this script again." -ForegroundColor Red
        exit 1
    }
    Start-Sleep -Seconds 2
    $i++
}

Write-Host "`nDone. All commits are on https://github.com/waruledivya1411/citypulse-dashboard" -ForegroundColor Green
