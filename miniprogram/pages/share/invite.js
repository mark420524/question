const app = getApp();
const apis = app.apis;
const utils = app.utils;
Page({
    data:{
        showAd:getApp().globalData.showAd,
        integral:0,
    },
    onLoad(){
        let that = this;
        apis.getInviteIntegral().then(res=>{
            res = res || 0;
            that.setData({
                integral:res
            })
        });
    },
    onShareAppMessage(){
        let uid = utils.getUserId();
        return {
            title:'亲爱的，来这里答题喽',
            imageUrl:'http://image.siival.com/2.png', 
            path:'/pages/index/index?uid='+uid 
        }
    },
    gotoInviteLog(){
        wx.navigateTo({
          url: '/pages/integral/invite',
        })
    }
})