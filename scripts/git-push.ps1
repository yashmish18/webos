param(
    [string]$RepoUrl = "https://github.com/yashmish18/webos.git",
    [string]$Branch = "main",
    [string]$CommitMessage = "chore: update workspace from local",
    [switch]$UseSsh
)

# Move to repository root
Set-Location "D:\webos"

# Initialize git if necessary
if (-not (Test-Path .git)) {
    git init
}

# Configure remote
$remote = git remote -v 2>$null
if (-not $remote) {
    if ($UseSsh) {
        git remote add origin $RepoUrl
    } else {
        git remote add origin $RepoUrl
    }
} else {
    Write-Host "Remote(s) already configured:"; git remote -v
}

# Ensure branch exists locally
git branch --show-current 2>$null | Out-Null
try { git branch -M $Branch } catch { }

# Stage, commit, and push
git add -A
try {
    git commit -m "$CommitMessage"
} catch {
    Write-Host "Nothing to commit or commit failed: $_"
}

# Push (will prompt for credentials if required)
Write-Host "Pushing to $RepoUrl on branch $Branch..."
git push -u origin $Branch

Write-Host "Done. If push failed due to authentication, follow the README notes to set up SSH or a PAT."