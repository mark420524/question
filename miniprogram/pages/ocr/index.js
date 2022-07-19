const app = getApp();
const apis = app.apis;
Page({
    data:{
        ocrCount:5
    },
    chooseImage(e) {
        wx.showLoading({
          title: '处理中',
        })
        let that = this;
        let sourceType = e.currentTarget.dataset.sourceType;
        if (sourceType==='camera') {
          //校验是否授权
          wx.getSetting({
            success:function(res) {
              if (res.authSetting['scope.camera']) {
                //已经授权打开摄像头
                that.choosePicture(sourceType); 
              }else{
                //去授权页面
                wx.authorize({
                  scope: 'scope.camera',
                  success () {
                    that.choosePicture(sourceType); 
                  },
                  fail(){
                    that.openAuthCamera()	
                  }
                })
              }
            },
            fail:function(){
              utils.showWxToast('获取摄像头拍照权限失败');
            },
            complete:function(res){
              wx.hideLoading( )
            }
          });
        }else {
          wx.hideLoading( )
          this.choosePicture(sourceType);
        }
      },
      openAuthCamera(){
        wx.showModal({
          content: '检测到您没打开访问摄像头权限，是否打开？',
          confirmText: "确认",
          cancelText: "取消",
          success: function (res) {
          
          //点击“确认”时打开设置页面
          if (res.confirm) {
            wx.openSetting({
            success: (res) => { }
            })
          } else {
            console.log('用户点击取消')
          }
          }
        });
      },
      choosePicture(sourceType){
        let that = this;
        wx.chooseMedia({
          count: 1,
          sizeType: ['original', 'compressed'],
          mediaType: ['image'],
          sourceType: [sourceType],
          success(res) {
            let file_path = res.tempFiles[0].tempFilePath;
            if (file_path === null || file_path === undefined) {
              utils.showWxToast(  '选择文件异常…' )
              return
            }
            
            wx.showLoading({ title: '上传中,请稍等…' })
            
            let data= {
              filePath:file_path,
            }
            console.log(data)
            apis.imageUpload(data).then(res=>{
              wx.hideLoading();
              console.log(res)
              if(res){
                wx.setStorageSync('previewImage', res)
                wx.navigateTo({
                  url: '/pages/preview/index',
                })
              }else{
                utils.showWxToast('上传异常，请稍候重试')
              }
              
            })
          },
        })
      },
})