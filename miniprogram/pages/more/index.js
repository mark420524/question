const app = getApp();
const apis = app.apis;
Page({
    data:{
      toolsItems:[
      ]
    },
    onLoad(){
      let that = this;
      let data={
        dbname:'tools_item',
        params:{
          status:1,
        },
        sort:'sort',
        functionName:'querydata'
      }
      apis.callfunction(data).then(res=>{
        that.setData({
          toolsItems:res
        })
      })
    },
    onShow(){ 
        if (typeof this.getTabBar === 'function' &&
            this.getTabBar()) {
            this.getTabBar().setData({
              active: 2,
            })
          }
      },
      onShareAppMessage(){
        return {
            title:'查汉字，学成语喽',
            imageUrl:'',//图片样式
            path:''//链接
        }
    },
})