<template>
  <view class="page-container tab-page detail-page">
    <view v-if="item.title" class="prose-card">
      <view class="prose-accent" />
      <text class="prose-title">{{ item.title }}</text>
      <text class="prose-meta">{{ item.dynasty }} · {{ item.author }}</text>
      <text
        v-for="(line, idx) in (item.paragraphs || [])"
        :key="idx"
        class="prose-line"
      >{{ line }}</text>
      <view v-if="item.notes" class="prose-divider" />
      <text v-if="item.notes" class="prose-note">{{ item.notes }}</text>
    </view>
    <view v-else class="state-empty">暂无内容</view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { onUnload } from '@dcloudio/uni-app'

const item = ref({})

onMounted(() => {
  const data = uni.getStorageSync('poetryItem')
  if (data) {
    item.value = data
    uni.setNavigationBarTitle({ title: data.title || '详情' })
  }
})

onUnload(() => {
  uni.removeStorageSync('poetryItem')
})
</script>

<style scoped>
.detail-page {
  padding-bottom: 48rpx;
}
.prose-card {
  position: relative;
  overflow: hidden;
  padding: 32rpx 28rpx;
  background: var(--tab-surface);
  border-radius: var(--tab-radius-lg);
  border: 1rpx solid var(--tab-line);
  box-shadow: var(--tab-shadow-soft);
}
.prose-accent {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 6rpx;
  background: linear-gradient(90deg, var(--tab-brand-deep), var(--tab-brand), #2dd4bf);
}
.prose-title {
  display: block;
  font-size: 36rpx;
  font-weight: 700;
  color: var(--tab-ink);
  margin-bottom: 12rpx;
  line-height: 1.35;
}
.prose-meta {
  display: block;
  font-size: 26rpx;
  color: var(--tab-muted);
  margin-bottom: 28rpx;
}
.prose-line {
  display: block;
  font-size: 30rpx;
  color: var(--tab-ink-soft);
  line-height: 1.85;
  margin-bottom: 16rpx;
}
.prose-divider {
  height: 1rpx;
  background: rgba(18, 21, 28, 0.08);
  margin: 28rpx 0;
}
.prose-note {
  display: block;
  font-size: 26rpx;
  color: var(--tab-muted);
  line-height: 1.65;
}
.state-empty {
  padding: 80rpx 32rpx;
  text-align: center;
  font-size: 28rpx;
  color: var(--tab-muted);
}
</style>
