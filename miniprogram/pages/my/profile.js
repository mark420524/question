const app = getApp();
const apis = app.apis;
const utils = app.utils;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: '/static/images/avatar.png',
    nickname:'',
    fileTempPath:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
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
      nickname:e.detail
    })
  },
  submitUserInfo(){
    let filePath=this.data.fileTempPath;
    let  nickName=this.data.nickname;
    let data={
        uid:utils.getUserId(),
        filePath:filePath, 
        nickName:nickName
    }
    console.log(filePath, data)
    //没文件还不能上传,
    if (filePath) {
      apis.updateUserInfo(data).then(res=>{
        console.log(res)
      })
    }else{
      apis.updateUser(data).then(res=>{
        console.log(res)
      })
    }
    
  }
})