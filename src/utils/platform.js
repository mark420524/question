/**
 * 统一平台适配封装（可根据后续需要扩展）
 */

const getPlatform = () => {
  const systemInfo = uni.getSystemInfoSync() || {}
  return systemInfo.platform || 'unknown'
}

export function login() {
  // 该函数根据平台做统一登录封装，后续填充具体授权逻辑
  if (process.env.UNI_PLATFORM === 'mp-weixin') {
    return uni.login({ provider: 'weixin' })
  }
  return uni.login()
}

export function navigateTo(path, options = {}) {
  if (process.env.UNI_PLATFORM === 'h5') {
    return uni.navigateTo({ url: `/${path}`, ...options })
  }
  return uni.navigateTo({ url: `/${path}`, ...options })
}

export function getPlatformName() {
  return getPlatform()
}
