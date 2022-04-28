Page({
    data: {
        examTime:'29分59秒',
        examScore:0
    },
    onLoad(options){
       //console.log(options);
        let score = options.score;
        let cTime = options.time;
        let min = Math.floor(cTime/60)<10 ? '0'+Math.floor(cTime/60) : Math.floor(cTime/60) || 0;
        let s = (cTime%60)<10 ? '0'+cTime%60 : cTime%60 || 0;
        this.setData({
            examScore:score,
            examTime: min + '分' + s+'秒'
        })
    },
    examAgain(){
        wx.redirectTo({
          url: '/pages/confirm/index',
        })
    },
    showExamRank(){
        wx.redirectTo({
            url: '/pages/rank/index',
          })
    }
    
})