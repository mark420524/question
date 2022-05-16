const app = getApp();
const apis = app.apis;
const utils = app.utils;
Page({
    data:{
        count:5,
        alreadyUpload:123,
        integral:100,
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
    },
    onLoad(options){
        options = options||{}
        let type = parseInt( options.type);
        this.initInfo(type)
       
    },
    initInfo(type) {
        let that = this;
        let data = {
            uid:utils.getUserId(),
            type:type
        }
        apis.getTodayHandleInfo(data).then(res=>{
            console.log(res)
            let freeCount = res.freeCount;
            let alreadyUpload=res.count;
            let balanceCount = freeCount-alreadyUpload;
            balanceCount=balanceCount<=0?0:balanceCount
            let enough = balanceCount==0 && res.needIntegral>res.integral;
            that.setData({
                type: type,
                count: freeCount,
                integral:res.needIntegral,
                userIntegral:res.integral,
                alreadyUpload:alreadyUpload,
                balanceCount:balanceCount,
                showIntegralTips:balanceCount==0,
                notEnough:enough
            })
        })
    },
    afterRead(e){
        const {file} = e.detail;
        console.log(file)
        let handleType = this.data.alreadyUpload>=this.data.count?2:1;
        this.setData({
            fileName: file.name
        })
        let data={
            uid:utils.getUserId(),
            filePath:file.url,
            type:handleType,
            fileName:this.data.fileName
        }
        wx.showLoading({
          title: '上传处理中',
        })
        let msg = '';
        let type = this.data.type;
        if ( type==1) {
            //加密
            let password = this.data.filePassword;
            data.readonly=this.data.readonly?1:0;
            if (password) {
                data.password = password;
            }else{
                msg = '请输入加密密码'
            }
        }else if( type==2){
            //解密
        }else {
            //加水印
            let waterMark = this.data.waterMark;
            if (waterMark) {
                data.waterMark = waterMark;
            }else{
                msg = '请输入水印字符'
            }
        }
        
        console.log(data,msg)
        if(msg){
            utils.showWxToast(msg)
        }else{
            let that = this;
            //upload
            if (type==1) {
                apis.encryptPdf(data).then(res=>{
                    //console.log(res)
                    wx.hideLoading( )
                    that.handlerUploadFileRes(res)
                })
            }else if(type==2){
                apis.decryptPdf(data).then(res=>{
                    //console.log(res)
                    wx.hideLoading( )
                    that.handlerUploadFileRes(res)
                })
            }else{
                apis.addWatermark(data).then(res=>{
                    wx.hideLoading( )
                    that.handlerUploadFileRes(res)
                })
            }

        }
    },
    handlerUploadFileRes(res){ 
        if (res && res.path) {
            utils.showWxToast('处理成功');
            let tempurl = res.domain + res.path;
            let count = res.count;
            let balanceCount = this.data.count-count;
            balanceCount=balanceCount<=0?0:balanceCount
            this.setData({
                fileTempUrl:tempurl,
                showDownload:true,
                alreadyUpload:count,
                balanceCount:balanceCount
            })
        }else{
            utils.showWxToast(res)
            let alreadyUpload = this.data.alreadyUpload;
            alreadyUpload++;
            let balanceCount = this.data.count-alreadyUpload;
            balanceCount=balanceCount<=0?0:balanceCount;
            this.setData({
                alreadyUpload:alreadyUpload,
                balanceCount:balanceCount
            })
        }
    },
    getFileExtension(filename) {
        return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2)
    },
    beforeRead(event) {
        const { file, callback } = event.detail;
        let type = file.type;
        let name = file.name;
        let suffix = this.getFileExtension(name);
        let size = file.size;
        
        let ok = false;
        if (type==='file' && /^pdf$/i.test(suffix)) {
            if(size==0){
                utils.showWxToast('文件大小为0')
            }else {
                if (size>this.data.maxSize) {
                    utils.showWxToast('文件超过最大限制')
                }else{
                    ok = true;
                }
            }
        }else{
            utils.showWxToast('请选择pdf文件')
        }
        callback(ok);
    },
    onChangeReadonly(e){  
        this.setData({ readonly: e.detail });
    },
    downloadFile(){
        console.log(this.data.fileTempUrl)
    },
    onChangeWaterMark(e){
        let waterMark = e.detail;
        this.setData({
            waterMark:waterMark
        })
    },
    onChangePassword(e){
        let password = e.detail;
        this.setData({
            filePassword:password
        })
    }
    
})