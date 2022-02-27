Page({
    data:{
        examList:[],
        historys:[],
        searchVal:[]

    },
    onLoad(){
        this.reloadHistory();
    },
    actionSearch( ){
        const keyword = this.selectComponent('#searchText')
        let val = keyword.data.value;
        this.search(val);
    },
    clearSearchContent: function() {
        wx.setStorageSync('historys', JSON.stringify([]));
        this.reloadHistory();
      },
    onCofirmSearch(e){
        let val = e.detail;
        this.search(val);
    },
    
    reloadHistory: function() {
        try {
          var historys = wx.getStorageSync('historys')
          if (historys) {
            this.setData({
              historys: JSON.parse(historys)
            });
          }
        } catch (e) {
        }
      },
    search(val){
        console.log(val);

        let hs = [val.trim()];
        for (let h of this.data.historys) {
        if (h !== val ) {
            hs.push(h);
        }
        if (hs.length === 0) {
            break;
        }
        }
        wx.setStorageSync('historys', JSON.stringify(hs));

        this.reloadHistory();
        this.reloadData();
    },
    onTapHistory: function(e) {
        this.setData({
          searchVal: e.currentTarget.dataset.val,
        });
        this.reloadData();
      },
      reloadData(){
          console.log('search')
      },
    onShow(){ 
        if (typeof this.getTabBar === 'function' &&
            this.getTabBar()) {
              
            this.getTabBar().setData({
              active: 1,
            })
          }
      }
})