<template>
  <view class="page-container page home-page">
    <view class="hero">
      <view class="hero-glow" />
      <view class="hero-inner">
        <view class="hero-badge">
          <view class="hero-badge-dot" />
          <text class="hero-badge-text">轻量学习 · 随时开练</text>
        </view>
        <view class="hero-title-row">
          <text class="hero-title">早晚答</text>
        </view>
        <text class="hero-desc">用碎片时间完成一次高质量练习，进度与题库一目了然。</text>
        <view class="hero-stats">
          <view class="hero-stat">
            <text class="hero-stat-value">{{ questionCount }}</text>
            <text class="hero-stat-label">题目总数</text>
          </view>
          <view class="hero-stat-divider" />
          <view class="hero-stat hero-stat-wide">
            <text class="hero-stat-value hero-stat-ellipsis">{{ selectCategory || '未选择题库' }}</text>
            <text class="hero-stat-label">当前题库</text>
          </view>
        </view>
        <view class="hero-cta" @click="startAnswer">
          <view class="hero-cta-main">
            <text class="hero-cta-text">开始答题</text>
            <text class="hero-cta-hint">基于已选题库</text>
          </view>
          <text class="hero-cta-arrow">→</text>
        </view>
      </view>
    </view>

    <view class="sheet">
      <view class="section-head">
        <text class="section-eyebrow">学习中心</text>
        <text class="section-title">快捷入口</text>
        <text class="section-lead">刷题、复盘与测验，保持节奏感。</text>
      </view>
      <view class="action-grid">
        <view class="action-tile" @click="startAnswer">
          <view class="action-tile-icon action-tile-icon--sky">答</view>
          <view class="action-tile-body">
            <text class="action-tile-name">开始答题</text>
            <text class="action-tile-hint">当前题库练习</text>
          </view>
        </view>
        <view class="action-tile" @click="wrongCollect">
          <view class="action-tile-icon action-tile-icon--rose">错</view>
          <view class="action-tile-body">
            <text class="action-tile-name">错题集</text>
            <text class="action-tile-hint">集中突破弱项</text>
          </view>
        </view>
        <view class="action-tile" @click="favoriteShow">
          <view class="action-tile-icon action-tile-icon--violet">藏</view>
          <view class="action-tile-body">
            <text class="action-tile-name">我的收藏</text>
            <text class="action-tile-hint">重点随时复习</text>
          </view>
        </view>
        <view class="action-tile" @click="startExam">
          <view class="action-tile-icon action-tile-icon--jade">考</view>
          <view class="action-tile-body">
            <text class="action-tile-name">模拟考试</text>
            <text class="action-tile-hint">限时自测检验</text>
          </view>
        </view>
      </view>

      <view class="section-head section-head--spaced">
        <text class="section-eyebrow">每日挑战</text>
        <text class="section-title">坚持与反馈</text>
        <text class="section-lead">小目标叠加，更容易养成习惯。</text>
      </view>
      <view class="list-card">
        <view class="list-row" @click="todayQuestion">
          <view class="list-row-icon list-row-icon--amber">日</view>
          <view class="list-row-main">
            <text class="list-row-title">每日一题</text>
            <text class="list-row-sub">固定节奏，保持题感</text>
          </view>
          <text class="list-row-chev">›</text>
        </view>
        <view class="list-divider" />
        <view class="list-row" @click="showExamRank">
          <view class="list-row-icon list-row-icon--violet">榜</view>
          <view class="list-row-main">
            <text class="list-row-title">排行榜</text>
            <text class="list-row-sub">了解名次与差距</text>
          </view>
          <text class="list-row-chev">›</text>
        </view>
      </view>

      <view class="section-head section-head--spaced">
        <text class="section-eyebrow">扩展能力</text>
        <text class="section-title">常用工具</text>
        <text class="section-lead">题库、签到与积分，一站整理。</text>
      </view>
      <view class="tool-list">
        <view class="tool-row" @click="chooseCategory">
          <view class="tool-row-left">
            <view class="tool-mark tool-mark--slate">库</view>
            <view class="tool-row-texts">
              <text class="tool-row-title">{{ changeCategory }}</text>
              <text class="tool-row-sub">选择题库与分类</text>
            </view>
          </view>
          <text class="tool-row-chev">›</text>
        </view>
        <view class="tool-row" @click="signin">
          <view class="tool-row-left">
            <view class="tool-mark tool-mark--amber">签</view>
            <view class="tool-row-texts">
              <text class="tool-row-title">每日签到</text>
              <text class="tool-row-sub">连续签到享权益</text>
            </view>
          </view>
          <text class="tool-row-chev">›</text>
        </view>
        <view class="tool-row" @click="go('integral')">
          <view class="tool-row-left">
            <view class="tool-mark tool-mark--rose">分</view>
            <view class="tool-row-texts">
              <text class="tool-row-title">积分商城</text>
              <text class="tool-row-sub">兑换与活动入口</text>
            </view>
          </view>
          <text class="tool-row-chev">›</text>
        </view>
        <view class="tool-row tool-row--last" @click="go('more')">
          <view class="tool-row-left">
            <view class="tool-mark tool-mark--teal">具</view>
            <view class="tool-row-texts">
              <text class="tool-row-title">更多工具</text>
              <text class="tool-row-sub">翻译、诗词、导出等</text>
            </view>
          </view>
          <text class="tool-row-chev">›</text>
        </view>
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

