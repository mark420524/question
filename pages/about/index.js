Page({
    data:{
        qqGroup:'123955944'
    },
    adLoad() {
        console.log('Banner 广告加载成功')
      },
      adError(err) {
        console.log('Banner 广告加载失败', err)
      },
      adClose() {
        console.log('Banner 广告关闭')
      },
      copyGroupInfo(){
        wx.setClipboardData({
            data: this.data.qqGroup,
            success (res) {console.log(res)}
        });
      }
})