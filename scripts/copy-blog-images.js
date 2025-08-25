const fs = require('fs');
const path = require('path');

// Create the destination directory if it doesn't exist
const sourceDir = path.join(process.cwd(), 'content', 'blog', 'images');
const destDir = path.join(process.cwd(), 'public', 'blog-images');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// Copy all images from source to destination
if (fs.existsSync(sourceDir)) {
  const files = fs.readdirSync(sourceDir);
  
  files.forEach(file => {
    const sourcePath = path.join(sourceDir, file);
    const destPath = path.join(destDir, file);
    
    // Only copy image files
    const ext = path.extname(file).toLowerCase();
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
    
    if (imageExtensions.includes(ext)) {
      fs.copyFileSync(sourcePath, destPath);
      console.log(`Copied: ${file}`);
    }
  });
}

console.log('Blog images copied successfully!');
