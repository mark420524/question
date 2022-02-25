Page({
    data:{
            
                selectCategory: '',
           
    },
    onLoad( ){
        
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
    }
 
 
})