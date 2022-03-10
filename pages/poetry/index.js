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
        index:0,
        poetryList:[]
    },
    actionSearch( ){
        const keyword = this.selectComponent('#searchText')
        let val = keyword.data.value;
        this.search(val);
    },
    onChange(event) { 
        let index = event.detail.index; 
        let id = this.data.categoryList[index].id;
        console.log(id); 
        this.setData({index:id})
      },
    onCofirmSearch(e){
        let val = e.detail;
        this.search(val);
    },
    search(val){
      
      val = val.trim();
      let index = this.data.index;
    }
})