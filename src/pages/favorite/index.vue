<template>
  <view class="page-container tab-page favorite-page">
    <view class="sub-intro">
      <text class="sub-eyebrow">巩固</text>
      <text class="sub-title">我的收藏</text>
      <text class="sub-lead">重点题目单独存放，随时打开专项复习。</text>
    </view>

    <view class="panel-card">
      <view class="info-row">
        <text class="info-label">收藏题库</text>
        <text class="info-value info-value--ellipsis">{{ selectCategory || '未选择' }}</text>
      </view>
      <view class="info-divider" />
      <view class="info-row">
        <text class="info-label">收藏数量</text>
        <text class="info-value info-value--accent">{{ favoriteCount }} 题</text>
      </view>
      <view v-if="!favoriteCount" class="panel-hint">收藏的题目会出现在这里</view>
      <view class="panel-btn" @click="goQuestion">{{ showVal }}</view>
    </view>

    <view v-if="showAd" class="ad-slot">广告位</view>
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
.favorite-page {
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

.info-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 20rpx;
  padding: 20rpx 0;
}

.info-divider {
  height: 1rpx;
  background: rgba(18, 21, 28, 0.06);
}

.info-label {
  font-size: 28rpx;
  color: var(--tab-muted);
  flex-shrink: 0;
}

.info-value {
  font-size: 28rpx;
  font-weight: 600;
  color: var(--tab-ink);
  text-align: right;
}

.info-value--ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 380rpx;
}

.info-value--accent {
  color: var(--tab-brand);
}

.panel-hint {
  margin-top: 20rpx;
  font-size: 26rpx;
  color: var(--tab-muted);
  line-height: 1.5;
}

.panel-btn {
  margin-top: 32rpx;
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
