const app = getApp();
const db = wx.cloud.database()
const utils = app.utils;
import Dialog from "../../components/vant/dialog/dialog";
Page({
    data:{
        searchVal:'',
        label:'成语',
        pages:1,
        size:10,
        idiomList:[],
        activeNames:['1'],
        activeTwoNames:['4']
    },
    init( ){ 
      this.setData({ 
        pages:1,
        idiomList:[] 
      })
    },
    actionSearch( ){
        const keyword = this.selectComponent('#searchText')
        let val = keyword.data.value;
        this.search(val,1);
    },
    onLoad(options){
      options = options||{};
      this.init();
      let val = options.val;
      let that = this;
      if(val){
        //从字典页面跳转过来
        console.log('val',val);
        this.search(val,1);
      }else{
        /*
        wx.getClipboardData({
          success (res){
            let data=res.data ;
            
            let re=/^[\u4e00-\u9fa5]{1,}/;
            if (data && re.test(data)){
              let message = '检测到您的剪贴板存在内容“'+data+'”，要搜索相关成语么？';
              Dialog.confirm({
                title: '',
                selector:'#idiomDialog',
                message: message
              }).then(() => {
                // on confirm
                
                that.search(data,1 )
              })
              .catch(() => {
                // on cancel
                console.log('cancel')
              });
            }
          }
        })
        */
      }
      
    },
    onCofirmSearch(e){
        let val = e.detail;
        this.search(val,1);
    },
    search(val,pages,emptyText){
        if(!val){
            return;
        }
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
        
        console.log(val);
        let re=/[\u4e00-\u9fa5]{1,}/;
        let valre = new RegExp('^'+val);
        console.log(valre)
        let offset = (pages-1)*this.data.size;
        let that = this;
        if (re.test(val)) {
            
            wx.showLoading({
                title: '查询中',
              });
              db.collection('idiom').skip(offset).limit(that.data.size)
              .where({
                word: valre
              })
              .get({
                success: function(res) { 
                    console.log('res idom',res)
                  wx.hideLoading( );
                  if (res.data && res.data.length>0) {
                    that.setData({
                      ['idiomList[' + (pages-1) + ']']
                      :res.data,
                      
                      pages:pages
                    })
                  }else if (emptyText){
                    utils.showWxToast(emptyText)
                  }else{
                    utils.showWxToast('成语未查询到数据')
                  }
                 
                }
              })
        }else{
            utils.showWxToast('请输入汉字');
        }
    },
    onReachBottom(){
      let page = this.data.pages;
      page++;
      this.search(this.data.searchVal,page,'没有更多数据了')
      console.log('reach bottom');
   },
    onChange(event) {
        this.setData({
          activeNames: event.detail,
        });
      },
      onItemChange(event) {
        this.setData({
            activeTwoNames: event.detail,
        });
      },
})