<template>
  <view class="page">
    <view class="page-header">
      <text class="title">答题模式</text>
      <text v-if="questionCount" class="subtitle">共 {{ questionCount }} 题</text>
    </view>

    <view v-if="loading" class="loading">
      <u-loading type="spinner" size="40" />
      <text class="loading-text">加载中...</text>
    </view>

    <view v-else class="question-card">
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
        <u-button type="default" size="small" @click="prevQuestion">上一题</u-button>
        <u-button type="primary" size="small" @click="nextQuestion">下一题</u-button>
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
  min-height: 100vh;
  background: #f5f6fa;
}

.page-header {
  margin-bottom: 20rpx;
}

.title {
  font-size: 34rpx;
  font-weight: 700;
}

.subtitle {
  font-size: 26rpx;
  color: #666;
  margin-top: 10rpx;
}

.loading {
  padding: 40rpx;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
}

.loading-text {
  margin-top: 16rpx;
  font-size: 26rpx;
  color: #999;
}

.question-card {
  background: #fff;
  border-radius: 20rpx;
  padding: 24rpx;
  box-shadow: 0 8rpx 20rpx rgba(0, 0, 0, 0.07);
}

.question-index {
  font-size: 28rpx;
  font-weight: 600;
  margin-bottom: 18rpx;
}

.question-content {
  font-size: 30rpx;
  color: #333;
  margin-bottom: 26rpx;
  line-height: 1.6;
}

.options {
  display: flex;
  flex-direction: column;
  gap: 14rpx;
  margin-bottom: 24rpx;
}

.option {
  padding: 18rpx;
  border-radius: 18rpx;
  border: 1rpx solid rgba(0, 0, 0, 0.1);
  background: #fff;
  display: flex;
  align-items: center;
}

.option.selected {
  border-color: #1c6ef2;
  background: rgba(28, 110, 242, 0.1);
}

.option.correct {
  border-color: #06c981;
  background: rgba(6, 201, 129, 0.12);
}

.option-label {
  font-size: 26rpx;
  font-weight: 700;
  margin-right: 14rpx;
}

.option-text {
  font-size: 26rpx;
  color: #333;
}

.actions {
  display: flex;
  justify-content: space-between;
}
</style>
