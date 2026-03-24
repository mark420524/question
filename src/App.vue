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
            // toggle CSS theme classes for H5
            if (typeof document !== 'undefined') {
              document.documentElement.classList.remove('theme-dark', 'theme-ocean');
              if (t) document.documentElement.classList.add(t);
            }

            // persist selection
            if (typeof uni !== 'undefined' && uni.setStorageSync) uni.setStorageSync('appTheme', t);

            // map theme -> native navigation bar colors
            const map = {
              '': { background: '#ffffff', front: '#000000' },
              'theme-dark': { background: '#0f172a', front: '#ffffff' },
              'theme-ocean': { background: '#0c4a6e', front: '#ffffff' }
            };
            const pick = map[t || ''] || map[''];

            // Try to set native navigation bar color (WeChat / uni-app)
            try {
              if (typeof uni !== 'undefined' && typeof uni.setNavigationBarColor === 'function') {
                uni.setNavigationBarColor({ frontColor: pick.front, backgroundColor: pick.background });
              } else if (typeof wx !== 'undefined' && typeof wx.setNavigationBarColor === 'function') {
                wx.setNavigationBarColor({ frontColor: pick.front, backgroundColor: pick.background });
              }
            } catch (e) {
              // ignore platform differences
            }
          } catch (e) {
            // noop
          }
        };

        // If we already had a theme restored earlier, apply native nav color immediately
        try {
          const restored = (typeof uni !== 'undefined' && uni.getStorageSync && uni.getStorageSync('appTheme')) || '';
          if (restored) {
            globalThis.setAppTheme(restored);
          }
        } catch (e) {}
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
