const app = getApp();
const apis = app.apis;
const utils = app.utils;
Page({
    data: {
        totalIntegral:0,
        pages:0,
        size:10,
        integralList: [[
            
        ] ]
    },
    onLoad(options){
        let integral = options.integral;
         
        this.init(integral);
    },
    init(integral){
        let that = this;
        
        that.setData({
            totalIntegral:integral
        })
        this.buildUserLog(this.data.pages,'没有更多数据了')
    },
    onPullDownRefresh() {
        //console.log('pulldownrefresh')
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
        //console.log('page',page)
        apis.getMyIntegralList(data).then(res=>{
            
            if (res) {
                that.setData({
                    ['integralList[' + page + ']']
                    :res
                })
            }else if(emptyText){
                utils.showWxToast(emptyText);
            }
        })
    }
})