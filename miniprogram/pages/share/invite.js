const app = getApp();
const utils = app.utils;
const db = wx.cloud.database();
Page({
    data:{
        integral:0,
    },
    onLoad(){
        let that = this;
        db.collection('sys_dict').limit(1).where({ 
            type: 'share_integral',
            status:1
          })
          .get({
              success:res=>{
                  //console.log(res)
                  if (res.data && res.data.length>0){
                    let item = res.data[0];
                    that.setData({
                        integral:item.value
                    })
                  }else{
                    utils.showWxToast('很遗憾，赠送积分功能已下线');
                  }
              },
              fail:res=>{
                  utils.showWxToast('读取赠送积分失败');
              }
          });
    },
    onShareAppMessage(){
        let uid = utils.getUserId();
        return {
            title:'亲爱的，来这里答题喽',
            imageUrl:'cloud://rightanswer-9gmtbrkw2347f7cd.7269-rightanswer-9gmtbrkw2347f7cd-1309548476/2.png', 
            path:'/pages/index/index?uid='+uid 
        }
    },
    gotoInviteLog(){
        wx.navigateTo({
          url: '/pages/integral/invite',
        })
    }
})