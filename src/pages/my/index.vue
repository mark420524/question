<template>
  <view class="page-container page">
    <view class="header-card business-card-rpx">
      <view class="user-row" @click="gotoProfile">
        <image
          class="avatar"
          :src="userInfo.avatarUrl || '/static/images/default.jpg'"
          mode="aspectFill"
        />
        <view class="user-info">
          <text v-if="userInfo.nickName" class="nickname">{{ userInfo.nickName }}</text>
          <button v-else class="login-btn" open-type="getUserProfile" @getuserinfo="onGetUserInfo">登录/注册</button>
        </view>
        <text class="arrow">›</text>
      </view>
    </view>

    <view class="menu-card business-card-rpx">
      <view class="menu-item" @click="invite">
        <text class="menu-text">邀请朋友</text>
        <text class="menu-arrow">›</text>
      </view>
      <view class="divider" />
      <view class="menu-item" @click="goIntegral">
        <text class="menu-text">我的积分</text>
        <text class="menu-arrow">›</text>
      </view>
      <view class="divider" />
      <view class="menu-item" @click="openOther">
        <text class="menu-text">其他工具</text>
        <text class="menu-arrow">›</text>
      </view>
      <view class="divider" />
      <view class="menu-item" @click="clearCache">
        <text class="menu-text">清除缓存</text>
        <text class="menu-arrow">›</text>
      </view>
      <view class="divider" />
      <view class="menu-item" @click="help">
        <text class="menu-text">使用帮助</text>
        <text class="menu-arrow">›</text>
      </view>
      <view class="divider" />
      <view class="menu-item" @click="aboutMe">
        <text class="menu-text">关于我们</text>
        <text class="menu-arrow">›</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as api from '@/service/api'
import * as utils from '@/utils/util'

const userInfo = ref({})

function gotoProfile() {
  uni.navigateTo({ url: '/pages/my/profile' })
}

function onGetUserInfo(e) {
  const res = e.detail
  if (!res || !res.userInfo) return
  const info = res.userInfo
  userInfo.value = info
  uni.setStorageSync('userInfo', info)
  const uid = utils.getUserId()
  if (uid) {
    info.uid = uid
    api.updateUser(info).then((r) => {
      uni.showToast({ title: r ? '授权成功' : '授权失败，请联系管理员', icon: 'none' })
    })
  }
}

function invite() {
  uni.navigateTo({ url: '/pages/share/index' })
}

function goIntegral() {
  api.getMyIntegral({ uid: utils.getUserId() }).then((res) => {
    const integral = res || 0
    uni.navigateTo({ url: `/pages/integral/index?integral=${integral}` })
  })
}

function openOther() {
  uni.navigateTo({ url: '/pages/other/index' })
}

function clearCache() {
  userInfo.value = {}
  uni.removeStorageSync('userInfo')
  uni.showToast({ title: '清除成功', icon: 'none' })
}

function help() {
  uni.navigateTo({ url: '/pages/help/index' })
}

function aboutMe() {
  uni.navigateTo({ url: '/pages/about/index' })
}

onMounted(() => {
  userInfo.value = uni.getStorageSync('userInfo') || {}
})
</script>

<style scoped>
.page {
  padding: 24rpx;
}

.header-card {
  padding: 32rpx;
  margin-bottom: 24rpx;
}

.user-row {
  display: flex;
  align-items: center;
}

.avatar {
  width: 96rpx;
  height: 96rpx;
  border-radius: 50%;
  flex-shrink: 0;
}

.user-info {
  flex: 1;
  margin-left: 24rpx;
  min-width: 0;
}

.nickname {
  font-size: 32rpx;
  font-weight: 600;
  color: #1e293b;
}

.login-btn {
  font-size: 30rpx;
  color: #2563eb;
  background: transparent;
  border: none;
  padding: 0;
  text-align: left;
  line-height: 1.5;
}

.login-btn::after {
  border: none;
}

.arrow {
  font-size: 36rpx;
  color: #94a3b8;
}

.menu-card {
  padding: 0 32rpx;
}

.menu-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 28rpx 0;
}

.menu-text {
  font-size: 30rpx;
  color: #1e293b;
}

.menu-arrow {
  font-size: 36rpx;
  color: #94a3b8;
}

.divider {
  height: 1rpx;
  background: #e2e8f0;
}
</style>
