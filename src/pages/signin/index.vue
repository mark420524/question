<template>
  <view class="page-container page">
    <view class="business-card-rpx card-main">
      <view class="business-section-title">每日签到</view>
      <view class="metrics">
        <view class="metric">
          <text class="metric-value">{{ totalSign }}</text>
          <text class="metric-label">累计签到（天）</text>
        </view>
        <view class="metric">
          <text class="metric-value">{{ continuousSign }}</text>
          <text class="metric-label">连续签到（天）</text>
        </view>
      </view>

      <view v-if="canSign" class="btn-wrap">
        <view class="btn business-btn-rpx business-btn-primary-rpx" @click="userSignin">立即签到</view>
        <text class="hint">签到可获得积分</text>
      </view>
      <view v-else class="signed-wrap">
        <text class="signed-text">今天已签到，获得积分 +{{ todayPoints }}</text>
      </view>

      <view class="calendar-section">
        <view class="calendar-title">签到记录</view>
        <view class="calendar-grid">
          <view v-for="day in signDays" :key="day.dateLabel" class="grid-item" :class="{ signed: day.signed }">
            <text class="day">{{ day.dateLabel }}</text>
            <text class="status">{{ day.signed ? '已签' : '未签' }}</text>
          </view>
        </view>
      </view>
    </view>

    <view v-if="showAd" class="ad-wrap">广告位</view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as api from '@/service/api'
import * as utils from '@/utils/util'

const totalSign = ref(0)
const continuousSign = ref(0)
const todayPoints = ref(0)
const canSign = ref(true)
const signDays = ref([])
const showAd = ref(false)

function buildSignDays(startTime, today, dayIntegral) {
  if (!utils.buildDate || !utils.formatDate) {
    return []
  }
  const startDate = utils.buildDate(startTime)
  const endDate = utils.buildDate(today)
  const days = []
  let cursor = startDate.getTime()
  const end = endDate.getTime()
  while (cursor <= end) {
    const date = new Date(cursor)
    const key = utils.formatDate(date)
    days.push({
      dateLabel: key.slice(5),
      signed: Boolean(dayIntegral[key])
    })
    cursor += 24 * 3600 * 1000
  }
  return days
}

function loadSignInfo() {
  showAd.value = !!uni.getStorageSync('showAd')
  const uid = utils.getUserId()
  api.getUserSignInfo({ uid }).then((res) => {
    if (!res) return
    totalSign.value = res.totalSign || 0
    continuousSign.value = res.continuousSign || 0
    const today = res.today
    const dayIntegral = res.dayIntegral || {}
    todayPoints.value = dayIntegral[today] || 0
    canSign.value = todayPoints.value === 0
    if (res.startTime != null && today && utils.buildDate) {
      signDays.value = buildSignDays(res.startTime, today, dayIntegral)
    } else {
      signDays.value = []
    }
  })
}

function userSignin() {
  const uid = utils.getUserId()
  uni.showLoading({ title: '正在签到...' })
  api.userSignin({ uid }).then((res) => {
    uni.hideLoading()
    if (typeof res === 'string' && /^\d+,\d+,\d+$/.test(res)) {
      const [points, total, continuous] = res.split(',').map(Number)
      todayPoints.value = points
      totalSign.value = total
      continuousSign.value = continuous
      canSign.value = false
      uni.showToast({ title: `签到成功，获得积分+${points}`, icon: 'none' })
      loadSignInfo()
    } else {
      uni.showToast({ title: res || '签到失败', icon: 'none' })
    }
  }).catch(() => {
    uni.hideLoading()
    uni.showToast({ title: '签到失败', icon: 'none' })
  })
}

onMounted(loadSignInfo)
</script>

<style scoped>
.page {
  padding: 24rpx;
}

.card-main {
  padding: 32rpx;
}

.metrics {
  display: flex;
  gap: 24rpx;
  margin-bottom: 32rpx;
}

.metric {
  flex: 1;
  background: #f8fafc;
  border-radius: 12rpx;
  padding: 24rpx;
  text-align: center;
}

.metric-value {
  display: block;
  font-size: 36rpx;
  font-weight: 700;
  color: #2563eb;
}

.metric-label {
  font-size: 24rpx;
  color: #64748b;
  margin-top: 8rpx;
}

.btn-wrap {
  margin-bottom: 32rpx;
}

.btn {
  width: 100%;
  margin-bottom: 12rpx;
}

.hint {
  font-size: 24rpx;
  color: #64748b;
}

.signed-wrap {
  padding: 24rpx 0;
  margin-bottom: 16rpx;
}

.signed-text {
  font-size: 28rpx;
  color: #10b981;
  font-weight: 500;
}

.calendar-section {
  padding-top: 24rpx;
  border-top: 1rpx solid #e2e8f0;
}

.calendar-title {
  font-size: 28rpx;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 20rpx;
}

.calendar-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 12rpx;
}

.grid-item {
  width: calc(33.333% - 8rpx);
  padding: 16rpx;
  border-radius: 12rpx;
  background: #f1f5f9;
  text-align: center;
}

.grid-item.signed {
  background: rgba(37, 99, 235, 0.1);
}

.day {
  font-size: 24rpx;
  color: #475569;
  display: block;
}

.status {
  font-size: 22rpx;
  color: #94a3b8;
  margin-top: 6rpx;
  display: block;
}

.grid-item.signed .status {
  color: #2563eb;
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
