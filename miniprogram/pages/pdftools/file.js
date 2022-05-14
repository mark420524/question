Page({
    data:{
        count:5,
        integral:100,
        type:1
    },
    onLoad(options){
        options = options||{}
        let type = parseInt( options.type);
        
        this.setData({
            type: type
        })
    }
})