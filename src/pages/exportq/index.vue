<template>
  <view class="page-container tab-page export-page">
    <view class="sub-intro">
      <text class="sub-eyebrow">导出</text>
      <text class="sub-title">{{ showName }}</text>
      <text class="sub-lead">按题量扣积分，PDF 将发送至您填写的邮箱。</text>
    </view>

    <view class="panel-card">
      <view class="kv-row">
        <text class="kv-label">题库</text>
        <text class="kv-value kv-value--ellipsis">{{ selectCategory || '未选择' }}</text>
      </view>
      <view class="info-divider" />
      <view class="kv-row">
        <text class="kv-label">题量 / 积分</text>
        <text class="kv-value">
          <text class="accent">{{ count }}</text> 题，需 <text class="accent">{{ count }}</text> 积分
        </text>
      </view>
      <text class="rule-tip">规则：1 题消耗 1 积分</text>
      <text class="rule-tip">当前剩余：<text class="accent">{{ integral }}</text> 积分</text>

      <view v-if="!enough" class="block-tips">
        <text class="tips-text">积分不足，无法导出。邀请好友可获得积分。</text>
        <view class="panel-btn" @click="inviteFriend">去邀请</view>
      </view>
      <view v-else class="form-block">
        <text class="form-tip">将以 PDF 附件发至邮箱，请留意收件箱与垃圾箱。</text>
        <text class="field-label">接收邮箱</text>
        <input v-model="email" class="field-input" placeholder="请输入导出邮箱" type="text" />
        <view class="panel-btn" @click="exportQuestion">{{ showVal }}</view>
      </view>
    </view>

    <view v-if="showAd" class="ad-slot">广告位</view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import * as api from '@/service/api'
import * as utils from '@/utils/util'

const selectCategory = ref('')
const count = ref(0)
const integral = ref(0)
const enough = ref(true)
const showVal = ref('立即导出')
const email = ref('')
const showName = ref('导出题库')
const type = ref(0)
const showAd = ref(false)

function init(typeNum) {
  type.value = typeNum !== undefined ? Number(typeNum) : 0
  showName.value = type.value === 1 ? '模拟试卷' : '导出题库'
  uni.setNavigationBarTitle({ title: showName.value })
  selectCategory.value = uni.getStorageSync('selectCategory') || ''
  api.getExportInfo({
    cid: utils.getAnswerCid(),
    uid: utils.getUserId(),
    type: type.value
  }).then((res) => {
    count.value = res.count ?? 0
    integral.value = res.integral ?? 0
    enough.value = (res.integral ?? 0) >= (res.count ?? 0)
  })
}

function inviteFriend() {
  uni.navigateTo({ url: '/pages/share/invite' })
}

function exportQuestion() {
  if (!utils.validEmail(email.value)) {
    utils.showWxToast('请输入正确的邮箱格式')
    return
  }
  api.exportQuestions({
    uid: utils.getUserId(),
    cid: utils.getAnswerCid(),
    email: email.value,
    type: type.value
  }).then((res) => {
    if (/^\d+$/.test(res)) {
      utils.showWxToast('已提交，请十分钟后查看邮箱附件')
      integral.value = Number(res)
      enough.value = integral.value >= count.value
    } else {
      utils.showWxToast(res || '导出失败')
    }
  })
}

onLoad((options) => {
  const t = options.type != null ? options.type : 0
  init(t)
})
</script>

<style scoped>
.export-page {
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

.panel-card {
  padding: 28rpx 26rpx 32rpx;
  background: var(--tab-surface);
  border-radius: var(--tab-radius-lg);
  border: 1rpx solid var(--tab-line);
  box-shadow: var(--tab-shadow-soft);
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
  width: 160rpx;
}

.kv-value {
  flex: 1;
  font-size: 28rpx;
  color: var(--tab-ink);
  text-align: right;
  line-height: 1.45;
}

.kv-value--ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.accent {
  color: var(--tab-brand);
  font-weight: 700;
}

.rule-tip {
  display: block;
  margin-top: 16rpx;
  font-size: 26rpx;
  color: var(--tab-muted);
  line-height: 1.5;
}

.block-tips {
  margin-top: 28rpx;
  padding-top: 28rpx;
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
  margin-top: 28rpx;
  padding-top: 28rpx;
  border-top: 1rpx solid rgba(18, 21, 28, 0.06);
}

.form-tip {
  display: block;
  font-size: 26rpx;
  color: var(--tab-muted);
  line-height: 1.55;
  margin-bottom: 24rpx;
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
  background: #f8fafc;
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
