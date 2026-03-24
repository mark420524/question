<template>
  <view class="page-container tab-page my-page">
    <view class="my-profile-card">
      <view class="my-profile-accent" />
      <view class="user-row" @click="gotoProfile">
        <view class="avatar-wrap">
          <image
            class="avatar"
            :src="userInfo.avatarUrl || '/static/images/default.jpg'"
            mode="aspectFill"
          />
        </view>
        <view class="user-info">
          <text v-if="userInfo.nickName" class="nickname">{{ userInfo.nickName }}</text>
          <text v-else class="nickname-placeholder">点击登录账号</text>
          <text class="user-sub">资料与排名同步 · 管理个人信息</text>
          <button
            v-if="!userInfo.nickName"
            class="login-btn"
            open-type="getUserProfile"
            @getuserinfo="onGetUserInfo"
          >
            微信授权登录
          </button>
        </view>
        <text class="user-chev">›</text>
      </view>
    </view>

    <view class="theme-row">
      <text class="theme-label">主题</text>
      <picker mode="selector" :range="themeOptions" @change="onThemePickerChange">
        <text class="theme-value">{{ currentThemeLabel }}</text>
      </picker>
    </view>

    <view class="my-section">
      <text class="my-section-eyebrow">账户</text>
      <text class="my-section-title">常用服务</text>
    </view>

    <view class="my-menu">
      <view class="my-row" @click="invite">
        <view class="my-mark my-mark--teal">邀</view>
        <view class="my-row-texts">
          <text class="my-row-title">邀请朋友</text>
          <text class="my-row-sub">分享小程序给好友</text>
        </view>
        <text class="my-row-chev">›</text>
      </view>
      <view class="my-divider" />
      <view class="my-row" @click="goIntegral">
        <view class="my-mark my-mark--amber">分</view>
        <view class="my-row-texts">
          <text class="my-row-title">我的积分</text>
          <text class="my-row-sub">查看积分与兑换</text>
        </view>
        <text class="my-row-chev">›</text>
      </view>
      <view class="my-divider" />
      <view class="my-row" @click="openOther">
        <view class="my-mark my-mark--violet">具</view>
        <view class="my-row-texts">
          <text class="my-row-title">其他工具</text>
          <text class="my-row-sub">扩展功能入口</text>
        </view>
        <text class="my-row-chev">›</text>
      </view>
      <view class="my-divider" />
      <view class="my-row" @click="clearCache">
        <view class="my-mark my-mark--slate">清</view>
        <view class="my-row-texts">
          <text class="my-row-title">清除缓存</text>
          <text class="my-row-sub">退出本地登录状态</text>
        </view>
        <text class="my-row-chev">›</text>
      </view>
      <view class="my-divider" />
      <view class="my-row" @click="help">
        <view class="my-mark my-mark--sky">帮</view>
        <view class="my-row-texts">
          <text class="my-row-title">使用帮助</text>
          <text class="my-row-sub">常见问题与说明</text>
        </view>
        <text class="my-row-chev">›</text>
      </view>
      <view class="my-divider" />
      <view class="my-row my-row--last" @click="aboutMe">
        <view class="my-mark my-mark--rose">关</view>
        <view class="my-row-texts">
          <text class="my-row-title">关于我们</text>
          <text class="my-row-sub">版本与品牌信息</text>
        </view>
        <text class="my-row-chev">›</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import * as api from '@/service/api'
import * as utils from '@/utils/util'
// theme controls (moved to this page)
const themeOptions = ['默认', '暗色', '海洋']
const themeIds = ['', 'theme-dark', 'theme-ocean']
const currentTheme = ref((typeof uni !== 'undefined' && uni.getStorageSync && uni.getStorageSync('appTheme')) || '')
const currentThemeLabel = computed(() => {
  const idx = themeIds.indexOf(currentTheme.value)
  return themeOptions[idx === -1 ? 0 : idx]
})

function applyTheme(t) {
  currentTheme.value = t || ''
  try {
    if (typeof globalThis !== 'undefined' && typeof globalThis.setAppTheme === 'function') {
      globalThis.setAppTheme(t)
    } else if (typeof document !== 'undefined') {
      document.documentElement.classList.remove('theme-dark', 'theme-ocean')
      if (t) document.documentElement.classList.add(t)
    }
  } catch (e) {}
  if (typeof uni !== 'undefined' && uni.setStorageSync) uni.setStorageSync('appTheme', t)
}

function onThemePickerChange(e) {
  const idx = parseInt(e.detail.value, 10) || 0
  const id = themeIds[idx] || ''
  applyTheme(id)
}

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
.my-page {
  padding-bottom: 120rpx;
}

