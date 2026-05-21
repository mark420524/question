<template>
  <view class="page-container page-body">
    <view v-if="!item.url" class="empty-state">未找到直播内容</view>
    <view v-else class="card-base video-container">
      <video
        class="video-player"
        :src="item.url"
        controls
        autoplay
        object-fit="contain"
        @error="videoErrorCallback"
      />
      <view class="video-title">{{ item.name || '直播内容' }}</view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { onUnload } from '@dcloudio/uni-app'
import * as utils from '@/utils/util'

const item = ref({})

function loadItem() {
  item.value = uni.getStorageSync('liveItem') || {}
}

function cleanup() {
  uni.removeStorageSync('liveItem')
}

function videoErrorCallback() {
  utils.showWxToast('视频加载失败，请稍后重试')
}

onMounted(loadItem)
onUnload(cleanup)
</script>

<style scoped>
.page { padding: 0; background: transparent; min-height: auto }
.empty-state { padding: 80rpx 24rpx; color: var(--text-secondary); text-align: center }
.video-container { overflow: hidden }
.video-player { width: 100%; height: 420rpx; background: #000 }
.video-title { padding: 24rpx; font-size: 28rpx; font-weight: 700; color: var(--text-primary) }
</style>
