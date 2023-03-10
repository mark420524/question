const app = getApp();
const apis = app.apis;
Page({
    data:{
      showAd:getApp().globalData.showAd,
        activeName:'1',
        integralList:[
            
        ]
    },
    onLoad(){
      let that = this;
      apis.getIntegral().then(res=>{
        that.setData({
          integralList:res
        })
      })
    },
    onChange(event) {
        this.setData({
          activeName: event.detail,
        });
      },
})