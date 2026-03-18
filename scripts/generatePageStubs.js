const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const pagesJsonPath = path.join(root, 'src', 'pages.json');

const pagesJson = JSON.parse(fs.readFileSync(pagesJsonPath, 'utf-8'));

function createPage(pagePath) {
  const fullPath = path.join(root, 'src', pagePath);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }

  const filePath = path.join(fullPath, 'index.vue');
  if (fs.existsSync(filePath)) return;

  const name = pagePath.split('/').slice(-2, -1)[0];
  const content = `<template>\n  <view class=\"page\">\n    <view class=\"page__content\">\n      <text class=\"page-title\">${name} 页面（占位）</text>\n      <text class=\"page-desc\">此页面已迁移为 uni-app，后续根据业务逻辑填充。</text>\n    </view>\n  </view>\n</template>\n\n<script setup>\n</script>\n\n<style scoped>\n.page {\n  padding: 30rpx;\n  background: #f5f6fa;\n  min-height: 100vh;\n}\n.page-title {\n  font-size: 34rpx;\n  font-weight: 700;\n  color: #1a1a1a;\n  margin-bottom: 20rpx;\n}\n.page-desc {\n  font-size: 26rpx;\n  color: #666666;\n}\n</style>\n`;

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log('created', filePath);
}

pagesJson.pages.forEach((page) => {
  createPage(page.path);
});

console.log('Stub pages generated.');
