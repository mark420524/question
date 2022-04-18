let canRoll = true, //加控制，防止用户点击两次
  num = 1, //用在动画上，让用户在第二次点击的时候可以接着上次转动的角度继续转
  lotteryArrLen = 0  //放奖品的数组的长度
  ; //放奖品
Page({
  data: {
    lottery: ['奖品1', '奖品2','奖品3','奖品4','奖品5','奖品6']
  },

  onLoad(opt) { 
    this.setPlateData(this.data.lottery); //执行设置转盘表面的文字
    let that = this;
    let aniData = wx.createAnimation({ //创建动画对象
      duration: 2000,
      timingFunction: 'ease'
    });
    this.aniData = aniData; //将动画对象赋值给this的aniData属性
  },
  setPlateData(lottery) { //设置奖品数组
    lotteryArrLen = lottery.length; //获取奖品数组的长度，用来判断
    if (lotteryArrLen < 2) { //数组的奖品只有一个，扩展数组的长度到4
      let evenArr = new Array(8); //创建一个数组，方便操作。
      for (let i = 0; i < 8; i++) {
        if (i % 2 == 1) { //这里为什么要取1是为了在默认的界面将指针放在谢谢的地方，防止别人拿着中奖的截图来要奖品
          evenArr[i] = lottery[0]; //将原数组的内容赋值到新的数组
        } else {
          evenArr[i] = '谢谢' //在数组中间隔插入谢谢
        }
      }
      lottery = [...evenArr]; //将整合好的数组赋值给lottery数组
    } else { //数组中的奖品超过1个，则正常扩展数组，扩展的数组为原来的2倍
      let dataLen = 0; //用来放原来数组的索引
      let evenArr = new Array(lotteryArrLen * 2); //创建扩展数组
      for (let i = 0; i < (lotteryArrLen * 2); i++) {
        if (i % 2 == 1) {
          evenArr[i] = lottery[dataLen]; //将原来数组的值赋值给新数组
          dataLen++; //原来数组的索引加一
        } else {
          evenArr[i] = '谢谢'
        }
      }
      lottery = [...evenArr]; //将整合好的数组赋值给lottery数组
    }

    lotteryArrLen = lottery.length; //获取新的数组长度
    this.setData({
      lottery: lottery //设置好值，用于页面展示
    })
  },
  startRollTap() { //开始转盘
    let that = this;
    if (canRoll) {
      canRoll = false;
      let aniData = this.aniData; //获取this对象上的动画对象
      let rightNum = ~~(Math.random() * lotteryArrLen); //生成随机数
      console.log(`随机数是${rightNum}`);
      console.log(`奖品是：${this.data.lottery[rightNum]}`);
      aniData.rotate(3600 * num - 360 / lotteryArrLen * rightNum).step(); //设置转动的圈数
      this.setData({
        aniData: aniData.export()
      })
      num++;
      canRoll = true;
    }
  }
})
