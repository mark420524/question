<template>
  <view class="page">
    <business-card title="收藏" :bordered="false">
      <view class="info-row">
        <text class="label">收藏题库：</text>
        <text class="value">{{ selectCategory || '未选择' }}</text>
      </view>
      <view class="info-row">
        <text class="label">收藏数量：</text>
        <text class="value">{{ favoriteCount }} 题</text>
      </view>
      <view v-if="!favoriteCount" class="hint">您收藏的题目会自动记录到这里</view>
      <view class="footer" @click="goQuestion">
        <text>{{ showVal }}</text>
      </view>
    </business-card>

    <view v-if="showAd" class="ad">广告位</view>
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
  background: #f5f6fa;
  min-height: 100vh;
}
.info-row {
  display: flex;
  padding: 16rpx 0;
  justify-content: space-between;
  border-bottom: 1rpx solid #eee;
}
.label {
  color: #666;
  font-size: 26rpx;
}
.value {
  color: #1a1a1a;
  font-size: 26rpx;
}
.hint {
  margin: 20rpx 0;
  color: #999;
  font-size: 26rpx;
}
.footer {
  margin-top: 18rpx;
  padding: 18rpx;
  background: #1c6ef2;
  border-radius: 16rpx;
  text-align: center;
  color: #fff;
  font-size: 28rpx;
}
.ad {
  margin-top: 30rpx;
  padding: 20rpx;
  background: #fff;
  border-radius: 14rpx;
  text-align: center;
  color: #999;
}
</style>
