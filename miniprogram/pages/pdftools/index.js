Page({
    data:{},
    handlerItemClick(e){
        let dataset = e.currentTarget.dataset;
        let type=dataset.type;
        wx.navigateTo({
          url: '/pages/pdftools/file?type='+type,
        })
    }
})