<template>
  <view class="page-container page">
    <view class="business-card-rpx card-main">
      <view class="business-section-title">题目分享</view>
      <view v-if="type === 6" class="tip">每日一题：从题库中随机抽取一题，答对即可获得积分。每天 0 点刷新。</view>
      <view v-else class="tip">查看分享的题目，答对可获得积分。</view>
    </view>
    <view v-if="loading" class="loading">加载中...</view>
    <view v-else-if="question.length" class="question-wrap business-card-rpx">
      <view class="q-index">第 {{ nowIndex + 1 }} 题</view>
      <view class="q-content">{{ currentQuestion.content || '暂无题目' }}</view>
      <view class="options">
        <view
          v-for="(opt, idx) in (currentQuestion.selectList || [])"
          :key="idx"
          class="option"
          :class="{ selected: selectedOption === idx, correct: isCorrect(idx) }"
          @click="selectOption(idx)"
        >
          <text class="opt-label">{{ String.fromCharCode(65 + idx) }}.</text>
          <text class="opt-text">{{ opt.name || opt.text }}</text>
        </view>
      </view>
    </view>
    <view v-else class="empty">暂无题目</view>
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
  const show = options.show
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
.page { padding: 24rpx; }
.card-main { padding: 32rpx; margin-bottom: 24rpx; }
.tip { font-size: 28rpx; color: #64748b; line-height: 1.6; }
.loading { padding: 60rpx; text-align: center; color: #94a3b8; }
.question-wrap { padding: 32rpx; }
.q-index { font-size: 28rpx; color: #2563eb; font-weight: 600; margin-bottom: 20rpx; }
.q-content { font-size: 30rpx; color: #1e293b; line-height: 1.6; margin-bottom: 24rpx; }
.options { display: flex; flex-direction: column; gap: 16rpx; }
.option { padding: 24rpx; border-radius: 12rpx; border: 1rpx solid #e2e8f0; background: #f8fafc; }
.option.selected { border-color: #2563eb; background: rgba(37,99,235,0.08); }
.option.correct { border-color: #10b981; background: rgba(16,185,129,0.1); }
.opt-label { font-size: 28rpx; font-weight: 600; margin-right: 12rpx; color: #475569; }
.opt-text { font-size: 28rpx; color: #1e293b; }
.empty { padding: 60rpx; text-align: center; color: #94a3b8; }
</style>
