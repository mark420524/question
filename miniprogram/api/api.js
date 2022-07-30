import {
    http,uploadFile,callfunction,uploadFileToOcr
  } from 'http.js'
const fs = wx.getFileSystemManager();
  var url = {
    systemInit:"init",
    userLogin: "v2/user/login",
    getUserPhone: "user/phone",
    getQuestionMenu: "category/list",
    userCardReceive: "card/receive",
    favoriteCount : 'answer/favoriteCount',
    questionList: 'question/list',
    questionCount: 'question/count',
    wrongCount: 'answer/wrongCount',
    isFavoriteQuestion:'answer/isfavorite',
    favoriteQuestion:'answer/favorite',
    saveUserWrongAnswer:'answer/wrong',
    updateUser:'user/updateUser',
    saveSubmitUserExam:'exam/submit',
    examRank:'exam/rank',
    userSignin:'user/signin',
    userSignInfo:'user/sign/info',
    myIntegral:'user/integral',
    myIntegralList:'user/integral/list',
    questionCorrect:'question/correct',
    notifyInfo:'notify/info',
    searchData:'question/search',
    exportInfo:'export/info',
    exportQuestions:'export/',
    todayQuestionInfo:'question/today',
    answerTodayQuestion:'question/today/answer',
    getMyIviteList:'user/invite/list',
    searchExam:'exam/search',
    exportExam:'export/exam',
    getExamMenu: "category/exam/list",
    integralWheel: 'user/integral/wheel',
    examInfo:'exam/info',
    getInviteIntegral:'setting/invite',
    encryptPdf:'pdf/encrypt',
    decryptPdf:'pdf/decrypt',
    todayHandleInfo:'pdf/info',
    addWatermark:'pdf/watermark',
    getQQGroup:'setting/qqgroup',
    updateUserV2:'user/v2/updateUser',
    ocrGenerateToken:'ocr/token/generate',
    ocrInfo:'ocr/info',
    uploadImageToOcr:'ocr',
    toolsItem:'tools/item',
    toolsApp:'tools/other',
    chineseWord:'chinese/word',
    chineseIdiom:'chinese/idiom',
    englishChinese:'english/chinese',
    poetryCategory:'poetry/category',
    poetryInfo:'chinese/poetry',
    chineseChildren:'chinese/children',
    openTvInfo:'tv/info',
    getIntegral: 'setting/integral',
  }
  module.exports = {
    userLogin(data) {
      let appId = data.appId;
      delete data.appId;
      return http({
        url: url.userLogin+'/'+appId,
        data: data,
        method: 'POST'
      })
    },
    getUserPhone(params) {
      return http({
        url: url.getUserPhone,
        data: params
      })
    },
    
    userCardReceive() {
      return http({
        url: url.userCardReceive,
        method:"GET"
      })
    },
    getQuestionMenu(pid){
      return http({
        url: url.getQuestionMenu,
        method:"GET",
        data:{ pid: pid}
      })
    },
    favoriteCount (data ) {
      return http({
        url:url.favoriteCount, 
        data:data
      })
    },
    question: function (data ) {
      return http({
        url: url.questionList, 
        data: data 
      })
    },
    wrongCount: function(data ) {
       return http({
         url:url.wrongCount, 
        data:data  
       })
    },
    isFavoriteQuestion: function (data){
      return http({
        url:url.isFavoriteQuestion,
        data:data
      })
    },
    favoriteQuestion:function(data){
      return http({
        url:url.favoriteQuestion,
        data:data
      })
    },
    saveUserWrongAnswer:function(data){
      return http({
        url:url.saveUserWrongAnswer,
        data:data
      })
    },
    updateUser:function(data){
      return http({
        url:url.updateUser,
        data:data
      })
    },
    getQuestionCount:function(data){
      return http({
        url:url.questionCount,
        data:data
      })
    },
    saveSubmitUserExam:function(data){
      return http({
        url:url.saveSubmitUserExam,
        data:data
      })
    },
    getExamRank:function(data){
      
      return http({
        url:url.examRank,
        data:data
      })
    },
    userSignin:function(data){
      return http({
        url:url.userSignin,
        data:data
      })
    },
    getUserSignInfo:function(data){
      return http({
        url:url.userSignInfo,
        data:data
      })
    },
    systemInit:function(data){
      return http({
        url:url.systemInit,
        method:'GET',
        data:data
      })
    },
    getMyIntegral:function(data){
      return http({
        url:url.myIntegral,
        data:data
      })
    },
    getMyIntegralList:function(data){
      return http({
        url:url.myIntegralList,
        data:data
      })
    },
    questionCorrect:function(data){
      return http({
        url:url.questionCorrect,
        data:data
      })
    },
    getNotifyInfo:function(data){
      return http({
        url:url.notifyInfo,
        data:data
      })
    },
    searchQuestion:function(data){
      return http({
        url:url.searchData,
        data:data
      })
    },
    getExportInfo:function(data){
      return http({
        url:url.exportInfo,
        data:data
      })
    },
    exportQuestions:function(data){
      return http({
        url:url.exportQuestions,
        data:data
      })
    },
    todayQuestionInfo:function(data){
      return http({
        url:url.todayQuestionInfo,
        data:data
      })
    },
    answerTodayQuestion:function(data){
      return http({
        url:url.answerTodayQuestion,
        data:data
      })
    },
    getMyIviteList:function(data){
      return http({
        url:url.getMyIviteList,
        data:data
      })
    },
    searchExam:function(data){
      return http({
        url:url.searchExam,
        data:data
      })
    },
    exportExam:function(data){
      return http({
        url:url.exportExam,
        data:data
      })
    },
    getExamMenu:function(data){
      return http({
        url:url.getExamMenu,
        method:'GET',
        data:data
      })
    },
    getIntegralWheel:function(data){
      return http({
        url:url.integralWheel,
        method:'GET',
        data:data
      })
    },
    userIntegralWheel:function(data){
      return http({
        url:url.integralWheel,
        method:'POST',
        data:data
      })
    },
    examInfo:function(data){
      return http({
        url:url.examInfo,
        method:'POST',
        data:data
      })
    },
    getInviteIntegral:function(){
      return http({
        url:url.getInviteIntegral,
        method:'GET' 
      })
    },
    callfunction:function(data){
      return callfunction(data)
    },
    encryptPdf:function(data){
      return uploadFile({
        url:url.encryptPdf,
        data:data
      })
    },
    decryptPdf:function(data){
      return uploadFile({
        url:url.decryptPdf,
        data:data
      })
    },
    getTodayHandleInfo:function(data){
      return http({
        url:url.todayHandleInfo,
        data:data
      })
    },
    addWatermark:function(data){
      return uploadFile({
        url:url.addWatermark,
        data:data
      })
    },
    getSystemInfo:function(data){
      const res = wx.getSystemInfoSync() || {}; 
      return res;
    },

    saveFileToDisk:function(data){
      let res = this. getSystemInfo();
      let platform = res.platform;
       
      return new Promise((resolve, reject) => {
        if (platform=='windows' || platform=='mac') {
          wx.saveFileToDisk({
            filePath: data,
            success: (res) => {
              
              resolve(res)
            },
            fail: (res) => {
              console.log(res)
              reject(res)
            },
            complete: (res) => {
              console.log(res)
            },
          })
        }else{
          fs.saveFile({
            tempFilePath:data,
            success: (res) => {
              resolve(res)
            },
            fail: (res) => {
              reject(res)
            },
            complete: (res) => {
              console.log(res)
            },
          })
        }
      })
    },
    getQQGroup:function(){
      return http({
        url:url.getQQGroup,
        method:'GET' 
      })
    },
    updateUserInfo:function(data){
      return uploadFile({
        url:url.updateUserV2,
        data:data
      })
    },
    ocrGenerateToken:function(data){
      return http({
        url:url.ocrGenerateToken,
        data:data
      })
    },
    ocrInfo:function(data){
      return http({
        url:url.ocrInfo,
        data:data
      })
    },
    ocrImageUpload:function(data){
      return uploadFileToOcr({
        url:url.uploadImageToOcr,
        data:data
      })
    },
    toolsItem:function(){
      return http({
        url:url.toolsItem,
        method:'GET',
      })
    },
    toolsApp:function(){
      return http({
        url:url.toolsApp,
        method:'GET',
      })
    },
    chineseWord:function(data){
      return http({
        url:url.chineseWord,
        data:data
      })
    },
    chineseIdiom:function(data){
      return http({
        url:url.chineseIdiom,
        data:data
      })
    },
    englishChinese:function(data){
      return http({
        url:url.englishChinese,
        data:data
      })
    },
    poetryCategory:function( ){
      return http({
        url:url.poetryCategory,
        method:'GET'
      })
    },
    poetryInfo:function(data){
      return http({
        url:url.poetryInfo,
        data:data
      })
    },
    chineseChildren:function(data){
      return http({
        url:url.chineseChildren,
        data:data
      })
    },
    openTvInfo:function(){
      return http({
        url:url.openTvInfo,
        method:'GET'
      })
    },
    getIntegral:function(data){
      return http({
        url:url.getIntegral,
        method:'GET'
      })
    }
  }