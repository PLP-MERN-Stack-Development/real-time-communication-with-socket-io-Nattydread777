# Start Script for Windows PowerShell
# This script starts both the server and client in separate terminals

Write-Host "====================================" -ForegroundColor Cyan
Write-Host "Real-Time Chat App - Starter" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""

$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path

Write-Host "🚀 Starting server..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$scriptPath\server'; npm run dev"

Start-Sleep -Seconds 2

Write-Host "🚀 Starting client..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$scriptPath\client'; npm run dev"

Write-Host ""
Write-Host "✅ Server and client are starting..." -ForegroundColor Green
Write-Host ""
Write-Host "The application will open automatically at:" -ForegroundColor White
Write-Host "http://localhost:5173" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press Ctrl+C in each terminal window to stop the servers." -ForegroundColor Yellow
