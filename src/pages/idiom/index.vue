<template>
  <view class="page-container page">
    <view class="search-bar business-card-rpx">
      <input
        v-model="searchVal"
        class="search-input"
        placeholder="请输入搜索关键词"
        maxlength="12"
        @confirm="doSearch(0)"
      />
      <view class="search-btn business-btn-rpx business-btn-primary-rpx" @click="doSearch(0)">搜索</view>
    </view>
    <view class="list">
      <view v-for="(row, rowIdx) in filteredIdiomList" :key="rowIdx" class="row">
        <view
          v-for="(item, colIdx) in row"
          :key="item.word + colIdx"
          class="item business-card-rpx"
        >
          <view class="word">{{ item.word }}</view>
          <view class="info-row"><text class="label">拼音：</text><text class="val">{{ item.pinyin || '-' }}</text></view>
          <view class="info-row"><text class="label">解释：</text><text class="val">{{ item.explanation || '-' }}</text></view>
          <view class="info-row"><text class="label">例子：</text><text class="val">{{ item.example || '-' }}</text></view>
          <view v-if="item.derivation" class="derivation">出处：{{ item.derivation }}</view>
        </view>
      </view>
    </view>
    <view v-if="loading" class="loading">加载中...</view>
    <view v-if="showAd" class="ad-wrap">广告位</view>
  </view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { onReachBottom } from '@dcloudio/uni-app'
import * as api from '@/service/api'
import * as utils from '@/utils/util'

const searchVal = ref('')
const idiomList = ref([])
const pages = ref(0)
const size = 20
const loading = ref(false)
const showAd = ref(false)

const filteredIdiomList = computed(() => idiomList.value.filter((r) => Array.isArray(r) && r.length))

function doSearch(page, emptyText) {
  const val = (searchVal.value || '').trim()
  if (!val) return
  if (!/[\u4e00-\u9fa5]/.test(val)) {
    utils.showWxToast('请输入汉字')
    return
  }
  if (page !== undefined && page !== pages.value && page > 0) {
    pages.value = page
  } else if (page === 0 && val !== searchVal.value) {
    searchVal.value = val
    pages.value = 0
    idiomList.value = []
  }
  loading.value = true
  api.chineseIdiom({ word: val, page: page ?? pages.value, size }).then((res) => {
    loading.value = false
    if (res && res.length) {
      idiomList.value[page ?? pages.value] = res
      idiomList.value = [...idiomList.value]
      pages.value = page ?? pages.value
    } else if (emptyText) {
      utils.showWxToast(emptyText)
    } else {
      utils.showWxToast('成语未查询到数据')
    }
  }).catch(() => { loading.value = false })
}

onMounted(() => {
  const pages = getCurrentPages()
  const cur = pages[pages.length - 1]
  const options = (cur && cur.options) || {}
  const val = options.val
  if (val) {
    searchVal.value = val
    doSearch(0)
  }
})

onReachBottom(() => {
  doSearch(pages.value + 1, '没有更多数据了')
})
</script>

<style scoped>
.page { padding: 24rpx; }
.search-bar { padding: 20rpx; margin-bottom: 16rpx; display: flex; gap: 16rpx; align-items: center; }
.search-input { flex: 1; padding: 20rpx; border: 1rpx solid #e2e8f0; border-radius: 12rpx; font-size: 28rpx; }
.search-btn { padding: 20rpx 32rpx; }
.row { display: flex; flex-direction: column; gap: 16rpx; margin-bottom: 16rpx; }
.item { padding: 24rpx; }
.word { font-size: 32rpx; font-weight: 700; color: #2563eb; margin-bottom: 16rpx; }
.info-row { font-size: 26rpx; margin-bottom: 8rpx; }
.info-row .label { color: #64748b; }
.info-row .val { color: #1e293b; }
.derivation { font-size: 24rpx; color: #94a3b8; margin-top: 12rpx; }
.loading { padding: 24rpx; text-align: center; color: #94a3b8; }
.ad-wrap { margin-top: 32rpx; padding: 24rpx; background: #fff; border-radius: 12rpx; text-align: center; color: #94a3b8; font-size: 26rpx; }
</style>
