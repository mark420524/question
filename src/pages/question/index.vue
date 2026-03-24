<template>
  <view class="page-container tab-page question-page">
    <AppHeader title="题库" />
    <view class="sub-intro">
      <text class="sub-eyebrow">练习</text>
      <text class="sub-title">刷题模式</text>
      <text class="sub-lead">按当前题库顺序练习，可随时上一题 / 下一题切换。</text>
    </view>

    <view class="stat-bar">
      <text v-if="questionCount" class="stat-bar-text">共 {{ questionCount }} 题</text>
      <text v-else class="stat-bar-text stat-bar-text--muted">加载题目中</text>
    </view>

    <view v-if="loading" class="state-loading">加载中...</view>

    <view v-else class="q-card">
      <view class="q-badge-row">
        <text class="q-badge">第 {{ currentIndex + 1 }} 题</text>
        <text v-if="questionCount" class="q-badge-sub">/ {{ questionCount }}</text>
      </view>
      <text class="q-body">{{ currentQuestion?.content || '暂无题目' }}</text>

      <view class="q-options">
        <view
          v-for="(option, idx) in currentQuestion?.options || []"
          :key="idx"
          class="q-option"
          :class="{ 'q-option--on': selectedOption === idx, 'q-option--ok': isCorrect(idx) }"
          @click="selectOption(idx)"
        >
          <text class="q-opt-label">{{ option.label }}.</text>
          <text class="q-opt-text">{{ option.text }}</text>
        </view>
      </view>

      <view class="q-actions">
        <view class="q-btn q-btn--ghost" @click="prevQuestion">上一题</view>
        <view class="q-btn q-btn--primary" @click="nextQuestion">下一题</view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import * as api from '@/service/api'
import * as utils from '@/utils/util'
import AppHeader from '@/components/AppHeader.vue'

const loading = ref(true)
const questions = ref([])
const currentIndex = ref(0)
const selectedOption = ref(null)

const questionCount = computed(() => questions.value.length)
const currentQuestion = computed(() => questions.value[currentIndex.value] || {})

function loadQuestions() {
  const cid = utils.getAnswerCid()
  if (!cid) {
    uni.showToast({ title: '请先选择题库', icon: 'none' })
    loading.value = false
    return
  }

  api.question({ cid }).then((res) => {
    // 兼容多种返回格式
    if (Array.isArray(res)) {
      questions.value = res
    } else if (res && Array.isArray(res.data)) {
      questions.value = res.data
    } else {
      questions.value = []
    }
  }).catch(() => {
    questions.value = []
  }).finally(() => {
    loading.value = false
  })
}

function selectOption(idx) {
  selectedOption.value = idx
}

function isCorrect(idx) {
  if (selectedOption.value === null) return false
  const correct = currentQuestion.value?.answer
  return correct !== undefined && idx === correct
}

function prevQuestion() {
  if (currentIndex.value === 0) return
  currentIndex.value -= 1
  selectedOption.value = null
 }

function nextQuestion() {
  if (currentIndex.value < questionCount.value - 1) {
    currentIndex.value += 1
    selectedOption.value = null
  }
}

onMounted(() => {
  loadQuestions()
})
</script>

<style scoped>
.question-page {
  padding-bottom: 48rpx;
}

.sub-intro {
  margin-bottom: 20rpx;
  padding-bottom: 20rpx;
  border-bottom: 1rpx solid var(--tab-line);
}

.sub-eyebrow {
  display: block;
  font-size: 22rpx;
  font-weight: 600;
  color: var(--tab-brand);
  letter-spacing: 2rpx;
  margin-bottom: 10rpx;
}

.sub-title {
  display: block;
  font-size: 34rpx;
  font-weight: 700;
  color: var(--tab-ink);
  margin-bottom: 10rpx;
}

.sub-lead {
  display: block;
  font-size: 26rpx;
  color: var(--tab-muted);
  line-height: 1.55;
}

.stat-bar {
  margin-bottom: 20rpx;
}

.stat-bar-text {
  font-size: 26rpx;
  font-weight: 600;
  color: var(--tab-brand);
}

.stat-bar-text--muted {
  color: var(--tab-muted);
  font-weight: 500;
}

.state-loading {
  padding: 80rpx 32rpx;
  text-align: center;
  font-size: 28rpx;
  color: var(--tab-muted);
}

.q-card {
  padding: 32rpx 28rpx;
  background: var(--tab-surface);
  border-radius: var(--tab-radius-lg);
  border: 1rpx solid var(--tab-line);
  box-shadow: var(--tab-shadow-soft);
}

.q-badge-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12rpx;
  margin-bottom: 24rpx;
}

.q-badge {
  font-size: 26rpx;
  font-weight: 700;
  color: var(--tab-brand);
  background: #ccfbf1;
  padding: 10rpx 20rpx;
  border-radius: 999rpx;
}

.q-badge-sub {
  font-size: 24rpx;
  color: var(--tab-muted);
}

.q-body {
  display: block;
  font-size: 30rpx;
  font-weight: 500;
  color: var(--tab-ink);
  line-height: 1.65;
  margin-bottom: 28rpx;
  letter-spacing: 0.5rpx;
}

.q-options {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
  margin-bottom: 32rpx;
}

.q-option {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 12rpx;
  padding: 24rpx 22rpx;
  border-radius: var(--tab-radius-md);
  border: 1rpx solid var(--tab-line);
  background: #f8fafc;
}

.q-option--on {
  border-color: var(--tab-brand);
  background: rgba(14, 116, 144, 0.08);
}

.q-option--ok {
  border-color: #059669;
  background: rgba(5, 150, 105, 0.1);
}

.q-opt-label {
  font-size: 28rpx;
  font-weight: 700;
  color: var(--tab-brand-deep);
  flex-shrink: 0;
}

.q-opt-text {
  font-size: 28rpx;
  color: var(--tab-ink);
  line-height: 1.5;
  flex: 1;
  min-width: 0;
}

.q-actions {
  display: flex;
  flex-direction: row;
  gap: 20rpx;
}

.q-btn {
  flex: 1;
  padding: 24rpx 24rpx;
  text-align: center;
  font-size: 28rpx;
  font-weight: 600;
  border-radius: var(--tab-radius-md);
}

.q-btn--ghost {
  color: var(--tab-ink-soft);
  background: #f1f5f9;
  border: 1rpx solid var(--tab-line);
}

.q-btn--primary {
  color: #ffffff;
  background: var(--tab-brand);
}

.q-btn:active {
  opacity: 0.9;
}
</style>
