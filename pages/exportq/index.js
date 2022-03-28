const app = getApp();
const apis = app.apis;
const utils = app.utils;
Page({
    data:{
        selectCategory: '', 
        count:0,
        enough:true,
        showVal:'立即导出',
        email:''
    },
    onLoad(){
        this.init();
    },
    init(){
        let selectCategory = wx.getStorageSync('selectCategory') ;
        let that = this;
        that.setData({
            selectCategory:selectCategory
        })
        let data={
            cid : utils.getAnswerCid(),
            uid: utils.getUserId()
        }
        apis.getExportInfo(data).then(res=>{
            console.log(res)
            that.setData({
                count:res.count,
                integral:res.integral,
                enough:res.integral>=res.count
            })
        })
    },
    onChange(event) {
        // event.detail 为当前输入的值
         //console.log(event.detail);
         this.setData({
             email:event.detail
         })
    },
    exportQuestion(){
        let that = this;
        let email = this.data.email;
        let count = this.data.count;
        console.log('email',email)
        let re = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
        if (email && re.test(email)) { 
            let data={
                uid:utils.getUserId(),
                cid:utils.getAnswerCid(),
                email:email
            }
            apis.exportQuestions(data).then(res=>{
                let signRegex = /^\d+$/;
                if(signRegex.test(res)){
                    utils.showWxToast('已提交，请十分钟后查看邮箱附件');
                    that.setData({
                        integral:res ,
                        enough: res >=count
                    })
                    
                }else{
                    utils.showWxToast(res); 
                }
                
            })
        }else{
            utils.showWxToast('请输入正确的邮箱格式喔!');
        }
    },
    inviteFriend(){
        wx.navigateTo({
          url: '/pages/share/invite',
        })
    },
})