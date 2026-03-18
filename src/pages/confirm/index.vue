<template>
  <view class="page-container page">
    <view class="business-card-rpx card-main">
      <view class="business-section-title">模拟考试</view>
      <view class="info-row">
        <text class="label">考试题库：</text>
        <text class="value value-ellipsis">{{ selectCategory || '未选择' }}</text>
      </view>
      <view class="info-row">
        <text class="label">考题数量：</text>
        <text class="value highlight">100 题</text>
      </view>
      <view class="info-row">
        <text class="label">考试时间：</text>
        <text class="value highlight">30 分钟</text>
      </view>
      <view class="info-row">
        <text class="label">合格标准：</text>
        <text class="value">满分 100 分，60 分及格</text>
      </view>
      <view class="footer business-btn-rpx business-btn-primary-rpx" @click="startExam">
        <text>开始模拟考试</text>
      </view>
      <view class="footer secondary business-btn-rpx business-btn-secondary-rpx" @click="exportExam">
        <text>导出模拟试卷</text>
      </view>
    </view>

    <view v-if="showAd" class="ad-wrap">广告位</view>
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
}

.card-main {
  padding: 32rpx;
}

.info-row {
  display: flex;
  padding: 24rpx 0;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1rpx solid #e2e8f0;
}

.label {
  color: #64748b;
  font-size: 28rpx;
  flex-shrink: 0;
  margin-right: 16rpx;
}

.value {
  color: #1e293b;
  font-size: 28rpx;
  font-weight: 500;
}

.value-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 360rpx;
}

.value.highlight {
  color: #2563eb;
  font-weight: 600;
}

.footer {
  margin-top: 24rpx;
  width: 100%;
}

.footer.secondary {
  margin-top: 16rpx;
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
