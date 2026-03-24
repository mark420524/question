<template>
  <view class="page">
    <AppHeader title="早晚答" />

    <view class="hero card">
      <view class="hero-left">
        <text class="hero-title">今日学习</text>
        <text class="hero-sub">{{ selectCategory || '未选择题库' }}</text>
      </view>
      <view class="hero-right">
        <text class="count">{{ questionCount }}</text>
        <text class="count-label">题目</text>
      </view>
    </view>

    <view class="start-area">
      <button class="btn btn-primary btn-xl start-cta" @click="startAnswer">开始答题</button>
      <text class="hint">快速进入答题，保持学习节奏</text>
    </view>

    <view class="quick-row">
      <view class="quick-item" @click="wrongCollect">
        <view class="quick-icon">🔥</view>
        <text class="quick-label">错题本</text>
      </view>
      <view class="quick-item" @click="favoriteShow">
        <view class="quick-icon">💖</view>
        <text class="quick-label">收藏夹</text>
      </view>
      <view class="quick-item" @click="startExam">
        <view class="quick-icon">🏆</view>
        <text class="quick-label">模拟考</text>
      </view>
      <view class="quick-item" @click="todayQuestion">
        <view class="quick-icon">📅</view>
        <text class="quick-label">每日题</text>
      </view>
    </view>

    <view class="tools card">
      <view class="tools-grid">
        <view class="tool" @click="chooseCategory">
          <view class="tool-ico">📚</view>
          <view class="tool-meta">
            <text class="tool-name">{{ changeCategory }}</text>
            <text class="tool-desc">选择学习内容</text>
          </view>
        </view>

        <view class="tool" @click="signin">
          <view class="tool-ico">📝</view>
          <view class="tool-meta">
            <text class="tool-name">每日签到</text>
            <text class="tool-desc">坚持学习习惯</text>
          </view>
        </view>

        <view class="tool" @click="go('integral')">
          <view class="tool-ico">💎</view>
          <view class="tool-meta">
            <text class="tool-name">积分商城</text>
            <text class="tool-desc">兑换学习奖励</text>
          </view>
        </view>

        <view class="tool" @click="showExamRank">
          <view class="tool-ico">📊</view>
          <view class="tool-meta">
            <text class="tool-name">学习排行</text>
            <text class="tool-desc">查看学习进度</text>
          </view>
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
import { ref, onMounted, computed } from 'vue'
import CategorySelector from '@/components/CategorySelector.vue'
import * as api from '@/service/api'
import * as utils from '@/utils/util'
import AppHeader from '@/components/AppHeader.vue'
const questionCount = ref(0)
const changeCategory = ref('切换题库')
const selectCategory = ref('')
const selectorVisible = ref(false)
const selectorIndex = ref([0, 0, 0])
const menuData = ref([])

// 主题支持
const themeOptions = ['默认', '暗色', '海洋']
const themeIds = ['', 'theme-dark', 'theme-ocean']
const currentTheme = ref((typeof uni !== 'undefined' && uni.getStorageSync && uni.getStorageSync('appTheme')) || '')
const currentThemeLabel = computed(() => {
  const idx = themeIds.indexOf(currentTheme.value)
  return themeOptions[idx === -1 ? 0 : idx]
})

function applyTheme(t) {
  currentTheme.value = t || ''
  try {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.remove('theme-dark', 'theme-ocean')
      if (t) document.documentElement.classList.add(t)
    }
  } catch (e) {}
  if (typeof uni !== 'undefined' && uni.setStorageSync) uni.setStorageSync('appTheme', t)
}

function onThemePickerChange(e) {
  const idx = parseInt(e.detail.value, 10) || 0
  const id = themeIds[idx] || ''
  applyTheme(id)
}

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
  if (cid) initQuestionCount(cid)

  initPageData()
  initNotice()
  initShowAd()
  applyTheme(currentTheme.value)
}

function initPageData() { api.getQuestionMenu(0).then((res) => { menuData.value = Array.isArray(res) ? res : [] }) }

function initQuestionCount(cid) { if (!cid) return; api.getQuestionCount({ cid }).then((res) => { questionCount.value = res || 0 }) }

function chooseCategory() { selectorVisible.value = true }

function onSelectorConfirm({ detail }) {
  selectorVisible.value = false
  const [first, second, third] = detail || [0, 0, 0]
  const firstItem = menuData.value[first]
  const secondItem = firstItem?.children?.[second]
  const thirdItem = secondItem?.children?.[third]
  const cid = thirdItem?.id || secondItem?.id || firstItem?.id
  const categoryName = [firstItem?.name, secondItem?.name, thirdItem?.name].filter(Boolean).join('>')
  selectCategory.value = categoryName
  changeCategory.value = '切换题库'
  uni.setStorageSync('selectCategory', categoryName)
  if (cid) { uni.setStorageSync('cid', cid); initQuestionCount(cid) }
}

const TAB_ROOTS = new Set(['search', 'more', 'my'])

function go(path, params = '') { const base = `/pages/${path}/index`; const url = params ? `${base}?${params}` : base; if (TAB_ROOTS.has(path) && !params) { uni.switchTab({ url: base }); return } uni.navigateTo({ url }) }

