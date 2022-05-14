const app = getApp();
const utils = app.utils;
Page({
    data:{
        count:5,
        integral:100,
        type:1,
        maxSize:100*1024*1024,
        readonly:true
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
    }
})