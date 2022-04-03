const app = getApp();
const apis = app.apis;
const utils = app.utils;
Page({
    data:{
      examList:[],
        historys:[],
        label:'',
        pages:0,
        size:10,
        
        totalSize:0,
        showFilter:false,
        mainActiveIndex: 0,
        activeId: null,
        items:[],
        version:'',
        fileType:'',
        pid:0
    },
    onLoad( ){ 
      this.init( );
      this.reloadHistory();
      this.searchData(0, '', '查无结果');
      this.initExamMenu();
    },
    init( ){
      let label = '试卷'; 
      this.setData({
        totalSize:0,
        pages:0,
        examList:[],
        label:label,
        version:'',
        fileType:'',
        
      })
    },
    initExamMenu(){
      let that = this;
      let data = {pid:0};
      apis.getExamMenu(data).then(res=>{
        let items = that.buildItems(res);
        //console.log('items',items);
        that.setData({
          items: items
        })
      })
    },
    buildItems(res){
      for (let i=0;i<res.length;i++){
        res[i].text = res[i].name;
        if (res[i].children && res[i].children.length>0) {
          this.buildItems(res[i].children)
        }
      }
      return res;
    },
    actionSearch( ){
        const keyword = this.selectComponent('#searchText')
        let val = keyword.data.value;
        if(val==this.data.searchVal){
          return;
        }
        this.search(val);
    },
    
    onCofirmSearch(e){
        let val = e.detail;
        if(val==this.data.searchVal){
          return;
        }
        this.search(val);
    },
    
    reloadHistory: function() {
        try {
          var historys = wx.getStorageSync('historys' )
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
        wx.setStorageSync('historys' , JSON.stringify(hs));
        this.reloadHistory();
        this.searchData(0, val, '查无结果');
    },
    searchData(page, val,  emptyText){
      console.log(val,this.data.searchVal)
      if(val!=this.data.searchVal){
        this.init();
        this.setData({
          searchVal: val,
        });
      }
      
      wx.showLoading({
        title: '正在搜索请稍候',
      })
      
       
      let that = this;  
        let data = {
          version:this.data.version,
          fileType:this.data.fileType,
          examName:val,
          page:page,
          pid:this.data.pid,
          size:this.data.size
        }
        console.log(data);
        apis.searchExam(data).then(res=>{
          wx.hideLoading( );
          let list = res.list;
          if(list){
            that.setData({
              ['examList[' + page + ']']
              :list,
              totalSize:res.totalSize,
              pages:page
            })
          }else if(emptyText){
            utils.showWxToast(emptyText);
          }
        })
       
    },
    onReachBottom(){
      let page = this.data.pages;
      page++;
      this.searchData(page,this.data.searchVal,'没有更多数据了')
      console.log('reach bottom');
   },
    onTapHistory: function(e) { 
        let val = e.detail; 
        this.searchData(0, val);
      },
      
      onShareAppMessage(){
        return {
            title:'亲爱的，来这里搜试卷喽',
            imageUrl:'',//图片样式
            path:''//链接
        }
    },
    goExam(e){
      let item = e.currentTarget.dataset.item;
      console.log(item);
      wx.setStorageSync('examItem', item)
      wx.navigateTo({
        url: '/pages/exam/index',
      })
    },
    showFilter(){
      this.setData({
        showFilter:true
      })
      return false;
    },
    onClickHide() {
      this.setData({ showFilter: false });
    },
    onClickNav({ detail = {} }) {
      this.setData({
        mainActiveIndex: detail.index || 0,
      });
      return false;
    },
  
    onClickItem({ detail = {} }) {
      const activeId = this.data.activeId === detail.id ? null : detail.id;
  
      this.setData({ 
        activeId:activeId,
        pid:activeId
      });
      return false;
    },
    noop() {},
    cofirmFilter(){
      this.setData({
        totalSize:0,
        pages:0,
        examList:[]
      })
      this.searchData(0, this.data.searchVal, '查无结果');
      this.setData({ showFilter: false });
    },
    onChangeVersion(event) {
      this.setData({
        version: event.detail,
      });
    },
    onChangeFileType(event) {
      
      this.setData({
        fileType: event.detail,
      });
    },
})