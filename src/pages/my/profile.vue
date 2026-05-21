<template>
  <view class="page-container page-body">
    <view class="card-base profile-card">
      <view class="avatar-row">
        <image :src="avatarUrl" class="avatar" mode="cover" />
        <view class="profile-info">
          <text class="profile-label">头像</text>
          <button open-type="chooseAvatar" @chooseavatar="onChooseAvatar" class="button-secondary">更换头像</button>
        </view>
      </view>
      <view class="form-row">
        <text class="form-label">昵称</text>
        <input v-model="nickName" class="input-field" placeholder="请输入昵称" />
      </view>
      <view class="action-row">
        <button class="button-primary" @click="submitUserInfo">保存资料</button>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as api from '@/service/api'
import * as utils from '@/utils/util'

const avatarUrl = ref('/static/images/avatar.png')
const nickName = ref('')
const fileTempPath = ref('')

function initInfo() {
  const userInfo = uni.getStorageSync('userInfo') || {}
  avatarUrl.value = userInfo.avatarUrl || '/static/images/avatar.png'
  nickName.value = userInfo.nickName || ''
}

function onChooseAvatar(e) {
  const { avatarUrl: newAvatar } = e.detail || {}
  if (newAvatar) {
    fileTempPath.value = newAvatar
    avatarUrl.value = newAvatar
  }
}

function submitUserInfo() {
  const uid = utils.getUserId()
  if (!uid) {
    utils.showWxToast('用户未登录')
    return
  }
  const data = { uid, nickName: nickName.value }
  if (fileTempPath.value) {
    data.avatarUrl = fileTempPath.value
  }
  uni.showLoading({ title: '保存中' })
  api.updateUserV2(data).then((res) => {
    uni.hideLoading()
    const userInfo = uni.getStorageSync('userInfo') || {}
    if (nickName.value) userInfo.nickName = nickName.value
    if (fileTempPath.value) userInfo.avatarUrl = fileTempPath.value
    uni.setStorageSync('userInfo', userInfo)
    utils.showWxToast('保存成功')
    uni.navigateBack({ delta: 1 })
  }).catch(() => {
    uni.hideLoading()
  })
}

onMounted(initInfo)
</script>

<style scoped>
.page { padding: 0; background: transparent; min-height: auto }
.avatar-row { display: flex; align-items: center; gap: 24rpx; margin-bottom: 32rpx }
.avatar { width: 160rpx; height: 160rpx; border-radius: 999rpx; background: #f1f5f9 }
.profile-info { flex: 1 }
.profile-label { display: block; font-size: 28rpx; color: var(--text-secondary); margin-bottom: 16rpx }
.form-row { display: flex; flex-direction: column; gap: 14rpx; margin-bottom: 32rpx }
.form-label { color: var(--text-secondary); font-size: 26rpx }
.action-row { text-align: center }
</style>
