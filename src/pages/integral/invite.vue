<template>
  <view class="page-container page-body">
    <view class="section-header">
      <text class="section-eyebrow">邀请记录</text>
      <text class="section-title">邀请好友获得积分奖励</text>
      <text class="section-lead">记录会自动翻页加载，邀请越多奖励越多。</text>
    </view>
    <view v-if="logs.length === 0" class="empty-state">暂无邀请记录</view>
    <view v-else class="card-list">
      <view v-for="(item, index) in logs" :key="item.id || index" class="card-base">
        <view class="log-title">{{ index + 1 }}. {{ item.nickName || '匿名用户' }}</view>
        <view class="log-meta">
          <text class="log-time">{{ item.createTime || '-' }}</text>
          <text class="log-score">+{{ item.integral || 0 }} 积分</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { onReachBottom } from '@dcloudio/uni-app'
import * as api from '@/service/api'
import * as utils from '@/utils/util'

const logs = ref([])
const page = ref(0)
const size = 10
const loading = ref(false)

function loadInviteLog(nextPage = 0) {
  if (loading.value) return
  loading.value = true
  api.getMyInviteList({ uid: utils.getUserId(), page: nextPage, size }).then((res) => {
    if (Array.isArray(res) && res.length > 0) {
      if (nextPage === 0) {
        logs.value = res
      } else {
        logs.value = [...logs.value, ...res]
      }
      page.value = nextPage
    } else if (nextPage > 0) {
      utils.showWxToast('没有更多数据了')
    } else {
      logs.value = []
    }
  }).catch(() => {})
    .finally(() => { loading.value = false })
}

onMounted(() => { loadInviteLog(0) })

onReachBottom(() => { loadInviteLog(page.value + 1) })
</script>

<style scoped>
.page { padding: 0; background: transparent; min-height: auto }
.empty-state { padding: 80rpx 0; color: var(--text-secondary); text-align: center }
.log-title { font-size: 28rpx; font-weight: 700; color: var(--text-primary) }
.log-meta { margin-top: 16rpx; display: flex; justify-content: space-between; color: var(--text-secondary); font-size: 24rpx }
.log-score { color: var(--primary) }
</style>
