const app = getApp();
const apis = app.apis;
const utils = app.utils;
Page({
    data: {
       
            selectCategory: '',
            favoriteCount: 0,
            showVal: '查看收藏',
         
    },
    onLoad(){
        this.init();
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
            apis.favoriteCount(data).then( res=>{
                console.log('favorite',res);
                let favoriteCount = res;
                if (res) {
                    showVal = '查看收藏';
                }
                _this.setData({  
                    favoriteCount: favoriteCount,
                    showVal : showVal,
                    selectCategory:selectCategory
                });
                
            })
        },
        goQuestion(){
            let count = this.data.favoriteCount ;
            // type 1 答题 2 错题  3 收藏 4 模拟考试
            if (count>0) {
                utils.setAnswerType(3)
            }else{
                utils.setAnswerType(1)
            }
            wx.redirectTo({
                url:'/pages/question/index'  
            });
        }
 
})