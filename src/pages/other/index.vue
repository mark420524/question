<template>
  <view class="page-container tab-page sub-page">
    <view class="sub-intro">
      <text class="sub-eyebrow">扩展</text>
      <text class="sub-title">其他工具</text>
      <text class="sub-lead">聚合非常用能力，避免干扰主学习路径。</text>
    </view>

    <view class="content-card">
      <text class="content-text">
        此页面为预留入口，相关工具将逐步迁移至此。请暂时从首页「工具」区或底部「更多」使用翻译、诗词、导出等功能。
      </text>
    </view>
  </view>
</template>

<script setup>
</script>

<style scoped>
.sub-page {
  padding-bottom: 48rpx;
}

.sub-intro {
  margin-bottom: 28rpx;
  padding-bottom: 20rpx;
  border-bottom: 1rpx solid var(--tab-line);
}

.sub-eyebrow {
  display: block;
  font-size: 22rpx;
  font-weight: 600;
  color: var(--tab-brand);
  letter-spacing: 2rpx;
  margin-bottom: 10rpx;
}

.sub-title {
  display: block;
  font-size: 34rpx;
  font-weight: 700;
  color: var(--tab-ink);
  margin-bottom: 10rpx;
}

.sub-lead {
  display: block;
  font-size: 26rpx;
  color: var(--tab-muted);
  line-height: 1.55;
}

.content-card {
  padding: 32rpx 28rpx;
  background: var(--tab-surface);
  border-radius: var(--tab-radius-lg);
  border: 1rpx solid var(--tab-line);
  box-shadow: var(--tab-shadow-soft);
}

.content-text {
  font-size: 28rpx;
  color: var(--tab-ink-soft);
  line-height: 1.65;
  letter-spacing: 0.5rpx;
}
</style>
