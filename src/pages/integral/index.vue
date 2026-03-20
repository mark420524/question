<template>
  <view class="page-container page">
    <view class="business-card-rpx card-main header">
      <view class="title">总积分</view>
      <view class="integral-value">{{ totalIntegral }}</view>
    </view>
    <view class="list">
      <view v-for="(row, rowIdx) in filteredList" :key="rowIdx" class="row">
        <view v-for="(item, colIdx) in row" :key="rowIdx + '-' + colIdx" class="item business-card-rpx">
          <view class="idx">{{ rowIdx * size + colIdx + 1 }}</view>
          <view class="remark">{{ item.remark }}</view>
          <view class="time">{{ item.createTime }}</view>
          <view class="score" :class="item.type === 1 ? 'add' : 'minus'">
            {{ item.type === 1 ? '获得' : '消耗' }} <text class="num">{{ item.type === 1 ? '+' : '-' }}{{ item.integral }}</text> 积分
          </view>
          <view class="after">剩余: {{ item.afterCount }}</view>
        </view>
      </view>
    </view>
    <view v-if="loading" class="loading">加载中...</view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'
import { onLoad, onReachBottom } from '@dcloudio/uni-app'
import * as api from '@/service/api'
import * as utils from '@/utils/util'

const totalIntegral = ref(0)
const integralList = ref([])
const size = 10
const pages = ref(0)
const loading = ref(false)

const filteredList = computed(() => integralList.value.filter((r) => Array.isArray(r) && r.length))

function buildUserLog(page, emptyText) {
  loading.value = true
  api.getMyIntegralList({ uid: utils.getUserId(), page, size }).then((res) => {
    loading.value = false
    if (res && res.length) {
      integralList.value[page] = res
      integralList.value = [...integralList.value]
      pages.value = page
    } else if (emptyText) utils.showWxToast(emptyText)
  }).catch(() => { loading.value = false })
}

onLoad((options) => {
  totalIntegral.value = Number(options.integral) || 0
  buildUserLog(0, '没有更多数据了')
})

onReachBottom(() => { buildUserLog(pages.value + 1, '没有更多数据了') })
</script>

<style scoped>
.page { padding: 24rpx; }
.card-main { padding: 32rpx; margin-bottom: 24rpx; }
.header { display: flex; align-items: center; justify-content: space-between; }
.title { font-size: 30rpx; color: #64748b; }
.integral-value { font-size: 40rpx; font-weight: 700; color: #2563eb; }
.row { margin-bottom: 16rpx; }
.item { padding: 24rpx; }
.idx { font-size: 24rpx; color: #94a3b8; margin-bottom: 8rpx; }
.remark { font-size: 28rpx; color: #1e293b; }
.time { font-size: 24rpx; color: #64748b; margin-top: 8rpx; }
.score { font-size: 26rpx; margin-top: 8rpx; }
.score .num { font-weight: 600; }
.score.add .num { color: #10b981; }
.score.minus .num { color: #ef4444; }
.after { font-size: 24rpx; color: #94a3b8; margin-top: 4rpx; }
.loading { padding: 24rpx; text-align: center; color: #94a3b8; }
</style>
