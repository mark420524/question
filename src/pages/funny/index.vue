<template>
  <view class="page">
    <view class="page__content">
      <text class="page-title">funny 页面（占位）</text>
      <text class="page-desc">此页面已迁移为 uni-app，后续根据业务逻辑填充。</text>
    </view>
  </view>
</template>

<script setup>
function goWheel() { uni.navigateTo({ url: '/pages/integral/wheel' }) }
</script>

<style scoped>
.page {
  padding: 30rpx;
  background: var(--gray-100);
  min-height: 100vh;
}
.page-title {
  font-size: 34rpx;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 20rpx;
}
.page-desc {
  font-size: 26rpx;
  color: var(--gray-700);
}
</style>
