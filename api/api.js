import {
    http
  } from 'http.js'
  
  var url = {
    systemInit:"init",
    userLogin: "user/login",
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
  }
  module.exports = {
    userLogin(code) {
      return http({
        url: url.userLogin,
        data: { code: code},
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
    }

  }