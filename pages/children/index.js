const db = wx.cloud.database()
Page({
    data:{},
    handlerChildren(e){
        let type = e.currentTarget.dataset.type;
        db.collection('children').limit(1)
        .where({
          type:type
        })
        .get({
          success: function(res) {
            let item =  res.data[0];
            wx.setStorageSync('poetryItem', item)
            wx.navigateTo({
                url: '/pages/detail/index',
            })
          }
        }
        );
        
    }
})