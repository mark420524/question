const app = getApp();
const apis = app.apis;
const utils = app.utils;
Page({
    data:{
        selectCategory: '', 
        count:0,
        enough:true,
        showVal:'立即导出',
        email:''
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
        let data={
            cid : utils.getAnswerCid(),
            uid: utils.getUserId()
        }
        apis.getExportInfo(data).then(res=>{
            console.log(res)
            that.setData({
                count:res.count,
                integral:res.integral,
                enough:res.integral>=res.count
            })
        })
    },
    onChange(event) {
        // event.detail 为当前输入的值
         console.log(event.detail);
         this.setData({
             email:event.detail
         })
    },
    exportQuestion(){
        console.log('email',this.data.email)
    },
})