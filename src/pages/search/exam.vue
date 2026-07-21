<template>
  <view class="page-container page-body">
    <view class="search-card card-base">
      <input v-model="searchVal" class="input-field" placeholder="搜索试卷关键词" confirm-type="search" @confirm="doSearch" />
      <view class="button-primary" @click="doSearch">搜索</view>
    </view>

    <view class="filter-row">
      <view class="filter-tag" @click="showFilter = !showFilter">筛选</view>
      <text class="filter-label">{{ categoryLabel }}</text>
    </view>

    <view v-if="showFilter" class="card-base filter-panel">
      <view class="filter-field">
        <text class="filter-label">分类</text>
        <picker mode="selector" :range="categoryNames" @change="onChangeCategory">
          <view class="picker-value">{{ categoryLabel }}</view>
        </picker>
      </view>
      <view class="filter-field">
        <text class="filter-label">版本</text>
        <picker mode="selector" :range="['全部', '人教版', '苏教版']" @change="onChangeVersion">
          <view class="picker-value">{{ version || '全部' }}</view>
        </picker>
      </view>
      <view class="filter-field">
        <text class="filter-label">文件类型</text>
        <picker mode="selector" :range="['全部', '.doc', '.pdf']" @change="onChangeFileType">
          <view class="picker-value">{{ fileType || '全部' }}</view>
        </picker>
      </view>
      <view class="filter-actions">
        <view class="filter-button" @click="resetFilter">重置</view>
        <view class="filter-button filter-button-primary" @click="confirmFilter">应用</view>
      </view>
    </view>

    <view v-if="examList.length === 0 && !loading" class="empty-state">暂无搜索结果</view>
    <view v-else class="card-list result-list">
      <view v-for="(item, idx) in examList" :key="item.id || idx" class="result-card" @click="goExam(item)">
        <text class="result-title">{{ item.examName || '试卷标题' }}</text>
        <view class="result-meta">
          <text>{{ item.version || '未知版本' }}</text>
          <text>{{ item.fileType || '未知类型' }}</text>
        </view>
      </view>
    </view>

    <view v-if="loading" class="loading">加载中...</view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { onLoad, onReachBottom } from '@dcloudio/uni-app'
import * as api from '@/service/api'
import * as utils from '@/utils/util'

const searchVal = ref('')
const examList = ref([])
const categoryNames = ref(['全部'])
const categoryIds = ref([0])
const categoryLabel = ref('全部')
const version = ref('')
const fileType = ref('')
const page = ref(0)
const size = 10
const loading = ref(false)
const showFilter = ref(false)

function loadExamMenu() {
  api.getExamMenu({ pid: 0 }).then((res) => {
    if (Array.isArray(res)) {
      categoryNames.value = ['全部', ...res.map((item) => item.name || '未知')]
      categoryIds.value = [0, ...res.map((item) => item.id || 0)]
    }
  })
}

function resetFilter() {
  categoryLabel.value = '全部'
  version.value = ''
  fileType.value = ''
  searchData(0, searchVal.value)
}

function confirmFilter() {
  showFilter.value = false
  searchData(0, searchVal.value)
}

function onChangeCategory(event) {
  const index = event.detail.value
  categoryLabel.value = categoryNames.value[index] || '全部'
  page.value = 0
}

function onChangeVersion(event) {
  const val = event.detail.value
  const options = ['全部', '人教版', '苏教版']
  version.value = options[val] === '全部' ? '' : options[val]
}

function onChangeFileType(event) {
  const val = event.detail.value
  const options = ['全部', '.doc', '.pdf']
  fileType.value = options[val] === '全部' ? '' : options[val]
}

function doSearch() {
  if (!searchVal.value.trim()) {
    utils.showWxToast('请输入搜索关键词')
    return
  }
  searchData(0, searchVal.value.trim())
}

function searchData(nextPage, keyword) {
  if (!keyword) return
  loading.value = true
  api.searchExam({ examName: keyword, version: version.value, fileType: fileType.value, pid: categoryIds.value[categoryNames.value.indexOf(categoryLabel.value)] || 0, page: nextPage, size }).then((res) => {
    loading.value = false
    const list = res?.list || []
    if (nextPage === 0) {
      examList.value = list
    } else {
      examList.value = [...examList.value, ...list]
    }
    if (list.length > 0) page.value = nextPage
    if (examList.value.length === 0) utils.showWxToast('查无结果')
  }).catch(() => { loading.value = false })
}

function goExam(item) {
  uni.setStorageSync('examItem', item)
  uni.navigateTo({ url: '/pages/exam/index' })
}

onLoad((options) => {
  loadExamMenu()
  if (options?.keyword) {
    searchVal.value = options.keyword
    searchData(0, options.keyword)
  }
})

onReachBottom(() => {
  if (!searchVal.value.trim()) return
  searchData(page.value + 1, searchVal.value)
})
</script>

<style scoped>
.page { padding: 0; background: transparent; min-height: auto }
.search-card { display: flex; gap: 16rpx; margin-bottom: 24rpx; }
.search-input { flex: 1; }
.filter-row { display: flex; align-items: center; gap: 16rpx; margin-bottom: 24rpx }
.filter-tag { padding: 12rpx 20rpx; background: #eef2ff; border-radius: 999rpx; color: #4f46e5; font-size: 26rpx }
.filter-label { font-size: 26rpx; color: var(--text-secondary) }
.filter-panel { padding: 24rpx; margin-bottom: 24rpx; }
.filter-field { margin-bottom: 20rpx }
.picker-value { padding: 18rpx 24rpx; background: var(--gray-100); border-radius: 20rpx; border: 1rpx solid var(--tab-line); font-size: 28rpx; color: var(--text-primary) }
.filter-actions { display: flex; gap: 16rpx }
.filter-button { flex: 1; padding: 22rpx 0; border-radius: 999rpx; text-align: center; background: var(--gray-200); color: var(--text-primary); font-size: 26rpx }
.filter-button-primary { background: var(--primary); color: #fff }
.result-list { display: flex; flex-direction: column; gap: 18rpx }
.result-card { padding: 26rpx; border-radius: var(--radius-lg); }
.result-title { display: block; font-size: 28rpx; font-weight: 700; color: var(--text-primary); margin-bottom: 14rpx }
.result-meta { display: flex; justify-content: space-between; color: var(--text-secondary); font-size: 24rpx }
.loading, .empty-state { padding: 60rpx 0; text-align: center; color: var(--text-secondary); }
</style>