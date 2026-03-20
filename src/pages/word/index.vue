<template>
  <view class="page-container page">
    <view class="search-bar business-card-rpx">
      <input
        v-model="searchVal"
        class="search-input"
        placeholder="请输入一个汉字"
        maxlength="1"
        @confirm="doSearch"
      />
      <view class="search-btn business-btn-rpx business-btn-primary-rpx" @click="doSearch">搜索</view>
    </view>
    <view v-if="word.word" class="business-card-rpx card-main">
      <view class="word-main">{{ word.word }}</view>
      <view class="info-row"><text class="label">拼音：</text><text class="value">{{ word.pinyin || '-' }}</text></view>
      <view class="info-row"><text class="label">笔画：</text><text class="value">{{ word.strokes || '-' }}</text></view>
      <view class="info-row"><text class="label">部首：</text><text class="value">{{ word.radicals || '-' }}</text></view>
      <view class="info-row"><text class="label">繁体：</text><text class="value">{{ word.oldword || '-' }}</text></view>
      <view class="info-row"><text class="label">五笔：</text><text class="value">{{ word.wubi || '-' }}</text></view>
      <view class="info-row link" @click="viewIdiom">
        <text class="label">相关成语</text>
        <text class="value">查看 ›</text>
      </view>
      <view v-if="word.explanation" class="collapse">
        <view class="collapse-title">解析：</view>
        <view class="collapse-content">{{ word.explanation }}</view>
      </view>
    </view>
    <view v-if="showAd" class="ad-wrap">广告位</view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import * as api from '@/service/api'
import * as utils from '@/utils/util'

const searchVal = ref('')
const word = ref({})
const showAd = ref(false)

function doSearch() {
  const val = (searchVal.value || '').trim()
  if (!val) return
  const re = /[\u4e00-\u9fa5]/
  if (!re.test(val)) {
    utils.showWxToast('请输入一个汉字喔！')
    return
  }
  uni.showLoading({ title: '查询词典中' })
  api.chineseWord({ word: val }).then((res) => {
    uni.hideLoading()
    if (res && res.word) {
      word.value = res
    } else {
      utils.showWxToast('查无数据')
    }
  }).catch(() => { uni.hideLoading() })
}

function viewIdiom() {
  if (searchVal.value) {
    uni.navigateTo({ url: '/pages/idiom/index?val=' + encodeURIComponent(searchVal.value) })
  }
}
</script>

<style scoped>
.page { padding: 24rpx; }
.search-bar { padding: 20rpx; margin-bottom: 24rpx; display: flex; gap: 16rpx; align-items: center; }
.search-input { flex: 1; padding: 20rpx; border: 1rpx solid #e2e8f0; border-radius: 12rpx; font-size: 28rpx; }
.search-btn { padding: 20rpx 32rpx; }
.card-main { padding: 32rpx; }
.word-main { font-size: 64rpx; font-weight: 700; color: #2563eb; text-align: center; margin-bottom: 24rpx; }
.info-row { display: flex; padding: 20rpx 0; border-bottom: 1rpx solid #e2e8f0; }
.info-row .label { color: #64748b; font-size: 28rpx; width: 140rpx; flex-shrink: 0; }
.info-row .value { flex: 1; font-size: 28rpx; color: #1e293b; }
.info-row.link:active { opacity: 0.8; }
.collapse { margin-top: 24rpx; padding-top: 24rpx; border-top: 1rpx solid #e2e8f0; }
.collapse-title { font-size: 28rpx; color: #64748b; margin-bottom: 12rpx; }
.collapse-content { font-size: 28rpx; color: #334155; line-height: 1.6; }
.ad-wrap { margin-top: 32rpx; padding: 24rpx; background: #fff; border-radius: 12rpx; text-align: center; color: #94a3b8; font-size: 26rpx; }
</style>
