<template>
  <view class="page-container page">
    <view class="search-bar business-card-rpx">
      <input
        v-model="searchVal"
        class="search-input"
        :placeholder="selectCategory"
        @confirm="doSearch"
      />
      <view class="search-btn business-btn-rpx business-btn-primary-rpx" @click="doSearch">搜索</view>
    </view>
    <view v-if="questionList.length === 0" class="business-card-rpx card-main">
      <view v-if="historys.length" class="history-title">搜索历史</view>
      <view class="history-list">
        <view v-for="h in historys" :key="h" class="history-item" @click="searchData(0, h)">{{ h }}</view>
      </view>
    </view>
    <view v-else class="list-wrap">
      <view class="total">已为您搜索到 <text class="highlight">{{ totalSize }}</text> 个结果</view>
      <view v-for="(row, rowIdx) in questionList" :key="rowIdx" class="row">
        <view
          v-for="(item, colIdx) in row"
          :key="item.id"
          class="item business-card-rpx"
          @click="goQuestion(item)"
        >
          {{ rowIdx * size + colIdx + 1 }} {{ item.question }}
        </view>
      </view>
    </view>
    <view v-if="loading" class="loading">加载中...</view>
    <view v-if="showAd" class="ad-wrap">广告位</view>
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
.page { padding: 24rpx; }
.search-bar { padding: 20rpx; margin-bottom: 16rpx; display: flex; gap: 16rpx; align-items: center; }
.search-input { flex: 1; padding: 20rpx; border: 1rpx solid #e2e8f0; border-radius: 12rpx; font-size: 28rpx; }
.search-btn { padding: 20rpx 32rpx; }
.card-main { padding: 32rpx; margin-bottom: 24rpx; }
.history-title { font-size: 28rpx; color: #64748b; margin-bottom: 16rpx; }
.history-list { display: flex; flex-wrap: wrap; gap: 16rpx; }
.history-item { padding: 16rpx 24rpx; background: #f1f5f9; border-radius: 8rpx; font-size: 26rpx; color: #475569; }
.total { font-size: 26rpx; color: #64748b; margin-bottom: 16rpx; }
.highlight { color: #2563eb; font-weight: 600; }
.row { display: flex; flex-direction: column; gap: 12rpx; margin-bottom: 16rpx; }
.item { padding: 24rpx; font-size: 28rpx; color: #1e293b; line-height: 1.5; }
.loading { padding: 24rpx; text-align: center; color: #94a3b8; }
.ad-wrap { margin-top: 32rpx; padding: 24rpx; background: #fff; border-radius: 12rpx; text-align: center; color: #94a3b8; font-size: 26rpx; }
</style>
