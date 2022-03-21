/**
 * 封装http 请求方法
 */
const apiUrl = "http://127.0.0.1:8000/"; //服务器api地址
const http = (params) => {
  //返回promise 对象
  return new Promise((resolve, reject) => {
    wx.request({
      url: apiUrl + params.url,//服务器url+参数中携带的接口具体地址
      data: params.data,//请求参数
      header: params.header || {
        "Content-Type": "application/x-www-form-urlencoded",
        "X-token-zaowanda":""
      },
      method: params.method || 'POST',//默认为POST,可以不写，如常用请求格式为POST，可以设置POST为默认请求方式
      dataType: params.dataType,//返回的数据格式,默认为JSON，特殊格式可以在调用的时候传入参数
      responseType: params.responseType,//响应的数据类型
      success: function(res) {
        //接口访问正常返回数据
        //console.log(res)
        if (res.statusCode==200) {
          res = res.data;
          if (res.code == 0) {
            //1. 操作成功返回数据,原则上只针对服务器端返回成功的状态（如本例中为000000）
            resolve(res.data)
          } else {
            //2. 操作不成功返回数据，以toast方式弹出响应信息，如后端未格式化非操作成功异常信息，则可以统一定义异常提示
            var errMsg = res.message
            errorToast(errMsg);
          }
        }else{
          errorToast("接口异常!");
        }
        
      },
      fail: function(e) {
        errorToast("请求失败!");
        reject(e)
      }
    })
  })
}
function errorToast(message){
  wx.showToast({
    title:  message ,
    icon:'none'
  })
}
module.exports = {
  http: http
}