const app = getApp();
const apis = app.apis;
const utils = app.utils;
Page({
    data:{},
    handlerChildren(e){
      wx.showLoading({
        title: '查询中',
      })
      let type = e.currentTarget.dataset.type;
      let data={
        type:type
      }
      apis.chineseChildren(data).then(res=>{
            wx.hideLoading( );
            let item =  res; 
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
          }
        );
        
    }
})