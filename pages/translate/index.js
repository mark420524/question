const app = getApp();
const utils = app.utils;
const db = wx.cloud.database();
Page({
    data:{
        word:{},
        activeNames:['1']
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
        console.log(val)
        let valre = new RegExp('^'+val+'$','i');
        console.log(valre)
        let that = this;
        wx.showLoading({
            title: '查询词典中',
        });
        db.collection('english').limit(1).where({ 
            word: valre
          })
          .get({
            success: function(res) { 
              wx.hideLoading( );
             
              if (res.data && res.data.length>0) {
                let word  = (res.data)[0];
                //console.log('word ',word)
                if (word.tag) {
                    let tag = word.tag.replace('zk','中考').replace('gk','高考');
                    word.tag = tag;
                }
                if (word.exchange) {
                    let exchange = word.exchange.replace('p:','过去式:').replace('d:','过去分词:')
                    .replace('i:','现在分词:').replace('3:','第三人称单数:').replace('r:','形容词比较级:')
                    .replace('t:','形容词最高级:').replace('s:','名词复数:');
                    console.log(exchange)
                    word.exchange = exchange;
                }
                that.setData({
                  word:word
                })
              }else{
                utils.showWxToast('字典未查询到数据')
              }
             
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