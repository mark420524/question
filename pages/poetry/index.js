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
        ]
    },
    actionSearch( ){
        const keyword = this.selectComponent('#searchText')
        let val = keyword.data.value;
        this.search(val);
    },
    onChange(event) {
        let title = event.detail.title;
        let index = event.detail.index;
        console.log(title,index)
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