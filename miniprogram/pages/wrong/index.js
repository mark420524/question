const app = getApp();
const apis = app.apis;
const utils = app.utils;
Page({
    data:{
        showAd:getApp().globalData.showAd,
            selectCategory: '',
            wrongCount: 0,
            showVal: '查看错题',
            autoRemove: 1
    
  },
  onLoad( ){
      this.init();
      wx.setStorageSync('autoRemove', 1)
  },
 
      init(){
            let selectCategory = wx.getStorageSync('selectCategory') ;
            /*
            if (selectCategory.indexOf('>') > -1 ) {
                selectCategory=selectCategory.substring(selectCategory.indexOf('>')+1);
            }
            if (selectCategory.indexOf('>') > -1 ) {
                selectCategory=selectCategory.substring(selectCategory.indexOf('>')+1);
            }
            */
            
            let showVal = '去练习';
            let _this = this;
            let data = {
                cid: utils.getAnswerCid(),
                uid: utils.getUserId() 
            }
            apis.wrongCount(data).then(res=>{
                //console.log('wrong',res);
                let wrongCount = res;
                if (res) {
                    showVal = '查看错题';
                }
                _this.setData( {
                    selectCategory:selectCategory,
                     wrongCount: wrongCount,
                     showVal:showVal
                })
                
            })
        },
        goQuestion(){
            let count = this.data.wrongCount ;
            // type 1 答题 2 错题  3 收藏 4 模拟考试
            if (count>0) {
                utils.setAnswerType(2)
            }else{
                utils.setAnswerType(1)
            }
            wx.redirectTo({
                url:'/pages/question/index'  
            });
        },
        changeSwitch(e){
            
            let autoRemove = 0;
            if (e.detail.value) {
                autoRemove = 1;
            } 
            wx.setStorageSync('autoRemove', autoRemove);
        },
         
  
})