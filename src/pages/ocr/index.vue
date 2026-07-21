<template>
  <view class="page-container page">
    <view class="business-card-rpx card-main">
      <view class="business-section-title">提取建议</view>
      <view class="tip">1. 用户每天免费文字 OCR 提取次数为 <text class="highlight">{{ ocrCount }}</text> 次</view>
      <view class="tip">2. 拍照识别为智能 AI 提取，请仔细核对结果</view>
      <view class="tip">3. 您当天已提取 <text class="highlight">{{ alreadyCount }}</text> 次</view>
    </view>
    <view v-if="showResult" class="business-card-rpx card-main">
      <view class="business-section-title">识别结果</view>
      <view v-for="(line, i) in ocrResult" :key="i" class="result-line" @click="copyText(line.text)">{{ line.text }} <text class="copy-tag">复制</text></view>
      <view class="all-copy business-btn-rpx business-btn-secondary-rpx" @click="copyText(allText)">一键复制</view>
    </view>
    <view class="business-card-rpx card-main actions">
      <view class="btn business-btn-rpx business-btn-primary-rpx" @click="chooseImage('album')">相册选择</view>
      <view class="btn business-btn-rpx business-btn-primary-rpx" @click="chooseImage('camera')">开始拍摄</view>
    </view>
    <view v-if="showAd" class="ad-wrap">广告位</view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as api from '@/service/api'
import * as utils from '@/utils/util'

const ocrCount = ref(5)
const alreadyCount = ref(0)
const canOcr = ref(false)
const ocrResult = ref([])
const allText = ref('')
const showResult = ref(false)
const showAd = ref(false)

function initOcrInfo() {
  api.ocrInfo({ uid: utils.getUserId() }).then((res) => {
    ocrCount.value = res.limit ?? 5
    alreadyCount.value = res.count ?? 0
    canOcr.value = (res.limit ?? 0) > (res.count ?? 0)
  })
}

function chooseImage(sourceType) {
  if (!canOcr.value) {
    utils.showWxToast('今天免费次数已用完，联系管理员获取更多次数')
    return
  }
  uni.showLoading({ title: '生成 token 中' })
  api.ocrGenerateToken({ uid: utils.getUserId() }).then((token) => {
    uni.hideLoading()
    uni.chooseImage({
      count: 1,
      sourceType: [sourceType],
      success: (res) => {
        const path = res.tempFilePaths[0]
        uni.uploadFile({
          url: (uni.getStorageSync('baseUrl') || '') + '/ocr',
          filePath: path,
          name: 'file',
          formData: { token },
          success: (uploadRes) => {
            let data
            try {
              data = typeof uploadRes.data === 'string' ? JSON.parse(uploadRes.data) : uploadRes.data
            } catch (e) {
              utils.showWxToast('解析结果失败')
              return
            }
            const list = (data.data || data.result || []).filter((item) => item.text)
            ocrResult.value = list
            allText.value = list.map((item) => item.text).join('')
            showResult.value = true
            alreadyCount.value += 1
            canOcr.value = ocrCount.value > alreadyCount.value
          },
          fail: () => utils.showWxToast('识别失败')
        })
      }
    })
  }).catch(() => { uni.hideLoading() })
}

function copyText(text) {
  if (!text) return
  uni.setClipboardData({ data: text, success: () => { uni.showToast({ title: '已复制', icon: 'none' }) } })
}

onMounted(initOcrInfo)
</script>

<style scoped>
.page { padding: 24rpx; }
.card-main { padding: 32rpx; margin-bottom: 24rpx; }
.tip { font-size: 26rpx; color: #475569; line-height: 1.8; margin-bottom: 8rpx; }
.highlight { color: var(--primary-dark); font-weight: 600; }
.result-line { padding: 20rpx 0; border-bottom: 1rpx solid var(--border); font-size: 28rpx; color: var(--gray-900); }
.copy-tag { color: var(--primary-dark); margin-left: 16rpx; }
.all-copy { width: 100%; margin-top: 24rpx; }
.actions { display: flex; gap: 24rpx; }
.btn { flex: 1; }
.ad-wrap { margin-top: 32rpx; padding: 24rpx; background: #fff; border-radius: 12rpx; text-align: center; color: var(--gray-500); font-size: 26rpx; }
</style>
