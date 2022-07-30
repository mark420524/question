
const app = getApp();
const apis = app.apis;
const utils = app.utils;
Page({
    data:{
        searchVal:'',
        active: 0,
        categoryList:[
          {},{},{},
        ],
        index:1,
        poetryList:[],
        size:20,
        pages:0
    },
    actionSearch( ){
        const keyword = this.selectComponent('#searchText')
        let val = keyword.data.value;
        this.search( 0, val);
    },
    onLoad( ){
      this.loadMenu();
      this.init();
      this.search( 0);
    },
    init( ){ 
      this.setData({ 
        pages:0,
        poetryList:[]
      })
    },
    loadMenu(){
      let that = this; 
      apis.poetryCategory( ).then(res=>{
        that.setData({
          categoryList:res,
          active: 0
        })
      })
    },
    onChange(event) { 
        let index = event.detail.index; 
        let id = this.data.categoryList[index].id;
        //console.log(id); 
        this.setData({
          index:id,
          pages:0,
          poetryList:[] 
        })
        this.search( 0  );
      },
    onCofirmSearch(e){
        let val = e.detail;
        this.search( 0,val);
    },
    search(pages,val,emptyText){
      
      
      //console.log(pages,'this',this.data.pages);
      if (val){
        val = val.trim();
        if(val!=this.data.searchVal){
          this.init();
          this.setData({
          searchVal: val,
        });
      }
    }
      let index = this.data.index;
      let params = {
        cid:index,
        word:val||'',
        page:pages,
        size:this.data.size
      };
      
      let that = this;
          
      wx.showLoading({
          title: '查询中',
        });
        apis.poetryInfo(params).then(res=> {
            //console.log('res poetryList',res)
            wx.hideLoading( );
            if (res) {
              that.setData({
                ['poetryList[' + (pages ) + ']']
                :res ,
                pages:pages
              })
            }else if (emptyText){
              utils.showWxToast(emptyText)
            }else{
              utils.showWxToast('诗词未查询到数据')
            }
            
          })
         
      
    },
    onReachBottom(){
      let page = this.data.pages;
      page++;
      this.search(page,this.data.searchVal,'没有更多数据了')
      //console.log('reach bottom');
   },
   goToPoetry(e){
     let item = e.currentTarget.dataset.item;
     //console.log(item)
      wx.setStorageSync('poetryItem', item)
      wx.navigateTo({
        url: '/pages/detail/index',
      })
   }
})