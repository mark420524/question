
const db = wx.cloud.database();
Page({
    data:{
      toolsItems:[]
    },
    onLoad(){
      this.initData();
    },
    initData(){
      let that = this;
      db.collection('tools_list')
        .orderBy('sort', 'asc')
        .where({
          status:1
        })
        .get({
          success: function(res) {
            //console.log(res.data)
            that.setData({ 
              toolsItems:res.data,
            })
          }
        }
        );
    },
    handlerItemClick(e){
      let dataset = e.currentTarget.dataset;
      wx.navigateToMiniProgram({
        appId: dataset.appid,
        path:  dataset.path,
        success:function(res){
            console.log(res)
        },
        fail:function(res){
            console.log(res)
        }
    })
    }
    
})