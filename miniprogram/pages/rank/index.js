const app = getApp();
const apis = app.apis;
const utils = app.utils;
Page({
    data: {
        selectCategory:'',
        rankList: [
           
        ]
    },
    onLoad(){
        this.init();
    },
    init(){
        let that = this;
        let selectCategory = wx.getStorageSync('selectCategory') ; 
        let cid = utils.getAnswerCid();
        let data={
            cid:cid
        }
        
        apis.getExamRank(data).then(res=>{
            that.setData({
                rankList:res
            });
        })
        this.setData({
           selectCategory :selectCategory
        })
    }
})