.theme-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 18rpx 24rpx;
  margin-bottom: 18rpx;
  background: var(--tab-surface);
  border-radius: var(--tab-radius-md);
  border: 1rpx solid var(--tab-line);
  box-shadow: var(--tab-shadow-soft);
}
.theme-label {
  font-size: 28rpx;
  font-weight: 600;
  color: var(--tab-ink);
}
.theme-value {
  font-size: 26rpx;
  color: var(--tab-muted);
}

.my-profile-card {
  position: relative;
  overflow: hidden;
  margin-bottom: 36rpx;
  padding: 36rpx 32rpx;
  background: var(--tab-surface);
  border-radius: var(--tab-radius-lg);
  border: 1rpx solid var(--tab-line);
  box-shadow: var(--tab-shadow-soft);
}

.my-profile-accent {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 8rpx;
  background: linear-gradient(90deg, var(--tab-brand-deep), var(--tab-brand), #2dd4bf);
}

.user-row {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.avatar-wrap {
  padding: 4rpx;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--tab-brand), #2dd4bf);
  flex-shrink: 0;
}

.avatar {
  width: 96rpx;
  height: 96rpx;
  border-radius: 50%;
  display: block;
  border: 4rpx solid var(--tab-surface);
}

.user-info {
  flex: 1;
  margin-left: 24rpx;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 8rpx;
}

.nickname {
  font-size: 34rpx;
  font-weight: 700;
  color: var(--tab-ink);
  letter-spacing: 0.5rpx;
}

.nickname-placeholder {
  font-size: 32rpx;
  font-weight: 600;
  color: var(--tab-muted);
}

.user-sub {
  font-size: 24rpx;
  color: var(--tab-muted);
  line-height: 1.45;
}

.login-btn {
  align-self: flex-start;
  margin-top: 8rpx;
  padding: 12rpx 28rpx;
  font-size: 26rpx;
  font-weight: 600;
  color: #ffffff;
  background: var(--tab-brand);
  border-radius: 999rpx;
  border: none;
  line-height: 1.4;
}

.login-btn::after {
  border: none;
}

.user-chev {
  font-size: 34rpx;
  color: #c4cad4;
  flex-shrink: 0;
  margin-left: 12rpx;
  font-weight: 300;
}

.my-section {
  margin-bottom: 20rpx;
  padding-bottom: 12rpx;
  border-bottom: 1rpx solid var(--tab-line);
}

.my-section-eyebrow {
  display: block;
  font-size: 22rpx;
  font-weight: 600;
  color: var(--tab-brand);
  letter-spacing: 2rpx;
  margin-bottom: 8rpx;
}

.my-section-title {
  display: block;
  font-size: 32rpx;
  font-weight: 700;
  color: var(--tab-ink);
}

.my-menu {
  background: var(--tab-surface);
  border-radius: var(--tab-radius-lg);
  border: 1rpx solid var(--tab-line);
  box-shadow: var(--tab-shadow-soft);
  overflow: hidden;
}

.my-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 26rpx 24rpx;
}

.my-row--last {
  border-bottom: none;
}

.my-row:active {
  background: #f8fafc;
}

.my-divider {
  height: 1rpx;
  background: rgba(18, 21, 28, 0.06);
  margin-left: 112rpx;
}

.my-mark {
  width: 64rpx;
  height: 64rpx;
  border-radius: 18rpx;
  font-size: 28rpx;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.my-mark--teal {
  background: #ccfbf1;
  color: #0f766e;
}

.my-mark--amber {
  background: #fef3c7;
  color: #b45309;
}

.my-mark--violet {
  background: #ede9fe;
  color: #5b21b6;
}

.my-mark--slate {
  background: #f1f5f9;
  color: #475569;
}

.my-mark--sky {
  background: #e0f2fe;
  color: #0369a1;
}

.my-mark--rose {
  background: #ffe4e6;
  color: #be123c;
}

.my-row-texts {
  flex: 1;
  margin-left: 22rpx;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 6rpx;
}

.my-row-title {
  font-size: 30rpx;
  font-weight: 600;
  color: var(--tab-ink);
  letter-spacing: 0.5rpx;
}

.my-row-sub {
  font-size: 24rpx;
  color: var(--tab-muted);
  line-height: 1.45;
}

.my-row-chev {
  font-size: 30rpx;
  color: #c4cad4;
  flex-shrink: 0;
  margin-left: 16rpx;
  font-weight: 300;
}
</style>
