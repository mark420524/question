<template>
  <view class="page-container page">
    <view class="business-card-rpx card-main">
      <view class="tips">
        <text>本小程序是个人开发维护的开源小程序，仅供学习使用，</text>
        <text class="highlight">如有商业用途，请及时联系我们</text>
        <text>。使用过程中有各种问题、或题目有任何问题均可以联系我们。QQ群号：{{ qqGroup }}</text>
      </view>
      <view class="copy-row business-btn-rpx business-btn-secondary-rpx" @click="copyGroupInfo">
        <text>点我复制QQ群号</text>
      </view>
    </view>

    <view v-if="showAd" class="ad-wrap">广告位</view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as api from '@/service/api'

const qqGroup = ref('123955944')
const showAd = ref(false)

function init() {
  showAd.value = !!uni.getStorageSync('showAd')
  api.getQQGroup().then((res) => {
    if (res) qqGroup.value = res
  })
}

function copyGroupInfo() {
  uni.setClipboardData({
    data: qqGroup.value,
    success: () => {
      uni.showToast({ title: '已复制', icon: 'none' })
    }
  })
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

.tips {
  font-size: 28rpx;
  color: #475569;
  line-height: 1.7;
}

.tips .highlight {
  color: #2563eb;
  font-weight: 500;
}

.copy-row {
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
