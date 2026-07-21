<template>
  <view class="page-container tab-page more-page">
    <view class="more-intro">
      <image class="more-hero" src="/static/images/tools.jpg" mode="widthFix" />
    </view>

    <view v-if="loading" class="more-loading">
      <text class="more-loading-text">加载中…</text>
    </view>

    <view v-else class="more-grid">
      <view
        v-for="(item, idx) in toolsItems"
        :key="toolRowKey(item, idx)"
        class="more-tile"
        @click="onToolClick(item)"
      >
        <view class="more-tile-icon" :class="'more-tile-icon--' + toneClass(idx)">
          {{ firstChar(item.text) }}
        </view>
        <text class="more-tile-text">{{ item.text }}</text>
      </view>
    </view>

    <view v-if="!loading && toolsItems.length === 0" class="more-empty">
      <text class="more-empty-text">暂无工具项</text>
    </view>

    <view v-if="showAd" class="ad-slot">广告位</view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as api from '@/service/api'

const toolsItems = ref([])
const loading = ref(true)
const showAd = ref(false)

function toneClass(idx) {
  return ['sky', 'rose', 'violet', 'jade', 'amber'][idx % 5]
}

function firstChar(text) {
  if (!text || typeof text !== 'string') return '·'
  return text.trim().charAt(0) || '·'
}

function toolRowKey(item, idx) {
  if (item && item.id != null) return 'tool-' + item.id
  return 'tool-' + idx + '-' + (item && item.text ? item.text : '')
}

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
.more-page {
  padding-bottom: 120rpx;
}

.more-intro {
  margin-bottom: 32rpx;
  padding-bottom: 20rpx;
  border-bottom: 1rpx solid var(--tab-line);
}

.more-hero {
  max-width: 100%;
  width: auto;
  height: auto;
  border-radius: var(--radius-lg);
  display: block;
  margin: 0 auto 18rpx;
}

.more-loading {
  padding: 100rpx 32rpx;
  text-align: center;
}

.more-loading-text {
  font-size: 28rpx;
  color: var(--tab-muted);
}

.more-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20rpx;
}

.more-tile {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20rpx;
  padding: 36rpx 24rpx;
  background: var(--tab-surface);
  border-radius: var(--tab-radius-lg);
  border: 1rpx solid var(--tab-line);
  box-shadow: var(--tab-shadow-soft);
  min-height: 200rpx;
}

.more-tile:active {
  opacity: 0.9;
}

.more-tile-icon {
  width: 88rpx;
  height: 88rpx;
  border-radius: 24rpx;
  font-size: 36rpx;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}

.more-tile-icon--sky {
  background: #e0f2fe;
  color: #0369a1;
}

.more-tile-icon--rose {
  background: #ffe4e6;
  color: #be123c;
}

.more-tile-icon--violet {
  background: #ede9fe;
  color: #5b21b6;
}

.more-tile-icon--jade {
  background: #ccfbf1;
  color: #0f766e;
}

.more-tile-icon--amber {
  background: #fef3c7;
  color: #b45309;
}

.more-tile-text {
  font-size: 28rpx;
  font-weight: 600;
  color: var(--tab-ink);
  text-align: center;
  line-height: 1.45;
  letter-spacing: 0.5rpx;
}

.more-empty {
  padding: 80rpx 32rpx;
  text-align: center;
}

.more-empty-text {
  font-size: 28rpx;
  color: var(--tab-muted);
}

.ad-slot {
  margin-top: 40rpx;
  padding: 28rpx;
  background: var(--tab-surface);
  border-radius: var(--tab-radius-md);
  border: 1rpx dashed var(--tab-line);
  text-align: center;
  font-size: 26rpx;
  color: var(--gray-500);
}
</style>
