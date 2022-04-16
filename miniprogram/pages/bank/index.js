const app = getApp();
const utils = app.utils;
Page({
    data(){
        return {
            question_bank:{},
        }
    },
    onLoad(options){
        const conclusion = wx.getStorageSync('conclusion')
        const num = options.length;
        const question_bank = [];
        for(let i in conclusion ){
            question_bank.push(conclusion[i]);
        }
        //console.log(question_bank)
        this.setData( { question_bank:question_bank})
    },
    
    chooseIndex(e){
        const index = e.target.dataset.index
        if(index){
            utils.setCollectionIndex(index)
            wx.navigateBack({
              delta: 0,
            }) 
        }
    }
    
})