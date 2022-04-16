Component({
    properties: {
        historys: Array
    },
    attached: function() {
    },
    methods: {
        onTapHistory(e){
            let val = e.currentTarget.dataset.val;
            this.triggerEvent('click', val );
        },
        clearSearchContent() {
            wx.setStorageSync('historys' , JSON.stringify([]));
            this.setData({
                historys: []
            });
        }
    }
})