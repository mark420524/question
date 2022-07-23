/**
 * 封装http 请求方法
 */
import CONSTANT from '../utils/constant';
const apiUrl=CONSTANT.apiUrl; //服务器api地址
const ocrUrl = CONSTANT.ocrUrl;
const http = (params) => {
  //返回promise 对象
  return new Promise((resolve, reject) => {
    wx.request({
      url: apiUrl + params.url,//服务器url+参数中携带的接口具体地址
      data: params.data,//请求参数
      header: params.header || {
        "Content-Type": "application/x-www-form-urlencoded",
        "X-token-zaowanda":CONSTANT.TOKEN,
        "X-token-user":wx.getStorageSync('userToken')
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

const callfunction=(params)=>{
  return new Promise((resolve, reject) => {
    wx.cloud.callFunction({
      name: params.functionName,
      data: params
    }).then(res=>{
        //console.log(res)
      let result = res.result;
      if (result.data  && result.data.length>0) {
        resolve(result.data)
      }else{
        errorToast('查无数据');
      }
    }).catch(err=>{
      errorToast('查无数据');
      reject(err)
    });
  })
}

const uploadFile = (params) => {
  //返回promise 对象
  return new Promise((resolve, reject) => {
    wx.uploadFile({
      url: apiUrl + params.url,//服务器url+参数中携带的接口具体地址
      formData: params.data,//请求参数
      filePath: params.data.filePath,
      name: params.data.name || 'file',
      header: params.header || {
        "Content-Type": "multipart/form-data",
        "X-token-zaowanda":CONSTANT.TOKEN,
        "X-token-user":wx.getStorageSync('userToken')
      },
      method: 'POST',//默认为POST,可以不写，如常用请求格式为POST，可以设置POST为默认请求方式
      dataType: params.dataType,//返回的数据格式,默认为JSON，特殊格式可以在调用的时候传入参数
      responseType: params.responseType,//响应的数据类型
      success: function(res) {
        //接口访问正常返回数据
        if (res.statusCode==200) {
          res = res.data;
          if (typeof(res)=='string'  ) {
            //console.log('res is string')
            res = JSON.parse(res)
          }
          if (res.code == 0) {
            //1. 操作成功返回数据,原则上只针对服务器端返回成功的状态（如本例中为000000）
            resolve(res.data)
          } else {
            //2. 操作不成功返回数据，以toast方式弹出响应信息，如后端未格式化非操作成功异常信息，则可以统一定义异常提示 
            errorToast(res.message);
          }
        }else{
          errorToast("接口异常!");
        }
        
      },
      fail: function(e) {
        errorToast("上传文件失败!");
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


const uploadFileToOcr = (params) => {
  //返回promise 对象
  return new Promise((resolve, reject) => {
    wx.uploadFile({
      url: ocrUrl + params.url,//服务器url+参数中携带的接口具体地址
      formData: params.data,//请求参数
      filePath: params.data.filePath,
      name: params.data.name || 'file',
      header: params.header || {
        "Content-Type": "multipart/form-data",
        "X-token-zaowanda":CONSTANT.TOKEN
      },
      method: 'POST',//默认为POST,可以不写，如常用请求格式为POST，可以设置POST为默认请求方式
      dataType: params.dataType,//返回的数据格式,默认为JSON，特殊格式可以在调用的时候传入参数
      responseType: params.responseType,//响应的数据类型
      success: function(res) {
        //接口访问正常返回数据
        if (res.statusCode==200) {
          res = res.data;
          console.log('ocr info', res)
          if (typeof(res)=='string'  ) {
            //console.log('res is string')
            res = JSON.parse(res)
          }
          if (res.code == 0) {
            //1. 操作成功返回数据,原则上只针对服务器端返回成功的状态（如本例中为000000）
            resolve(res.data)
          } else {
            //2. 操作不成功返回数据，以toast方式弹出响应信息，如后端未格式化非操作成功异常信息，则可以统一定义异常提示 
            errorToast(res.message);
          }
        }else{
          errorToast("接口异常!");
        }
        
      },
      fail: function(e) {
        errorToast("上传文件失败!");
        reject(e)
      }
    })
  })
}
module.exports = {
  http: http,
  uploadFile:uploadFile,
  callfunction: callfunction,
  uploadFileToOcr:uploadFileToOcr
}