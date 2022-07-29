
const app=getApp();
const apis = app.apis;
Page({
    data:{
      toolsItems:[]
    },
    onLoad(){
      this.initData();
    },
    initData(){
      let that = this;
      
      apis.toolsApp( ).then(res=>{
        console.log(res)
        that.setData({
          toolsItems:res
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