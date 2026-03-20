<template>
  <view class="page-container tab-page wrong-page">
    <view class="sub-intro">
      <text class="sub-eyebrow">复盘</text>
      <text class="sub-title">错题集</text>
      <text class="sub-lead">集中攻克答错过的题目，支持答对后自动移出。</text>
    </view>

    <view class="panel-card">
      <view class="info-row">
        <text class="info-label">错题题库</text>
        <text class="info-value info-value--ellipsis">{{ selectCategory || '未选择' }}</text>
      </view>
      <view class="info-divider" />
      <view class="info-row">
        <text class="info-label">错题数量</text>
        <text class="info-value info-value--accent">{{ wrongCount }} 题</text>
      </view>
      <view v-if="!wrongCount" class="panel-hint">答错的题目会自动汇总到这里</view>
      <view v-else class="switch-row">
        <text class="switch-label">答对后自动移出错题集</text>
        <switch :checked="autoRemove" color="#0e7490" @change="onAutoRemoveChange" />
      </view>
      <view class="panel-btn" @click="goQuestion">{{ showVal }}</view>
    </view>

    <view v-if="showAd" class="ad-slot">广告位</view>
  </view>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import * as api from '@/service/api'
import * as utils from '@/utils/util'

const selectCategory = ref('')
const wrongCount = ref(0)
const showVal = ref('查看错题')
const autoRemove = ref(true)
const showAd = ref(false)

function init() {
  showAd.value = !!uni.getStorageSync('showAd')
  selectCategory.value = uni.getStorageSync('selectCategory') || ''
  uni.setStorageSync('autoRemove', 1)
  loadWrongCount()
}

function loadWrongCount() {
  const data = {
    cid: utils.getAnswerCid(),
    uid: utils.getUserId()
  }
  api.wrongCount(data).then((res) => {
    wrongCount.value = res || 0
    showVal.value = wrongCount.value > 0 ? '查看错题' : '去练习'
  })
}

function onAutoRemoveChange(e) {
  const val = e.detail.value
  autoRemove.value = !!val
  uni.setStorageSync('autoRemove', val ? 1 : 0)
}

watch(autoRemove, (val) => {
  uni.setStorageSync('autoRemove', val ? 1 : 0)
})

function goQuestion() {
  const count = wrongCount.value
  if (count > 0) {
    utils.setAnswerType(2)
  } else {
    utils.setAnswerType(1)
  }
  uni.redirectTo({ url: '/pages/question/index' })
}

onMounted(init)
</script>

<style scoped>
.wrong-page {
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

.switch-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 24rpx;
  margin-top: 24rpx;
  padding-top: 24rpx;
  border-top: 1rpx solid rgba(18, 21, 28, 0.06);
}

.switch-label {
  flex: 1;
  font-size: 26rpx;
  color: var(--tab-ink-soft);
  line-height: 1.45;
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
