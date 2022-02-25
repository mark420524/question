import todo from '../../components/calendar/plugins/todo'

import plugin from '../../components/calendar/plugins/index'

plugin
  .use(todo);
const app = getApp();
const apis = app.apis;
const utils = app.utils;


Page({
  data: {
    totalSign:123,
    contiueSign:12,
    showSubmit:1,
    addPoints:7,
    dates:[],
    calendarConfig: {
      
      theme: 'default',
        
       preventSwipe: true,
       emphasisWeek: true,
       highlightToday: true,
       takeoverTap: true,
       hideHeader: true,
       
       markToday:'今',
       
      
    },
    
  },
  onLoad(){
    let that = this;
    let data={
      uid:utils.getUserId()
    }
    apis.getUserSignInfo(data).then(res=>{
      console.log(res)
      if (res) {
        let totalSign = res.totalSign;
        let continuousSign=res.continuousSign;
        let today = res.today;
        let dayIntegral=res.dayIntegral;
        let showSubmit=1;
        let addPoints=0;
        
        if (dayIntegral[today] && dayIntegral[today]>0) {
          showSubmit=0;
          addPoints=dayIntegral[today];
        }
        let dates=[];
        let startTime=res.startTime;
        let startDate = utils.buildDate(startTime);
        let endDate= utils.buildDate(today);
        console.log(startDate, endDate);
        let startSeconds = startDate.getTime();
        let endSeconds = endDate.getTime();
        console.log(startSeconds, endSeconds);
        let currentDate = new Date();
        while ((endSeconds - startSeconds)>0) {
          
          currentDate.setTime(startSeconds);
          let current = utils.formatDate(currentDate);
          let dateArr = current.split('-');
          // console.log('123123',current);
          //加一天的毫秒值
          let onday = 24 * 3600 * 1000;
          startSeconds +=  onday;
          let obj = {
            year: parseInt(dateArr[0]),
            month: parseInt(dateArr[1]),
            date:parseInt(dateArr[2])
          };
          if (dayIntegral[current] && dayIntegral[current]>0){
             //此时已签到，要不要显示获取积分
          }else{
            obj.todoText='未签';
            obj.color='red' ;
          }
          dates[dates.length]=obj;
        }
        const calendar = that.selectComponent('#calendar').calendar
        if (calendar){
          calendar.setTodos({
            // 待办点标记设置
            pos: 'bottom', // 待办点标记位置 ['top', 'bottom']
            dotColor: 'red', // 待办点标记颜色
            circle: false, // 待办圆圈标记设置（如圆圈标记已签到日期），该设置与点标记设置互斥
            showLabelAlways: true, // 点击时是否显示待办事项（圆点/文字），在 circle 为 true 及当日历配置 showLunar 为 true 时，此配置失效
            dates: dates
          })
        }
        that.setData({
          showSubmit:showSubmit,
          addPoints:addPoints,
          totalSign:totalSign,
          contiueSign:continuousSign,
          dates:dates
        })
        
      }else{
        utils.showWxToast('请求签到信息失败');
      }
    })
  },
  onShow(){

  },
  onReady(){
    
    const calendar = this.selectComponent('#calendar').calendar
    console.log(this.data.dates)
    if (calendar && this.data.dates.length>0) {
      calendar.setTodos({
        // 待办点标记设置
        pos: 'bottom', // 待办点标记位置 ['top', 'bottom']
        dotColor: 'red', // 待办点标记颜色
        circle: false, // 待办圆圈标记设置（如圆圈标记已签到日期），该设置与点标记设置互斥
        showLabelAlways: true, // 点击时是否显示待办事项（圆点/文字），在 circle 为 true 及当日历配置 showLunar 为 true 时，此配置失效
        dates: this.data.dates
      })
    }
   
  },
  userSignin(){
    let that = this;
    let data = {
      uid: utils.getUserId()
    }
    wx.showLoading({
      title: '正在签到请稍候',
    })
    apis.userSignin(data).then(res=>{
      wx.hideLoading( )
      console.log(res)
      let toast = '';
      if ( (/^\d{1},\d{1},\d{1}$/.test(res)) ) {
        let arr = res.split(',');
        toast='签到成功，获得积分+'+arr[0];
        that.setData({
          showSubmit:0,
          addPoints:arr[0],
          totalSign:arr[1],
          contiueSign:arr[2]
        })
      }else{
        toast = res;
      }
      utils.showWxToast(toast);
    })
  }
  
  
 
})
