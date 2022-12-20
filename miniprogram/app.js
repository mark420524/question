// app.js
import api from 'api/api.js'
import util from 'utils/util.js'
let appId = wx.getAccountInfoSync().miniProgram.appId;
App({
  onLaunch() {
  },
  globalData: {
    userInfo: null
  },
  apis: api,
  utils: util,
  appId: appId
})
