<template>
  <view class="page-container tab-page exam-page">
    <view class="sub-intro">
      <text class="sub-eyebrow">试卷</text>
      <text class="sub-title">导出到邮箱</text>
      <text class="sub-lead">核对试卷信息与积分，填写邮箱后提交，附件将发送至邮箱。</text>
    </view>

    <view class="panel-card">
      <text class="panel-title">试卷信息</text>
      <view class="kv-row">
        <text class="kv-label">名称</text>
        <text class="kv-value">{{ exam.examName || '-' }}</text>
      </view>
      <view class="info-divider" />
      <view class="kv-row">
        <text class="kv-label">版本</text>
        <text class="kv-value">{{ exam.version || '-' }}</text>
      </view>
      <view class="info-divider" />
      <view class="kv-row">
        <text class="kv-label">大小</text>
        <text class="kv-value">{{ exam.fileSize || '-' }}</text>
      </view>
      <view class="info-divider" />
      <view class="kv-row">
        <text class="kv-label">类型</text>
        <text class="kv-value">{{ exam.fileType || '-' }}</text>
      </view>
    </view>

    <view class="panel-card panel-card--spaced">
      <text class="panel-title">下载与积分</text>
      <view class="kv-row">
        <text class="kv-label">消耗积分</text>
        <text class="kv-value">每套 <text class="accent">{{ examIntegral }}</text> 积分</text>
      </view>
      <view class="info-divider" />
      <view class="kv-row">
        <text class="kv-label">我的积分</text>
        <text class="kv-value"><text class="accent">{{ userIntegral }}</text> 积分</text>
      </view>

      <view v-if="!enough" class="block-tips">
        <text class="tips-text">积分不足，暂无法导出。邀请好友可获得积分。</text>
        <view class="panel-btn" @click="inviteFriend">去邀请</view>
      </view>
      <view v-else class="form-block">
        <text class="field-label">接收邮箱</text>
        <input v-model="email" class="field-input" placeholder="请输入下载邮箱" type="text" />
        <view class="panel-btn" @click="exportExam">提交导出</view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { onUnload } from '@dcloudio/uni-app'
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
.exam-page {
  padding-bottom: 48rpx;
}

.sub-intro {
  margin-bottom: 24rpx;
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

.panel-card {
  padding: 28rpx 26rpx;
  background: var(--tab-surface);
  border-radius: var(--tab-radius-lg);
  border: 1rpx solid var(--tab-line);
  box-shadow: var(--tab-shadow-soft);
}

.panel-card--spaced {
  margin-top: 24rpx;
}

.panel-title {
  display: block;
  font-size: 28rpx;
  font-weight: 700;
  color: var(--tab-ink);
  margin-bottom: 8rpx;
}

.kv-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20rpx;
  padding: 18rpx 0;
}

.info-divider {
  height: 1rpx;
  background: rgba(18, 21, 28, 0.06);
}

.kv-label {
  font-size: 28rpx;
  color: var(--tab-muted);
  flex-shrink: 0;
  width: 140rpx;
}

.kv-value {
  flex: 1;
  font-size: 28rpx;
  color: var(--tab-ink);
  text-align: right;
  line-height: 1.45;
}

.accent {
  color: var(--tab-brand);
  font-weight: 700;
}

.block-tips {
  margin-top: 24rpx;
  padding-top: 24rpx;
  border-top: 1rpx solid rgba(18, 21, 28, 0.06);
}

.tips-text {
  display: block;
  font-size: 26rpx;
  color: var(--tab-muted);
  line-height: 1.55;
  margin-bottom: 24rpx;
}

.form-block {
  margin-top: 24rpx;
  padding-top: 24rpx;
  border-top: 1rpx solid rgba(18, 21, 28, 0.06);
}

.field-label {
  display: block;
  font-size: 28rpx;
  font-weight: 600;
  color: var(--tab-ink-soft);
  margin-bottom: 12rpx;
}

.field-input {
  width: 100%;
  padding: 22rpx 24rpx;
  font-size: 28rpx;
  color: var(--tab-ink);
  background: var(--gray-100);
  border-radius: var(--tab-radius-md);
  border: 1rpx solid var(--tab-line);
  box-sizing: border-box;
}

.panel-btn {
  margin-top: 24rpx;
  padding: 26rpx 32rpx;
  text-align: center;
  font-size: 30rpx;
  font-weight: 700;
  color: #ffffff;
  background: var(--tab-brand);
  border-radius: var(--tab-radius-md);
}

.panel-btn:active {
  opacity: 0.92;
}
</style>
