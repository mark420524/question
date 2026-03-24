<template></template>

<script>
export default {
  onLaunch() {
    // 应用启动时恢复上次主题设置（如果存在）并暴露设置函数
    try {
      const theme = (typeof uni !== 'undefined' && uni.getStorageSync && uni.getStorageSync('appTheme')) || '';
      if (typeof document !== 'undefined' && theme) {
        document.documentElement.classList.remove('theme-dark', 'theme-ocean');
        document.documentElement.classList.add(theme);
      }
    } catch (e) {
      // 在非 H5 平台上忽略
    }

    // 提供全局函数方便页面切换主题
    try {
      if (typeof globalThis !== 'undefined') {
        globalThis.setAppTheme = function (t) {
          try {
            if (typeof document !== 'undefined') {
              document.documentElement.classList.remove('theme-dark', 'theme-ocean');
              if (t) document.documentElement.classList.add(t);
            }
            if (typeof uni !== 'undefined' && uni.setStorageSync) uni.setStorageSync('appTheme', t);
          } catch (e) {}
        };
      }
    } catch (e) {}
  },
  onShow() {
    // noop
  },
  onHide() {
    // noop
  }
};
</script>

<style>
@import './styles/theme.css';
@import './styles/theme-variants.css';
</style>
