const db = wx.cloud.database();
Page({
    data:{
        activeName:'1',
        integralList:[
            
        ]
    },
    onLoad(){
      let that = this;
      db.collection('integral_type')
        .orderBy('sort', 'asc')
        .where({
          status:1
        })
        .get({
          success: function(res) {
            that.setData({ 
              integralList:res.data,
            })
          }
        }
        );
    },
    onChange(event) {
        this.setData({
          activeName: event.detail,
        });
      },
})