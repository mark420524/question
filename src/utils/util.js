import { apiUrl } from './constant'

export const formatTime = (date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

export const formatDate = (date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return [year, month, day].map(formatNumber).join('-')
}

const formatNumber = (n) => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

export const getAnswerCid = () => {
  return uni.getStorageSync('cid')
}

export const getMenuInfo = () => {
  return uni.getStorageSync('cidInfo')
}

export const setAnswerType = (type) => {
  uni.setStorageSync('type', type)
}

export const getAnswerType = () => {
  return uni.getStorageSync('type')
}

export const getAutoRemove = () => {
  return uni.getStorageSync('autoRemove')
}

export const getUserId = () => {
  return uni.getStorageSync('uid')
}

export const getMenuVersionIndex = () => {
  return uni.getStorageSync('menuVersion')
}

export const setMenuVersionIndex = (version) => {
  uni.setStorageSync('menuVersion', version)
}

export const showWxToast = (toastMsg) => {
  uni.showToast({
    title: toastMsg,
    icon: 'none',
    duration: 2000
  })
}

export const getExamResult = (right) => {
  if (right > 85) return '成绩优秀'
  if (right > 70) return '成绩良好'
  if (right >= 60) return '成绩合格'
  return '成绩不合格'
}

export const getTouchData = (endX, endY, startX, startY) => {
  let turn = ''
  if (endX - startX > 30 && Math.abs(endY - startY) < 30) {
    turn = 'right'
  } else if (endX - startX < -30 && Math.abs(endY - startY) < 30) {
    turn = 'left'
  }
  return turn
}

export const setCollectionIndex = (index) => {
  uni.setStorageSync('index', index)
}

export const getCollectionIndex = () => {
  return uni.getStorageSync('index')
}

export const setNotifyIndex = (index) => {
  uni.setStorageSync('notifyIndex', index)
}

export const getNotifyIndex = () => {
  return uni.getStorageSync('notifyIndex') || 0
}

export const showAd = () => {
  return uni.getStorageSync('showAd')
}

export const setShowAd = (showAd) => {
  uni.setStorageSync('showAd', showAd)
}

export const buildDate = (str) => {
  const arr = str.split('-')
  const startDate = new Date()
  startDate.setFullYear(arr[0])
  startDate.setMonth(parseInt(arr[1]) - 1)
  startDate.setDate(arr[2])
  startDate.setHours(0)
  startDate.setMinutes(0)
  startDate.setSeconds(0)
  return startDate
}

export const validEmail = (email) => {
  const re = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/
  return email && re.test(email)
}
