const app = getApp();
const apis = app.apis;
Page({
    data:{
        activeName:'1',
        integralList:[
            
        ]
    },
    onLoad(){
      let that = this;
      let data={
        dbname:'integral_type',
        params:{
          status:1,
        },
        sort:'sort',
        functionName:'querydata'
      }
      apis.callfunction(data).then(res=>{
        that.setData({
          integralList:res
        })
      })
    },
    onChange(event) {
        this.setData({
          activeName: event.detail,
        });
      },
})