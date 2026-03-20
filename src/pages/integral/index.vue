<template>
  <view class="page-container tab-page integral-page">
    <view class="sub-intro">
      <text class="sub-eyebrow">积分资产</text>
      <text class="sub-title">我的积分</text>
      <text class="sub-lead">当前余额与近期变动，上拉加载更多记录。</text>
    </view>

    <view class="summary-card">
      <view class="summary-accent" />
      <view class="summary-row">
        <view class="summary-texts">
          <text class="summary-label">总积分</text>
          <text class="summary-hint">可用于兑换与活动</text>
        </view>
        <text class="summary-value">{{ totalIntegral }}</text>
      </view>
    </view>

    <view class="log-head">
      <text class="log-head-title">变动明细</text>
    </view>

    <view class="log-list">
      <view
        v-for="entry in flatLogEntries"
        :key="entry.key"
        class="log-card"
      >
        <view class="log-card-top">
          <view class="log-card-top-left">
            <text class="log-idx">#{{ entry.seq }}</text>
            <text class="log-tag">{{ entry.item.type === 1 ? '获得' : '消耗' }}</text>
          </view>
          <text class="log-score" :class="entry.item.type === 1 ? 'log-score--add' : 'log-score--minus'">
            {{ entry.item.type === 1 ? '+' : '-' }}{{ entry.item.integral }}
          </text>
        </view>
        <text class="log-remark">{{ entry.item.remark }}</text>
        <view class="log-meta">
          <text class="log-time">{{ entry.item.createTime }}</text>
          <text class="log-after">剩余 {{ entry.item.afterCount }}</text>
        </view>
      </view>
    </view>

    <view v-if="loading" class="state-loading">加载中...</view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'
import { onLoad, onReachBottom } from '@dcloudio/uni-app'
import * as api from '@/service/api'
import * as utils from '@/utils/util'

const totalIntegral = ref(0)
const integralList = ref([])
const size = 10
const pages = ref(0)
const loading = ref(false)

const filteredList = computed(() => integralList.value.filter((r) => Array.isArray(r) && r.length))

const flatLogEntries = computed(() => {
  const out = []
  let seq = 0
  filteredList.value.forEach((row, rowIdx) => {
    row.forEach((item, colIdx) => {
      seq += 1
      out.push({
        item,
        seq,
        key: ['log', rowIdx, colIdx, item.createTime, item.remark].join('-')
      })
    })
  })
  return out
})

function buildUserLog(page, emptyText) {
  loading.value = true
  api.getMyIntegralList({ uid: utils.getUserId(), page, size }).then((res) => {
    loading.value = false
    if (res && res.length) {
      integralList.value[page] = res
      integralList.value = [...integralList.value]
      pages.value = page
    } else if (emptyText) utils.showWxToast(emptyText)
  }).catch(() => { loading.value = false })
}

onLoad((options) => {
  totalIntegral.value = Number(options.integral) || 0
  buildUserLog(0, '没有更多数据了')
})

onReachBottom(() => { buildUserLog(pages.value + 1, '没有更多数据了') })
</script>

<style scoped>
.integral-page {
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

.summary-card {
  position: relative;
  overflow: hidden;
  margin-bottom: 28rpx;
  padding: 32rpx 28rpx;
  background: var(--tab-surface);
  border-radius: var(--tab-radius-lg);
  border: 1rpx solid var(--tab-line);
  box-shadow: var(--tab-shadow-soft);
}

.summary-accent {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 6rpx;
  background: linear-gradient(90deg, var(--tab-brand-deep), var(--tab-brand), #2dd4bf);
}

.summary-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 24rpx;
}

.summary-texts {
  display: flex;
  flex-direction: column;
  gap: 8rpx;
  min-width: 0;
}

.summary-label {
  font-size: 28rpx;
  font-weight: 600;
  color: var(--tab-muted);
}

.summary-hint {
  font-size: 24rpx;
  color: #94a3b8;
}

.summary-value {
  font-size: 48rpx;
  font-weight: 800;
  color: var(--tab-brand);
  font-variant-numeric: tabular-nums;
  flex-shrink: 0;
}

.log-head {
  margin-bottom: 16rpx;
}

.log-head-title {
  font-size: 28rpx;
  font-weight: 700;
  color: var(--tab-ink);
}

.log-list {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.log-card {
  padding: 24rpx 24rpx 24rpx 28rpx;
  background: var(--tab-surface);
  border-radius: var(--tab-radius-lg);
  border: 1rpx solid var(--tab-line);
  box-shadow: var(--tab-shadow-soft);
  border-left: 6rpx solid var(--tab-brand);
}

.log-card-top {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 16rpx;
  margin-bottom: 12rpx;
}

.log-card-top-left {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12rpx;
  flex-wrap: wrap;
  min-width: 0;
}

.log-idx {
  font-size: 22rpx;
  color: #94a3b8;
  font-weight: 500;
}

.log-score {
  font-size: 32rpx;
  font-weight: 800;
  font-variant-numeric: tabular-nums;
}

.log-score--add {
  color: #059669;
}

.log-score--minus {
  color: #dc2626;
}

.log-remark {
  display: block;
  font-size: 28rpx;
  color: var(--tab-ink);
  line-height: 1.55;
  margin-bottom: 12rpx;
}

.log-meta {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 16rpx;
  align-items: center;
}

.log-time {
  font-size: 24rpx;
  color: var(--tab-muted);
}

.log-after {
  font-size: 24rpx;
  color: #94a3b8;
}

.log-tag {
  font-size: 20rpx;
  font-weight: 600;
  color: var(--tab-brand-deep);
  background: #ccfbf1;
  padding: 6rpx 14rpx;
  border-radius: 999rpx;
}

.state-loading {
  padding: 40rpx;
  text-align: center;
  font-size: 26rpx;
  color: var(--tab-muted);
}
</style>
