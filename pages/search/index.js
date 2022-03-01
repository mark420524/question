const app = getApp();
const apis = app.apis;
const utils = app.utils;
Page({
    data:{
      questionList:[],
        historys:[],
        searchVal:'',
        pages:0,
        size:10,
        type:1,
        totalSize:0,
    },
    onLoad(){
      //type 1-搜索题库 2-搜索汉字 3-搜索成语
      this.init();
        this.reloadHistory();
    },
    init(){
      this.setData({
        totalSize:0,
        pages:0,
        questionList:[]
      })
    },
    actionSearch( ){
        const keyword = this.selectComponent('#searchText')
        let val = keyword.data.value;
        this.search(val);
    },
    clearSearchContent: function() {
        wx.setStorageSync('historys'+this.data.type, JSON.stringify([]));
        this.reloadHistory();
      },
    onCofirmSearch(e){
        let val = e.detail;
        this.search(val);
    },
    
    reloadHistory: function() {
        try {
          var historys = wx.getStorageSync('historys'+ this.data.type)
          if (historys) {
            this.setData({
              historys: JSON.parse(historys)
            });
          }
        } catch (e) {
        }
      },
    search(val){
      val = val.trim();
      if (!val) {
        utils.showWxToast('请输入搜索关键词');
        return;
      }
        let hs = [val.trim()];
        for (let h of this.data.historys) {
          if (h !== val ) {
              hs.push(h);
          }
          
        }
        wx.setStorageSync('historys' + this.data.type, JSON.stringify(hs));

        this.reloadHistory();
        this.reloadData();
        this.searchData(0, val);
    },
    searchData(page, val,  emptyText){
      console.log(val,this.data.searchVal)
      if (val==this.data.searchVal && page==this.data.pages ) {
         return;
      }else if(val!=this.data.searchVal){
        this.init();
        this.setData({
          searchVal: val,
        });
      }
      
      wx.showLoading({
        title: '正在搜索请稍候',
      })
      
      let type = this.data.type;
      let that = this;
      
      
      if (type==1){
        let data = {
          cid: utils.getAnswerCid(),
          uid: utils.getUserId(),
          keywords:val,
          page:page,
          size:this.data.size
        }
        apis.searchQuestion(data).then(res=>{
          wx.hideLoading( );
          let list = res.list;
          console.log('search question res',res)
          if(list){
            that.setData({
              ['questionList[' + page + ']']
              :list,
              totalSize:res.totalSize,
              pages:page
          })
          }else if(emptyText){
            utils.showWxToast(emptyText);
          }
        })
      }
    },
    onReachBottom(){
      let page = this.data.pages;
      page++;
      this.searchData(page,this.data.searchVal,'没有更多数据了')
      console.log('reach bottom');
   },
    onTapHistory: function(e) {
        let val = e.currentTarget.dataset.val;
        
        this.reloadData();
        this.searchData(0, val);
      },
      reloadData(){
          console.log('search')
      },
    onShow(){ 
        if (typeof this.getTabBar === 'function' &&
            this.getTabBar()) {
              
            this.getTabBar().setData({
              active: 1,
            })
          }
      }
})