<template>
  <view class="page-container tab-page search-page">
    <view class="search-bar-card">
      <input
        v-model="searchVal"
        class="search-input"
        :placeholder="'搜索：' + selectCategory"
        placeholder-class="search-placeholder"
        confirm-type="search"
        @confirm="doSearch"
      />
      <view class="search-submit" @click="doSearch">搜索</view>
    </view>

    <view v-if="questionList.length === 0" class="empty-panel">
      <view v-if="historys.length" class="history-block">
        <text class="history-label">最近搜索</text>
        <view class="history-chips">
          <view
            v-for="(h, hIdx) in historys"
            :key="'h-' + hIdx + '-' + h"
            class="history-chip"
            @click="searchData(0, h)"
          >
            {{ h }}
          </view>
        </view>
      </view>
      <view v-else class="empty-hint">
        <text class="empty-hint-title">试试搜一道题</text>
        <text class="empty-hint-sub">输入题干或知识点中的关键词</text>
      </view>
    </view>

    <view v-else class="result-block">
      <view class="result-meta">
        已找到
        <text class="result-count">{{ totalSize }}</text>
        条相关结果
      </view>
      <view v-for="(row, rowIdx) in questionList" :key="'row-' + rowIdx" class="result-row">
        <view
          v-for="(item, colIdx) in row"
          :key="item.id"
          class="result-item"
          @click="goQuestion(item)"
        >
          <view class="result-index">{{ rowIdx * size + colIdx + 1 }}</view>
          <text class="result-text">{{ item.question }}</text>
        </view>
      </view>
    </view>

    <view v-if="loading" class="state-loading">加载中...</view>
    <view v-if="showAd" class="ad-slot">广告位</view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { onReachBottom } from '@dcloudio/uni-app'
import * as api from '@/service/api'
import * as utils from '@/utils/util'

const searchVal = ref('')
const selectCategory = ref('暂无')
const questionList = ref([])
const historys = ref([])
const pages = ref(0)
const size = 10
const totalSize = ref(0)
const loading = ref(false)
const showAd = ref(false)

function reloadHistory() {
  try {
    const raw = uni.getStorageSync('historys')
    historys.value = raw ? JSON.parse(raw) : []
  } catch (e) {
    historys.value = []
  }
}

function doSearch() {
  const val = searchVal.value.trim()
  if (!val) {
    utils.showWxToast('请输入搜索关键词')
    return
  }
  const hs = [val, ...historys.value.filter((h) => h !== val)].slice(0, 20)
  uni.setStorageSync('historys', JSON.stringify(hs))
  reloadHistory()
  searchData(0, val)
}

function searchData(page, val, emptyText) {
  if (!utils.getAnswerCid()) {
    utils.showWxToast('请先选择题库')
    return
  }
  if (val !== searchVal.value) {
    searchVal.value = val
    pages.value = 0
    questionList.value = []
  }
  if (page !== pages.value && page > 0) {
    pages.value = page
  }
  loading.value = true
  api.searchQuestion({
    cid: utils.getAnswerCid(),
    uid: utils.getUserId(),
    keywords: val,
    page,
    size
  }).then((res) => {
    loading.value = false
    if (res && res.list) {
      questionList.value[page] = res.list
      questionList.value = [...questionList.value]
      totalSize.value = res.totalSize ?? 0
      pages.value = page
    } else if (emptyText) {
      utils.showWxToast(emptyText)
    }
  }).catch(() => { loading.value = false })
}

function goQuestion(item) {
  uni.navigateTo({ url: '/pages/share/index?show=0&type=5&qid=' + item.id })
}

onMounted(() => {
  selectCategory.value = uni.getStorageSync('selectCategory') || '暂无'
  reloadHistory()
})

onReachBottom(() => {
  if (!searchVal.value) return
  searchData(pages.value + 1, searchVal.value, '没有更多数据了')
})
</script>

<style scoped>
.search-page {
  padding-bottom: 120rpx;
}


.search-bar-card {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  gap: 16rpx;
  padding: 20rpx;
  margin-bottom: 28rpx;
  background: var(--tab-surface);
  border-radius: var(--tab-radius-lg);
  border: 1rpx solid var(--tab-line);
  box-shadow: var(--tab-shadow-soft);
}

.search-input {
  flex: 1;
  min-width: 0;
  padding: 22rpx 24rpx;
  font-size: 28rpx;
  color: var(--tab-ink);
  background: #f8fafc;
  border-radius: var(--tab-radius-md);
  border: 1rpx solid transparent;
}

.search-placeholder {
  color: #94a3b8;
}

.search-submit {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 36rpx;
  font-size: 28rpx;
  font-weight: 600;
  color: #ffffff;
  background: var(--tab-brand);
  border-radius: var(--tab-radius-md);
  flex-shrink: 0;
}

.search-submit:active {
  opacity: 0.9;
}

.empty-panel {
  min-height: 200rpx;
}

.history-block {
  padding: 28rpx;
  background: var(--tab-surface);
  border-radius: var(--tab-radius-lg);
  border: 1rpx solid var(--tab-line);
  box-shadow: var(--tab-shadow-soft);
}

.history-label {
  display: block;
  font-size: 26rpx;
  font-weight: 600;
  color: var(--tab-muted);
  margin-bottom: 20rpx;
}

.history-chips {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 16rpx;
}

.history-chip {
  padding: 14rpx 26rpx;
  font-size: 26rpx;
  color: var(--tab-brand-deep);
  background: #ccfbf1;
  border-radius: 999rpx;
  border: 1rpx solid rgba(14, 116, 144, 0.15);
}

.history-chip:active {
  opacity: 0.85;
}

.empty-hint {
  padding: 48rpx 32rpx;
  text-align: center;
}

.empty-hint-title {
  display: block;
  font-size: 30rpx;
  font-weight: 600;
  color: var(--tab-ink);
  margin-bottom: 12rpx;
}

.empty-hint-sub {
  display: block;
  font-size: 26rpx;
  color: var(--tab-muted);
  line-height: 1.5;
}

.result-block {
  margin-top: 8rpx;
}

.result-meta {
  font-size: 26rpx;
  color: var(--tab-muted);
  margin-bottom: 20rpx;
  letter-spacing: 0.5rpx;
}

.result-count {
  color: var(--tab-brand);
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  padding: 0 6rpx;
}

.result-row {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
  margin-bottom: 16rpx;
}

.result-item {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 20rpx;
  padding: 26rpx 24rpx;
  background: var(--tab-surface);
  border-radius: var(--tab-radius-lg);
  border: 1rpx solid var(--tab-line);
  box-shadow: var(--tab-shadow-soft);
}

.result-item:active {
  opacity: 0.92;
}

.result-index {
  width: 44rpx;
  height: 44rpx;
  line-height: 44rpx;
  text-align: center;
  font-size: 24rpx;
  font-weight: 700;
  color: var(--tab-brand);
  background: #ccfbf1;
  border-radius: 12rpx;
  flex-shrink: 0;
}

.result-text {
  flex: 1;
  font-size: 28rpx;
  color: var(--tab-ink);
  line-height: 1.55;
  min-width: 0;
}

.state-loading {
  padding: 32rpx;
  text-align: center;
  font-size: 26rpx;
  color: var(--tab-muted);
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
