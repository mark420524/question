
const app=getApp();
const apis = app.apis;
Page({
    data:{
      showAd:getApp().globalData.showAd,
      toolsItems:[]
    },
    onLoad(){
      this.initData();
    },
    initData(){
      let that = this;
      let appId = app.appId;
      apis.toolsApp( ).then(res=>{
        //console.log(res)
        let arr = [];
        for (let i=0;i<res.length;i++) {
          if (res[i].appId==appId) {
            continue;
          }
          arr[arr.length] = res[i];
        }
        that.setData({
          toolsItems:arr
        })
      })
      
    },
    handlerItemClick(e){
      let dataset = e.currentTarget.dataset;
      wx.navigateToMiniProgram({
        appId: dataset.appid,
        path:  dataset.path,
        success:function(res){
            //console.log(res)
        },
        fail:function(res){
            //console.log(res)
        }
    })
    }
    
})