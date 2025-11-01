# Publish AptOS Move Contracts
Write-Host "Compiling AptOS contracts..." -ForegroundColor Yellow
cd move\aptos
aptos move compile
if ($LASTEXITCODE -ne 0) {
    Write-Host "Compilation failed!" -ForegroundColor Red
    exit 1
}

Write-Host "Publishing AptOS contracts..." -ForegroundColor Yellow
aptos move publish --assume-yes
if ($LASTEXITCODE -ne 0) {
    Write-Host "Publish failed!" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Successfully published!" -ForegroundColor Green
cd ..\..

