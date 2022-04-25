const db = wx.cloud.database();
Page({
    data:{
      toolsItems:[
      ]
    },
    onLoad(){
      let that = this;
      db.collection('tools_item')
        .orderBy('sort', 'asc')
        .where({
          status:1
        })
        .get({
          success: function(res) {
            that.setData({ 
              toolsItems:res.data,
            })
          }
        });
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