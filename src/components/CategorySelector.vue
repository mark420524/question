<template>
  <view v-if="visible" class="overlay" @click.self="onCancel">
    <view class="sheet">
      <view class="selector-header">
        <view class="selector-action" @click="onCancel">取消</view>
        <view class="selector-title">选择题库</view>
        <view class="selector-action" @click="onConfirm">确定</view>
      </view>

      <view class="selector-body">
        <picker-view
          indicator-style="height: 50rpx;"
          :value="innerValue"
          @change="onChange"
        >
          <!-- 一级分类 -->
          <picker-view-column>
            <view
              v-for="(item, idx) in firstList"
              :key="item.id || idx"
              class="picker-item"
            >
              {{ item.name }}
            </view>
          </picker-view-column>
          <!-- 二级分类 -->
          <picker-view-column>
            <view
              v-for="(item, idx) in secondList"
              :key="item.id || idx"
              class="picker-item"
            >
              {{ item.name }}
            </view>
          </picker-view-column>
          <!-- 三级分类 -->
          <picker-view-column>
            <view
              v-for="(item, idx) in thirdList"
              :key="item.id || idx"
              class="picker-item"
            >
              {{ item.name }}
            </view>
          </picker-view-column>
        </picker-view>
      </view>

      <view class="selector-footer">
        <text class="selected-label">{{ selectedLabel }}</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { computed, watch, ref } from 'vue'
import { toRefs } from 'vue'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  data: {
    type: Array,
    default: () => []
  },
  value: {
    type: Array,
    default: () => [0, 0, 0]
  }
})

const emit = defineEmits(['update:visible', 'cancel', 'confirm'])

const { visible: propVisible, data, value } = toRefs(props)

const innerValue = ref(Array.isArray(value.value) ? [...value.value] : [0, 0, 0])

watch(value, (v) => {
  innerValue.value = Array.isArray(v) ? [...v] : [0, 0, 0]
})

watch(propVisible, (visible) => {
  if (visible) {
    innerValue.value = Array.isArray(value.value) ? [...value.value] : [0, 0, 0]
  }
})

const firstList = computed(() => data.value || [])
const secondList = computed(() => {
  const first = firstList.value[innerValue.value[0]]
  return first?.children || []
})
const thirdList = computed(() => {
  const second = secondList.value[innerValue.value[1]]
  return second?.children || []
})

const selectedLabel = computed(() => {
  const first = firstList.value[innerValue.value[0]]
  const second = secondList.value[innerValue.value[1]]
  const third = thirdList.value[innerValue.value[2]]
  return [first?.name, second?.name, third?.name].filter(Boolean).join(' / ') || '请选择题库'
})

function onChange(e) {
  const val = e.detail.value

  // 如果一级分类改变，重置二级和三级
  if (innerValue.value[0] !== val[0]) {
    val[1] = 0
    val[2] = 0
  }
  // 如果二级分类改变，重置三级
  else if (innerValue.value[1] !== val[1]) {
    val[2] = 0
  }

  innerValue.value = val
}

function onCancel() {
  emit('update:visible', false)
  emit('cancel')
}

function onConfirm() {
  emit('update:visible', false)
  emit('confirm', { detail: [...innerValue.value] })
}
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  z-index: 1000;
}

.sheet {
  width: 100%;
  max-height: 80vh;
  background: #fff;
  border-top-left-radius: 24rpx;
  border-top-right-radius: 24rpx;
  overflow: hidden;
}

.selector-header {
  padding: 28rpx 24rpx 20rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1rpx solid var(--gray-200);
}

.selector-action {
  color: var(--primary-dark);
  font-size: 28rpx;
}

.selector-title {
  font-size: 30rpx;
  font-weight: 700;
  color: var(--gray-950);
}

.selector-body {
  height: 400rpx;
  position: relative;
}

.selector-body::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 50rpx;
  margin-top: -25rpx;
  background: rgba(0, 0, 0, 0.05);
  pointer-events: none;
  z-index: 1;
}

.picker-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50rpx;
  font-size: 28rpx;
  color: var(--gray-800);
  text-align: center;
}

.selector-footer {
  padding: 20rpx 24rpx 28rpx;
  border-top: 1rpx solid var(--gray-200);
}

.selected-label {
  display: block;
  color: var(--gray-700);
  font-size: 26rpx;
}
</style>
