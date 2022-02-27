// miniprogram/pages/index/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        active: 0,
        list: [
          {
            pagePath: "/pages/index/index",
            iconPath: "coupon-o",
            selectedIconPath: "coupon-o",
            text: "答题"
          },
          {
            pagePath: "/pages/search/index",
            iconPath: "search",
            selectedIconPath: "search",
            text: "搜索"
          },
          {
            pagePath: "/pages/my/index",
            iconPath: "contact",
            selectedIconPath: "contact",
            text: "我的"
          }
        ]
    },

    onChange(event) {
        
        const detail = event.detail;
        this.setData({ active: detail });
        const url = this.data.list[detail].pagePath;
        wx.switchTab({url})
        
    }
})