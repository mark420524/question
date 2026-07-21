<template>
  <view class="page-container tab-page signin-page">
    <view class="metrics-row">
      <view class="metric-card">
        <text class="metric-value">{{ totalSign }}</text>
        <text class="metric-label">累计签到（天）</text>
      </view>
      <view class="metric-card">
        <text class="metric-value">{{ continuousSign }}</text>
        <text class="metric-label">连续签到（天）</text>
      </view>
    </view>

    <view class="action-card">
      <view v-if="canSign" class="sign-block">
        <view class="primary-btn" @click="userSignin">立即签到</view>
        <text class="sign-hint">签到成功可获得积分</text>
      </view>
      <view v-else class="signed-block">
        <text class="signed-title">今日已签到</text>
        <text class="signed-points">获得积分 +{{ todayPoints }}</text>
      </view>
    </view>

    <view class="calendar-card">
      <text class="calendar-title">签到记录</text>
      <view class="calendar-grid">
        <view
          v-for="day in signDays"
          :key="day.dateLabel"
          class="calendar-cell"
          :class="{ 'calendar-cell--signed': day.signed }"
        >
          <text class="calendar-day">{{ day.dateLabel }}</text>
          <text class="calendar-status">{{ day.signed ? '已签' : '未签' }}</text>
        </view>
      </view>
    </view>

    <view v-if="showAd" class="ad-slot">广告位</view>
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
.signin-page {
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
      color: var(--secondary-dark);
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
      color: var(--gray-500);
  line-height: 1.55;
}

.metrics-row {
  display: flex;
  flex-direction: row;
  gap: 20rpx;
  margin-bottom: 24rpx;
}

      color: var(--gray-500);
  flex: 1;
  padding: 28rpx 20rpx;
  background: var(--tab-surface);
  border-radius: var(--tab-radius-lg);
  border: 1rpx solid var(--tab-line);
  box-shadow: var(--tab-shadow-soft);
  text-align: center;
}

.metric-value {
  display: block;
  font-size: 40rpx;
  font-weight: 800;
  color: var(--tab-brand);
  font-variant-numeric: tabular-nums;
}

.metric-label {
  display: block;
  margin-top: 10rpx;
  font-size: 24rpx;
  color: var(--tab-muted);
}

.action-card {
  padding: 32rpx 28rpx;
  margin-bottom: 24rpx;
  background: var(--tab-surface);
  border-radius: var(--tab-radius-lg);
  border: 1rpx solid var(--tab-line);
  box-shadow: var(--tab-shadow-soft);
}

.primary-btn {
  padding: 26rpx 32rpx;
  text-align: center;
  font-size: 30rpx;
  font-weight: 700;
  color: #ffffff;
  background: var(--tab-brand);
  border-radius: var(--tab-radius-md);
}

.primary-btn:active {
  opacity: 0.92;
}

.sign-hint {
  display: block;
  margin-top: 16rpx;
  text-align: center;
  font-size: 24rpx;
  color: var(--tab-muted);
}

.signed-block {
  text-align: center;
  padding: 16rpx 0;
}

.signed-title {
  display: block;
  font-size: 28rpx;
  font-weight: 600;
  color: var(--tab-ink);
  margin-bottom: 12rpx;
}

.signed-points {
  display: block;
  font-size: 32rpx;
  font-weight: 700;
  color: #059669;
}

.calendar-card {
  padding: 28rpx 24rpx;
  background: var(--tab-surface);
  border-radius: var(--tab-radius-lg);
  border: 1rpx solid var(--tab-line);
  box-shadow: var(--tab-shadow-soft);
}

.calendar-title {
  display: block;
  font-size: 28rpx;
  font-weight: 700;
  color: var(--tab-ink);
  margin-bottom: 20rpx;
}

.calendar-grid {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 12rpx;
}

.calendar-cell {
  width: calc(33.333% - 8rpx);
  padding: 18rpx 12rpx;
  border-radius: var(--tab-radius-md);
  background: #f1f5f9;
  text-align: center;
  box-sizing: border-box;
}

.calendar-cell--signed {
  background: rgba(14, 116, 144, 0.12);
  border: 1rpx solid rgba(14, 116, 144, 0.25);
}

.calendar-day {
  display: block;
  font-size: 24rpx;
  color: var(--tab-ink-soft);
}

.calendar-status {
  display: block;
  margin-top: 8rpx;
  font-size: 22rpx;
  color: #94a3b8;
}

.calendar-cell--signed .calendar-status {
  color: var(--tab-brand);
  font-weight: 600;
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
