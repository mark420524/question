<template>
  <view class="page-container page">
    <view class="page-header business-card-rpx">
      <text class="title">答题模式</text>
      <text v-if="questionCount" class="subtitle">共 {{ questionCount }} 题</text>
    </view>

    <view v-if="loading" class="loading-wrap">
      <text class="loading-text">加载中...</text>
    </view>

    <view v-else class="question-card business-card-rpx">
      <view class="question-index">第 {{ currentIndex + 1 }} 题</view>
      <view class="question-content">{{ currentQuestion?.content || '暂无题目' }}</view>

      <view class="options">
        <view
          v-for="(option, idx) in currentQuestion?.options || []"
          :key="idx"
          :class="['option', { selected: selectedOption === idx, correct: isCorrect(idx) }]"
          @click="selectOption(idx)"
        >
          <text class="option-label">{{ option.label }}.</text>
          <text class="option-text">{{ option.text }}</text>
        </view>
      </view>

      <view class="actions">
        <view class="btn business-btn-rpx business-btn-secondary-rpx" @click="prevQuestion">上一题</view>
        <view class="btn business-btn-rpx business-btn-primary-rpx" @click="nextQuestion">下一题</view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import * as api from '@/service/api'
import * as utils from '@/utils/util'

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
.page {
  padding: 24rpx;
}

.page-header {
  padding: 24rpx;
  margin-bottom: 24rpx;
}

.title {
  font-size: 32rpx;
  font-weight: 700;
  color: #1e293b;
}

.subtitle {
  font-size: 26rpx;
  color: #64748b;
  margin-top: 8rpx;
}

.loading-wrap {
  padding: 60rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}

.loading-text {
  font-size: 28rpx;
  color: #94a3b8;
}

.question-card {
  padding: 32rpx;
}

.question-index {
  font-size: 28rpx;
  font-weight: 600;
  color: #2563eb;
  margin-bottom: 20rpx;
}

.question-content {
  font-size: 30rpx;
  color: #1e293b;
  margin-bottom: 28rpx;
  line-height: 1.6;
}

.options {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
  margin-bottom: 32rpx;
}

.option {
  padding: 24rpx;
  border-radius: 12rpx;
  border: 1rpx solid #e2e8f0;
  background: #f8fafc;
  display: flex;
  align-items: center;
}

.option.selected {
  border-color: #2563eb;
  background: rgba(37, 99, 235, 0.08);
}

.option.correct {
  border-color: #10b981;
  background: rgba(16, 185, 129, 0.1);
}

.option-label {
  font-size: 28rpx;
  font-weight: 600;
  margin-right: 16rpx;
  color: #475569;
}

.option-text {
  font-size: 28rpx;
  color: #1e293b;
}

.actions {
  display: flex;
  gap: 24rpx;
  justify-content: space-between;
}

.btn {
  flex: 1;
}
</style>
