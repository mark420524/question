const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatDate = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  

  return [year, month, day].map(formatNumber).join('-') ;
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
const getAnswerCid= _ => {
  let cid = wx.getStorageSync('cid');
  return cid;
}
const  getMenuInfo = _ =>{
  return wx.getStorageSync('cidInfo')
}
const setAnswerType = type => {
  console.log('set type', type)
  wx.setStorageSync('type', type) ;
}

const getAnswerType = _ => {
  return wx.getStorageSync('type' ) ;
}

const getAutoRemove = _ => {
  return wx.getStorageSync('autoRemove' ) ;
}

const getUserId = _ => {
  let uid = wx.getStorageSync('uid');
  return uid;
}

const getMenuVersionIndex = _ =>{
  return  wx.getStorageSync('menuVersion');
}

const setMenuVersionIndex = version =>{
    wx.setStorageSync('menuVersion',version);
}

const showWxToast =  toastMsg  => {
  wx.showToast({
      title: toastMsg,
      icon: 'none',
      duration: 2000
  })
}
const getExamResult = right => {
  let result = '';
  if (right>85) {
    result='成绩优秀';
  }else if(right>70){
    result='成绩良好';
  }else if(right>=70){
    result='成绩合格';
  }else  {
    result='成绩不合格';
  }
  return result;
}

const getTouchData = (endX, endY, startX, startY)=> {
  let turn = "";
  if (endX - startX > 30 && Math.abs(endY - startY) < 30) {      //右滑
    turn = "right";
  } else if (endX - startX < -30 && Math.abs(endY - startY) < 30) {   //左滑
    turn = "left";
  }
  return turn;
}

const setCollectionIndex= index=>{
  wx.setStorageSync('index',index);
}

const getCollectionIndex= _=>{
  return wx.getStorageSync('index' );
}

const setNotifyIndex= index=>{
  wx.setStorageSync('notifyIndex',index);
}

const getNotifyIndex= _=>{
  return wx.getStorageSync('notifyIndex' ) || 0;
}

const buildDate= (str) => {
  let arr = str.split('-')
  let startDate = new Date();
  startDate.setFullYear(arr[0]);
  startDate.setMonth(parseInt(arr[1])-1);
  startDate.setDate(arr[2])
  startDate.setHours(0);
  startDate.setMinutes(0);
  startDate.setSeconds(0)
  return startDate;
}

module.exports = {
  formatTime: formatTime,
  getUserId: getUserId,
  getAnswerCid: getAnswerCid,
  setAnswerType: setAnswerType,
  getAnswerType: getAnswerType,
  showWxToast: showWxToast,
  getAutoRemove: getAutoRemove,
  getMenuInfo:getMenuInfo,
  getExamResult:getExamResult,
  getTouchData:getTouchData,
  buildDate:buildDate,
  formatDate:formatDate,
  getMenuVersionIndex:getMenuVersionIndex,
  setMenuVersionIndex:setMenuVersionIndex,
  setCollectionIndex:setCollectionIndex,
  getCollectionIndex:getCollectionIndex,
  getNotifyIndex:getNotifyIndex,
  setNotifyIndex:setNotifyIndex
}
