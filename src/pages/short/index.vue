<template>
  <view class="page-container page">
    <view class="business-card-rpx card-main">
      <view class="business-section-title">生成须知</view>
      <view class="tips">
        <view class="tip">1. 由于服务器资源有限，每个账户每天的免费生成次数为 <text class="highlight">{{ count }}</text> 次</view>
        <view class="tip">2. 免费次数用完后，可以联系我们付费处理</view>
        <view class="tip">3. 生成短链有效期为 <text class="highlight">{{ expireDays }}</text> 天</view>
      </view>
      <view class="summary">您今天已经生成短链 {{ alreadyUpload }} 次，免费次数剩余 {{ balanceCount }} 次</view>
    </view>
    <view class="business-card-rpx card-main">
      <view class="input-row">
        <text class="label">长链接</text>
        <input v-model="url" class="input" placeholder="请输入长链接" />
      </view>
      <view v-if="generateShow" class="footer business-btn-rpx business-btn-primary-rpx" @click="generateShort">生成</view>
    </view>
    <view v-if="showResult" class="business-card-rpx card-main result">
      <view class="business-section-title">生成结果</view>
      <view class="result-item" @click="copyText(shortUrl)">{{ shortUrl }} <text class="copy-tag">复制</text></view>
    </view>
    <view v-if="showAd" class="ad-wrap">广告位</view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as api from '@/service/api'
import * as utils from '@/utils/util'

const count = ref(5)
const alreadyUpload = ref(0)
const balanceCount = ref(0)
const url = ref('')
const expireDays = ref(15)
const showResult = ref(false)
const shortUrl = ref('')
const generateShow = ref(false)
const showAd = ref(false)

function initInfo() {
  api.getShortUrlInfo({ uid: utils.getUserId() }).then((res) => {
    const freeCount = res.freeCount ?? 5
    const already = res.count ?? 0
    balanceCount.value = Math.max(0, freeCount - already)
    expireDays.value = res.days ?? 15
    count.value = freeCount
    alreadyUpload.value = already
    generateShow.value = balanceCount.value > 0
  })
}

function generateShort() {
  const longUrl = url.value.trim()
  if (!longUrl) {
    utils.showWxToast('请输入长链接')
    return
  }
  api.generateShortUrl({ longUrl, uid: utils.getUserId() }).then((res) => {
    const newCount = res.count ?? 0
    balanceCount.value = Math.max(0, count.value - newCount)
    alreadyUpload.value = newCount
    showResult.value = true
    shortUrl.value = res.shortUrl || ''
  })
}

function copyText(text) {
  uni.setClipboardData({ data: text, success: () => { uni.showToast({ title: '已复制', icon: 'none' }) } })
}

onMounted(initInfo)
</script>

<style scoped>
.page { padding: 24rpx; }
.card-main { padding: 32rpx; margin-bottom: 24rpx; }
.tips { margin: 16rpx 0; }
.tip { font-size: 26rpx; color: #475569; line-height: 1.8; margin-bottom: 8rpx; }
.highlight { color: #2563eb; font-weight: 600; }
.summary { font-size: 26rpx; color: #2563eb; margin-top: 16rpx; }
.input-row { margin-bottom: 24rpx; }
.input-row .label { font-size: 28rpx; color: #475569; margin-bottom: 8rpx; display: block; }
.input { width: 100%; padding: 20rpx; border: 1rpx solid #e2e8f0; border-radius: 12rpx; font-size: 28rpx; background: #fff; }
.footer { width: 100%; }
.result-item { padding: 20rpx; background: #f8fafc; border-radius: 12rpx; font-size: 26rpx; color: #1e293b; word-break: break-all; }
.copy-tag { color: #2563eb; margin-left: 16rpx; }
.ad-wrap { margin-top: 32rpx; padding: 24rpx; background: #fff; border-radius: 12rpx; text-align: center; color: #94a3b8; font-size: 26rpx; }
</style>
