<template>
  <view class="page-container tab-page share-page">
    <view class="sub-intro">
      <text class="sub-eyebrow">互动</text>
      <text class="sub-title">题目分享</text>
      <text v-if="type === 6" class="sub-lead">每日一题：随机一题，答对可获得积分，每日 0 点刷新。</text>
      <text v-else class="sub-lead">查看分享题目，答对可获得积分。</text>
    </view>

    <view v-if="loading" class="state-loading">加载中...</view>

    <view v-else-if="question.length" class="question-card">
      <view class="q-badge-row">
        <text class="q-badge">第 {{ nowIndex + 1 }} 题</text>
        <text class="q-badge-sub">共 {{ question.length }} 题</text>
      </view>
      <text class="q-content">{{ currentQuestion.content || '暂无题目' }}</text>
      <view class="options">
        <view
          v-for="(opt, idx) in (currentQuestion.selectList || [])"
          :key="idx"
          class="option"
          :class="{ 'option--selected': selectedOption === idx, 'option--correct': isCorrect(idx) }"
          @click="selectOption(idx)"
        >
          <text class="opt-label">{{ String.fromCharCode(65 + idx) }}.</text>
          <text class="opt-text">{{ opt.name || opt.text }}</text>
        </view>
      </view>
    </view>

    <view v-else class="state-empty">暂无题目</view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import * as api from '@/service/api'
import * as utils from '@/utils/util'

const type = ref(5)
const question = ref([])
const nowIndex = ref(0)
const selectedOption = ref(null)
const loading = ref(false)

const currentQuestion = computed(() => question.value[nowIndex.value] || {})
const rightIndex = computed(() => {
  const q = currentQuestion.value
  const ans = (q.rightAnswer || '').split(',').map((c) => c.charCodeAt(0) - 65)
  return ans
})

function isCorrect(idx) {
  if (selectedOption.value === null) return false
  return rightIndex.value.includes(idx)
}

function selectOption(idx) {
  selectedOption.value = idx
}

onLoad((options) => {
  type.value = Number(options.type) || 5
  const qid = options.qid
  loading.value = true
  if (type.value === 5 && qid) {
    api.question({ qid, type: type.value }).then((res) => {
      loading.value = false
      question.value = Array.isArray(res) ? res : (res && res.length ? res : [])
      nowIndex.value = 0
    }).catch(() => { loading.value = false })
  } else if (type.value === 6) {
    api.todayQuestionInfo({ uid: utils.getUserId() }).then((res) => {
      loading.value = false
      const list = res && res.questions ? res.questions : []
      question.value = Array.isArray(list) ? list : []
      nowIndex.value = 0
    }).catch(() => { loading.value = false })
  } else {
    loading.value = false
  }
})
</script>

<style scoped>
.share-page {
  padding-bottom: 48rpx;
}

.sub-intro {
  margin-bottom: 28rpx;
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

.state-loading {
  padding: 80rpx 32rpx;
  text-align: center;
  font-size: 28rpx;
  color: var(--tab-muted);
}

.question-card {
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
  justify-content: space-between;
  gap: 16rpx;
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

.q-content {
  display: block;
  font-size: 30rpx;
  font-weight: 500;
  color: var(--tab-ink);
  line-height: 1.65;
  margin-bottom: 28rpx;
  letter-spacing: 0.5rpx;
}

.options {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.option {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 12rpx;
  padding: 24rpx 22rpx;
  border-radius: var(--tab-radius-md);
  border: 1rpx solid var(--tab-line);
  background: #f8fafc;
}

.option--selected {
  border-color: var(--tab-brand);
  background: rgba(14, 116, 144, 0.08);
}

.option--correct {
  border-color: #059669;
  background: rgba(5, 150, 105, 0.1);
}

.opt-label {
  font-size: 28rpx;
  font-weight: 700;
  color: var(--tab-brand-deep);
  flex-shrink: 0;
}

.opt-text {
  font-size: 28rpx;
  color: var(--tab-ink);
  line-height: 1.5;
  flex: 1;
  min-width: 0;
}

.state-empty {
  padding: 80rpx 32rpx;
  text-align: center;
  font-size: 28rpx;
  color: var(--tab-muted);
}
</style>