const TAB_ROOTS = new Set(['search', 'more', 'my'])

function go(path, params = '') {
  const base = `/pages/${path}/index`
  const url = params ? `${base}?${params}` : base
  if (TAB_ROOTS.has(path) && !params) {
    uni.switchTab({ url: base })
    return
  }
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
/* 首页设计变量：墨青主色 + 暖灰画布 + 琥珀点缀（与导航栏 / Tab 选中色一致） */
.home-page {
  --home-ink: #12151c;
  --home-ink-soft: #3d4556;
  --home-muted: #6b7380;
  --home-line: rgba(18, 21, 28, 0.08);
  --home-canvas: #eef0f4;
  --home-surface: #ffffff;
  --home-hero-0: #0a3d56;
  --home-hero-1: #0c4a6e;
  --home-hero-2: #155e75;
  --home-accent: #d97706;
  --home-cta-fg: #0c4a6e;
  --home-font: 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei UI', 'Microsoft YaHei', -apple-system,
    BlinkMacSystemFont, sans-serif;
  --home-radius-lg: 28rpx;
  --home-radius-md: 22rpx;
  --home-shadow: 0 8rpx 32rpx rgba(10, 35, 50, 0.08);
  --home-shadow-soft: 0 2rpx 12rpx rgba(18, 21, 28, 0.06);
  font-family: var(--home-font);
}

.home-page.page-container {
  padding: 0;
  padding-bottom: 120rpx;
  background: var(--home-canvas);
}

.hero {
  position: relative;
  overflow: hidden;
  padding: 36rpx 36rpx 52rpx;
  background: linear-gradient(155deg, var(--home-hero-0) 0%, var(--home-hero-1) 38%, var(--home-hero-2) 100%);
  border-radius: 0 0 36rpx 36rpx;
  box-shadow: var(--home-shadow);
}

.hero-glow {
  position: absolute;
  width: 420rpx;
  height: 420rpx;
  right: -140rpx;
  top: -160rpx;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.14) 0%, transparent 68%);
  pointer-events: none;
}

.hero-inner {
  position: relative;
  z-index: 1;
  max-width: 100%;
}

.hero-badge {
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  gap: 12rpx;
  padding: 10rpx 22rpx 10rpx 18rpx;
  margin-bottom: 28rpx;
  background: rgba(255, 255, 255, 0.12);
  border: 1rpx solid rgba(255, 255, 255, 0.22);
  border-radius: 999rpx;
}

