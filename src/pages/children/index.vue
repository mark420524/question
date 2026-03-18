<template>
  <view class="page-container page">
    <view class="business-card-rpx card-main">
      <view class="business-section-title">儿童国学</view>
      <view class="grid">
        <view class="grid-item" @click="handlerChildren('sanzijing')">三字经</view>
        <view class="grid-item" @click="handlerChildren('baijiaxing')">百家姓</view>
        <view class="grid-item" @click="handlerChildren('dizigui')">弟子规</view>
        <view class="grid-item" @click="handlerChildren('qianziwen')">千字文</view>
        <view class="grid-item" @click="handlerChildren('shenglvqimeng1')">声律启蒙上</view>
        <view class="grid-item" @click="handlerChildren('shenglvqimeng2')">声律启蒙下</view>
      </view>
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
.page { padding: 24rpx; }
.card-main { padding: 32rpx; }
.grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24rpx; }
.grid-item { padding: 32rpx; text-align: center; background: #f8fafc; border-radius: 12rpx; font-size: 30rpx; font-weight: 500; color: #1e293b; border: 1rpx solid #e2e8f0; }
</style>
