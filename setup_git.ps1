Remove-Item -Recurse -Force backend\.git -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force frontend\.git -ErrorAction SilentlyContinue
git init
git add .
git commit -m "Initial commit for SmartChef Pro"
git branch -M main
git remote add origin https://github.com/ieyrfan/smartchef-pro.git
Write-Host "Git repository setup complete! Now run 'git push -u origin main' to upload."
