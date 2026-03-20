<template>
  <view class="page-container page">
    <view v-if="item.title" class="business-card-rpx card-main">
      <view class="title">{{ item.title }}</view>
      <view class="author">{{ item.author }}</view>
      <view v-for="(sec, i) in (item.content || [])" :key="i" class="section">
        <view class="subchapter">章节：{{ sec.chapter }}</view>
        <view v-for="(p, j) in (sec.paragraphs || [])" :key="j" class="para">{{ p }}</view>
      </view>
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
  const data = uni.getStorageSync('childItem')
  if (data) {
    item.value = data
    uni.setNavigationBarTitle({ title: data.title || '详情' })
  }
})

onUnload(() => {
  uni.removeStorageSync('childItem')
})
</script>

<style scoped>
.page { padding: 24rpx; }
.card-main { padding: 32rpx; }
.title { font-size: 34rpx; font-weight: 700; color: #1e293b; margin-bottom: 12rpx; }
.author { font-size: 26rpx; color: #64748b; margin-bottom: 24rpx; }
.section { margin-bottom: 24rpx; }
.subchapter { font-size: 26rpx; color: #2563eb; margin-bottom: 12rpx; }
.para { font-size: 28rpx; color: #334155; line-height: 1.8; margin-bottom: 8rpx; }
.divider { height: 1rpx; background: #e2e8f0; margin: 24rpx 0; }
.note { font-size: 26rpx; color: #64748b; }
.empty { padding: 60rpx; text-align: center; color: #94a3b8; }
</style>
