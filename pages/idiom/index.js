const app = getApp();
const db = wx.cloud.database()
const utils = app.utils;
Page({
    data:{
        searchVal:'',
        label:'成语',
        pages:0,
        size:10,
        activeNames:['1'],
        activeTwoNames:['4']
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
    search(val,pages){
        if(!val){
            return;
        }
        val = val.trim();
        if (this.data.searchVal== val ) {
            return ;
        }
        console.log(val);
        let re=/[\u4e00-\u9fa5]{1,}/;
        let offset = (pages-1)*this.data.size;
        let that = this;
        if (re.test(val)) {
            
            wx.showLoading({
                title: '查询中',
              });
              db.collection('idiom').skip(offset).limit(that.data.size)
              .where({
                word: db.RegExp({
                  regexp: val,
                  options: 'i',
                })
              })
              .get({
                success: function(res) { 
                    console.log('res idom',res)
                  wx.hideLoading( );
                  if (res.data && res.data.length>0) {
                    
                  }else{
                    utils.showWxToast('字典未查询到数据')
                  }
                 
                }
              })
        }else{
            utils.showWxToast('请输入汉字');
        }
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