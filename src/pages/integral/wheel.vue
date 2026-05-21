<template>
  <view class="page-container page-body">
    <view class="section-header">
      <text class="section-eyebrow">积分抽奖</text>
      <text class="section-title">每日转盘</text>
      <text class="section-lead">每天可免费抽奖一次，中奖积分会直接到账。</text>
    </view>

    <view class="card-base">
      <view class="status-row">
        <text class="status-label">当前积分</text>
        <text class="status-value">{{ wheelIntegral }}</text>
      </view>
      <view class="status-row">
        <text class="status-label">今日次数</text>
        <text class="status-value">{{ alreadyWheel ? '已抽取' : '可抽取' }}</text>
      </view>
    </view>

    <view class="card-base">
      <view class="wheel-title">幸运转盘</view>
      <view class="wheel-message">点击下面按钮开始抽奖，运气好可以获得更多积分。</view>
      <view class="button-primary" :class="{ disabled: !canRoll }" @click="startRollTap">{{ canRoll ? '开始抽奖' : '今日已抽过' }}</view>
    </view>

    <view class="card-base">
      <text class="section-title">当前奖品</text>
      <view v-for="(item, index) in wheelInfo" :key="index" class="reward-item">
        <text class="reward-name">{{ item.name || '未知奖项' }}</text>
        <text class="reward-desc">+{{ item.integral || 0 }} 积分 {{ item.remark || '' }}</text>
      </view>
    </view>

    <view class="foot-note">每个账号每天仅可抽奖一次，0点重置。若未中奖仍可明日继续参与。</view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as api from '@/service/api'
import * as utils from '@/utils/util'

const opportunity = ref(true)
const wheelIntegral = ref(0)
const wheelInfo = ref([])
const canRoll = ref(false)
const alreadyWheel = ref(false)
const num = ref(1)
let ani = null

function setPlateData(list) {
  if (!Array.isArray(list)) return []
  const result = []
  for (let i = 0; i < list.length * 2; i++) {
    if (i % 2 === 1) {
      const item = list[(i - 1) / 2]
      result.push(`+${item.integral}`)
    } else {
      result.push('谢谢参与')
    }
  }
  return result
}

function initTodayWheelInfo() {
  api.integralWheel({ uid: utils.getUserId() }).then((res) => {
    const info = res?.lotteryInfo || []
    wheelInfo.value = info
    wheelIntegral.value = res?.integral || 0
    alreadyWheel.value = Boolean(res?.alreadyWheel)
    canRoll.value = !alreadyWheel.value
  }).catch(() => {
    canRoll.value = false
  })
}

function startRollTap() {
  if (!canRoll.value) return
  uni.showLoading({ title: '抽奖中' })
  api.integralWheel({ uid: utils.getUserId() }).then((res) => {
    uni.hideLoading()
    if (res?.alreadyWheel) {
      alreadyWheel.value = true
      canRoll.value = false
      utils.showWxToast('今日已抽过，请明日再来')
      return
    }
    wheelIntegral.value = res?.integral || wheelIntegral.value
    if (res?.message) {
      utils.showWxToast(res.message)
    }
    alreadyWheel.value = true
    canRoll.value = false
  }).catch(() => {
    uni.hideLoading()
  })
}

onMounted(initTodayWheelInfo)
</script>

<style scoped>
.page { padding: 0; background: transparent; min-height: auto }
.status-row { display: flex; justify-content: space-between; padding: 16rpx 0; font-size: 28rpx; color: var(--text-primary) }
.status-label { color: var(--text-secondary) }
.status-value { font-weight: 700; color: var(--primary) }
.wheel-title { font-size: 30rpx; font-weight: 700; color: var(--text-primary); margin-bottom: 12rpx }
.wheel-message { font-size: 26rpx; color: var(--text-secondary); line-height: 1.6; margin-bottom: 20rpx }
.button-primary.disabled { background: #cbd5e1; }
.reward-item { padding: 16rpx 0; border-bottom: 1rpx solid var(--border); color: var(--text-secondary); font-size: 26rpx }
.reward-item:last-child { border-bottom: none }
.reward-name { display: block; font-size: 28rpx; color: var(--text-primary); margin-bottom: 6rpx }
.reward-desc { color: var(--text-secondary) }
.foot-note { color: var(--text-secondary); font-size: 24rpx; line-height: 1.7; }
</style>
