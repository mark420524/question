const app = getApp();
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
        wx.cloud.callFunction({
            name: "querytv"
        }).then(res=>{
            let result = res.result;
            if (result.code===0 && result.data.length>0) {
                that.setData({
                    items:result.data
                })
            }else{
                utils.showWxToast('查无数据');
            }
            wx.hideLoading()
        }).catch(err=>{
            wx.hideLoading()
            utils.showWxToast('查无数据');
            
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