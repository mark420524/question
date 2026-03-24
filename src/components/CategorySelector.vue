<template>
  <view v-if="visible" class="overlay" @click.self="onCancel">
    <view class="sheet">
      <view class="selector-header">
        <view class="selector-action" @click="onCancel">取消</view>
        <view class="selector-title">选择题库</view>
        <view class="selector-action" @click="onConfirm">确定</view>
      </view>

      <picker mode="multiSelector" :range="range" :value="innerValue" @change="onPickerChange">
        <view class="picker-preview">
          <text class="picker-preview-text">{{ selectedLabel }}</text>
        </view>
      </picker>
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

const innerValue = ref([...value.value])

watch(value, (v) => {
  innerValue.value = Array.isArray(v) ? [...v] : [0, 0, 0]
})

watch(propVisible, (v) => {
  if (v) {
    innerValue.value = Array.isArray(value.value) ? [...value.value] : [0, 0, 0]
  }
})

const range = computed(() => {
  const provinces = data.value || []
  const first = provinces[innerValue.value[0]]
  const cities = first?.children || []
  const second = cities[innerValue.value[1]]
  const counties = second?.children || []

  return [
    provinces.map((item) => item.name || ''),
    cities.map((item) => item.name || ''),
    counties.map((item) => item.name || '')
  ]
})

const selectedLabel = computed(() => {
  const provinces = data.value || []
  const first = provinces[innerValue.value[0]]
  const cities = first?.children || []
  const second = cities[innerValue.value[1]]
  const counties = second?.children || []
  const third = counties[innerValue.value[2]]

  return [first?.name, second?.name, third?.name].filter(Boolean).join(' / ') || '请选择'
})

function onPickerChange(e) {
  const val = e.detail.value
  // 处理多列联动选择
  if (val[0] !== innerValue.value[0]) {
    val[1] = 0
    val[2] = 0
  } else if (val[1] !== innerValue.value[1]) {
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
  emit('confirm', { detail: innerValue.value })
}
</script>

<style scoped>
.selector-header {
  padding: 20rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.selector-action {
  font-size: 26rpx;
  color: #1c6ef2;
}
.selector-title {
  font-size: 30rpx;
  font-weight: 700;
}
.picker-preview {
  padding: 40rpx 20rpx;
  background: #f7f8fc;
  border-top: 1rpx solid #eaeaea;
}
.picker-preview-text {
  color: #333;
  font-size: 28rpx;
}
</style>
