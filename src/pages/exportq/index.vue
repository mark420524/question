<template>
  <view class="page-container page">
    <view class="business-card-rpx card-main">
      <view class="business-section-title">{{ showName }}</view>
      <view class="info-row"><text class="label">题库：</text><text class="value">{{ selectCategory || '未选择' }}</text></view>
      <view class="info-row"><text class="label">题库数量：</text><text class="value"><text class="highlight">{{ count }}</text> 题，需要消耗 <text class="highlight">{{ count }}</text> 积分</text></view>
      <view class="tips">导出需要消耗积分：1 题消耗 1 积分</view>
      <view class="tips">您目前所剩积分：<text class="highlight">{{ integral }}</text></view>
      <view v-if="!enough" class="tips-wrap">
        <text class="tips-text">您的积分不足，暂无法导出，邀请好友赠送积分，赶快去邀请吧。</text>
        <view class="footer business-btn-rpx business-btn-primary-rpx" @click="inviteFriend">马上邀请</view>
      </view>
      <view v-else class="form-wrap">
        <view class="form-tip">题库会以 PDF 格式发送附件到您的邮箱，请注意查收</view>
        <view class="input-row">
          <text class="label">邮箱</text>
          <input v-model="email" class="input" placeholder="请输入导出邮箱" type="text" />
        </view>
        <view class="footer business-btn-rpx business-btn-primary-rpx" @click="exportQuestion">{{ showVal }}</view>
      </view>
    </view>
    <view v-if="showAd" class="ad-wrap">广告位</view>
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
.page { padding: 24rpx; }
.card-main { padding: 32rpx; }
.info-row { display: flex; padding: 20rpx 0; border-bottom: 1rpx solid #e2e8f0; }
.info-row .label { color: #64748b; font-size: 28rpx; width: 160rpx; flex-shrink: 0; }
.info-row .value { flex: 1; font-size: 28rpx; color: #1e293b; }
.highlight { color: #2563eb; font-weight: 600; }
.tips { font-size: 26rpx; color: #64748b; margin: 16rpx 0; }
.tips-wrap { margin-top: 24rpx; }
.tips-text { font-size: 26rpx; color: #64748b; display: block; margin-bottom: 24rpx; }
.form-wrap { margin-top: 24rpx; }
.form-tip { font-size: 26rpx; color: #64748b; margin-bottom: 24rpx; }
.input-row .label { font-size: 28rpx; color: #475569; margin-bottom: 8rpx; display: block; }
.input { width: 100%; padding: 20rpx; border: 1rpx solid #e2e8f0; border-radius: 12rpx; font-size: 28rpx; background: #fff; }
.footer { width: 100%; margin-top: 24rpx; }
.ad-wrap { margin-top: 32rpx; padding: 24rpx; background: #fff; border-radius: 12rpx; text-align: center; color: #94a3b8; font-size: 26rpx; }
</style>
