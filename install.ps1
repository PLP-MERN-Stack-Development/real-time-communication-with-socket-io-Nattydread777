# Installation Script for Windows PowerShell

Write-Host "====================================" -ForegroundColor Cyan
Write-Host "Real-Time Chat App - Installation" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""

# Get the script directory
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path

# Install server dependencies
Write-Host "📦 Installing server dependencies..." -ForegroundColor Yellow
Set-Location "$scriptPath\server"
npm install

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Server dependencies installed successfully!" -ForegroundColor Green
} else {
    Write-Host "❌ Failed to install server dependencies" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Install client dependencies
Write-Host "📦 Installing client dependencies..." -ForegroundColor Yellow
Set-Location "$scriptPath\client"
npm install

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Client dependencies installed successfully!" -ForegroundColor Green
} else {
    Write-Host "❌ Failed to install client dependencies" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "====================================" -ForegroundColor Cyan
Write-Host "🎉 Installation Complete!" -ForegroundColor Green
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "To start the application:" -ForegroundColor Yellow
Write-Host "1. Start the server:" -ForegroundColor White
Write-Host "   cd server" -ForegroundColor Gray
Write-Host "   npm run dev" -ForegroundColor Gray
Write-Host ""
Write-Host "2. In a new terminal, start the client:" -ForegroundColor White
Write-Host "   cd client" -ForegroundColor Gray
Write-Host "   npm run dev" -ForegroundColor Gray
Write-Host ""
Write-Host "3. Open http://localhost:5173 in your browser" -ForegroundColor White
Write-Host ""

# Return to original directory
Set-Location $scriptPath
