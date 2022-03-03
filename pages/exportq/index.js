Page({
    data:{
        selectCategory: '', 
        count:0,
    },
    onLoad(){
        this.init();
    },
    init(){
        let selectCategory = wx.getStorageSync('selectCategory') ;
        let that = this;
        that.setData({
            selectCategory:selectCategory
        })
    }
})