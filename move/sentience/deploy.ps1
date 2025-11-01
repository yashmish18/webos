# Function to publish module and handle prompts
function Publish-Module {
    $result = aptos move publish --included-artifacts none
    if ($result -match "Do you want to submit a transaction") {
        Write-Host "yes"
    }
}

# Deploy core module first
cd D:\webos\move\sentience
cp Move.toml Move.toml.bak

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
mkdir -p temp/sources
cp sources/sentience_core.move temp/sources/

# Publish core
cd temp
Write-Host "Publishing core module..."
Publish-Module

# Restore original Move.toml and structure
cd ..
cp Move.toml.bak Move.toml
Remove-Item Move.toml.bak

# Now publish all modules
Write-Host "Publishing all modules..."
Publish-Module