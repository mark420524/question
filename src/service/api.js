import { http } from './http'

const url = {
  systemInit: 'init',
  userLogin: 'v2/user/login',
  getUserPhone: 'user/phone',
  getQuestionMenu: 'category/list',
  userCardReceive: 'card/receive',
  favoriteCount: 'answer/favoriteCount',
  questionList: 'question/list',
  questionCount: 'question/count',
  wrongCount: 'answer/wrongCount',
  isFavoriteQuestion: 'answer/isfavorite',
  favoriteQuestion: 'answer/favorite',
  saveUserWrongAnswer: 'answer/wrong',
  updateUser: 'user/updateUser',
  saveSubmitUserExam: 'exam/submit',
  examRank: 'exam/rank',
  userSignin: 'user/signin',
  userSignInfo: 'user/sign/info',
  myIntegral: 'user/integral',
  myIntegralList: 'user/integral/list',
  questionCorrect: 'question/correct',
  notifyInfo: 'notify/info',
  searchData: 'question/search',
  exportInfo: 'export/info',
  exportQuestions: 'export/',
  todayQuestionInfo: 'question/today',
  answerTodayQuestion: 'question/today/answer',
  getMyIviteList: 'user/invite/list',
  searchExam: 'exam/search',
  exportExam: 'export/exam',
  getExamMenu: 'category/exam/list',
  integralWheel: 'user/integral/wheel',
  examInfo: 'exam/info',
  getInviteIntegral: 'setting/invite',
  encryptPdf: 'pdf/encrypt',
  decryptPdf: 'pdf/decrypt',
  todayHandleInfo: 'pdf/info',
  addWatermark: 'pdf/watermark',
  getQQGroup: 'setting/qqgroup',
  updateUserV2: 'user/v2/updateUser',
  ocrGenerateToken: 'ocr/token/generate',
  ocrInfo: 'ocr/info',
  uploadImageToOcr: 'ocr',
  toolsItem: 'tools/item',
  toolsApp: 'tools/other',
  chineseWord: 'chinese/word',
  chineseIdiom: 'chinese/idiom',
  englishChinese: 'english/chinese',
  poetryCategory: 'poetry/category',
  poetryInfo: 'chinese/poetry',
  chineseChildren: 'chinese/children',
  openTvInfo: 'tv/info',
  getIntegral: 'setting/integral',
  getUserInfo: 'user/info',
  getShortUrlInfo: 'short/info',
  generateShortUrl: 'short/generate',
  initShowAd: 'init/showAd'
}

export function userLogin(data) {
  const appId = data.appId
  delete data.appId
  return http({
    url: `${url.userLogin}/${appId}`,
    data,
    method: 'POST'
  })
}

export function getUserPhone(params) {
  return http({
    url: url.getUserPhone,
    data: params
  })
}

export function userCardReceive() {
  return http({
    url: url.userCardReceive,
    method: 'GET'
  })
}

export function getQuestionMenu(pid) {
  return http({
    url: url.getQuestionMenu,
    method: 'GET',
    data: { pid }
  })
}

export function favoriteCount(data) {
  return http({
    url: url.favoriteCount,
    data
  })
}

export function question(data) {
  return http({
    url: url.questionList,
    data
  })
}

export function wrongCount(data) {
  return http({
    url: url.wrongCount,
    data
  })
}

export function isFavoriteQuestion(data) {
  return http({
    url: url.isFavoriteQuestion,
    data
  })
}

export function favoriteQuestion(data) {
  return http({
    url: url.favoriteQuestion,
    data
  })
}

export function saveUserWrongAnswer(data) {
  return http({
    url: url.saveUserWrongAnswer,
    data
  })
}

export function updateUser(data) {
  return http({
    url: url.updateUser,
    data
  })
}

export function getQuestionCount(data) {
  return http({
    url: url.questionCount,
    data
  })
}

export function saveSubmitUserExam(data) {
  return http({
    url: url.saveSubmitUserExam,
    data
  })
}

export function getExamRank(data) {
  return http({
    url: url.examRank,
    data
  })
}

export function userSignin(data) {
  return http({
    url: url.userSignin,
    data
  })
}

