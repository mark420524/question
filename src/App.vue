<template></template>
<script>
export default {
  onLaunch: function () {
    console.log('App Launch')
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
}
</script>

<style>
/* ========== 商务答题考试风格 - 公共样式集 ==========
 * 使用说明：页面根节点使用 class="page-container" 引用白色基调风格；
 * 卡片用 business-card，按钮用 business-btn business-btn-primary 等。
 * 小程序端使用 rpx 工具类（见下方 .business-* 含 rpx 的类）。
 */

/* 小程序/uni-app 页面根节点（:root 在小程序可能不生效，page 作为兜底） */
page {
  background-color: #f8fafc;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  color: #1e293b;
  line-height: 1.5;
}

/* 商务白色主题 - 全局样式变量 */
:root {
  /* 商务配色 */
  --business-primary: #2563eb;
  --business-primary-light: #3b82f6;
  --business-primary-dark: #1d4ed8;
  --business-secondary: #64748b;
  --business-accent: #06b6d4;
  --business-success: #10b981;
  --business-warning: #f59e0b;
  --business-error: #ef4444;

  /* 商务白色背景 */
  --business-bg-primary: #ffffff;
  --business-bg-secondary: #f8fafc;
  --business-bg-tertiary: #f1f5f9;
  --business-bg-hover: #e2e8f0;

  /* 商务文字颜色 */
  --business-text-primary: #1e293b;
  --business-text-secondary: #475569;
  --business-text-tertiary: #64748b;
  --business-text-inverse: #ffffff;
  --business-text-placeholder: #94a3b8;

  /* 商务边框 */
  --business-border: #e2e8f0;
  --business-border-light: #f1f5f9;

  /* 商务阴影 */
  --business-shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --business-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  --business-shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);

  /* 商务圆角 */
  --business-radius-sm: 4px;
  --business-radius: 6px;
  --business-radius-lg: 8px;
  --business-radius-xl: 12px;
  --business-radius-full: 9999px;

  /* 商务间距 */
  --business-space-1: 4px;
  --business-space-2: 8px;
  --business-space-3: 12px;
  --business-space-4: 16px;
  --business-space-5: 20px;
  --business-space-6: 24px;
  --business-space-8: 32px;
  --business-space-10: 40px;
  --business-space-12: 48px;

  /* 商务字体 */
  --business-font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  --business-font-size-xs: 12px;
  --business-font-size-sm: 14px;
  --business-font-size-base: 16px;
  --business-font-size-lg: 18px;
  --business-font-size-xl: 20px;
  --business-font-size-2xl: 24px;
  --business-font-size-3xl: 30px;

  /* 商务字重 */
  --business-font-weight-normal: 400;
  --business-font-weight-medium: 500;
  --business-font-weight-semibold: 600;
  --business-font-weight-bold: 700;
}

/* 全局重置 */
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  font-family: var(--business-font-family);
  background-color: var(--business-bg-secondary);
  color: var(--business-text-primary);
  line-height: 1.5;
}

/* 商务卡片组件 */
.business-card {
  background: var(--business-bg-primary);
  border-radius: var(--business-radius-lg);
  box-shadow: var(--business-shadow);
  border: 1px solid var(--business-border);
  overflow: hidden;
  transition: all 0.2s ease;
}

.business-card:hover {
  box-shadow: var(--business-shadow-lg);
  transform: translateY(-1px);
}

/* 商务按钮组件 */
.business-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--business-space-3) var(--business-space-4);
  border-radius: var(--business-radius);
  font-size: var(--business-font-size-sm);
  font-weight: var(--business-font-weight-medium);
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
  outline: none;
}

.business-btn-primary {
  background-color: var(--business-primary);
  color: var(--business-text-inverse);
  border-color: var(--business-primary);
}

.business-btn-primary:hover {
  background-color: var(--business-primary-dark);
  border-color: var(--business-primary-dark);
}

.business-btn-secondary {
  background-color: var(--business-bg-primary);
  color: var(--business-text-primary);
  border-color: var(--business-border);
}

