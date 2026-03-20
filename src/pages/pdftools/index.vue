<template>
  <view class="page-container page">
    <view class="business-card-rpx card-main">
      <view class="business-section-title">PDF 工具</view>
      <view class="grid">
        <view class="grid-item" @click="goFile(1)">加密文档</view>
        <view class="grid-item" @click="goFile(2)">清除密码</view>
        <view class="grid-item" @click="goFile(3)">添加水印</view>
      </view>
    </view>
    <view v-if="showAd" class="ad-wrap">广告位</view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const showAd = ref(false)

function goFile(type) {
  uni.navigateTo({ url: '/pages/pdftools/file?type=' + type })
}
</script>

<style scoped>
.page { padding: 24rpx; }
.card-main { padding: 32rpx; }
.grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24rpx; }
.grid-item { padding: 32rpx; text-align: center; background: #f8fafc; border-radius: 12rpx; font-size: 28rpx; color: #1e293b; border: 1rpx solid #e2e8f0; }
.grid-item:active { opacity: 0.9; }
.ad-wrap { margin-top: 32rpx; padding: 24rpx; background: #fff; border-radius: 12rpx; text-align: center; color: #94a3b8; font-size: 26rpx; }
</style>
