Page({
    data:{
        selectCategory: '',
    },
    onLoad( ){
        //TODO 关于题库不足100题时答题提示的问题
        this.init();
    },
 
    init(){
        let selectCategory = wx.getStorageSync('selectCategory') ;
        /*
        if (selectCategory.indexOf('>') > -1 ) {
            selectCategory=selectCategory.substring(selectCategory.indexOf('>')+1);
        }
        if (selectCategory.indexOf('>') > -1 ) {
            selectCategory=selectCategory.substring(selectCategory.indexOf('>')+1);
        }
        */
        this.setData({selectCategory:selectCategory})
    },
    startExam(){
        let cid = wx.getStorageSync('cid') ;
        this.go('question', 'cid='+cid+'&type=4');
    },
    go(url,params){
        wx.redirectTo({
            url:'/pages/'+url+'/index?' + params 
        });
    },
    exportExam(){
        this.go('exportq','type=1')
    }
 
 
})