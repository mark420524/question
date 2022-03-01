const app = getApp();
const apis = app.apis;
const utils = app.utils;
Page({
    data:{
      questionList:[],
        historys:[],
        searchVal:[],
        pages:0,
        size:10,
        type:1,
    },
    onLoad(){
      //type 1-搜索题库 2-搜索汉字 3-搜索成语
      this.init();
        this.reloadHistory();
    },
    init(){

    },
    actionSearch( ){
        const keyword = this.selectComponent('#searchText')
        let val = keyword.data.value;
        this.search(val);
    },
    clearSearchContent: function() {
        wx.setStorageSync('historys', JSON.stringify([]));
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
        if (hs.length === 0) {
            break;
        }
        }
        wx.setStorageSync('historys' + this.data.type, JSON.stringify(hs));

        this.reloadHistory();
        this.reloadData();
        this.searchData(this.data.pages, val);
    },
    searchData(page, val,emptyText){
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
          let list = res.list;
          console.log('search question res',res)
          if(list){
            that.setData({
              ['questionList[' + page + ']']
              :list
          })
          }else if(emptyText){
            utils.showWxToast(emptyText);
          }
        })
      }
    },
    onTapHistory: function(e) {
        let val = e.currentTarget.dataset.val;
        this.setData({
          searchVal: val,
        });
        this.reloadData();
        this.searchData(this.data.pages, val);
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