export function getUserSignInfo(data) {
  return http({
    url: url.userSignInfo,
    data
  })
}

export function systemInit(data) {
  return http({
    url: url.systemInit,
    method: 'GET',
    data
  })
}

export function getMyIntegral(data) {
  return http({
    url: url.myIntegral,
    data
  })
}

export function getMyIntegralList(data) {
  return http({
    url: url.myIntegralList,
    data
  })
}

export function questionCorrect(data) {
  return http({
    url: url.questionCorrect,
    data
  })
}

export function getNotifyInfo(data) {
  return http({
    url: url.notifyInfo,
    data
  })
}

export function searchQuestion(data) {
  return http({
    url: url.searchData,
    data
  })
}

export function exportInfo(data) {
  return http({
    url: url.exportInfo,
    data
  })
}

export function exportQuestions(data) {
  return http({
    url: url.exportQuestions,
    data
  })
}

export function todayQuestionInfo(data) {
  return http({
    url: url.todayQuestionInfo,
    data
  })
}

export function answerTodayQuestion(data) {
  return http({
    url: url.answerTodayQuestion,
    data
  })
}

export function getMyInviteList(data) {
  return http({
    url: url.getMyIviteList,
    data
  })
}

export function searchExam(data) {
  return http({
    url: url.searchExam,
    data
  })
}

export function exportExam(data) {
  return http({
    url: url.exportExam,
    data
  })
}

export function getExamMenu(data) {
  return http({
    url: url.getExamMenu,
    data
  })
}

export function integralWheel(data) {
  return http({
    url: url.integralWheel,
    data
  })
}

export function examInfo(data) {
  return http({
    url: url.examInfo,
    data
  })
}

export function getInviteIntegral(data) {
  return http({
    url: url.getInviteIntegral,
    data
  })
}

export function encryptPdf(data) {
  return http({
    url: url.encryptPdf,
    data
  })
}

export function decryptPdf(data) {
  return http({
    url: url.decryptPdf,
    data
  })
}

export function todayHandleInfo(data) {
  return http({
    url: url.todayHandleInfo,
    data
  })
}

export function addWatermark(data) {
  return http({
    url: url.addWatermark,
    data
  })
}

export function getQQGroup(data) {
  return http({
    url: url.getQQGroup,
    data
  })
}

export function updateUserV2(data) {
  return http({
    url: url.updateUserV2,
    data
  })
}

export function ocrGenerateToken(data) {
  return http({
    url: url.ocrGenerateToken,
    data
  })
}

export function ocrInfo(data) {
  return http({
    url: url.ocrInfo,
    data
  })
}

export function uploadImageToOcr(data) {
  return http({
    url: url.uploadImageToOcr,
    data
  })
}

export function toolsItem(data) {
  return http({
    url: url.toolsItem,
    data
  })
}

export function toolsApp(data) {
  return http({
    url: url.toolsApp,
    data
  })
}

export function chineseWord(data) {
  return http({
    url: url.chineseWord,
    data
  })
}

export function chineseIdiom(data) {
  return http({
    url: url.chineseIdiom,
    data
  })
}

export function englishChinese(data) {
  return http({
    url: url.englishChinese,
    data
  })
}

export function poetryCategory(data) {
  return http({
    url: url.poetryCategory,
    data
  })
}

export function poetryInfo(data) {
  return http({
    url: url.poetryInfo,
    data
  })
}

export function chineseChildren(data) {
  return http({
    url: url.chineseChildren,
    data
  })
}

export function openTvInfo(data) {
  return http({
    url: url.openTvInfo,
    data
  })
}

export function getIntegral(data) {
  return http({
    url: url.getIntegral,
    data
  })
}

export function getUserInfo(data) {
  return http({
    url: url.getUserInfo,
    data
  })
}

export function getShortUrlInfo(data) {
  return http({
    url: url.getShortUrlInfo,
    data
  })
}

export function generateShortUrl(data) {
  return http({
    url: url.generateShortUrl,
    data
  })
}

export function initShowAd(data) {
  return http({
    url: url.initShowAd,
    data
  })
}