.business-btn-secondary:hover {
  background-color: var(--business-bg-hover);
}

.business-btn-success {
  background-color: var(--business-success);
  color: var(--business-text-inverse);
  border-color: var(--business-success);
}

.business-btn-ghost {
  background-color: transparent;
  color: var(--business-text-secondary);
  border-color: transparent;
}

.business-btn-ghost:hover {
  background-color: var(--business-bg-hover);
}

/* 商务徽章组件 */
.business-badge {
  display: inline-flex;
  align-items: center;
  padding: var(--business-space-1) var(--business-space-2);
  border-radius: var(--business-radius-full);
  font-size: var(--business-font-size-xs);
  font-weight: var(--business-font-weight-medium);
  line-height: 1;
}

.business-badge-primary {
  background-color: var(--business-primary);
  color: var(--business-text-inverse);
}

.business-badge-success {
  background-color: var(--business-success);
  color: var(--business-text-inverse);
}

.business-badge-warning {
  background-color: var(--business-warning);
  color: white;
}

.business-badge-error {
  background-color: var(--business-error);
  color: var(--business-text-inverse);
}

/* 商务输入框组件 */
.business-input {
  width: 100%;
  padding: var(--business-space-3) var(--business-space-4);
  border: 1px solid var(--business-border);
  border-radius: var(--business-radius);
  font-size: var(--business-font-size-base);
  background-color: var(--business-bg-primary);
  color: var(--business-text-primary);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.business-input:focus {
  outline: none;
  border-color: var(--business-primary);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.business-input::placeholder {
  color: var(--business-text-placeholder);
}

/* 商务标签页组件 */
.business-tabs {
  display: flex;
  background-color: var(--business-bg-primary);
  border-radius: var(--business-radius-lg);
  padding: var(--business-space-1);
  margin-bottom: var(--business-space-4);
}

.business-tab {
  flex: 1;
  padding: var(--business-space-2) var(--business-space-4);
  border-radius: var(--business-radius);
  text-align: center;
  font-size: var(--business-font-size-sm);
  font-weight: var(--business-font-weight-medium);
  color: var(--business-text-secondary);
  cursor: pointer;
  transition: all 0.2s ease;
}

.business-tab.active {
  background-color: var(--business-primary);
  color: var(--business-text-inverse);
}

/* 商务网格布局 */
.business-grid {
  display: grid;
  gap: var(--business-space-4);
}

.business-grid-2 {
  grid-template-columns: repeat(2, 1fr);
}

.business-grid-3 {
  grid-template-columns: repeat(3, 1fr);
}

.business-grid-4 {
  grid-template-columns: repeat(4, 1fr);
}

/* 商务间距工具类 */
.business-mt-1 { margin-top: var(--business-space-1); }
.business-mt-2 { margin-top: var(--business-space-2); }
.business-mt-3 { margin-top: var(--business-space-3); }
.business-mt-4 { margin-top: var(--business-space-4); }
.business-mt-6 { margin-top: var(--business-space-6); }
.business-mt-8 { margin-top: var(--business-space-8); }

.business-mb-1 { margin-bottom: var(--business-space-1); }
.business-mb-2 { margin-bottom: var(--business-space-2); }
.business-mb-3 { margin-bottom: var(--business-space-3); }
.business-mb-4 { margin-bottom: var(--business-space-4); }
.business-mb-6 { margin-bottom: var(--business-space-6); }
.business-mb-8 { margin-bottom: var(--business-space-8); }

.business-p-3 { padding: var(--business-space-3); }
.business-p-4 { padding: var(--business-space-4); }
.business-p-6 { padding: var(--business-space-6); }

.business-px-4 { padding-left: var(--business-space-4); padding-right: var(--business-space-4); }
.business-py-3 { padding-top: var(--business-space-3); padding-bottom: var(--business-space-3); }

/* 商务文字工具类 */
.business-text-xs { font-size: var(--business-font-size-xs); }
.business-text-sm { font-size: var(--business-font-size-sm); }
.business-text-base { font-size: var(--business-font-size-base); }
.business-text-lg { font-size: var(--business-font-size-lg); }
.business-text-xl { font-size: var(--business-font-size-xl); }

.business-text-primary { color: var(--business-text-primary); }
.business-text-secondary { color: var(--business-text-secondary); }
.business-text-tertiary { color: var(--business-text-tertiary); }

.business-font-medium { font-weight: var(--business-font-weight-medium); }
.business-font-semibold { font-weight: var(--business-font-weight-semibold); }
.business-font-bold { font-weight: var(--business-font-weight-bold); }

/* 商务进度条 */
.business-progress {
  width: 100%;
  height: 8px;
  background-color: var(--business-bg-tertiary);
  border-radius: var(--business-radius-full);
  overflow: hidden;
}

.business-progress-bar {
  height: 100%;
  background: linear-gradient(90deg, var(--business-primary), var(--business-accent));
  border-radius: var(--business-radius-full);
  transition: width 0.3s ease;
}

/* 商务分割线 */
.business-divider {
  height: 1px;
  background-color: var(--business-border-light);
  margin: var(--business-space-4) 0;
}

/* 商务头像 */
.business-avatar {
  width: 48px;
  height: 48px;
  border-radius: var(--business-radius-full);
  object-fit: cover;
  border: 2px solid var(--business-border);
}

/* 商务图标按钮 */
.business-icon-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: var(--business-radius);
  background-color: var(--business-bg-primary);
  border: 1px solid var(--business-border);
  color: var(--business-text-secondary);
  cursor: pointer;
  transition: all 0.2s ease;
}

.business-icon-btn:hover {
  background-color: var(--business-bg-hover);
  color: var(--business-text-primary);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .business-grid-4 {
    grid-template-columns: repeat(2, 1fr);
  }

  .business-p-6 {
    padding: var(--business-space-4);
  }
}

/* 页面容器 */
.page-container {
  min-height: 100vh;
  background-color: var(--business-bg-secondary);
  padding: var(--business-space-4);
}

.page-content {
  max-width: 1200px;
  margin: 0 auto;
}

/* 滚动条样式 */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: var(--business-bg-tertiary);
}

