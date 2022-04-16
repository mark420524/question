const app = getApp();
const apis = app.apis;
const utils = app.utils;
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
        let that = this;
        this.setData({exam:item})
        let data= {uid:utils.getUserId()}
        apis.getMyIntegral(data).then(res=>{
            res = res || 0;
            that.initExamIntegral(res);
        });
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
    onChange(event) {
        this.setData({
            email:event.detail
        })
    },
    exportExam(){
        let that = this;
        let email = this.data.email;
        let examIntegral = this.data.examIntegral;
        let userIntegral = this.data.userIntegral;
        console.log('email',email)
        
        if (utils.validEmail(email)) { 
            wx.showLoading({
              title: '正在提交',
            })
            let data={
                uid:utils.getUserId(),
                eid:this.data.exam.id,
                email:email
            }
            apis.exportExam(data).then(res=>{
                wx.hideLoading();
                let signRegex = /^\d+$/;
                if(signRegex.test(res)){
                    utils.showWxToast('已提交，请十分钟后查看邮箱附件');
                    that.setData({
                        userIntegral:userIntegral-examIntegral ,
                        enough: (userIntegral-examIntegral) >=examIntegral
                    })
                }else{
                    utils.showWxToast(res); 
                }
                
            })
        }else{
            utils.showWxToast('请输入正确的邮箱格式喔!');
        }
    }
})