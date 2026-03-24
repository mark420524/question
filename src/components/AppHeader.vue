<template>
  <view class="app-header">
    <view class="left">
      <slot name="left"></slot>
    </view>
    <view class="title">{{ title }}</view>
    <view class="right">
      <picker mode="selector" :range="themeOptions" @change="onThemePickerChange">
        <text class="theme-text">{{ currentThemeLabel }}</text>
      </picker>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'
const props = defineProps({ title: { type: String, default: '学习伙伴' } })
const themeOptions = ['默认', '暗色', '海洋']
const themeIds = ['', 'theme-dark', 'theme-ocean']
const currentTheme = ref((typeof uni !== 'undefined' && uni.getStorageSync && uni.getStorageSync('appTheme')) || '')
const currentThemeLabel = computed(() => themeOptions[themeIds.indexOf(currentTheme.value) === -1 ? 0 : themeIds.indexOf(currentTheme.value)])
function applyTheme(t) {
  try { if (typeof document !== 'undefined') { document.documentElement.classList.remove('theme-dark', 'theme-ocean'); if (t) document.documentElement.classList.add(t) } } catch (e) {}
  currentTheme.value = t || ''
  if (typeof uni !== 'undefined' && uni.setStorageSync) uni.setStorageSync('appTheme', t)
}
function onThemePickerChange(e) { const idx = parseInt(e.detail.value, 10) || 0; applyTheme(themeIds[idx] || '') }
</script>

<style scoped>
.app-header { height: var(--header-height); display:flex; align-items:center; justify-content:space-between; padding: 0 var(--space-4); background: linear-gradient(90deg, rgba(59,130,246,0.04), rgba(59,130,246,0.01)); border-bottom: var(--border-width) solid rgba(59,130,246,0.06); }
.title { font-size: var(--font-size-lg); font-weight: var(--font-weight-semibold); color: var(--primary) }
.left, .right { width: 88rpx; display:flex; align-items:center; justify-content:center }
.theme-text { color: var(--text-secondary); font-size: var(--font-size-sm) }
</style>
