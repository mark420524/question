<template>
  <view class="page">
    <business-card title="模拟考试" :bordered="false">
      <view class="info-row">
        <text class="label">考试题库：</text>
        <text class="value">{{ selectCategory || '未选择' }}</text>
      </view>
      <view class="info-row">
        <text class="label">考题数量：</text>
        <text class="value">100 题</text>
      </view>
      <view class="info-row">
        <text class="label">考试时间：</text>
        <text class="value">30 分钟</text>
      </view>
      <view class="info-row">
        <text class="label">合格标准：</text>
        <text class="value">满分 100 分，60 分及格</text>
      </view>
      <view class="footer" @click="startExam">
        <text>开始模拟考试</text>
      </view>
      <view class="footer export" @click="exportExam">
        <text>导出模拟试卷</text>
      </view>
    </business-card>

    <view v-if="showAd" class="ad">广告位</view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const selectCategory = ref('')
const showAd = ref(false)

function init() {
  showAd.value = !!uni.getStorageSync('showAd')
  selectCategory.value = uni.getStorageSync('selectCategory') || ''
}

function startExam() {
  const cid = uni.getStorageSync('cid')
  uni.redirectTo({ url: `/pages/question/index?cid=${cid}&type=4` })
}

function exportExam() {
  uni.redirectTo({ url: '/pages/exportq/index?type=1' })
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
  justify-content: space-between;
  padding: 16rpx 0;
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
.footer {
  margin-top: 18rpx;
  padding: 18rpx;
  background: #1c6ef2;
  border-radius: 16rpx;
  text-align: center;
  color: #fff;
  font-size: 28rpx;
}
.export {
  margin-top: 12rpx;
  background: #666;
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