.hero-badge-dot {
  width: 12rpx;
  height: 12rpx;
  border-radius: 50%;
  background: #fbbf24;
  box-shadow: 0 0 0 6rpx rgba(251, 191, 36, 0.25);
}

.hero-badge-text {
  font-size: 22rpx;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.92);
  letter-spacing: 1rpx;
}

.hero-title-row {
  margin-bottom: 16rpx;
}

.hero-title {
  font-size: 56rpx;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: 2rpx;
  line-height: 1.12;
}

.hero-desc {
  display: block;
  font-size: 28rpx;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.82);
  line-height: 1.65;
  letter-spacing: 0.5rpx;
  margin-bottom: 36rpx;
  max-width: 620rpx;
}

.hero-stats {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  padding: 26rpx 28rpx;
  margin-bottom: 28rpx;
  background: rgba(255, 255, 255, 0.11);
  border: 1rpx solid rgba(255, 255, 255, 0.2);
  border-radius: var(--home-radius-md);
}

.hero-stat {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 0;
}

.hero-stat-wide {
  flex: 1.35;
}

.hero-stat-value {
  font-size: 36rpx;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  color: #ffffff;
  line-height: 1.15;
  letter-spacing: 0.5rpx;
}

.hero-stat-ellipsis {
  display: block;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.hero-stat-label {
  margin-top: 10rpx;
  font-size: 24rpx;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.68);
  letter-spacing: 0.5rpx;
}

.hero-stat-divider {
  width: 1rpx;
  background: rgba(255, 255, 255, 0.22);
  margin: 0 22rpx;
  align-self: stretch;
}

.hero-cta {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 26rpx 30rpx;
  background: linear-gradient(180deg, #fffef9 0%, #fff7ed 100%);
  border-radius: var(--home-radius-md);
  border: 1rpx solid rgba(255, 255, 255, 0.65);
  box-shadow: 0 16rpx 40rpx rgba(0, 0, 0, 0.12);
}

.hero-cta:active {
  opacity: 0.94;
}

.hero-cta-main {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6rpx;
  flex: 1;
  min-width: 0;
}

.hero-cta-text {
  font-size: 32rpx;
  font-weight: 700;
  color: var(--home-cta-fg);
  letter-spacing: 1rpx;
}

.hero-cta-hint {
  font-size: 22rpx;
  font-weight: 400;
  color: #64748b;
  letter-spacing: 0.5rpx;
}

.hero-cta-arrow {
  font-size: 36rpx;
  font-weight: 500;
  color: var(--home-accent);
  flex-shrink: 0;
  margin-left: 16rpx;
}

.sheet {
  margin-top: -32rpx;
  padding: 44rpx 28rpx 40rpx;
  position: relative;
  z-index: 2;
  background: var(--home-canvas);
  border-radius: 36rpx 36rpx 0 0;
  box-shadow: 0 -12rpx 36rpx rgba(10, 35, 50, 0.05);
}

.section-head {
  margin-bottom: 24rpx;
  padding-bottom: 8rpx;
  border-bottom: 1rpx solid var(--home-line);
}

.section-head--spaced {
  margin-top: 48rpx;
}

.section-eyebrow {
  display: block;
  font-size: 22rpx;
  font-weight: 600;
  color: #0e7490;
  letter-spacing: 2rpx;
  margin-bottom: 10rpx;
}

.section-title {
  display: block;
  font-size: 36rpx;
  font-weight: 700;
  color: var(--home-ink);
  letter-spacing: 1rpx;
  line-height: 1.25;
  margin-bottom: 12rpx;
}

.section-lead {
  display: block;
  font-size: 26rpx;
  font-weight: 400;
  color: var(--home-muted);
  line-height: 1.55;
  letter-spacing: 0.5rpx;
}

.action-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20rpx;
}

