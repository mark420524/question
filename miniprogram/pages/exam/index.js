const app = getApp();
const apis = app.apis;
const utils = app.utils;
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
        apis.examInfo(data).then(res=>{
            that.setData({
                examIntegral:res.needIntegral,
                userIntegral:res.integral,
                enough:res.integral>=res.needIntegral
            })
        });
    },
    onHide: function() {
       //console.log('onhide')
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
        //console.log('email',email)
        
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