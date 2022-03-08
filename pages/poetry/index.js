Page({
    data:{
        searchVal:''
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
    }
})