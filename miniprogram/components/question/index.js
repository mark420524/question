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
            let detail = {id:id,index:index,multiply:multiply,right:right}
            this.triggerEvent('chooseanswer', detail);
        },
        multiplySubmit(e){
            let id = e.currentTarget.dataset.id;
            let detail = {id:id}
            this.triggerEvent('multiplysubmit', detail);
        },
        loadMoreQuestion(){
            wx.reLaunch({
              url: '/pages/index/index',
            })
        }
    }
})