<template>
  <view class="page-container page-body">
    <view class="section-header">
      <text class="section-eyebrow">邀请好友</text>
      <text class="section-title">邀请奖励</text>
      <text class="section-lead">通过本页面分享邀请好友，可获得额外积分奖励。</text>
    </view>

    <view class="card-base">
      <view class="invite-text">每邀请一位好友注册即可获得</view>
      <view class="invite-value">+{{ integral }} 积分</view>
      <view class="invite-note">只有通过当前页面分享才能获得奖励。</view>
      <button open-type="share" class="button-primary">点击分享给好友</button>
    </view>

    <view class="card-base">
      <button class="button-secondary" @click="gotoInviteLog">查看邀请记录</button>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { onShareAppMessage } from '@dcloudio/uni-app'
import * as api from '@/service/api'
import * as utils from '@/utils/util'

const integral = ref(0)

function loadInviteIntegral() {
  api.getInviteIntegral({ uid: utils.getUserId() }).then((res) => {
    integral.value = res || 0
  }).catch(() => {})
}

function gotoInviteLog() {
  uni.navigateTo({ url: '/pages/integral/invite' })
}

onShareAppMessage(() => {
  const uid = utils.getUserId() || ''
  return {
    title: '亲爱的，来这里答题喽',
    imageUrl: 'http://image.siival.com/2.png',
    path: `/pages/index/index?uid=${uid}`
  }
})

onMounted(() => {
  uni.showShareMenu({ withShareTicket: true })
  loadInviteIntegral()
})
</script>

<style scoped>
.page { padding: 0; background: transparent; min-height: auto }
.invite-text { display: block; font-size: 28rpx; color: var(--text-secondary); margin-bottom: 16rpx; text-align: center }
.invite-value { display: block; font-size: 42rpx; font-weight: 800; color: var(--primary); margin-bottom: 16rpx; text-align: center }
.invite-note { display: block; font-size: 26rpx; color: var(--text-secondary); line-height: 1.5; margin-bottom: 24rpx; text-align: center }
.button-secondary { width: 100%; padding: 24rpx 0; border-radius: 999rpx; font-size: 28rpx; font-weight: 700 }
</style>
