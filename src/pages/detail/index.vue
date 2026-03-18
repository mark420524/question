<template>
  <view class="page-container page">
    <view v-if="item.title" class="business-card-rpx card-main">
      <view class="title">{{ item.title }}</view>
      <view class="author">{{ item.dynasty }} · {{ item.author }}</view>
      <view class="content" v-for="(line, idx) in (item.paragraphs || [])" :key="idx">{{ line }}</view>
      <view class="divider" />
      <view v-if="item.notes" class="note">{{ item.notes }}</view>
    </view>
    <view v-else class="empty">暂无内容</view>
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
.page { padding: 24rpx; }
.card-main { padding: 32rpx; }
.title { font-size: 34rpx; font-weight: 700; color: #1e293b; margin-bottom: 12rpx; }
.author { font-size: 26rpx; color: #64748b; margin-bottom: 24rpx; }
.content { font-size: 30rpx; color: #334155; line-height: 1.8; margin-bottom: 12rpx; }
.divider { height: 1rpx; background: #e2e8f0; margin: 24rpx 0; }
.note { font-size: 26rpx; color: #64748b; line-height: 1.6; }
.empty { padding: 60rpx; text-align: center; color: #94a3b8; }
</style>
