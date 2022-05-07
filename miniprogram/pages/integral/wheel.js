
const app = getApp();
const utils = app.utils;
const apis = app.apis;
Page({
  data: {
    lottery: [],
    canRoll: false,
    num:1,
    lotteryArrLen:0,
    alreadyWheel:true,
    wheelIntegral:0,
    wheelInfo:[]
  },

  onLoad(opt) { 
      
    let aniData = wx.createAnimation({ //创建动画对象
      duration: 2000,
      timingFunction: 'ease'
    });
    this.aniData = aniData; //将动画对象赋值给this的aniData属性
    this.initTodayWheelInfo();
  },
  initTodayWheelInfo(){
    let that = this;
    let data={uid:utils.getUserId()}
    apis.getIntegralWheel(data).then(res=>{
      //console.log(res)
      let lotteryInfo = res.lotteryInfo;
      let lottery = that.setPlateData(lotteryInfo);
      let lotteryArrLen = lottery.length;
      that.setData({
        alreadyWheel:res.alreadyWheel,
        canRoll:!res.alreadyWheel,
        wheelIntegral:res.integral,
        lottery: lottery,
        lotteryArrLen:lotteryArrLen,
        wheelInfo:lotteryInfo
      })
    })
  },
  setPlateData(lottery) { //设置+数组
    let lotteryArrLen = lottery.length; //获取+数组的长度，用来判断
    let dataLen = 0; //用来放原来数组的索引
    let evenArr = new Array(lotteryArrLen * 2); //创建扩展数组
    for (let i = 0; i < (lotteryArrLen * 2); i++) {
      if (i % 2 == 1) {
        evenArr[i] = '+' + lottery[dataLen].integral; //将原来数组的值赋值给新数组
        dataLen++; //原来数组的索引加一
      } else {
        evenArr[i] = '谢谢'
      }
    }
    lottery = [...evenArr]; //将整合好的数组赋值给lottery数组
    return lottery;
  },
  startRollTap() { //开始转盘
    
    let num = this.data.num;
    let canRoll = this.data.canRoll;
    let lotteryArrLen=this.data.lotteryArrLen;
    if (canRoll) {
      wx.showLoading({
        title: '抽奖中',
      })
      
      let aniData = this.aniData; //获取this对象上的动画对象
      
      let data = {uid:utils.getUserId()};
      let that = this;
      apis.userIntegralWheel(data).then(res=>{
        wx.hideLoading( );
        if (res.alreadyWheel) {
          //今天已经抽过了
          that.setData({ 
            canRoll:false,
            alreadyWheel:true
          })
        }else {
          
          let rightNum = res.index;
          aniData.rotate(3600 * num - 360 / lotteryArrLen * rightNum).step();
          num++;
          canRoll = false;
          that.setData({
            aniData: aniData.export(),
            num:num,
            canRoll:canRoll,
            alreadyWheel:false,
            wheelIntegral:res.integral
          })
        }
        //只能通过着这样toast了，不然效果不好
        setTimeout(function() {
          that.setData({
            alreadyWheel:true
          });
          utils.showWxToast(res.message);
        }.bind(that), 2100)
        
      })
      
      
    }
  }
})
