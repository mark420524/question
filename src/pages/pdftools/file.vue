<template>
  <view class="page-container page-body">
    <view class="section-header">
      <text class="section-eyebrow">PDF 处理</text>
      <text class="section-title">{{ title }}</text>
      <text class="section-lead">选择 PDF 后，系统会自动提交任务并通过邮件通知结果。</text>
    </view>

    <view class="card-base">
      <view class="form-field">
        <text class="field-label">操作类型</text>
        <text class="field-value">{{ title }}</text>
      </view>
      <view class="form-field">
        <text class="field-label">输入邮箱</text>
        <input v-model="email" class="input-field" placeholder="请输入接收邮箱" type="text" />
      </view>
      <view v-if="type === 1" class="form-field">
        <text class="field-label">加密密码</text>
        <input v-model="filePassword" class="input-field" placeholder="请输入加密密码" type="text" />
      </view>
      <view v-if="type === 3" class="form-field">
        <text class="field-label">水印内容</text>
        <input v-model="waterMark" class="input-field" placeholder="请输入水印文字" type="text" />
      </view>
      <view class="form-field">
        <text class="field-label">文件</text>
        <view class="picker-field" @click="chooseFile">{{ fileName || '请选择 PDF 文件' }}</view>
      </view>
      <view class="action-row">
        <button class="button-primary" @click="handleUpload">立即提交</button>
      </view>
      <view v-if="message" class="result-tip">{{ message }}</view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import * as api from '@/service/api'
import * as utils from '@/utils/util'

const type = ref(1)
const title = ref('加密文档')
const fileName = ref('')
const filePath = ref('')
const filePassword = ref('')
const waterMark = ref('')
const email = ref('')
const message = ref('')

function init(options) {
  const value = Number(options?.type || 1)
  type.value = value
  title.value = value === 1 ? '加密文档' : value === 2 ? '清除密码' : '添加水印'
  uni.setNavigationBarTitle({ title: title.value })
}

function chooseFile() {
  uni.chooseFile({ count: 1, type: 'file' }).then((res) => {
    const file = res.tempFiles?.[0]
    if (!file) return
    const suffix = file.name.split('.').pop()?.toLowerCase()
    if (suffix !== 'pdf') {
      utils.showWxToast('请选择 PDF 文件')
      return
    }
    fileName.value = file.name
    filePath.value = file.path
  }).catch(() => {})
}

function handleUpload() {
  if (!filePath.value) {
    utils.showWxToast('请先选择 PDF 文件')
    return
  }
  if (!utils.validEmail(email.value)) {
    utils.showWxToast('请输入正确邮箱')
    return
  }
  if (type.value === 1 && !filePassword.value) {
    utils.showWxToast('请输入加密密码')
    return
  }
  if (type.value === 3 && !waterMark.value) {
    utils.showWxToast('请输入水印内容')
    return
  }

  const data = {
    uid: utils.getUserId(),
    filePath: filePath.value,
    type: type.value,
    fileName: fileName.value,
    email: email.value,
    readonly: type.value === 1 ? 1 : undefined,
    password: type.value === 1 ? filePassword.value : undefined,
    waterMark: type.value === 3 ? waterMark.value : undefined
  }

  uni.showLoading({ title: '处理中' })
  const action = type.value === 2 ? api.decryptPdfFile(data) : type.value === 3 ? api.addWatermarkFile(data) : api.encryptPdfFile(data)
  action.then((res) => {
    uni.hideLoading()
    if (res?.path) {
      message.value = '处理成功，请五分钟后查看邮件。'
    } else {
      message.value = '提交成功，请稍后留意邮箱。'
    }
  }).catch(() => {
    uni.hideLoading()
  })
}

onLoad((options) => init(options))
</script>

<style scoped>
.page { padding: 0; background: transparent; min-height: auto }
.field-label { display: block; font-size: 26rpx; color: var(--text-secondary); margin-bottom: 14rpx }
.field-value { min-height: 74rpx; padding: 24rpx 24rpx; font-size: 28rpx; color: var(--text-primary); background: #f8fafc; border-radius: 22rpx; border: 1rpx solid var(--tab-line) }
.action-row { margin-top: 20rpx; text-align: center }
.result-tip { margin-top: 24rpx; color: var(--text-secondary); font-size: 26rpx; text-align: center }
</style>