<template>
  <view class="page">
    <business-card title="排行榜" :bordered="false">
      <view class="header">
        <text class="text">当前选择的题库为：</text>
        <text class="category">{{ selectCategory || '未选择' }}</text>
      </view>

      <view v-if="loading" class="loading">
        <u-loading type="spinner" size="40" />
        <text class="loading-text">加载中...</text>
      </view>

      <view v-else class="rank-list">
        <view
          v-for="(item, idx) in rankList"
          :key="idx"
          class="rank-item"
          :class="{ top: idx < 3 }"
        >
          <view class="rank-index">
            <text v-if="idx === 0" class="medal">🥇</text>
            <text v-else-if="idx === 1" class="medal">🥈</text>
            <text v-else-if="idx === 2" class="medal">🥉</text>
            <text v-else class="index">{{ idx + 1 }}</text>
          </view>
          <u-avatar :src="item.avatarUrl" size="60" />
          <view class="rank-info">
            <text class="name">{{ item.nickName }}</text>
            <text class="time">{{ item.createTime }}</text>
          </view>
          <view class="score">
            获得 <text class="score-value">{{ item.score }}</text> 分
          </view>
        </view>
      </view>
    </business-card>
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
  background: #f5f6fa;
  min-height: 100vh;
}
.header {
  margin-bottom: 24rpx;
  display: flex;
  align-items: center;
}
.text {
  font-size: 26rpx;
  color: #666;
}
.category {
  margin-left: 12rpx;
  font-size: 26rpx;
  font-weight: 600;
  color: #1c6ef2;
}
.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 50rpx 0;
}
.loading-text {
  margin-top: 16rpx;
  color: #999;
  font-size: 26rpx;
}
.rank-list {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}
.rank-item {
  display: flex;
  align-items: center;
  background: #fff;
  padding: 18rpx;
  border-radius: 16rpx;
  box-shadow: 0 8rpx 18rpx rgba(0, 0, 0, 0.06);
}
.rank-item.top {
  border: 1rpx solid rgba(28, 110, 242, 0.25);
}
.rank-index {
  width: 70rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}
.medal {
  font-size: 32rpx;
}
.index {
  font-size: 28rpx;
  color: #333;
}
.rank-info {
  flex: 1;
  padding: 0 14rpx;
}
.name {
  font-size: 28rpx;
  color: #1a1a1a;
}
.time {
  margin-top: 6rpx;
  font-size: 24rpx;
  color: #999;
}
.score {
  font-size: 26rpx;
  color: #333;
}
.score-value {
  color: #e74c3c;
  font-weight: 700;
}
</style>