.action-tile {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 22rpx;
  padding: 26rpx 22rpx;
  background: var(--home-surface);
  border-radius: var(--home-radius-lg);
  border: 1rpx solid var(--home-line);
  box-shadow: var(--home-shadow-soft);
}

.action-tile:active {
  opacity: 0.88;
}

.action-tile-icon {
  width: 80rpx;
  height: 80rpx;
  border-radius: 22rpx;
  font-size: 32rpx;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.action-tile-icon--sky {
  background: #e0f2fe;
  color: #0369a1;
}

.action-tile-icon--rose {
  background: #ffe4e6;
  color: #be123c;
}

.action-tile-icon--violet {
  background: #ede9fe;
  color: #5b21b6;
}

.action-tile-icon--jade {
  background: #ccfbf1;
  color: #0f766e;
}

.action-tile-body {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 8rpx;
}

.action-tile-name {
  font-size: 28rpx;
  font-weight: 600;
  color: var(--home-ink);
  letter-spacing: 0.5rpx;
}

.action-tile-hint {
  font-size: 22rpx;
  font-weight: 400;
  color: var(--home-muted);
  line-height: 1.4;
}

.list-card {
  background: var(--home-surface);
  border-radius: var(--home-radius-lg);
  border: 1rpx solid var(--home-line);
  box-shadow: var(--home-shadow-soft);
  overflow: hidden;
}

.list-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 22rpx;
  padding: 28rpx 26rpx;
}

.list-row:active {
  background: #f8fafc;
}

.list-divider {
  height: 1rpx;
  background: rgba(18, 21, 28, 0.06);
  margin-left: 112rpx;
}

.list-row-icon {
  width: 72rpx;
  height: 72rpx;
  border-radius: 20rpx;
  font-size: 30rpx;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.list-row-icon--amber {
  background: #fef3c7;
  color: #b45309;
}

.list-row-icon--violet {
  background: #ede9fe;
  color: #6d28d9;
}

.list-row-main {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 8rpx;
}

.list-row-title {
  font-size: 30rpx;
  font-weight: 600;
  color: var(--home-ink);
  letter-spacing: 0.5rpx;
}

.list-row-sub {
  font-size: 24rpx;
  font-weight: 400;
  color: var(--home-muted);
  line-height: 1.45;
}

.list-row-chev {
  font-size: 34rpx;
  color: #c4cad4;
  flex-shrink: 0;
  font-weight: 300;
}

.tool-list {
  background: var(--home-surface);
  border-radius: var(--home-radius-lg);
  border: 1rpx solid var(--home-line);
  box-shadow: var(--home-shadow-soft);
  overflow: hidden;
}

.tool-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 26rpx 24rpx;
  border-bottom: 1rpx solid rgba(18, 21, 28, 0.06);
}

.tool-row--last {
  border-bottom: none;
}

.tool-row:active {
  background: #f8fafc;
}

.tool-row-left {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 22rpx;
  flex: 1;
  min-width: 0;
}

.tool-mark {
  width: 64rpx;
  height: 64rpx;
  border-radius: 18rpx;
  font-size: 26rpx;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.tool-mark--slate {
  background: #f1f5f9;
  color: #475569;
}

.tool-mark--amber {
  background: #fffbeb;
  color: #b45309;
}

.tool-mark--rose {
  background: #fff1f2;
  color: #be123c;
}

.tool-mark--teal {
  background: #ccfbf1;
  color: #0f766e;
}

.tool-row-texts {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 8rpx;
}

.tool-row-title {
  font-size: 28rpx;
  font-weight: 600;
  color: var(--home-ink);
  letter-spacing: 0.5rpx;
}

.tool-row-sub {
  font-size: 24rpx;
  font-weight: 400;
  color: var(--home-muted);
  line-height: 1.45;
}

.tool-row-chev {
  font-size: 30rpx;
  color: #c4cad4;
  margin-left: 16rpx;
  flex-shrink: 0;
  font-weight: 300;
}
</style>
