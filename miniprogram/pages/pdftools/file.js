const app = getApp();
const apis = app.apis;
const utils = app.utils;
Page({
    data:{
        count:5,
        alreadyUpload:1,
        integral:100,
        type:1,
        maxSize:100*1024*1024,
        readonly:true,
        showDownload:false,
        filePassword:'',
        waterMark:'',
        fileName:'',
        fileTempUrl:''
    },
    onLoad(options){
        options = options||{}
        let type = parseInt( options.type);

        this.setData({
            type: type
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
            type:handleType
        }
        wx.showLoading({
          title: '上传处理中',
        })
        let msg = '';
        let type = this.data.type;
        if ( type==1) {
            //加密
            let password = this.data.filePassword;
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
                    console.log(res)
                    wx.hideLoading( )
                    if (res && res.path) {
                        utils.showWxToast('处理成功');
                        let tempurl = res.domain + res.path;
                        that.setData({
                            fileTempUrl:tempurl,
                            showDownload:true
                        })
                    }else{
                        utils.showWxToast(res)
                    }
                    
                })
            }else if(type==2){
                apis.decryptPdf(data).then(res=>{
                    console.log(res)
                    wx.hideLoading( )
                })
            }else{
                apis.addWatermark(data).then(res=>{
                    console.log(res)
                    wx.hideLoading( )
                })
            }

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
            
            if (size>this.data.maxSize) {
                utils.showWxToast('文件超过最大限制')
            }else{
                ok = true;
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
        console.log('download')
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