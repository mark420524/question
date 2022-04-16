const app = getApp();
const apis = app.apis;
const utils = app.utils;
Page({
    data: {
        pages:0,
        size:10,
        inviteLogList: [[
        ] ]
    },
    onLoad(){
        this.init();
    },
    init(){
        this.buildUserLog(this.data.pages,'没有更多数据了')
    },
    onPullDownRefresh() {
        console.log('pulldownrefresh')
    },
    onReachBottom(){
        let page = this.data.pages;
        page++;
        this.setData({
            pages:page
        })
        this.buildUserLog(page,'没有更多数据了')
        //console.log('reach bottom');
    },
    buildUserLog(page, emptyText){
        let that = this;
        let data={
            uid: utils.getUserId(),
            page: page,
            size:this.data.size 
        }
        
        apis.getMyIviteList(data).then(res=>{
            if (res) {
                that.setData({
                    ['inviteLogList[' + page + ']']
                    :res
                })
            }else if(emptyText){
                utils.showWxToast(emptyText);
            }
        })
    }
})