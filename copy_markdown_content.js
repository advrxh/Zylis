const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, 'scribbles');
const destDir = path.join(__dirname, 'zylis/src/content/blog');

const copyFiles = (src, dest) => {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  fs.readdir(src, (err, files) => {
    if (err) {
      console.error('Error reading source directory:', err);
      return;
    }

    files.forEach(file => {
      const srcFile = path.join(src, file);
      const destFile = path.join(dest, file);

      fs.stat(srcFile, (err, stats) => {
        if (err) {
          console.error('Error getting stats of the file:', err);
          return;
        }

        if (stats.isDirectory()) {
          copyFiles(srcFile, destFile);
        } else {
          fs.copyFile(srcFile, destFile, err => {
            if (err) {
              console.error('Error copying file:', err);
            } else {
              console.log(`Copied ${srcFile} to ${destFile}`);
            }
          });
        }
      });
    });
  });
};

copyFiles(sourceDir, destDir);
