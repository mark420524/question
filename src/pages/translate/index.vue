<template>
  <view class="page-container page">
    <view class="search-bar business-card-rpx">
      <input
        v-model="searchVal"
        class="search-input"
        placeholder="请输入搜索内容"
        @confirm="doSearch"
      />
      <view class="search-btn business-btn-rpx business-btn-primary-rpx" @click="doSearch">搜索</view>
    </view>
    <view v-if="word.word" class="business-card-rpx card-main">
      <view class="word-main">{{ word.word }}</view>
      <view class="info-row"><text class="label">音标：</text><text class="value">{{ word.phonetic || '-' }}</text></view>
      <view class="info-row"><text class="label">标签：</text><text class="value">{{ formatTag(word.tag) }}</text></view>
      <view v-if="word.translation" class="block">
        <view class="block-title">中文释义：</view>
        <view class="block-content">{{ word.translation }}</view>
      </view>
      <view v-if="word.definition" class="block">
        <view class="block-title">英文释义：</view>
        <view class="block-content">{{ word.definition }}</view>
      </view>
      <view v-if="word.exchange" class="block">
        <view class="block-title">词性变化：</view>
        <view class="block-content">{{ formatExchange(word.exchange) }}</view>
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

function formatTag(tag) {
  if (!tag) return '-'
  return tag.replace('zk', '中考').replace('gk', '高考').replace('ky', '考研')
}

function formatExchange(str) {
  if (!str) return ''
  return str.replace('p:', '过去式:').replace('d:', '过去分词:').replace('i:', '现在分词:').replace('3:', '第三人称单数:').replace('r:', '形容词比较级:').replace('t:', '形容词最高级:').replace('s:', '名词复数:')
}

function doSearch() {
  const val = (searchVal.value || '').trim()
  if (!val) return
  uni.showLoading({ title: '查询词典中' })
  api.englishChinese({ word: val }).then((res) => {
    uni.hideLoading()
    if (res) {
      if (res.tag) res.tag = formatTag(res.tag)
      if (res.exchange) res.exchange = formatExchange(res.exchange)
      word.value = res
    } else {
      utils.showWxToast('查无该词')
    }
  }).catch(() => { uni.hideLoading() })
}
</script>

<style scoped>
.page { padding: 24rpx; }
.search-bar { padding: 20rpx; margin-bottom: 24rpx; display: flex; gap: 16rpx; align-items: center; }
.search-input { flex: 1; padding: 20rpx; border: 1rpx solid var(--border); border-radius: 12rpx; font-size: 28rpx; }
.search-btn { padding: 20rpx 32rpx; }
.card-main { padding: 32rpx; }
.word-main { font-size: 48rpx; font-weight: 700; color: var(--primary-dark); margin-bottom: 24rpx; }
.info-row { display: flex; padding: 20rpx 0; border-bottom: 1rpx solid var(--border); }
.info-row .label { color: var(--text-secondary); font-size: 28rpx; width: 160rpx; flex-shrink: 0; }
.info-row .value { flex: 1; font-size: 28rpx; color: var(--gray-900); }
.block { margin-top: 24rpx; padding-top: 24rpx; border-top: 1rpx solid #e2e8f0; }
.block-title { font-size: 28rpx; color: #64748b; margin-bottom: 12rpx; }
.block-content { font-size: 28rpx; color: var(--gray-800); line-height: 1.6; }
.ad-wrap { margin-top: 32rpx; padding: 24rpx; background: #fff; border-radius: 12rpx; text-align: center; color: var(--gray-500); font-size: 26rpx; }
</style>
