<template>
  <view class="page-container page">
    <!-- 顶部欢迎区域 - 白色商务卡片 -->
    <view class="header-section">
      <view class="welcome-card business-card-rpx">
        <view class="welcome-content">
          <view class="app-title">早晚答</view>
          <view class="app-subtitle">智能学习，高效提升</view>
          <view class="stats-grid">
            <view class="stat-item">
              <view class="stat-icon-wrap">
                <text class="stat-icon">题</text>
              </view>
              <view class="stat-text">
                <view class="stat-value">{{ questionCount }}</view>
                <view class="stat-label">题目总数</view>
              </view>
            </view>
            <view class="stat-item">
              <view class="stat-icon-wrap">
                <text class="stat-icon">库</text>
              </view>
              <view class="stat-text">
                <view class="stat-value stat-value-ellipsis">{{ selectCategory || '未选择' }}</view>
                <view class="stat-label">当前题库</view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 快速操作区域 -->
    <view class="section">
      <view class="business-section-title">快速操作</view>
      <view class="action-grid">
        <view class="action-item business-card-rpx" @click="startAnswer">
          <view class="action-icon-wrap primary">答</view>
          <view class="action-text">开始答题</view>
        </view>
        <view class="action-item business-card-rpx" @click="wrongCollect">
          <view class="action-icon-wrap error">错</view>
          <view class="action-text">错题集</view>
        </view>
        <view class="action-item business-card-rpx" @click="favoriteShow">
          <view class="action-icon-wrap accent">藏</view>
          <view class="action-text">我的收藏</view>
        </view>
        <view class="action-item business-card-rpx" @click="startExam">
          <view class="action-icon-wrap success">考</view>
          <view class="action-text">模拟考试</view>
        </view>
      </view>
    </view>

    <!-- 今日推荐 -->
    <view class="section">
      <view class="business-section-title">今日推荐</view>
      <view class="recommend-card business-card-rpx" @click="todayQuestion">
        <view class="recommend-icon-wrap">每日</view>
        <view class="recommend-content">
          <view class="recommend-title">每日一题</view>
          <view class="recommend-desc">坚持每日练习，提升学习效果</view>
        </view>
        <view class="recommend-arrow">›</view>
      </view>
      <view class="recommend-card business-card-rpx" @click="showExamRank">
        <view class="recommend-icon-wrap">排行</view>
        <view class="recommend-content">
          <view class="recommend-title">排行榜</view>
          <view class="recommend-desc">查看答题排名，挑战自我</view>
        </view>
        <view class="recommend-arrow">›</view>
      </view>
    </view>

    <!-- 工具箱 -->
    <view class="section">
      <view class="business-section-title">工具箱</view>
      <view class="tool-grid">
        <view class="tool-item business-card-rpx" @click="chooseCategory">
          <view class="tool-icon-wrap">题库</view>
          <view class="tool-text">{{ changeCategory }}</view>
        </view>
        <view class="tool-item business-card-rpx" @click="signin">
          <view class="tool-icon-wrap">签到</view>
          <view class="tool-text">每日签到</view>
        </view>
        <view class="tool-item business-card-rpx" @click="go('integral')">
          <view class="tool-icon-wrap">积分</view>
          <view class="tool-text">积分商城</view>
        </view>
        <view class="tool-item business-card-rpx" @click="go('more')">
          <view class="tool-icon-wrap">更多</view>
          <view class="tool-text">更多工具</view>
        </view>
      </view>
    </view>

    <!-- 题库选择器 -->
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
import { ref, onMounted } from 'vue'
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
  /* 使用 App.vue 的 page-container 公共样式 */
}

.header-section {
  margin-bottom: 32rpx;
}

.welcome-card {
  padding: 40rpx;
}

.welcome-content {
  position: relative;
}

.app-title {
  font-size: 36rpx;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 8rpx;
}

.app-subtitle {
  font-size: 28rpx;
  color: #64748b;
  margin-bottom: 32rpx;
}

.stats-grid {
  display: flex;
  gap: 32rpx;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 16rpx;
  flex: 1;
}

.stat-icon-wrap {
  width: 64rpx;
  height: 64rpx;
  border-radius: 12rpx;
  background: #2563eb;
  color: #fff;
  font-size: 24rpx;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.stat-text {
  flex: 1;
  min-width: 0;
}

.stat-value {
  font-size: 28rpx;
  font-weight: 600;
  color: #1e293b;
  line-height: 1.2;
}

.stat-value-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.stat-label {
  font-size: 24rpx;
  color: #64748b;
  line-height: 1.2;
}

.section {
  margin-bottom: 32rpx;
}

.action-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20rpx;
}

.action-item {
  padding: 32rpx 24rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12rpx;
  transition: opacity 0.2s ease;
}

.action-item:active {
  opacity: 0.9;
}

.action-icon-wrap {
  width: 72rpx;
  height: 72rpx;
  border-radius: 16rpx;
  font-size: 28rpx;
  font-weight: 600;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.action-icon-wrap.primary {
  background: #2563eb;
}

.action-icon-wrap.error {
  background: #ef4444;
}

.action-icon-wrap.accent {
  background: #06b6d4;
}

.action-icon-wrap.success {
  background: #10b981;
}

.action-text {
  font-size: 26rpx;
  font-weight: 500;
  color: #1e293b;
  text-align: center;
}

.recommend-card {
  padding: 24rpx;
  margin-bottom: 16rpx;
  display: flex;
  align-items: center;
  gap: 16rpx;
  transition: opacity 0.2s ease;
}

.recommend-card:active {
  opacity: 0.9;
}

.recommend-icon-wrap {
  width: 80rpx;
  height: 80rpx;
  border-radius: 12rpx;
  background: #f1f5f9;
  color: #2563eb;
  font-size: 24rpx;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.recommend-content {
  flex: 1;
  min-width: 0;
}

.recommend-title {
  font-size: 30rpx;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 4rpx;
}

.recommend-desc {
  font-size: 24rpx;
  color: #64748b;
}

.recommend-arrow {
  font-size: 36rpx;
  color: #94a3b8;
  flex-shrink: 0;
}

.tool-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16rpx;
}

.tool-item {
  padding: 24rpx;
  display: flex;
  align-items: center;
  gap: 12rpx;
  transition: opacity 0.2s ease;
}

.tool-item:active {
  opacity: 0.9;
}

.tool-icon-wrap {
  width: 64rpx;
  height: 64rpx;
  border-radius: 12rpx;
  background: #e2e8f0;
  color: #475569;
  font-size: 22rpx;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.tool-text {
  font-size: 26rpx;
  font-weight: 500;
  color: #1e293b;
  flex: 1;
}
</style>
