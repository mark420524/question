Page({
    data:{
        item:{}
    },
    onLoad(){
        let item = wx.getStorageSync('poetryItem' );
        console.log(item)
        wx.setNavigationBarTitle({
          title: item.title,
        })
        this.setData({item:item})
    },
    onHide: function() {
       console.log('onhide')
      },
    onUnload: function() {
        this.unloadData();
    },
    unloadData(){
        wx.removeStorageSync( 'poetryItem'  );
    }
})