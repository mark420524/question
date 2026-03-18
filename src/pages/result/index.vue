<template>
  <view class="page-container page">
    <view class="business-card-rpx card-main">
      <view class="score-section">
        <view class="score-row">
          <text class="score-label">考试得分</text>
          <text class="score-value">{{ examScore }} 分</text>
        </view>
        <view class="score-row">
          <text class="score-label">答题耗时</text>
          <text class="score-value">{{ examTime }}</text>
        </view>
      </view>

      <view class="divider" />

      <view class="menu-list">
        <view class="menu-item" @click="showExamRank">
          <text class="menu-text">答题排行</text>
          <text class="menu-arrow">›</text>
        </view>
        <view class="divider" />
        <view class="menu-item" @click="examAgain">
          <text class="menu-text">再次考试</text>
          <text class="menu-arrow">›</text>
        </view>
      </view>
    </view>

    <view v-if="showAd" class="ad-wrap">广告位</view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

const examScore = ref(0)
const examTime = ref('0分0秒')
const showAd = ref(false)

onLoad((options) => {
  showAd.value = !!uni.getStorageSync('showAd')
  const score = options.score || 0
  const cTime = parseInt(options.time, 10) || 0
  const min = Math.floor(cTime / 60) < 10 ? '0' + Math.floor(cTime / 60) : Math.floor(cTime / 60) || 0
  const s = (cTime % 60) < 10 ? '0' + (cTime % 60) : cTime % 60 || 0
  examScore.value = score
  examTime.value = min + '分' + s + '秒'
})

function examAgain() {
  uni.redirectTo({ url: '/pages/confirm/index' })
}

function showExamRank() {
  uni.redirectTo({ url: '/pages/rank/index' })
}
</script>

<style scoped>
.page {
  padding: 24rpx;
}

.card-main {
  padding: 32rpx;
}

.score-section {
  padding: 16rpx 0;
}

.score-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx 0;
}

.score-label {
  font-size: 28rpx;
  color: #64748b;
}

.score-value {
  font-size: 32rpx;
  font-weight: 600;
  color: #1e293b;
}

.divider {
  height: 1rpx;
  background: #e2e8f0;
  margin: 16rpx 0;
}

.menu-list {
  padding: 8rpx 0;
}

.menu-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 28rpx 0;
}

.menu-text {
  font-size: 30rpx;
  color: #1e293b;
}

.menu-arrow {
  font-size: 36rpx;
  color: #94a3b8;
}

.ad-wrap {
  margin-top: 32rpx;
  padding: 24rpx;
  background: #ffffff;
  border-radius: 12rpx;
  border: 1rpx solid #e2e8f0;
  text-align: center;
  color: #94a3b8;
  font-size: 26rpx;
}
</style>
