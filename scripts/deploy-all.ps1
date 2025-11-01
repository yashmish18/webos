# Function to handle user prompts in aptos cli
function Submit-Transaction {
    param (
        [string]$Input
    )
    if ($Input -match "Do you want to submit a transaction") {
        Write-Host "yes"
    }
}

# Function to publish a module
function Publish-Module {
    param (
        [string]$Path,
        [string]$Name
    )
    Write-Host "Publishing $Name module..."
    Set-Location $Path
    $result = aptos move publish --included-artifacts none
    Submit-Transaction $result
}

# Main deployment script
Write-Host "Starting deployment of all modules..."

# 1. Deploy Aptos modules
Write-Host "`nDeploying Aptos modules..."
Publish-Module -Path "D:\webos\move\aptos" -Name "Aptos"

# 2. Deploy Sentience Protocol
Write-Host "`nDeploying Sentience Protocol..."

# First deploy core module
Set-Location "D:\webos\move\sentience"
Copy-Item Move.toml Move.toml.bak

# Update Move.toml for core only
$content = @"
[package]
name = "SentienceCore"
version = "1.0.0"

[addresses]
sentience = "0x3df1b91e01acffa234d7824f03937bf98fc5cc254d580ac6290796ac5a2b7705"
std = "0x1"

[dependencies.AptosFramework]
git = "https://github.com/aptos-labs/aptos-core.git"
rev = "devnet"
subdir = "aptos-move/framework/aptos-framework"
"@

$content | Out-File -FilePath Move.toml -Encoding UTF8

# Create temp directory for core
if (Test-Path temp) { Remove-Item -Recurse -Force temp }
New-Item -ItemType Directory -Path "temp\sources" -Force | Out-Null
Copy-Item "sources\sentience_core.move" "temp\sources\"

# Publish core module
Write-Host "Publishing Sentience Core module..."
Set-Location "temp"
$result = aptos move publish --included-artifacts none
Submit-Transaction $result

# Restore original Move.toml and structure
Set-Location ".."
Copy-Item Move.toml.bak Move.toml -Force
Remove-Item Move.toml.bak
Remove-Item -Recurse -Force temp

# Now publish all Sentience modules
Write-Host "Publishing complete Sentience Protocol..."
$result = aptos move publish --included-artifacts none
Submit-Transaction $result

Write-Host "`nDeployment completed!"
Write-Host "You can verify the deployments on Aptos Explorer:"
Write-Host "https://explorer.aptoslabs.com/account/0x3df1b91e01acffa234d7824f03937bf98fc5cc254d580ac6290796ac5a2b7705?network=devnet"