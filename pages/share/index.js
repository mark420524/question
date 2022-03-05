const app = getApp();
const apis = app.apis;
const utils = app.utils;
Page({
    data: {
            nowIndex:0,//当前显示题目的index
            menuId:0,
            showAnswer: false,
            optionItem:['A','B','C','D','E','F','G','H','I','J','K','L','M','N'],
            favorite: false,
            optionSelect: [],
            activeClass:[], 
            rightIndex:[],
            
            question: [], 
            questionCount: 0,
            sysAnswer:[],//系统正确答案
            isShow_analy:false,
            
            time:'00 : 00',//计时
           
            ishave_page:false,
            showTime: false,
             
            number:{right:'0',error:'0',count:'0'},
            alreadyChooseAnswer: false,
            showMore:0
            
             
        
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
        let type = 5; 
        this.setData( {
            showAnswer : showAnswer,
            alreadyChooseAnswer : false 
         });
        let show = 1;
        show = parseInt( options.show);
        
        if(options ){
            apis.question({
                qid:options.qid,
                type:type
            }).then(res=>{
                _this.setData({
                    question: res,
                    questionCount: res.length ,
                    showMore:show,
                    nowIndex:0
                })
                 
                _this.buildRightIndex();
            });
        }
        
        
    }, 
        multiplySubmit(e){
            let id = e.currentTarget.dataset.id;
            console.log(this.data.optionSelect,this.data.alreadyChooseAnswer  )
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
            
             
            this.setData( {
                 activeClass : activeClass,
                 alreadyChooseAnswer:true 
            });
            
            
             
            this.addMenuCount(right, this.data.menuId);
             
        },
        chooseAnswer(  e ){
            //仅处理单选的选择 
            
            const multiply= e.currentTarget.dataset.multiply;
            let id = e.currentTarget.dataset.id;
            let index  = e.currentTarget.dataset.index ;
            if( this.data.showAnswer || this.data.alreadyChooseAnswer  ) return false;
            const _this = this;
            if(multiply){
                console.log('多选题', index );
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
           
            const right = e.currentTarget.dataset.right
            let userAnswer = [];
            userAnswer[0] = index ;
            
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
            
            // 统计对错等信息
            this.setData({
                alreadyChooseAnswer: true,
                optionSelect: optionSelect,
                optionSelect:optionSelect,
                activeClass:activeClass,
                 
            });
             
            this.addMenuCount(right, this.data.menuId);
             
            
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
            console.log('rightindex-nowIndex' , this.data.nowIndex)
            let question = this.data.question[this.data.nowIndex];
            console.log('rightindex-question', question)
            let activeClass = [];
            let rightIndex = [];
            let answer = question.rightAnswer;
			let rightArr = answer.split(',');
            console.log('rightArr',rightArr,'nowIndex',this.data.nowIndex);
			for (let i=0;i<rightArr.length;i++) {
				rightIndex[rightIndex.length]=rightArr[i].charCodeAt()-'A'.charCodeAt();
			}
            
            //1 单选
            
            let optionSelect = [];
            console.log('rigthIndex',rightIndex)
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
                rightIndex:rightIndex,
                alreadyChooseAnswer:false
            }) 
        },
          
        showWxToast(toastMsg){
            utils.showWxToast(toastMsg);
        },
       
        // 显示解析
        showAnaly(){
            this.setData({ isShow_analy:!this.data.isShow_analy})
        },
        loadMoreQuestion(){
            wx.reLaunch({
              url: '/pages/index/index',
            })
        }
        
       
        
        
         
     
        
       
       
       
         
     
})