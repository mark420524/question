<template>
  <view class="page-container tab-page about-page">
    <view class="sub-intro">
      <text class="sub-eyebrow">联系</text>
      <text class="sub-title">关于我们</text>
      <text class="sub-lead">开源学习向小程序，欢迎反馈题目与体验问题。</text>
    </view>

    <view class="content-card">
      <text class="tips">
        本小程序由个人开发维护，仅供学习交流。
        <text class="tips-highlight">如有商业用途，请先与我们联系。</text>
        使用中的问题、题目纠错等，欢迎加 QQ 群：{{ qqGroup }}
      </text>
      <view class="copy-btn" @click="copyGroupInfo">
        <text class="copy-btn-text">复制群号</text>
      </view>
    </view>

    <view v-if="showAd" class="ad-slot">广告位</view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as api from '@/service/api'

const qqGroup = ref('123955944')
const showAd = ref(false)

function init() {
  showAd.value = !!uni.getStorageSync('showAd')
  api.getQQGroup().then((res) => {
    if (res) qqGroup.value = res
  })
}

function copyGroupInfo() {
  uni.setClipboardData({
    data: qqGroup.value,
    success: () => {
      uni.showToast({ title: '已复制', icon: 'none' })
    }
  })
}

onMounted(init)
</script>

<style scoped>
.about-page {
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

.tips {
  font-size: 28rpx;
  color: var(--tab-ink-soft);
  line-height: 1.7;
  letter-spacing: 0.5rpx;
}

.tips-highlight {
  color: var(--tab-brand);
  font-weight: 600;
}

.copy-btn {
  margin-top: 36rpx;
  padding: 24rpx 32rpx;
  text-align: center;
  background: var(--tab-brand);
  border-radius: var(--tab-radius-md);
}

.copy-btn:active {
  opacity: 0.92;
}

.copy-btn-text {
  font-size: 28rpx;
  font-weight: 600;
  color: #ffffff;
}

.ad-slot {
  margin-top: 32rpx;
  padding: 28rpx;
  background: var(--tab-surface);
  border-radius: var(--tab-radius-md);
  border: 1rpx dashed var(--tab-line);
  text-align: center;
  font-size: 26rpx;
  color: #94a3b8;
}
</style>
