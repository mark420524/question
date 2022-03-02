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
    search(val){
        if(!val){
            return;
        }
        val = val.trim();
        if (this.data.searchVal== val ) {
            return ;
        }
        console.log(val)
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