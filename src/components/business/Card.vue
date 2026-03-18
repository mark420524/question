<template>
  <view :class="['card', { bordered }]" :style="style">
    <view class="card-header" v-if="title || extra">
      <text class="card-title" v-if="title">{{ title }}</text>
      <view class="card-extra" v-if="extra">
        <slot name="extra">{{ extra }}</slot>
      </view>
    </view>
    <view class="card-body">
      <slot />
    </view>
  </view>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  extra: {
    type: String,
    default: ''
  },
  bordered: {
    type: Boolean,
    default: true
  },
  customStyle: {
    type: String,
    default: ''
  }
})

const style = computed(() => {
  return props.customStyle
})
</script>

<style scoped>
.card {
  background: #ffffff;
  border-radius: 16rpx;
  padding: 24rpx;
  box-shadow: 0 6rpx 20rpx rgba(0, 0, 0, 0.08);
  border: 1rpx solid rgba(0, 0, 0, 0.05);
}

.card.bordered {
  border-color: rgba(0, 0, 0, 0.08);
}

.card-header {
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  display: flex;
  margin-bottom: 16rpx;
}

.card-title {
  font-size: 30rpx;
  font-weight: 700;
  color: #1a1a1a;
}

.card-body {
  min-height: 120rpx;
}
</style>
