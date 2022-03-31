const app = getApp();
const apis = app.apis;
const utils = app.utils;
Page({
    data:{
      examList:[],
        historys:[],
        searchVal:'',
        label:'',
        pages:0,
        size:10,
        type:1,
        totalSize:0,
        showFilter:false,
        mainActiveIndex: 0,
        activeId: null,
        items:[
          {
            // 导航名称
            text: '所有城市',
            
            children: [
              {
                // 名称
                text: '温州',
                // id，作为匹配选中状态的标识
                id: 1,
                
              },
              {
                text: '杭州',
                id: 2,
              },
            ],
          },
          {
            // 导航名称
            text: '所有城市2',
            
            // 该导航下所有的可选项
            children: [
              {
               
                text: '温州1',
               
                id: 3,
                
              },
              {
                text: '杭州1',
                id: 4,
              },
            ],
          },
        ]
    },
    onLoad( ){ 
      this.init( );
      this.reloadHistory();
    },
    init( ){
      let label = '试卷'; 
      this.setData({
        totalSize:0,
        pages:0,
        examList:[],
        label:label 
      })
    },
    actionSearch( ){
        const keyword = this.selectComponent('#searchText')
        let val = keyword.data.value;
        this.search(val);
    },
    
    onCofirmSearch(e){
        let val = e.detail;
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
      
       
      let that = this;  
        let data = {
          
          keywords:val,
          page:page,
          size:this.data.size
        }
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
      
      goQuestion(e){
        let id = e.currentTarget.dataset.id;
        console.log(id)
        wx.navigateTo({
          url: '/pages/share/index?show=0&type=5&qid='+id,
        })
      },
    onShow(){ 
        if (typeof this.getTabBar === 'function' &&
            this.getTabBar()) {
            this.getTabBar().setData({
              active: 1,
            })
          }
      },
      onShareAppMessage(){
        return {
            title:'亲爱的，来这里答题喽',
            imageUrl:'',//图片样式
            path:''//链接
        }
    },
    showFilter(){
      this.setData({
        showFilter:true
      })
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
  
      this.setData({ activeId });
      return false;
    },
})