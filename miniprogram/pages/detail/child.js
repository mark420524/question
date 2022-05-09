//const record = wx.getRecorderManager();
Page({
    data:{
        item:{}
    },
    onLoad(){
        let item = wx.getStorageSync('childItem' );
        //console.log(item)
        wx.setNavigationBarTitle({
          title: item.title,
        })
        this.setData({item:item})
        //console.log('record',record)
    },
    onHide: function() {
       //console.log('onhide')
      },
    onUnload: function() {
        this.unloadData();
    },
    unloadData(){
        wx.removeStorageSync( 'childItem'  );
    }
})