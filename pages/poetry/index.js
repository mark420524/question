
const db = wx.cloud.database()
const _ = db.command
Page({
    data:{
        searchVal:'',
        active: 0,
        categoryList:[
          {
            id:1,
            title:'唐诗'
          },
          {
            id:2,
            title:'宋词'
          },
          {
            id:4,
            title:'元曲'
          }
        ],
        index:1,
        poetryList:[],
        size:20,
        pages:1
    },
    actionSearch( ){
        const keyword = this.selectComponent('#searchText')
        let val = keyword.data.value;
        this.search( 1, val);
    },
    onLoad( ){
      this.init();
      this.search( 1);
    },
    init( ){ 
      this.setData({ 
        pages:1,
        poetryList:[] 
      })
    },
    onChange(event) { 
        let index = event.detail.index; 
        let id = this.data.categoryList[index].id;
        console.log(id); 
        this.setData({
          index:id,
          pages:1,
          poetryList:[] 
        })
        this.search( 1  );
      },
    onCofirmSearch(e){
        let val = e.detail;
        this.search( 1,val);
    },
    search(pages,val,emptyText){
      
      
      console.log(pages,'this',this.data.pages);
      let params = '';
      let index = this.data.index;
      
      if (val){
        val = val.trim();
         if(val!=this.data.searchVal){
          this.init();
          this.setData({
            searchVal: val,
          });
        }
        let valre = new RegExp('^'+val);
        let paragraphsValRe = new RegExp(val);
        params =  _ .or([
          {
            title: valre
          },
          {
            author: valre
          },
          {
            paragraphs: paragraphsValRe
          }
        ]).and([
          {
            index:index
          }
        ])
      }else{
        params = _ .and([
          {
            index:index
          }
        ])
      }
      
      console.log(val,index );
      
      
      
      let offset = (pages-1)*this.data.size;
      let that = this;
      
          
      wx.showLoading({
          title: '查询中',
        });
        db.collection('poetry').skip(offset).limit(that.data.size)
        .where( 
          params
        )
        .get({
          success: function(res) { 
            //console.log('res poetryList',res)
            wx.hideLoading( );
            if (res.data && res.data.length>0) {
              that.setData({
                ['poetryList[' + (pages-1) + ']']
                :res.data,
                pages:pages
              })
            }else if (emptyText){
              utils.showWxToast(emptyText)
            }else{
              utils.showWxToast('诗词未查询到数据')
            }
            
          }
        })
      
    },
    onReachBottom(){
      let page = this.data.pages;
      page++;
      this.search(page,this.data.searchVal,'没有更多数据了')
      console.log('reach bottom');
   },
   goToPoetry(e){
     let id = e.currentTarget.dataset.id;
      console.log(id)
      wx.setStorageSync('poetryId', id)
   }
})