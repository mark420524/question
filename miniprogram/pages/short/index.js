const app = getApp();
const apis = app.apis;
const utils = app.utils;
Page({
    data:{
        count:5,
        alreadyUpload:123, 
        balanceCount:0, 
        url:'',
        expireDays:15,
        showResult:false,
        shortUrl:'',
        generateShow:false,
    },
    onLoad(options){
        this.initInfo()
    },
    initInfo() {
        let that = this;
        let data = {
            uid:utils.getUserId()
        }
        apis.getShortUrlInfo(data).then(res=>{
            let freeCount = res.freeCount;
            let alreadyUpload=res.count;
            let balanceCount = freeCount-alreadyUpload;
            balanceCount=balanceCount<=0?0:balanceCount
            that.setData({
                expireDays:res.days,
                count:freeCount,
                alreadyUpload:alreadyUpload,
                balanceCount:balanceCount,
                generateShow:balanceCount>0
            })
        })
    },
    
    onChangeUrl(event) {
        this.setData({
            url:event.detail
        })
    },
    generateShort(){
        //console.log(this.data.url)
        let longUrl = this.data.url;
        if (!longUrl) {
            utils.showWxToast('请输入长链接');
            return;
        }
        let data={
            longUrl: longUrl,
            uid:utils.getUserId()
        }
        let that = this;
        apis.generateShortUrl(data).then(res=>{
            let count = res.count || 0 ;
            let balanceCount = that.data.count-count;
            balanceCount=balanceCount<=0?0:balanceCount
            that.setData({
                showResult:true,
                balanceCount:balanceCount,
                alreadyUpload:count,
                shortUrl:res.shortUrl
            })
        })
    },
    copyText(e){
        let shortUrl = e.currentTarget.dataset.text;
        wx.setClipboardData({
            data: shortUrl,
            success (res) {
              //console.log(res)
            }
        });
    }
})