const app = getApp();
const apis = app.apis;
const utils = app.utils;
Page({
    data:{
        count:5,
        alreadyUpload:123, 
        type:1,
        maxSize:100*1024*1024,
        readonly:true,
        showDownload:false,
        filePassword:'',
        waterMark:'',
        fileName:'',
        fileTempUrl:'',
        userIntegral:0,
        balanceCount:0,
        showIntegralTips:false,
        notEnough:false,
        url:'',
        expireDays:15
    },
    onLoad(options){
        this.initInfo()
    },
    initInfo() {
        let that = this;
        let data = {
            uid:utils.getUserId()
        }
        
    },
    
    onChangeUrl(event) {
        this.setData({
            url:event.detail
        })
    },
    generateShort(){
        console.log(this.data.url)
    },
    copyText(e){
        console.log('copy text')
    }
})