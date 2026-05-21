<template>
  <view class="section-shell">
    <view v-if="title || subtitle" class="section-header">
      <text v-if="title" class="section-title">{{ title }}</text>
      <text v-if="subtitle" class="section-subtitle">{{ subtitle }}</text>
    </view>
    <slot />
  </view>
</template>

<script setup>
const props = defineProps({
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' }
})
</script>

<style scoped>
.section-shell {
  padding: 24rpx;
  background: var(--tab-surface);
  border-radius: var(--tab-radius-lg);
  border: 1rpx solid var(--tab-line);
  box-shadow: var(--tab-shadow-soft);
}
.section-header {
  margin-bottom: 24rpx;
}
.section-title {
  display: block;
  font-size: 32rpx;
  font-weight: 700;
  color: var(--tab-ink);
  margin-bottom: 10rpx;
}
.section-subtitle {
  display: block;
  font-size: 26rpx;
  color: var(--tab-muted);
  line-height: 1.5;
}
</style>
