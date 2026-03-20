<template>
  <view class="page-container tab-page rank-page">
    <view class="sub-intro">
      <text class="sub-eyebrow">竞技</text>
      <text class="sub-title">排行榜</text>
      <text class="sub-lead">基于当前题库模拟考试成绩排名，看看自己的位置。</text>
    </view>

    <view class="context-card">
      <text class="context-label">当前题库</text>
      <text class="context-value">{{ selectCategory || '未选择' }}</text>
    </view>

    <view v-if="loading" class="state-loading">加载中...</view>

    <view v-else class="rank-list">
      <view
        v-for="(item, idx) in rankList"
        :key="rankRowKey(item, idx)"
        class="rank-row"
        :class="{ 'rank-row--top': idx < 3 }"
      >
        <view class="rank-medal-wrap">
          <text v-if="idx === 0" class="medal medal--gold">1</text>
          <text v-else-if="idx === 1" class="medal medal--silver">2</text>
          <text v-else-if="idx === 2" class="medal medal--bronze">3</text>
          <text v-else class="rank-num">{{ idx + 1 }}</text>
        </view>
        <image
          v-if="item.avatarUrl"
          class="rank-avatar"
          :src="item.avatarUrl"
          mode="aspectFill"
        />
        <view v-else class="rank-avatar rank-avatar--ph">头</view>
        <view class="rank-main">
          <text class="rank-name">{{ item.nickName || '匿名' }}</text>
          <text class="rank-time">{{ item.createTime || '-' }}</text>
        </view>
        <view class="rank-score">
          <text class="rank-score-val">{{ item.score }}</text>
          <text class="rank-score-unit">分</text>
        </view>
      </view>
    </view>

    <view v-if="!loading && rankList.length === 0" class="state-empty">暂无排行数据</view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as api from '@/service/api'

const selectCategory = ref('')
const rankList = ref([])
const loading = ref(true)

function rankRowKey(item, idx) {
  return ['r', idx, item.nickName, item.score, item.createTime, item.avatarUrl]
    .filter((v) => v !== undefined && v !== null && v !== '')
    .join('-')
}

function init() {
  selectCategory.value = uni.getStorageSync('selectCategory') || ''
  const cid = uni.getStorageSync('cid')
  api.getExamRank({ cid }).then((res) => {
    rankList.value = Array.isArray(res) ? res : []
  }).finally(() => {
    loading.value = false
  })
}

onMounted(init)
</script>

<style scoped>
.rank-page {
  padding-bottom: 48rpx;
}

.sub-intro {
  margin-bottom: 24rpx;
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

.context-card {
  display: flex;
  flex-direction: column;
  gap: 10rpx;
  padding: 24rpx 26rpx;
  margin-bottom: 24rpx;
  background: var(--tab-surface);
  border-radius: var(--tab-radius-lg);
  border: 1rpx solid var(--tab-line);
  box-shadow: var(--tab-shadow-soft);
}

.context-label {
  font-size: 24rpx;
  color: var(--tab-muted);
}

.context-value {
  font-size: 28rpx;
  font-weight: 600;
  color: var(--tab-brand);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.state-loading {
  padding: 80rpx 32rpx;
  text-align: center;
  font-size: 28rpx;
  color: var(--tab-muted);
}

.state-empty {
  padding: 60rpx 32rpx;
  text-align: center;
  font-size: 28rpx;
  color: var(--tab-muted);
}

.rank-list {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.rank-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 22rpx 24rpx;
  background: var(--tab-surface);
  border-radius: var(--tab-radius-lg);
  border: 1rpx solid var(--tab-line);
  box-shadow: var(--tab-shadow-soft);
}

.rank-row--top {
  border-color: rgba(14, 116, 144, 0.35);
  background: linear-gradient(90deg, rgba(204, 251, 241, 0.35) 0%, var(--tab-surface) 55%);
}

.rank-medal-wrap {
  width: 56rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.medal {
  width: 48rpx;
  height: 48rpx;
  border-radius: 50%;
  font-size: 24rpx;
  font-weight: 700;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.medal--gold {
  background: linear-gradient(135deg, #fbbf24, #d97706);
}

.medal--silver {
  background: linear-gradient(135deg, #cbd5e1, #64748b);
}

.medal--bronze {
  background: linear-gradient(135deg, #fb923c, #c2410c);
}

.rank-num {
  font-size: 28rpx;
  font-weight: 700;
  color: var(--tab-muted);
}

.rank-avatar {
  width: 72rpx;
  height: 72rpx;
  border-radius: 50%;
  margin-left: 16rpx;
  flex-shrink: 0;
}

.rank-avatar--ph {
  background: #e2e8f0;
  color: var(--tab-muted);
  font-size: 26rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.rank-main {
  flex: 1;
  min-width: 0;
  padding: 0 18rpx;
}

.rank-name {
  display: block;
  font-size: 28rpx;
  font-weight: 600;
  color: var(--tab-ink);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.rank-time {
  display: block;
  margin-top: 8rpx;
  font-size: 24rpx;
  color: var(--tab-muted);
}

.rank-score {
  flex-shrink: 0;
  text-align: right;
}

.rank-score-val {
  font-size: 32rpx;
  font-weight: 800;
  color: var(--tab-brand);
  font-variant-numeric: tabular-nums;
}

.rank-score-unit {
  font-size: 24rpx;
  color: var(--tab-muted);
  margin-left: 4rpx;
}
</style>
