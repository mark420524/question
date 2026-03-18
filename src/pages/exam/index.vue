<template>
  <view class="page-container page">
    <view class="business-card-rpx card-main">
      <view class="business-section-title">试卷信息</view>
      <view class="info-row"><text class="label">名称：</text><text class="value">{{ exam.examName || '-' }}</text></view>
      <view class="info-row"><text class="label">版本：</text><text class="value">{{ exam.version || '-' }}</text></view>
      <view class="info-row"><text class="label">大小：</text><text class="value">{{ exam.fileSize || '-' }}</text></view>
      <view class="info-row"><text class="label">类型：</text><text class="value">{{ exam.fileType || '-' }}</text></view>
    </view>
    <view class="business-card-rpx card-main">
      <view class="business-section-title">下载试卷</view>
      <view class="info-row"><text class="label">消耗积分</text><text class="value">每套试卷消耗 <text class="highlight">{{ examIntegral }}</text> 积分</text></view>
      <view class="info-row"><text class="label">剩余积分</text><text class="value">您剩余 <text class="highlight">{{ userIntegral }}</text> 积分</text></view>
      <view v-if="!enough" class="tips-wrap">
        <text class="tips">您的积分不足，暂无法导出，邀请好友赠送积分，赶快去邀请吧。</text>
        <view class="footer business-btn-rpx business-btn-primary-rpx" @click="inviteFriend">马上邀请</view>
      </view>
      <view v-else class="form-wrap">
        <view class="input-row">
          <text class="label">邮箱</text>
          <input v-model="email" class="input" placeholder="请输入下载邮箱" type="text" />
        </view>
        <view class="footer business-btn-rpx business-btn-primary-rpx" @click="exportExam">提交</view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { onMounted, onUnload } from '@dcloudio/uni-app'
import * as api from '@/service/api'
import * as utils from '@/utils/util'

const exam = ref({})
const examIntegral = ref(1)
const userIntegral = ref(0)
const enough = ref(false)
const email = ref('')

function init() {
  exam.value = uni.getStorageSync('examItem') || {}
  const data = { uid: utils.getUserId() }
  api.examInfo(data).then((res) => {
    examIntegral.value = res.needIntegral ?? 1
    userIntegral.value = res.integral ?? 0
    enough.value = (res.integral ?? 0) >= (res.needIntegral ?? 1)
  })
}

function inviteFriend() {
  uni.navigateTo({ url: '/pages/share/invite' })
}

function exportExam() {
  if (!utils.validEmail(email.value)) {
    utils.showWxToast('请输入正确的邮箱格式喔!')
    return
  }
  uni.showLoading({ title: '正在提交' })
  const data = {
    uid: utils.getUserId(),
    eid: exam.value.id,
    email: email.value
  }
  api.exportExam(data).then((res) => {
    uni.hideLoading()
    if (/^\d+$/.test(res)) {
      utils.showWxToast('已提交，请十分钟后查看邮箱附件')
      userIntegral.value = userIntegral.value - examIntegral.value
      enough.value = userIntegral.value >= examIntegral.value
    } else {
      utils.showWxToast(res || '提交失败')
    }
  }).catch(() => {
    uni.hideLoading()
  })
}

onMounted(init)
onUnload(() => {
  uni.removeStorageSync('examItem')
})
</script>

<style scoped>
.page { padding: 24rpx; }
.card-main { padding: 32rpx; margin-bottom: 24rpx; }
.info-row { display: flex; padding: 20rpx 0; border-bottom: 1rpx solid #e2e8f0; }
.info-row .label { color: #64748b; font-size: 28rpx; width: 140rpx; flex-shrink: 0; }
.info-row .value { flex: 1; font-size: 28rpx; color: #1e293b; }
.highlight { color: #2563eb; font-weight: 600; }
.tips-wrap { margin-top: 24rpx; }
.tips { font-size: 26rpx; color: #64748b; display: block; margin-bottom: 24rpx; }
.form-wrap { margin-top: 24rpx; }
.input-row { margin-bottom: 24rpx; }
.input-row .label { font-size: 28rpx; color: #475569; margin-bottom: 8rpx; display: block; }
.input { width: 100%; padding: 20rpx; border: 1rpx solid #e2e8f0; border-radius: 12rpx; font-size: 28rpx; background: #fff; }
.footer { width: 100%; margin-top: 16rpx; }
</style>
