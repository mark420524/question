const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const pagesDir = path.join(root, 'src', 'pages');

const pageDirs = fs.readdirSync(pagesDir, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);

pageDirs.forEach((page) => {
  const nestedIndexDir = path.join(pagesDir, page, 'index');
  const targetFile = path.join(pagesDir, page, 'index.vue');
  const nestedFile = path.join(nestedIndexDir, 'index.vue');

  if (fs.existsSync(nestedFile)) {
    if (!fs.existsSync(targetFile)) {
      fs.renameSync(nestedFile, targetFile);
      console.log(`moved ${nestedFile} -> ${targetFile}`);
    }
    // remove nested folder if empty
    try {
      fs.rmdirSync(nestedIndexDir);
      console.log(`removed folder ${nestedIndexDir}`);
    } catch (e) {
      // maybe not empty
    }
  }
});
