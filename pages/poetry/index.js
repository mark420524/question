
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
        this.search(val,1);
    },
    onLoad( ){
      this.init();
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
        this.setData({index:id})
      },
    onCofirmSearch(e){
        let val = e.detail;
        this.search(val,1);
    },
    search(val,pages,emptyText){
      
      val = val.trim();
      console.log(pages,'this',this.data.pages)
      if (this.data.searchVal== val && pages==this.data.pages ) {
          return ;
      }else if(val!=this.data.searchVal){
        this.init();
        this.setData({
          searchVal: val,
        });
      }
      let index = this.data.index;
      console.log(val,index);
      let re=/[\u4e00-\u9fa5]{1,}/;
      let valre = new RegExp('^'+val);
      console.log(valre)
      let offset = (pages-1)*this.data.size;
      let that = this;
      if (re.test(val)) {
          
          wx.showLoading({
              title: '查询中',
            });
            db.collection('poetry').skip(offset).limit(that.data.size)
            .where(
              _.or([
                {
                  title: valre
                },
                {
                  author: valre
                }
              ])
              .and([
                {
                  index:index
                }
              ])
              
           
            )
            .get({
              success: function(res) { 
                console.log('res poetryList',res)
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
      }else{
          utils.showWxToast('请输入汉字');
      }
    },
})