::-webkit-scrollbar-thumb {
  background: var(--business-border);
  border-radius: var(--business-radius-full);
}

::-webkit-scrollbar-thumb:hover {
  background: var(--business-secondary);
}

/* ---------- uni-app / 小程序 rpx 风格（页面内可直接使用） ---------- */
.page-container {
  min-height: 100vh;
  background-color: #f8fafc;
  padding: 24rpx;
  padding-bottom: 120rpx;
}

.page-container--white {
  background-color: #ffffff;
}

.business-card-rpx {
  background: #ffffff;
  border-radius: 16rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.06);
  border: 1rpx solid #e2e8f0;
  overflow: hidden;
  padding: 24rpx;
}

.business-section-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 24rpx;
  display: flex;
  align-items: center;
}

.business-section-title::before {
  content: '';
  width: 8rpx;
  height: 32rpx;
  background: #2563eb;
  border-radius: 4rpx;
  margin-right: 16rpx;
}

.business-btn-rpx {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 24rpx 32rpx;
  border-radius: 12rpx;
  font-size: 28rpx;
  font-weight: 500;
  border: 1rpx solid transparent;
  transition: all 0.2s ease;
}

.business-btn-primary-rpx {
  background-color: #2563eb;
  color: #ffffff;
}

.business-btn-secondary-rpx {
  background-color: #ffffff;
  color: #1e293b;
  border-color: #e2e8f0;
}

.business-text-primary-rpx { color: #1e293b; }
.business-text-secondary-rpx { color: #475569; }
.business-text-tertiary-rpx { color: #64748b; }

.business-mt-2-rpx { margin-top: 16rpx; }
.business-mt-4-rpx { margin-top: 32rpx; }
.business-mb-2-rpx { margin-bottom: 16rpx; }
.business-mb-4-rpx { margin-bottom: 32rpx; }
.business-p-4-rpx { padding: 32rpx; }
</style>
