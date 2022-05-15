const app = getApp();
const utils = app.utils;
Page({
    data:{
        count:5,
        alreadyUpload:5,
        integral:100,
        type:1,
        maxSize:100*1024*1024,
        readonly:true,
        showDownload:false,
        filePassword:'',
        waterMark:''
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
        wx.hideLoading( )
        console.log(data,msg)
        if(msg){
            utils.showWxToast(msg)
        }else{
            //upload
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
        console.log(waterMark)
    },
    onChangePassword(e){
        let password = e.detail;
        console.log(password)
    }
    
})