function startAnswer() { goQuestion(1) }

function goQuestion(type) { const cid = uni.getStorageSync('cid'); if (!cid) { utils.showWxToast('暂未选择题库，请先选择。'); return } if (questionCount.value === 0) { utils.showWxToast('题库题数量为0，请切换题库。'); return } utils.setAnswerType(type); if (type === 4) go('confirm'); else if (type === 3) go('favorite'); else if (type === 2) go('wrong'); else go('question') }

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

function signin() { go('signin') }
function showExamRank() { go('rank') }
function todayQuestion() { go('share', 'type=6&show=0&qid=1') }

function initNotice() { const uid = utils.getUserId(); api.getNotifyInfo({ uid }).then((res) => { if (!res) return; const currentIndex = utils.getNotifyIndex(); const newIndex = res.id; if (!res.stopService && !res.forbidden && currentIndex >= newIndex) return; utils.setNotifyIndex(newIndex); uni.showModal({ title: res.title || '通知', content: res.message || '', showCancel: Boolean(!res.stopService && !res.forbidden), success: () => {} }) }) }

function initShowAd() { const uid = utils.getUserId(); api.initShowAd({ uid }).then((res) => { utils.setShowAd(res || 0) }) }

onMounted(() => { init() })

function onShareAppMessage() { return { title: '亲爱的，来这里答题喽', path: '/pages/index/index' } }
</script>

<style scoped>
.page { padding: var(--space-6); background: var(--bg-primary); min-height: 100vh }
.header {
  height: var(--header-height);
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(90deg, rgba(59,130,246,0.06), rgba(59,130,246,0.02));
  padding: 0 var(--space-4);
  border-bottom: var(--border-width) solid rgba(59,130,246,0.08);
}
.title { font-size: var(--font-size-xl); font-weight: var(--font-weight-semibold); color: var(--primary) }
.header-actions { display:flex; align-items:center; gap: var(--space-4) }
.theme-text { color: var(--text-secondary); font-size: var(--font-size-sm) }
.hero { display:flex; align-items:center; justify-content:space-between; padding: var(--space-5); margin-top: var(--space-4); border-radius: var(--radius-lg) }
.hero-left { display:flex; flex-direction:column }
.hero-title { font-size: var(--font-size-lg); color: var(--text-primary); font-weight: var(--font-weight-semibold) }
.hero-sub { color: var(--text-muted); margin-top: var(--space-1) }
.hero-right { text-align:right }
.count { font-size: var(--font-size-3xl); color: var(--primary); font-weight: var(--font-weight-bold) }
.count-label { font-size: var(--font-size-sm); color: var(--text-muted) }
.start-area { margin-top: var(--space-6); display:flex; flex-direction:column; gap: var(--space-2); align-items:center }
.start-cta {
  width: 90%;
  border-radius: var(--radius-full);
  box-shadow: 0 8rpx 20rpx rgba(59,130,246,0.12);
  background: linear-gradient(180deg, var(--primary-light), var(--primary));
  color: var(--text-inverse);
  border: 0;
  padding: var(--space-4) 0;
  font-weight: var(--font-weight-bold);
}
.start-cta:active { transform: translateY(2rpx); box-shadow: 0 4rpx 12rpx rgba(59,130,246,0.10) }

/* CTA 微动画与副作用 */
@keyframes cta-pulse {
  0% { box-shadow: 0 8rpx 20rpx rgba(59,130,246,0.12); transform: translateY(0) }
  50% { box-shadow: 0 12rpx 28rpx rgba(59,130,246,0.10); transform: translateY(-2rpx) }
  100% { box-shadow: 0 8rpx 20rpx rgba(59,130,246,0.12); transform: translateY(0) }
}

.start-cta.idle-animate { animation: cta-pulse 3s ease-in-out infinite; }

.start-cta:focus { outline: none; box-shadow: 0 10rpx 24rpx rgba(59,130,246,0.12) }
.hint { color: var(--text-secondary); font-size: var(--font-size-sm) }
.quick-row { display:flex; justify-content:space-between; margin-top: var(--space-5) }
.quick-item { flex:1; text-align:center; padding: var(--space-4) }
.quick-icon { font-size: var(--font-size-3xl) }
.quick-label { display:block; margin-top: var(--space-2); color: var(--text-secondary) }
.tools { margin-top: var(--space-6); padding: var(--space-4) }
.tools-grid { display:grid; grid-template-columns: repeat(2,1fr); gap: var(--space-4) }
.tool { display:flex; gap: var(--space-3); align-items:center; padding: var(--space-3); border-radius: var(--radius); background: var(--bg-primary) }
.tool-ico { width:64rpx; height:64rpx; display:flex; align-items:center; justify-content:center; background: var(--bg-tertiary); border-radius: var(--radius) }
.tool-name { font-size: var(--font-size-base); color: var(--text-primary) }
.tool-desc { font-size: var(--font-size-sm); color: var(--text-muted) }
@media (min-width: 750rpx) {
  .start-cta { width: 560rpx }
  .tools-grid { grid-template-columns: repeat(4,1fr) }
}
</style>
