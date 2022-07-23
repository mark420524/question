const app = getApp();
const apis = app.apis;
const utils  = app.utils;
Page({
    data:{
        ocrCount:5,
        alreadyCount:0,
        canOcr:false,
        token:''
    },
    onLoad(){
      this.initOcrInfo();
    },
    initOcrInfo(){
      let data={
        uid:utils.getUserId() 
      }
      let that = this;
      apis.ocrInfo(data).then(res=>{
        //console.log(res)
        that.setData({
          ocrCount:res.limit,
          alreadyCount:res.count,
          canOcr:res.limit>res.count
        })
      })
    },
    chooseImage(e) {
      let canOcr = this.data.canOcr;
      
      if (!canOcr) {
        utils.showWxToast('今天免费次数已用完，联系管理员获取更多次数');
        return;
      }
      wx.showLoading({
        title: '生成token中',
      });
      let data={
        uid:utils.getUserId()
      }
      let that = this;
      apis.ocrGenerateToken(data).then(res=>{
        wx.hideLoading()
        let alreadyCount = that.data.alreadyCount;
        alreadyCount++;
        that.setData({ 
          alreadyCount:alreadyCount,
          canOcr:that.data.limit>alreadyCount,
          token:res
        })
        that.uploadImage();
      })
      
    },
    uploadImage(){
      wx.showLoading({
        title: '上传文件中',
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
              uid:utils.getUserId(),
              token:that.data.token
            }
            console.log(data)
            apis.imageUpload(data).then(res=>{
              wx.hideLoading();
              console.log(res)
              if(res){
                //处理显示ocr iinfo

              }else{
                utils.showWxToast('上传异常，请稍候重试')
              }
              
            })
          },
        })
      },
})