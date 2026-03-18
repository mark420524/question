<template>
  <view class="page-container page">
    <view class="business-card-rpx card-main">
      <view class="business-section-title">我的收藏</view>
      <view class="info-row">
        <text class="label">收藏题库：</text>
        <text class="value value-ellipsis">{{ selectCategory || '未选择' }}</text>
      </view>
      <view class="info-row">
        <text class="label">收藏数量：</text>
        <text class="value highlight">{{ favoriteCount }} 题</text>
      </view>
      <view v-if="!favoriteCount" class="hint">您收藏的题目会自动记录到这里</view>
      <view class="footer business-btn-rpx business-btn-primary-rpx" @click="goQuestion">
        <text>{{ showVal }}</text>
      </view>
    </view>

    <view v-if="showAd" class="ad-wrap">广告位</view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as api from '@/service/api'
import * as utils from '@/utils/util'

const selectCategory = ref('')
const favoriteCount = ref(0)
const showVal = ref('查看收藏')
const showAd = ref(false)

function init() {
  showAd.value = !!uni.getStorageSync('showAd')
  selectCategory.value = uni.getStorageSync('selectCategory') || ''
  const data = {
    cid: utils.getAnswerCid(),
    uid: utils.getUserId()
  }
  api.favoriteCount(data).then((res) => {
    favoriteCount.value = res || 0
    showVal.value = favoriteCount.value > 0 ? '查看收藏' : '去练习'
  })
}

function goQuestion() {
  const count = favoriteCount.value
  if (count > 0) {
    utils.setAnswerType(3)
  } else {
    utils.setAnswerType(1)
  }
  uni.redirectTo({ url: '/pages/question/index' })
}

onMounted(init)
</script>

<style scoped>
.page {
  padding: 24rpx;
}

.card-main {
  padding: 32rpx;
}

.info-row {
  display: flex;
  padding: 24rpx 0;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1rpx solid #e2e8f0;
}

.label {
  color: #64748b;
  font-size: 28rpx;
  flex-shrink: 0;
  margin-right: 16rpx;
}

.value {
  color: #1e293b;
  font-size: 28rpx;
  font-weight: 500;
}

.value-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 360rpx;
}

.value.highlight {
  color: #2563eb;
  font-weight: 600;
}

.hint {
  margin: 24rpx 0;
  color: #64748b;
  font-size: 26rpx;
}

.footer {
  margin-top: 32rpx;
  width: 100%;
}

.ad-wrap {
  margin-top: 32rpx;
  padding: 24rpx;
  background: #ffffff;
  border-radius: 12rpx;
  border: 1rpx solid #e2e8f0;
  text-align: center;
  color: #94a3b8;
  font-size: 26rpx;
}
</style>
