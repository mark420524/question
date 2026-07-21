<template>
  <view class="page-container page">
    <view class="search-bar business-card-rpx">
      <input
        v-model="searchVal"
        class="search-input"
        placeholder="请输入关键词，作者、诗词、诗名"
        @confirm="doSearch(0)"
      />
      <view class="search-btn business-btn-rpx business-btn-primary-rpx" @click="doSearch(0)">搜索</view>
    </view>
    <view class="tabs business-card-rpx">
      <view
        v-for="(tab, idx) in categoryList"
        :key="tab.id"
        class="tab"
        :class="{ active: activeIndex === tab.id }"
        @click="onTabChange(tab, idx)"
      >
        {{ tab.title }}
      </view>
    </view>
    <view class="list">
      <view v-for="(row, rowIdx) in filteredList" :key="rowIdx" class="row">
        <view
          v-for="(item, colIdx) in row"
          :key="colIdx"
          class="item business-card-rpx"
          @click="goToPoetry(item)"
        >
          <view class="idx">{{ rowIdx * size + colIdx + 1 }}</view>
          <view class="title">{{ item.title }}<text v-if="item.index === 2"> · {{ item.first }}</text></view>
          <view class="author">{{ item.dynasty }} · {{ item.author }}</view>
        </view>
      </view>
    </view>
    <view v-if="loading" class="loading">加载中...</view>
  </view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { onReachBottom } from '@dcloudio/uni-app'
import * as api from '@/service/api'
import * as utils from '@/utils/util'

const searchVal = ref('')
const activeIndex = ref(0)
const categoryList = ref([{}, {}, {}])
const poetryList = ref([])
const size = 20
const pages = ref(0)
const loading = ref(false)

const filteredList = computed(() => poetryList.value.filter((r) => Array.isArray(r) && r.length))

function loadMenu() {
  return api.poetryCategory().then((res) => {
    categoryList.value = res || []
    if (categoryList.value.length) activeIndex.value = categoryList.value[0].id
  })
}

function doSearch(page, val, emptyText) {
  const keyword = val !== undefined ? val : searchVal.value
  if (keyword && keyword !== searchVal.value) {
    searchVal.value = keyword
    pages.value = 0
    poetryList.value = []
  }
  const cid = activeIndex.value
  loading.value = true
  api.poetryInfo({ cid, word: keyword || '', page: page ?? pages.value, size }).then((res) => {
    loading.value = false
    if (res && res.length) {
      poetryList.value[page ?? pages.value] = res
      poetryList.value = [...poetryList.value]
      pages.value = page ?? pages.value
    } else if (emptyText) {
      utils.showWxToast(emptyText)
    } else {
      utils.showWxToast('诗词未查询到数据')
    }
  }).catch(() => { loading.value = false })
}

function onTabChange(tab, idx) {
  activeIndex.value = tab.id
  pages.value = 0
  poetryList.value = []
  doSearch(0)
}

function goToPoetry(item) {
  uni.setStorageSync('poetryItem', item)
  uni.navigateTo({ url: '/pages/detail/index' })
}

onMounted(() => {
  loadMenu().then(() => {
    doSearch(0)
  })
})

onReachBottom(() => {
  const next = pages.value + 1
  doSearch(next, searchVal.value, '没有更多数据了')
})
</script>

<style scoped>
.page { padding: 24rpx; }
.search-bar { padding: 20rpx; margin-bottom: 16rpx; display: flex; gap: 16rpx; align-items: center; }
.search-input { flex: 1; padding: 20rpx; border: 1rpx solid var(--border); border-radius: 12rpx; font-size: 28rpx; }
.search-btn { padding: 20rpx 32rpx; }
.tabs { padding: 16rpx; display: flex; flex-wrap: wrap; gap: 16rpx; margin-bottom: 24rpx; }
.tab { padding: 16rpx 24rpx; font-size: 26rpx; color: #64748b; border-radius: 8rpx; }
.tab.active { background: var(--primary-dark); color: var(--text-inverse); }
.list { display: flex; flex-direction: column; gap: 16rpx; }
.row { display: flex; flex-direction: column; gap: 12rpx; }
.item { padding: 24rpx; }
.idx { font-size: 24rpx; color: var(--gray-500); margin-bottom: 8rpx; }
.title { font-size: 30rpx; font-weight: 600; color: var(--gray-900); }
.author { font-size: 24rpx; color: #64748b; margin-top: 8rpx; }
.loading { padding: 24rpx; text-align: center; color: var(--gray-500); }
</style>
