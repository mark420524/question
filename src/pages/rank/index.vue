<template>
  <view class="page-container page">
    <view class="business-card-rpx card-main">
      <view class="header-row">
        <text class="header-label">当前题库：</text>
        <text class="header-value">{{ selectCategory || '未选择' }}</text>
      </view>

      <view v-if="loading" class="loading-wrap">
        <text class="loading-text">加载中...</text>
      </view>

      <view v-else class="rank-list">
        <view
          v-for="(item, idx) in rankList"
          :key="idx"
          class="rank-item business-card-rpx"
          :class="{ top: idx < 3 }"
        >
          <view class="rank-index">
            <text v-if="idx === 0" class="medal medal-gold">1</text>
            <text v-else-if="idx === 1" class="medal medal-silver">2</text>
            <text v-else-if="idx === 2" class="medal medal-bronze">3</text>
            <text v-else class="index-num">{{ idx + 1 }}</text>
          </view>
          <image
            v-if="item.avatarUrl"
            class="avatar"
            :src="item.avatarUrl"
            mode="aspectFill"
          />
          <view v-else class="avatar placeholder">头</view>
          <view class="rank-info">
            <text class="name">{{ item.nickName || '匿名' }}</text>
            <text class="time">{{ item.createTime || '-' }}</text>
          </view>
          <view class="score-wrap">
            <text class="score-value">{{ item.score }}</text>
            <text class="score-unit">分</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as api from '@/service/api'

const selectCategory = ref('')
const rankList = ref([])
const loading = ref(true)

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
.page {
  padding: 24rpx;
}

.card-main {
  padding: 32rpx;
}

.header-row {
  margin-bottom: 24rpx;
  display: flex;
  align-items: center;
}

.header-label {
  font-size: 28rpx;
  color: #64748b;
}

.header-value {
  margin-left: 12rpx;
  font-size: 28rpx;
  font-weight: 600;
  color: #2563eb;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 400rpx;
}

.loading-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60rpx 0;
}

.loading-text {
  color: #94a3b8;
  font-size: 28rpx;
}

.rank-list {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.rank-item {
  display: flex;
  align-items: center;
  padding: 24rpx;
}

.rank-item.top {
  border: 1rpx solid rgba(37, 99, 235, 0.2);
}

.rank-index {
  width: 64rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
}

.medal {
  width: 48rpx;
  height: 48rpx;
  border-radius: 50%;
  font-size: 24rpx;
  font-weight: 700;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.medal-gold {
  background: linear-gradient(135deg, #f59e0b, #d97706);
}

.medal-silver {
  background: linear-gradient(135deg, #94a3b8, #64748b);
}

.medal-bronze {
  background: linear-gradient(135deg, #d97706, #b45309);
}

.index-num {
  font-size: 28rpx;
  font-weight: 600;
  color: #475569;
}

.avatar {
  width: 72rpx;
  height: 72rpx;
  border-radius: 50%;
  margin-left: 20rpx;
  flex-shrink: 0;
}

.avatar.placeholder {
  background: #e2e8f0;
  color: #64748b;
  font-size: 26rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.rank-info {
  flex: 1;
  padding: 0 20rpx;
  min-width: 0;
}

.name {
  font-size: 28rpx;
  font-weight: 600;
  color: #1e293b;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.time {
  margin-top: 8rpx;
  font-size: 24rpx;
  color: #64748b;
}

.score-wrap {
  flex-shrink: 0;
}

.score-value {
  font-size: 32rpx;
  font-weight: 700;
  color: #2563eb;
}

.score-unit {
  font-size: 24rpx;
  color: #64748b;
  margin-left: 4rpx;
}
</style>
