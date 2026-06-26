const fs = require('fs');
const path = require('path');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (file.endsWith('.html') && file !== 'index.html' && file !== '404.html') {
      const name = file.replace('.html', '');
      const folderPath = path.join(dir, name);
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
      }
      fs.copyFileSync(fullPath, path.join(folderPath, 'index.html'));
      console.log(`Copied ${file} to ${name}/index.html`);
    }
  }
}

processDir(path.join(__dirname, 'out'));
