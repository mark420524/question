const app = getApp();
const db = wx.cloud.database()
const utils = app.utils;
import Dialog from "../../components/vant/dialog/dialog";
Page({
    data:{
      label:'',
      searchVal:'',
      word:{},
      activeNames:[ ]
    },
    onLoad( ){ 
      this.init()
    },
    init( ){
      let label = '汉字'; 
      let that = this;
      this.setData({ 
        label:label 
      })
      wx.getClipboardData({
        success (res){
          let data=res.data ;
          let re=/[\u4e00-\u9fa5]/;
          if (data && data.length==1 && re.test(data)){
            let message = '检测到您的剪贴板存在汉字“'+data+'”，要搜索这个汉字么？';
            Dialog.confirm({
              title: '',
              message: message
               
            }).then(() => {
              // on confirm
              console.log('confirm')
              that.search(data)
            })
            .catch(() => {
              // on cancel
              console.log('cancel')
            });
          }
        }
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
    search(val){
      if(!val){
          return;
      }
      val = val.trim();
      if (this.data.searchVal== val ) {
        return ;
      }
      
      console.log(val); 
      let re=/[\u4e00-\u9fa5]/;
      let that = this;
      if (val && re.test(val)) {
        wx.showLoading({
          title: '查询词典中',
        });
        db.collection('words').where({ 
          word: val
        })
        .get({
          success: function(res) { 
            wx.hideLoading( );
            if (res.data || res.data.length>0) {
              let word  = (res.data)[0];
              //console.log('word ',word)
              that.setData({
                word:word
              })
            }else{
              utils.showWxToast('字典查询到数据')
            }
           
          }
        })
        this.setData({
          searchVal:val
        })
      }else{
        utils.showWxToast('请输入一个汉字喔！');
      }
    },
    onChange(event) {
      this.setData({
        activeNames: event.detail,
      });
    },
})