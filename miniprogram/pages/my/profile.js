const app = getApp();
const apis = app.apis;
const utils = app.utils;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: '/static/images/avatar.png',
    nickName:'',
    fileTempPath:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initInfo();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  initInfo(){
    let userInfo = wx.getStorageSync('userInfo');
    //console.log(userInfo)
    if (userInfo) {
      this.setData({
        avatarUrl:userInfo.avatarUrl,
        nickName:userInfo.nickName
      })
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.initInfo();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  onChooseAvatar(e) {
    const { avatarUrl } = e.detail 
    console.log(avatarUrl)
    this.setData({
      fileTempPath:avatarUrl,
      avatarUrl:avatarUrl,
    })
  },
  onChangeNickname(e){
    this.setData({
      nickName:e.detail
    })
  },
  submitUserInfo(){
    let userInfo = wx.getStorageSync('userInfo') || {};
    let filePath=this.data.fileTempPath;
    let  nickName=this.data.nickName;
    let data={
        uid:utils.getUserId(),
        filePath:filePath, 
        nickName:nickName
    }
    wx.showLoading({
      title: '正在保存',
    })
    //console.log(filePath, data)
    //没文件还不能上传,
    if (filePath) {
      apis.updateUserInfo(data).then(res=>{
        wx.hideLoading( );
        userInfo.avatarUrl=res;
        userInfo.nickName = nickName;
        wx.setStorageSync('userInfo', userInfo) 
        wx.navigateBack({
          delta: 1,
        })
      })
    }else{
      apis.updateUser(data).then(res=>{
        wx.hideLoading( );
        if (res==1) {
          userInfo.nickName = nickName;
          wx.setStorageSync('userInfo', userInfo);
          utils.showWxToast('更新成功')
          wx.navigateBack({
            delta: 1,
          })
        }else{
          utils.showWxToast('更新失败')
        }
      })
    }
    
  }
})