const app = getApp();
const utils = app.utils;
const apis = app.apis;
import Dialog from "../../components/vant/dialog/dialog";
Page({
    data:{
        word:{},
        activeNames:['1'],
        label:'英文'
    },
    actionSearch( ){
        const keyword = this.selectComponent('#searchText')
        let val = keyword.data.value;
        this.search(val);
    },
    onLoad(){
        let that = this;
        /*
        wx.getClipboardData({
            success (res){
              let data=res.data ;
              
              let re=/^\w/;
              if (data && re.test(data)){
                let message = '检测到您的剪贴板存在内容“'+data+'”，要搜索相关词语么？';
                Dialog.confirm({
                  title: '', 
                  message: message
                }).then(() => {
                  // on confirm 
                  that.search(data )
                })
                .catch(() => {
                  // on cancel
                  console.log('cancel')
                });
              }
            }
          })
          */
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
        
        let that = this;
        wx.showLoading({
            title: '查询词典中',
        });
        let data = { 
          word: val
        };
        apis.englishChinese(data).then(res=>{
          wx.hideLoading( );
          if (res  ) {
            let word  =res;
            if (word.tag) {
                let tag = word.tag.replace('zk','中考').replace('gk','高考').replace('ky','考研');
                word.tag = tag;
            }
            if (word.exchange) {
                let exchange = word.exchange.replace('p:','过去式:').replace('d:','过去分词:')
                .replace('i:','现在分词:').replace('3:','第三人称单数:').replace('r:','形容词比较级:')
                .replace('t:','形容词最高级:').replace('s:','名词复数:');
                //console.log(exchange)
                word.exchange = exchange;
            }
            that.setData({
              word:word
            })
          }
        }) 
        that.setData({
            searchVal:val
        })
    },
    onChange(event) {
        this.setData({
          activeNames: event.detail,
        });
      },
})