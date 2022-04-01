const db = wx.cloud.database()
const app = getApp();
const utils = app.utils;
Page({
    data:{},
    handlerChildren(e){
      wx.showLoading({
        title: '查询中',
      })
        let type = e.currentTarget.dataset.type;
        db.collection('children').limit(1)
        .where({
          type:type
        })
        .get({
          success: function(res) {
            wx.hideLoading( );
            let item =  res.data[0];
            
            let index = item.index;
            if (index==0){
              wx.setStorageSync('poetryItem', item);
              wx.navigateTo({
                url: '/pages/detail/index',
              })
            }else{
              wx.setStorageSync('childItem', item);
              wx.navigateTo({
                url: '/pages/detail/child',
              })
            }
            
          },
          fail: function(res){
            wx.hideLoading( );
            utils.showWxToast('查询失败');
          }
        }
        );
        
    }
})