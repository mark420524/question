<template>
  <view class="page">
    <business-card title="签到" :bordered="false">
      <view class="metrics">
        <view class="metric">
          <text class="label">累计签到：</text>
          <text class="value">{{ totalSign }}</text>
        </view>
        <view class="metric">
          <text class="label">连续签到：</text>
          <text class="value">{{ continuousSign }}</text>
        </view>
      </view>

      <view class="button-wrap">
        <u-button type="primary" :disabled="!canSign" @click="userSignin">
          {{ canSign ? '立即签到' : '今日已签到' }}
        </u-button>
        <text v-if="canSign" class="hint">签到可获得积分：+{{ todayPoints }}</text>
      </view>

      <view class="calendar">
        <view class="calendar-title">签到记录</view>
        <view class="calendar-grid">
          <view class="grid-item" v-for="day in signDays" :key="day.date">
            <text class="day">{{ day.dateLabel }}</text>
            <text class="status" :class="{ signed: day.signed }">{{ day.signed ? '已签到' : '未签到' }}</text>
          </view>
        </view>
      </view>
    </business-card>
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

function buildSignDays(startTime, today, dayIntegral) {
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
  const uid = utils.getUserId()
  api.getUserSignInfo({ uid }).then((res) => {
    if (!res) return
    totalSign.value = res.totalSign || 0
    continuousSign.value = res.continuousSign || 0
    const today = res.today
    const dayIntegral = res.dayIntegral || {}
    todayPoints.value = dayIntegral[today] || 0
    canSign.value = todayPoints.value === 0
    signDays.value = buildSignDays(res.startTime, today, dayIntegral)
  })
}

function userSignin() {
  const uid = utils.getUserId()
  uni.showLoading({ title: '正在签到...' })
  api.userSignin({ uid }).then((res) => {
    uni.hideLoading()
    if (typeof res === 'string' && /\d+,\d+,\d+/.test(res)) {
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
  background: #f5f6fa;
  min-height: 100vh;
}
.metrics {
  display: flex;
  gap: 24rpx;
  margin-bottom: 20rpx;
}
.metric {
  flex: 1;
  background: #fff;
  padding: 18rpx;
  border-radius: 18rpx;
  box-shadow: 0 8rpx 18rpx rgba(0, 0, 0, 0.06);
}
.label {
  color: #999;
  font-size: 24rpx;
}
.value {
  margin-top: 10rpx;
  color: #1a1a1a;
  font-size: 30rpx;
  font-weight: 700;
}
.button-wrap {
  margin-bottom: 24rpx;
}
.hint {
  margin-top: 12rpx;
  color: #999;
  font-size: 24rpx;
}
.calendar {
  background: #fff;
  padding: 18rpx;
  border-radius: 18rpx;
}
.calendar-title {
  font-size: 28rpx;
  font-weight: 700;
  margin-bottom: 12rpx;
}
.calendar-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10rpx;
}
.grid-item {
  width: calc(33.333% - 6rpx);
  padding: 12rpx;
  border-radius: 14rpx;
  background: #f5f6fa;
  text-align: center;
}
.day {
  font-size: 24rpx;
  color: #333;
}
.status {
  margin-top: 6rpx;
  font-size: 22rpx;
  color: #999;
}
.status.signed {
  color: #1c6ef2;
}
</style>
