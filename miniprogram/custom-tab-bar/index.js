// miniprogram/pages/index/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    // 默认使用 Vant 图标名称（miniprogram 端使用 icon font）
    list: [
      { pagePath: '/pages/index/index', iconPath: 'coupon-o', text: '答题' },
      { pagePath: '/pages/search/index', iconPath: 'search', text: '搜索' },
      { pagePath: '/pages/more/index', iconPath: 'more-o', text: '更多' },
      { pagePath: '/pages/my/index', iconPath: 'contact', text: '我的' }
    ],
    // 颜色会在 onLoad 读取本地主题并设置
    activeColor: '#3b82f6',
    inactiveColor: '#6b7280'
  },

  onLoad() {
    // 从存储读取主题并映射为颜色（支持扩展更多主题）
    try {
      const theme = (wx && wx.getStorageSync && wx.getStorageSync('appTheme')) || ''
      if (theme === 'theme-dark') {
        this.setData({ activeColor: '#7c3aed', inactiveColor: '#cbd5e1' })
      } else if (theme === 'theme-ocean') {
        this.setData({ activeColor: '#06b6d4', inactiveColor: '#054f52' })
      } else {
        this.setData({ activeColor: '#3b82f6', inactiveColor: '#6b7280' })
      }
    } catch (e) {
      // ignore
    }
  },

  onShow() {
    // 监听可能的主题切换（如果页面间切换后主题被修改）
    try {
      const theme = (wx && wx.getStorageSync && wx.getStorageSync('appTheme')) || ''
      if (theme === 'theme-dark') this.setData({ activeColor: '#7c3aed', inactiveColor: '#cbd5e1' })
      else if (theme === 'theme-ocean') this.setData({ activeColor: '#06b6d4', inactiveColor: '#054f52' })
      else this.setData({ activeColor: '#3b82f6', inactiveColor: '#6b7280' })
    } catch (e) {}
  },

  onChange(event) {
    const detail = event.detail
    this.setData({ active: detail })
    const url = this.data.list[detail].pagePath
    wx.switchTab({ url })
  }
})