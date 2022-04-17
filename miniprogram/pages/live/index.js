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
            if (result.code===0) {
                that.setData({
                    items:result.data
                })
            }else{
                utils.showWxToast('查无数据');
            }
            wx.hideLoading()
        }).catch(err=>{
            wx.hideLoading()
        })
        
    },
    handlerItemClick(e){
        
        let item = e.currentTarget.dataset.live;
        console.log(item);
    }
})