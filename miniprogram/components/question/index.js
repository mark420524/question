Component({
    properties: {
        question: Array,
        nowIndex: Number,
        isShow_analy:Boolean,
        activeClass:Array,
        showAnswer:Boolean,
        alreadyChooseAnswer:Boolean,
        optionSelect:Array,
        showMore:{
            type: Boolean,
            value: false
        }
    },
    attached: function() {
        
    },
    methods:{
        chooseAnswer(e){
            let multiply= e.currentTarget.dataset.multiply;
            let id = e.currentTarget.dataset.id;
            let index  = e.currentTarget.dataset.index ;
            const right = e.currentTarget.dataset.right
            let deatil = {id:id,index:index,multiply:multiply,right:right}
            this.triggerEvent('chooseanswer', deatil);
        },
        multiplySubmit(e){
            let id = e.currentTarget.dataset.id;
            let deatil = {id:id}
            this.triggerEvent('multiplysubmit', deatil);
        },
        loadMoreQuestion(){
            wx.reLaunch({
              url: '/pages/index/index',
            })
        }
    }
})