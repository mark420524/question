Page({
    data:{
        item:{}
    },
    onLoad(){
        let item = wx.getStorageSync('poetryItem' );
        console.log(item)
        
        this.setData({item:item})
    },
})