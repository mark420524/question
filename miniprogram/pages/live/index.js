const app = getApp();
const apis = app.apis;
const utils  = app.utils;
Page({
    data:{
        items:[]
    },
    onLoad(){
        let that = this;
        wx.showLoading({
          title: '正在查询数据',
        })
        apis.openTvInfo().then(res=>{
            wx.hideLoading()
            if (res) {
                that.setData({
                    items:res
                })
            }else{
                utils.showWxToast('查无数据');
            }
        })
    },
    handlerItemClick(e){
        
        let item = e.currentTarget.dataset.live;
        
        wx.setStorageSync('liveItem', item)
        wx.navigateTo({
            url: '/pages/live/detail',
          })
    }
})