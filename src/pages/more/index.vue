<template>
  <view class="page-container page">
    <view v-if="loading" class="loading-wrap">
      <text class="loading-text">加载中...</text>
    </view>
    <view v-else class="tool-grid">
      <view
        v-for="(item, idx) in toolsItems"
        :key="idx"
        class="tool-item business-card-rpx"
        @click="onToolClick(item)"
      >
        <text class="tool-text">{{ item.text }}</text>
      </view>
    </view>

    <view v-if="showAd" class="ad-wrap">广告位</view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as api from '@/service/api'

const toolsItems = ref([])
const loading = ref(true)
const showAd = ref(false)

function onToolClick(item) {
  if (item.url) {
    uni.navigateTo({ url: item.url })
  } else if (item.linkType === 'navigateTo' && item.url) {
    uni.navigateTo({ url: item.url })
  }
}

function init() {
  showAd.value = !!uni.getStorageSync('showAd')
  api.toolsItem().then((res) => {
    toolsItems.value = Array.isArray(res) ? res : []
  }).finally(() => {
    loading.value = false
  })
}

onMounted(init)
</script>

<style scoped>
.page {
  padding: 24rpx;
}

.loading-wrap {
  padding: 80rpx;
  text-align: center;
}

.loading-text {
  font-size: 28rpx;
  color: #94a3b8;
}

.tool-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24rpx;
}

.tool-item {
  padding: 32rpx;
  text-align: center;
}

.tool-text {
  font-size: 28rpx;
  font-weight: 500;
  color: #1e293b;
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
