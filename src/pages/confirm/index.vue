<template>
  <view class="page-container tab-page confirm-page">
    <view class="sub-intro">
      <text class="sub-eyebrow">模考</text>
      <text class="sub-title">模拟考试</text>
      <text class="sub-lead">确认规则后开始答题，成绩可参与排行榜。</text>
    </view>

    <view class="panel-card">
      <view class="info-row">
        <text class="info-label">考试题库</text>
        <text class="info-value info-value--ellipsis">{{ selectCategory || '未选择' }}</text>
      </view>
      <view class="info-divider" />
      <view class="info-row">
        <text class="info-label">考题数量</text>
        <text class="info-value info-value--accent">100 题</text>
      </view>
      <view class="info-divider" />
      <view class="info-row">
        <text class="info-label">考试时间</text>
        <text class="info-value info-value--accent">30 分钟</text>
      </view>
      <view class="info-divider" />
      <view class="info-row">
        <text class="info-label">合格标准</text>
        <text class="info-value">满分 100，60 分及格</text>
      </view>
      <view class="panel-btn" @click="startExam">开始模拟考试</view>
      <view class="panel-btn panel-btn--ghost" @click="exportExam">导出模拟试卷</view>
    </view>

    <view v-if="showAd" class="ad-slot">广告位</view>
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
.confirm-page {
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

.panel-card {
  padding: 28rpx 26rpx 32rpx;
  background: var(--tab-surface);
  border-radius: var(--tab-radius-lg);
  border: 1rpx solid var(--tab-line);
  box-shadow: var(--tab-shadow-soft);
}

.info-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 20rpx;
  padding: 20rpx 0;
}

.info-divider {
  height: 1rpx;
  background: rgba(18, 21, 28, 0.06);
}

.info-label {
  font-size: 28rpx;
  color: var(--tab-muted);
  flex-shrink: 0;
}

.info-value {
  font-size: 28rpx;
  font-weight: 600;
  color: var(--tab-ink);
  text-align: right;
}

.info-value--ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 380rpx;
}

.info-value--accent {
  color: var(--tab-brand);
}

.panel-btn {
  margin-top: 28rpx;
  padding: 26rpx 32rpx;
  text-align: center;
  font-size: 30rpx;
  font-weight: 700;
  color: #ffffff;
  background: var(--tab-brand);
  border-radius: var(--tab-radius-md);
}

.panel-btn--ghost {
  margin-top: 16rpx;
  color: var(--tab-ink-soft);
  background: #f1f5f9;
  border: 1rpx solid var(--tab-line);
  font-weight: 600;
}

.panel-btn:active {
  opacity: 0.92;
}

.ad-slot {
  margin-top: 32rpx;
  padding: 28rpx;
  background: var(--tab-surface);
  border-radius: var(--tab-radius-md);
  border: 1rpx dashed var(--tab-line);
  text-align: center;
  font-size: 26rpx;
  color: #94a3b8;
}
</style>
