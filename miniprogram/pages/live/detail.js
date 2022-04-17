const app = getApp();
const utils = app.utils;
Page({
    data:{
        item:{}
    },
    onLoad(){
        let item = wx.getStorageSync('liveItem' );
        //console.log(item)
        this.setData({item:item})
    },
    onHide: function() {
       this.unloadData();
    },
     onUnload: function() {
        this.unloadData();
     },
    unloadData(){
        wx.removeStorageSync( 'liveItem'  );
    },
    videoErrorCallback(e){
        //utils.showWxToast('视频加载失败，请稍候重试');
    }
})