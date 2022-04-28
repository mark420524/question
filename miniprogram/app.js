// app.js
import api from 'api/api.js'
import util from 'utils/util.js'
let appId = wx.getAccountInfoSync().miniProgram.appId;
App({
  onLaunch() {
    let menuVersion = util.getMenuVersionIndex() || 0;
    let uid = util.getUserId();
    let data={uid:uid}
    api.systemInit(data).then(res=>{
      let category=res.category;
      let systemVersion = parseInt(category)
      if (systemVersion > menuVersion) {
        this.loadMenu(systemVersion);
      }else{
        console.log('题库分类已经最新无需加载');
      }
    })
    wx.cloud.init({
      //set your cloud  env 
      env: 'rightanswer-9gmtbrkw2347f7cd'
    })
    // 登录
    /*
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    */
  },
  loadMenu:function(systemVersion){
    api.getQuestionMenu(0).then(res =>{
      //console.log('menu info ', res);
      wx.setStorageSync('cidInfo', res)
      util.setMenuVersionIndex(systemVersion);
    });
  },
  globalData: {
    userInfo: null
  },
  apis: api,
  utils: util,
  appId: appId
})
