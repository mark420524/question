<template>
  <view class="page-container page">
    <view v-if="loading" class="loading">加载中...</view>
    <view v-else class="grid">
      <view
        v-for="(item, idx) in items"
        :key="idx"
        class="item business-card-rpx"
        @click="goDetail(item)"
      >
        <view class="cover">
          <image class="bg-img" src="https://image.siival.com/background.jpg" mode="aspectFill" />
          <view class="live-tag">直播</view>
        </view>
        <view class="name">{{ item.name }}</view>
        <view class="tips">{{ item.width }}x{{ item.height }}</view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as api from '@/service/api'
import * as utils from '@/utils/util'

const items = ref([])
const loading = ref(false)

function load() {
  loading.value = true
  api.openTvInfo().then((res) => {
    loading.value = false
    items.value = res || []
    if (!items.value.length) utils.showWxToast('查无数据')
  }).catch(() => { loading.value = false })
}

function goDetail(item) {
  uni.setStorageSync('liveItem', item)
  uni.navigateTo({ url: '/pages/live/detail' })
}

onMounted(load)
</script>

<style scoped>
.page { padding: 24rpx; }
.loading { padding: 80rpx; text-align: center; color: #94a3b8; }
.grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24rpx; }
.item { padding: 0; overflow: hidden; }
.cover { position: relative; height: 160rpx; background: #f1f5f9; }
.bg-img { width: 100%; height: 100%; }
.live-tag { position: absolute; top: 16rpx; left: 16rpx; padding: 8rpx 16rpx; background: rgba(37,99,235,0.9); color: #fff; font-size: 24rpx; border-radius: 8rpx; }
.name { padding: 20rpx; font-size: 28rpx; font-weight: 600; color: #1e293b; }
.tips { padding: 0 20rpx 20rpx; font-size: 24rpx; color: #64748b; }
</style>
