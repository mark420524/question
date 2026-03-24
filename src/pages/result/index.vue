<template>
  <view class="page-container tab-page result-page">
    <view class="sub-intro">
      <text class="sub-eyebrow">成绩单</text>
      <text class="sub-title">本次模考</text>
      <text class="sub-lead">得分与用时已记录，可查看排行或再考一次。</text>
    </view>

    <view class="score-card">
      <view class="score-accent" />
      <view class="score-main">
        <text class="score-num">{{ examScore }}</text>
        <text class="score-unit">分</text>
      </view>
      <text class="score-caption">考试得分</text>
      <view class="time-row">
        <text class="time-label">答题耗时</text>
        <text class="time-value">{{ examTime }}</text>
      </view>
    </view>

    <view class="action-card">
      <view class="action-row" @click="showExamRank">
        <text class="action-text">答题排行</text>
        <text class="action-chev">›</text>
      </view>
      <view class="action-divider" />
      <view class="action-row" @click="examAgain">
        <text class="action-text">再次考试</text>
        <text class="action-chev">›</text>
      </view>
    </view>

    <view v-if="showAd" class="ad-slot">广告位</view>
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
.result-page {
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

.score-card {
  position: relative;
  overflow: hidden;
  padding: 40rpx 32rpx 36rpx;
  margin-bottom: 24rpx;
  background: var(--tab-surface);
  border-radius: var(--tab-radius-lg);
  border: 1rpx solid var(--tab-line);
  box-shadow: var(--tab-shadow-soft);
  text-align: center;
}

.score-accent {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 6rpx;
  background: linear-gradient(90deg, var(--tab-brand-deep), var(--tab-brand), #2dd4bf);
}

.score-main {
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: center;
  gap: 8rpx;
}

.score-num {
  font-size: 88rpx;
  font-weight: 800;
  color: var(--tab-brand);
  line-height: 1;
  font-variant-numeric: tabular-nums;
}

.score-unit {
  font-size: 32rpx;
  font-weight: 700;
  color: var(--tab-muted);
}

.score-caption {
  display: block;
  margin-top: 16rpx;
  font-size: 26rpx;
  color: var(--tab-muted);
}

.time-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 32rpx;
  padding-top: 28rpx;
  border-top: 1rpx solid rgba(18, 21, 28, 0.06);
}

.time-label {
  font-size: 28rpx;
  color: var(--tab-muted);
}

.time-value {
  font-size: 30rpx;
  font-weight: 700;
  color: var(--tab-ink);
}

.action-card {
  background: var(--tab-surface);
  border-radius: var(--tab-radius-lg);
  border: 1rpx solid var(--tab-line);
  box-shadow: var(--tab-shadow-soft);
  overflow: hidden;
}

.action-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 28rpx 26rpx;
}

.action-row:active {
  background: #f8fafc;
}

.action-divider {
  height: 1rpx;
  background: rgba(18, 21, 28, 0.06);
  margin-left: 26rpx;
}

.action-text {
  font-size: 30rpx;
  font-weight: 600;
  color: var(--tab-ink);
}

.action-chev {
  font-size: 32rpx;
  color: #c4cad4;
  font-weight: 300;
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
