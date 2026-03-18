<template>
  <view class="page">
    <view class="page__header">
      <text class="title">欢迎来到商务题库</text>
      <text class="subtitle">当前选择题库：{{ selectCategory || '暂无' }}</text>
      <text class="subtitle">题目总数：{{ questionCount }}</text>
    </view>

    <business-card title="今日推荐" :bordered="false">
      <view class="card-content">
        <text>欢迎使用新版 uni-app 迁移版，后续可替换为题目列表、热题推荐等。</text>
      </view>
    </business-card>

    <view class="section">
      <text class="section-title">快速入口</text>
      <view class="grid">
        <view class="grid-item" @click="startAnswer">
          <text>开始答题</text>
        </view>
        <view class="grid-item" @click="wrongCollect">
          <text>错题</text>
        </view>
        <view class="grid-item" @click="favoriteShow">
          <text>收藏</text>
        </view>
        <view class="grid-item" @click="startExam">
          <text>模拟考试</text>
        </view>
      </view>
    </view>

    <view class="section">
      <view class="category-row" @click="chooseCategory">
        <text class="category-label">题库选择</text>
        <text class="category-value">{{ changeCategory }}</text>
      </view>
      <view class="button-row">
        <u-button type="primary" size="small" @click="todayQuestion">每日一题</u-button>
        <u-button type="default" size="small" @click="showExamRank">排名</u-button>
        <u-button type="default" size="small" @click="signin">签到</u-button>
      </view>
    </view>

    <CategorySelector
      :visible="selectorVisible"
      :data="menuData"
      :value="selectorIndex"
      @cancel="selectorVisible = false"
      @confirm="onSelectorConfirm"
    />
  </view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import BusinessCard from '@/components/business/Card.vue'
import CategorySelector from '@/components/CategorySelector.vue'
import * as api from '@/service/api'
import * as utils from '@/utils/util'

const questionCount = ref(0)
const changeCategory = ref('切换题库')
const selectCategory = ref('')
const selectorVisible = ref(false)
const selectorIndex = ref([0, 0, 0])
const menuData = ref([])

function init() {
  const storedCat = uni.getStorageSync('selectCategory')
  if (storedCat) {
    selectCategory.value = storedCat
    changeCategory.value = '切换题库'
  } else {
    selectCategory.value = '暂无'
    changeCategory.value = '选择题库'
  }

  const cid = utils.getAnswerCid()
  if (cid) {
    initQuestionCount(cid)
  }

  initPageData()
  initNotice()
  initShowAd()
}

function initPageData() {
  api.getQuestionMenu(0).then((res) => {
    menuData.value = Array.isArray(res) ? res : []
  })
}

function initQuestionCount(cid) {
  if (!cid) return
  api.getQuestionCount({ cid }).then((res) => {
    questionCount.value = res || 0
  })
}

function chooseCategory() {
  selectorVisible.value = true
}

function onSelectorConfirm({ detail }) {
  selectorVisible.value = false
  const [first, second, third] = detail || [0, 0, 0]
  const firstItem = menuData.value[first]
  const secondItem = firstItem?.children?.[second]
  const thirdItem = secondItem?.children?.[third]

  const cid = thirdItem?.id || secondItem?.id || firstItem?.id
  const categoryName = [firstItem?.name, secondItem?.name, thirdItem?.name]
    .filter(Boolean)
    .join('>')

  selectCategory.value = categoryName
  changeCategory.value = '切换题库'
  uni.setStorageSync('selectCategory', categoryName)
  if (cid) {
    uni.setStorageSync('cid', cid)
    initQuestionCount(cid)
  }
}

function go(path, params = '') {
  const url = params ? `/pages/${path}/index?${params}` : `/pages/${path}/index`
  uni.navigateTo({ url })
}

function startAnswer() {
  goQuestion(1)
 }

function goQuestion(type) {
  const cid = uni.getStorageSync('cid')
  if (!cid) {
    utils.showWxToast('暂未选择题库，请先选择。')
    return
  }
  if (questionCount.value === 0) {
    utils.showWxToast('题库题数量为0，请切换题库。')
    return
  }
  utils.setAnswerType(type)
  if (type === 4) {
    go('confirm')
  } else if (type === 3) {
    go('favorite')
  } else if (type === 2) {
    go('wrong')
  } else {
    go('question')
  }
}

function wrongCollect() {
  goQuestion(2)
}

function favoriteShow() {
  goQuestion(3)
}

function startExam() {
  const userInfo = uni.getStorageSync('userInfo')
  if (userInfo) {
    goQuestion(4)
    return
  }
  uni.showModal({
    title: '温馨提示',
    content: '模拟考试需要完善资料，完善资料后可以使用答题排名同步信息等功能',
    success(res) {
      if (res.confirm) {
        go('my/profile')
      } else {
        uni.showToast({ title: '您拒绝了请求,不能正常使用小程序', icon: 'none' })
      }
    }
  })
}

function signin() {
  go('signin')
}

function showExamRank() {
  go('rank')
}

function todayQuestion() {
  go('share', 'type=6&show=0&qid=1')
}

function initNotice() {
  const uid = utils.getUserId()
  api.getNotifyInfo({ uid }).then((res) => {
    if (!res) return
    const currentIndex = utils.getNotifyIndex()
    const newIndex = res.id
    if (!res.stopService && !res.forbidden && currentIndex >= newIndex) {
      return
    }
    utils.setNotifyIndex(newIndex)
    uni.showModal({
      title: res.title || '通知',
      content: res.message || '',
      showCancel: Boolean(!res.stopService && !res.forbidden),
      success: () => {}
    })
  })
}

function initShowAd() {
  const uid = utils.getUserId()
  api.initShowAd({ uid }).then((res) => {
    utils.setShowAd(res || 0)
  })
}

onMounted(() => {
  init()
})

function onShareAppMessage() {
  return {
    title: '亲爱的，来这里答题喽',
    path: '/pages/index/index'
  }
}
</script>

<style scoped>
.page {
  padding: 24rpx;
}

.page__header {
  margin-bottom: 24rpx;
}

.title {
  font-size: 32rpx;
  font-weight: bold;
  color: #1c6ef2;
}

.section {
  margin-top: 24rpx;
}

.section-title {
  font-size: 28rpx;
  font-weight: 600;
  margin-bottom: 16rpx;
}

.grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16rpx;
}

.grid-item {
  width: calc(50% - 8rpx);
  height: 120rpx;
  border-radius: 16rpx;
  background: #ffffff;
  box-shadow: 0 4rpx 14rpx rgba(0, 0, 0, 0.06);
  align-items: center;
  justify-content: center;
  display: flex;
}

.grid-item text {
  font-size: 26rpx;
  color: #333333;
}
</style>
