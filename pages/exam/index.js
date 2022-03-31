const db = wx.cloud.database();
Page({
    data:{
        exam:{},
        examIntegral:1,
        userIntegral:0,
        enough:false,
    },
    onLoad(){
        let item = wx.getStorageSync('examItem' );
        
        this.setData({exam:item})
        this.initExamIntegral(1110);
    },
    initExamIntegral(userIntegral){
        let that = this;
        db.collection('sys_dict').limit(1).where({ 
            type: 'exam_integral',
            status:1
          })
          .get({
              success:res=>{
                  if (res.data && res.data.length>0){
                    let item = res.data[0];
                    that.setData({
                        examIntegral:item.value,
                        userIntegral:userIntegral,
                        enough:userIntegral>=item.value
                    })
                  }else{
                    utils.showWxToast('很遗憾，导出功能已下线');
                  }
              },
              fail:res=>{
                  utils.showWxToast('读取导出试卷积分失败');
              }
          });
    },
    onHide: function() {
       console.log('onhide')
      },
    onUnload: function() {
        this.unloadData();
    },
    unloadData(){
        wx.removeStorageSync( 'examItem'  );
    },
    inviteFriend(){
        wx.navigateTo({
          url: '/pages/share/invite',
        })
    },
})