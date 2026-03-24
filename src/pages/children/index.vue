<template>
  <view class="page-container tab-page children-page">
    <view class="sub-intro">
      <text class="sub-eyebrow">国学启蒙</text>
      <text class="sub-title">儿童国学</text>
      <text class="sub-lead">三字经、弟子规等经典，点击查看全文与注释。</text>
    </view>
    <view class="tool-grid">
      <view class="tool-tile" @click="handlerChildren('sanzijing')">三字经</view>
      <view class="tool-tile" @click="handlerChildren('baijiaxing')">百家姓</view>
      <view class="tool-tile" @click="handlerChildren('dizigui')">弟子规</view>
      <view class="tool-tile" @click="handlerChildren('qianziwen')">千字文</view>
      <view class="tool-tile" @click="handlerChildren('shenglvqimeng1')">声律启蒙上</view>
      <view class="tool-tile" @click="handlerChildren('shenglvqimeng2')">声律启蒙下</view>
    </view>
  </view>
</template>

<script setup>
import * as api from '@/service/api'

function handlerChildren(type) {
  uni.showLoading({ title: '查询中' })
  api.chineseChildren({ type }).then((res) => {
    uni.hideLoading()
    if (!res) return
    const index = res.index
    if (index === 0) {
      uni.setStorageSync('poetryItem', res)
      uni.navigateTo({ url: '/pages/detail/index' })
    } else {
      uni.setStorageSync('childItem', res)
      uni.navigateTo({ url: '/pages/detail/child' })
    }
  }).catch(() => { uni.hideLoading() })
}
</script>

<style scoped>
.children-page {
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
.tool-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20rpx;
}
.tool-tile {
  padding: 36rpx 24rpx;
  text-align: center;
  font-size: 30rpx;
  font-weight: 600;
  color: var(--tab-ink);
  background: var(--tab-surface);
  border-radius: var(--tab-radius-lg);
  border: 1rpx solid var(--tab-line);
  box-shadow: var(--tab-shadow-soft);
}
.tool-tile:active {
  opacity: 0.9;
}
</style>
