
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
    wheelIntegral:0
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
        lotteryArrLen:lotteryArrLen  
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
      canRoll = false;
      let aniData = this.aniData; //获取this对象上的动画对象
      // TODO rightnum 从后台计算中奖概率
      wx.hideLoading( )
      let rightNum = ~~(Math.random() * lotteryArrLen); //生成随机数
      console.log(`随机数是${rightNum}`);
      console.log(`+是：${this.data.lottery[rightNum]}`);
      aniData.rotate(3600 * num - 360 / lotteryArrLen * rightNum).step(); //设置转动的圈数
      
      num++;
      
      this.setData({
        aniData: aniData.export(),
        num:num,
        canRoll:canRoll
      })
    }
  }
})
