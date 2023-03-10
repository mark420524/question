// app.js
import api from 'api/api.js'
import util from 'utils/util.js'
let appId = wx.getAccountInfoSync().miniProgram.appId;
let showAd = util.showAd();
if (showAd===undefined || showAd === '') {
  showAd = 1;
}
App({
  onLaunch() {
  },
  globalData: {
    userInfo: null,
    showAd:showAd
  },
  apis: api,
  utils: util,
  appId: appId
})
