const app = getApp();
const apis = app.apis;
const utils = app.utils;
Page({
    data: {
            nowIndex:0,//当前显示题目的index
            menuId:0,
            showAnswer: false,
            favorite: false,
            optionSelect: [],
            activeClass:[], 
            rightIndex:[],
            question: [], 
            questionCount: 0,
            
            isShow_analy:false,
            
            number:{right:'0',error:'0',count:'0'},
            alreadyChooseAnswer: false,
            showMore: false,
            type:5,
            totalCount: 0,
            todayIntegral:10,
            todayAnswerRight:true,
            showAnalysis:false,
            showTodayAnswerTips:false,
    },
    onReady(){
        
    },
    onShow( ){
        
    },
    onLoad(options){ 
        options = options || {} 
        console.log('options', options) 
        let _this = this;
        let showAnswer = false; 
        let type = options.type; 
        wx.showLoading({
          title: '加载中',
        })
        this.setData( {
            showAnswer : showAnswer,
            alreadyChooseAnswer : false,
            type:type
         });
        let show = 1;
        show = parseInt( options.show);
        
        if(type==5 ){
            apis.question({
                qid:options.qid,
                type:type
            }).then(res=>{
                wx.hideLoading( );
                _this.setData({
                    question: _this.buildQuestion(res),
                    questionCount: res.length ,
                    showMore:show,
                    nowIndex:0,
                    showAnalysis:true,
                    showTodayAnswerTips:false,
                })
                 
                _this.buildRightIndex();
            });
        }else if(type==6){
            apis.todayQuestionInfo({
                uid:utils.getUserId()
            }).then(res=>{
                //console.log(res)
                wx.hideLoading( );
                if(res && res.questions){
                    _this.setData({
                        question: _this.buildQuestion(res.questions),
                        todayIntegral:res.integral,
                        totalCount:res.totalCount,
                        alreadyChooseAnswer:res.alreadyAnswer,
                        showMore:show,
                        nowIndex:0,
                        showAnalysis:false,
                        showTodayAnswerTips:true,
                        todayAnswerRight:res.answerIntegral>0
                    })
                    if(!res.alreadyAnswer){
                        _this.buildRightIndex();
                    }
                    
                }else{
                    utils.showWxToast('今日一题尚未刷新，请耐心等待')
                }
            })
        }
        
        
    }, 
    buildQuestion(res){
        res.forEach((item,index)=>{
            
            //前台格式化right，后台数据不在返回
            let rightIndex=[];
            let answer = item.rightAnswer;
            let rightArr = answer.split(',');
            for (let i=0;i<rightArr.length;i++) {
                rightIndex[rightIndex.length]=rightArr[i].charCodeAt()-'A'.charCodeAt();
            }
            for(let j=0;j<item.selectList.length;j++){
                let optionItem = item.selectList[j];
                if (rightIndex.indexOf(j)>-1) {
                    optionItem.right = 1;
                }else{
                    delete optionItem.right
                }
                item.selectList[j] = optionItem;
            }               
        })
        return res;
    },
        multiplySubmit(e){
            let id = e.currentTarget.dataset.id;
            //console.log(this.data.optionSelect,this.data.alreadyChooseAnswer  )
            if( this.data.showAnswer || this.data.alreadyChooseAnswer  ) return false;
            let selectAnswer = [];
            for (let i=0;i<this.data.optionSelect.length;i++){
                if(this.data.optionSelect[i]){
                    selectAnswer[selectAnswer.length] = i;
                }
            }
            if (selectAnswer.length==0) {
                wx.showToast({
                    title: '请先作答哟！',
                    icon: 'none',
                    duration: 2000
                })
                return false;
            }
            console.log(selectAnswer);
            
            
            let right = 1;
            if (selectAnswer.length!=this.data.rightIndex.length) {
                right = 0;
            }else{
                for (let i=0;i< selectAnswer.length;i++){
                    if( this.data.rightIndex.indexOf( selectAnswer[i] ) == -1 ){
                        right = 0;
                        break;
                    }
                }
            }
            let question =  this.data.question[this.data.nowIndex];
            let activeClass= [];
            for(let j=0;j<question.selectList.length;j++){
                if (this.data.rightIndex.indexOf(j)>-1) {
                    if (selectAnswer.indexOf(j) > -1 ) {
                        activeClass[j]='active';
                    }else{
                        activeClass[j]='active multiplyNotChoice';
                    }
                } else if(this.data.optionSelect[j]){
                    activeClass[j]='error';
                }else{
                    activeClass[j]='';
                }   
            }
            if (this.data.type==5) {
                this.setData( {
                    activeClass : activeClass,
                    alreadyChooseAnswer:true 
                });
                this.addMenuCount(right);
            }else{
                this.submitTodayAnswer(selectAnswer,this.data.optionSelect,activeClass);
            }
        },
        chooseAnswer(  e ){
            //仅处理单选的选择 
            let detail = e.detail
            const multiply= detail.multiply;
            let id = detail.id;
            let index  = detail.index ;
            const right = detail.right
            if( this.data.showAnswer || this.data.alreadyChooseAnswer  ) return false;
            if(multiply){
                //console.log('多选题', index );
                let optionSelect = [];
                let activeClass = [];
                for(let j=0;j<this.data.optionSelect.length;j++){
                    activeClass[j]='';
                    if( j==index  ){
                        if(this.data.optionSelect[j]){
                            optionSelect[j] = false;
                            activeClass[j] = '';
                        }else{
                            optionSelect[j] = true;
                            activeClass[j] = 'multiplyItem';
                        }
                    }else{
                        optionSelect[j] = this.data.optionSelect[j];
                        activeClass[j] = this.data.activeClass[j];
                    }
                }
                this.setData({
                    activeClass: activeClass,
                    optionSelect: optionSelect
                });
                
                return ;
            }
            let userAnswer = [];
            userAnswer[0]=index;
            
            let optionSelect = [];
            let activeClass= this.data.activeClass;
            for(let j=0;j<=index;j++){
                optionSelect[j]=false;
            }
            if(right){
                activeClass[index]='active';
            }else{
                activeClass[index]='error';
                for (let k =0;k<this.data.rightIndex.length;k++) {
                     activeClass[this.data.rightIndex[k]]='active';
                }
            }
            optionSelect[index]=true;
            if (this.data.type==5) {
                // 统计对错等信息
                this.setData({
                    alreadyChooseAnswer: true,
                    optionSelect: optionSelect,
                    activeClass:activeClass,
                });
                this.addMenuCount(right);
            }else{
                this.submitTodayAnswer(userAnswer,optionSelect,activeClass);
            }
            
            
        }, 
        addMenuCount(right ) {
            let rightCount = 0
            let errorCount = 0
            let count = 0 
            count++; 
            if(right){
                rightCount++; 
            }else{
                errorCount++;
            } 
            let number = {};
            number.right=rightCount;
            number.count=count;
            number.error=errorCount;
            this.setData( {number:number}); 
        }, 
        buildRightIndex(){
            //console.log('rightindex-nowIndex' , this.data.nowIndex)
            let question = this.data.question[this.data.nowIndex];
            //console.log('rightindex-question', question)
            let activeClass = [];
            let rightIndex = [];
            let answer = question.rightAnswer;
			let rightArr = answer.split(',');
            //console.log('rightArr',rightArr,'nowIndex',this.data.nowIndex);
			for (let i=0;i<rightArr.length;i++) {
				rightIndex[rightIndex.length]=rightArr[i].charCodeAt()-'A'.charCodeAt();
			}
            //1 单选
            let optionSelect = [];
            //console.log('rigthIndex',rightIndex)
            for(let j=0;j<question.selectList.length;j++){
                optionSelect[j]= false;
                if (this.data.showAnswer && rightIndex.indexOf(j)>-1) {
                    activeClass[j]='active';
                }else{
                    activeClass[j]='';
                }
            }
            this.setData({
                optionSelect: optionSelect,
                activeClass: activeClass,
                rightIndex:rightIndex
            }) 
        },
        
        showWxToast(toastMsg){
            utils.showWxToast(toastMsg);
        },
        // 显示解析
        showAnaly(){
            this.setData({ isShow_analy:!this.data.isShow_analy})
        },
        submitTodayAnswer(userAnswer,optionSelect,activeClass){
            wx.showLoading({
              title: '正在答题，请稍候',
            })
            let that = this;
            let data={
                userAnswer:userAnswer.join(','),
                uid:utils.getUserId()
            }
            //console.log(data);
            apis.answerTodayQuestion(data).then(res=>{
                wx.hideLoading( );
                //console.log(res)
                let reg = /^\d+$/;
                if (reg.test(res)) {
                    let integral = parseInt(res);
                    let message = '';
                    if (integral>0) {
                        message = '恭喜您，回答正确，积分+'+integral;
                    }else{
                        message = '很遗憾，回答错误';
                    }
                    utils.showWxToast(message);
                    that.setData({
                        alreadyChooseAnswer: true,
                        optionSelect: optionSelect,
                        activeClass:activeClass,
                        todayAnswerRight:integral>0,
                    });
                }else{
                    utils.showWxToast(res?res:'答题失败，请稍候重试');
                }
                
            })
            
        }
})