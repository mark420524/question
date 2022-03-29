const app = getApp();
const apis = app.apis;
const utils = app.utils;
import Notify from '../../components/vant/notify/notify';
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
            conclusion:{ },//最后错误或正确列表
            time:'00 : 00',//计时
            time_inter:'',
            ishave_page:false,
            showTime: false,
            time_status:'', //定时器
            number:{right:'0',error:'0',count:'0'},
            alreadyChooseAnswer: false,
            showTips:0,
            startExam:0,
            examSubmit:0,
            examAnsweredCount:0,
            waitAnswer:'',
            examScore:0,
            examResult:'',
            countTime: 1800,
            showModify:false,
            modifyReason:'',
            active:0 
        
    },
    onReady(){
        let showTips = wx.getStorageSync('showTips' ) ;
        if (showTips) {
            showTips = 0;
        }else{
            showTips = 1;
        }
        this.setData({
            showTips: showTips
        })
    },
    onShow( ){
        let index = utils.getCollectionIndex() || 0;
        console.log('show',index);
        if (index) {
            this.setData({ nowIndex:index-1});
            this.buildRightIndex();
            utils.setCollectionIndex(0);
        }
        this.turningAnimation = wx.createAnimation({
            duration: 200,
            timingFunction: 'ease',
            transformOrigin: '50% 50% 0'
        });
        //
    },
    onLoad(options){
        wx.showLoading({
          title: '正在加载题库',
        })
        options = options || {}
        console.log('options', options)
        
        let _this = this;
        let showAnswer = false;
        
        let type = this.getAnswerType();
        // type 1 答题 2 错题  3 收藏 4 模拟考试
        clearInterval(this.data.time_inter)
        
        let showTime = false;
        let favorite = false;
        let startExam = 0;
        if(type==4){
            this.count_time();
            startExam = 1;
            showTime = true;
        }else if(type==3){
            favorite = true;
        }
        
        let cid = this.getAnswerCid();
        let menuId = type+''+ cid;
        
        this.setData( {
            showAnswer : showAnswer,
            showTime  : showTime,
            alreadyChooseAnswer : false,
            favorite : favorite,
            menuId:menuId,
            startExam:startExam,
            type:type
       });
        
        console.log('type=',type,'cid=',cid,'menuid',   menuId);
        if(options.index){
            // bank过来
            const bankIndex = options.index
            if(bankIndex){
                _this.setData({ 
                    'nowIndex':bankIndex-1,
                    'conclusion': wx.getStorageSync('conclusion')
                })
                
            }else{
                _this.setData({ 
                    'nowIndex': 0
                })
               
            }
        }else{
            //TODO 尝试分页获取数据现在list太大了。。。
            apis.question({
                uid: this.getUserId(),
                cid:cid,
                type:type
            }).then(res=>{
                
                const conclusion = {};
                
                res.forEach((item,index)=>{
                    conclusion[item.id] = { right:undefined}
                })
                
                _this.setData({
                    question: res,
                    questionCount: res.length,
                    conclusion: conclusion
                })
                _this.initMenuCount(type);
                _this.initMenuAnswer(type);
                if (type==1  ) {
                    _this.buildMenuIndex();
                    Notify({
                        message: '以为您自动定位到上次答题位置',
                        duration: 2000,
                        selector: '#custom-selector',
                        type: 'success'
                    });
                    
                }else{
                    _this.setData({ nowIndex:0});
                }
                _this.buildRightIndex();
                wx.hideLoading()
            });
        }
        
        
    },

     
        getAnswerType(){
            return utils.getAnswerType();
        },
        getAnswerCid(){
            return utils.getAnswerCid();
        },
        getUserId(){
            return utils.getUserId();
        },
        multiplySubmit(e){
            let id = e.currentTarget.dataset.id;
            console.log(this.data.optionSelect)
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
            
            let conclusion=this.data.conclusion;
            conclusion[id].right =  right|| 0;
            this.setData( {
                 activeClass : activeClass,
                 alreadyChooseAnswer:true,
                 conclusion:conclusion
            });
            
            let custAnswer = this.getCurrentMenuAnswer();
            custAnswer[id] = selectAnswer;
            this.setMenuAnswer(custAnswer);
            this.addMenuCount(right, this.data.menuId);
            this.addMenuIndex(1);
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
            let conclusion = this.data.conclusion;
            conclusion[id].right = right||0;
            
            
            
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
                conclusion: conclusion
            });
            let custAnswer = this.getCurrentMenuAnswer();
            custAnswer[id] = userAnswer;
            this.setMenuAnswer(custAnswer);
            this.addMenuCount(right, this.data.menuId);
            this.addMenuIndex(1);
            
        },
        autoNextQuestion(){
            let _this = this;
            if(this.time_status){
                clearTimeout(this.time_status);
            }
            this.setData({
                time_status: setTimeout(function(){
                    _this.nextQuestion()
                    _this.setData({time_status:''})
                },1000)
            })
        },
        addMenuIndex(index){
            
            let menuInfo = wx.getStorageSync('menuCount') || {}
            let currentIndex = menuInfo[this.data.menuId] || {};
            let current = 0;
            if(currentIndex && currentIndex.current){
                current = currentIndex.current;
            }
            console.log(307, current)
            current += index;
            currentIndex.current  = current;
            menuInfo[this.data.menuId] = currentIndex;
            wx.setStorageSync('menuCount', menuInfo);
            let type = utils.getAnswerType();
            if (type==4) {
                this.autoNextQuestion();
            }
        },
        //顺序答题时记录上次答题位置的方法
        buildMenuIndex(){
            let menuInfo = wx.getStorageSync('menuCount') || {}
            let currentIndex = menuInfo[this.data.menuId];
            let current = 0;
            console.log('currentIndex', currentIndex)
            if(currentIndex){
                current = currentIndex.current;
            }
            //console.log('this.question', this.data.question)
            if (current>=this.data.question.length) {
                current = this.data.question.length-1;
            }
            this.setData( {nowIndex:current});
        },
        addMenuCount(right,menuId) {
            let rightCount = 0
            let errorCount = 0
            let count = 0
            let menuInfo = wx.getStorageSync('menuCount') || {}
            let menuCount = menuInfo[menuId];
            if (menuCount ) {
                rightCount = menuCount.rightCount || 0;
                errorCount = menuCount.errorCount || 0;
                count = menuCount.count || 0;
            }else{
                menuCount = {};
            }
            count++;
             
            if(right){
                rightCount++;
                let type = this.getAnswerType();
                if (type==2 && this.getAutoRemove()) {
                    console.log('自动移除错题');
                    this.removeUserWrongQuestion();
                }

            }else{
                //添加错题
                this.addUserWrongQuestion();
                errorCount++;
            }
            console.log(27,'rightCount', rightCount, 'errorCount', errorCount, 'count', count)
            menuCount.rightCount  = rightCount;
            menuCount.errorCount = errorCount;
            menuCount.count = count  ;
            menuInfo[menuId] = menuCount;
            
            wx.setStorageSync('menuCount',menuInfo);
            
            let number = {};
            number.right=rightCount;
            number.count=count;
            number.error=errorCount;
            this.setData( {number:number});
            
        },
        initMenuAnswer(type){
            if (type!=1) {
                let menuAnswer = {};
                this.setMenuAnswer(menuAnswer)
            }
        },
        initMenuCount(type){
            if (type!=1) {
                let menuInfo = wx.getStorageSync('menuCount') || {}
                 
                let menuCount =  {
                    rightCount: 0, 
                    errorCount: 0, 
                    count: 0,
                    current: 0
                } 
                
                menuInfo[this.data.menuId] = menuCount;
                wx.setStorageSync('menuCount', menuInfo);
            }
        },
        buildMenuCount(){
            let rightCount = 0
            let errorCount = 0
            let count = 0
            let menuInfo = wx.getStorageSync('menuCount') || {}
            let menuCount = menuInfo[this.data.menuId] || {};
            console.log(menuCount)
            
            if (menuCount  ) {
                rightCount = menuCount.rightCount || 0;
                errorCount = menuCount.errorCount || 0;
                count = menuCount.count || 0;
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
            if (!this.data.showAnswer) {
                this.buildUserAnswer();
            }
            this.buildMenuCount();
            this.initFavoriteQuestion();
        },
        getCurrentMenuAnswer(){
            let menuAnwer = wx.getStorageSync('menuAnswer') || {}
            return menuAnwer[this.data.menuId] || {};
        },
        setMenuAnswer(custAnswer){
            let menuAnswer = wx.getStorageSync('menuAnswer') || {}
            menuAnswer[this.data.menuId] = custAnswer
            wx.setStorageSync('menuAnswer',menuAnswer)
        },
        buildUserAnswer(){
            let question = this.data.question[this.data.nowIndex];
            let  id = question.id;
            let custAnswer = this.getCurrentMenuAnswer();
            console.log('buildUserAnswer-custAnswer', custAnswer);
            if (custAnswer[id]) {
                let rightIndex = this.data.rightIndex;
                console.log('buildUserAnswer-rightIndex', this.data.rightIndex);
                let useChooseAnswer = custAnswer[id];
                let optionSelect = this.data.optionSelect;
                let activeClass = this.data.activeClass;
                for (let i=0;i<useChooseAnswer.length;i++){
                    if( rightIndex.indexOf(useChooseAnswer[i])>-1 ){
                        //此时选择是正确答案
                        activeClass[useChooseAnswer[ i]] = 'active';
                    }else{
                        //选择的是错误答案
                        optionSelect[useChooseAnswer[i]] = true;
                        activeClass[useChooseAnswer[ i]] = 'error';
                    }
                }
                console.log('buildUserAnswer-useChooseAnswer',  useChooseAnswer);
                for (let i=0;i<rightIndex.length;i++) {
                    if (useChooseAnswer.indexOf(rightIndex[i])>-1) {
                        activeClass[rightIndex[i]] = 'active';
                    }else if(question.multiply) {
                        activeClass[rightIndex[i]] = 'active multiplyNotChoice';
                    }else{
                        activeClass[rightIndex[i]] = 'active';
                    }
                    
                }

                this.setData({
                    optionSelect: optionSelect,
                    activeClass: activeClass,
                    alreadyChooseAnswer:true
                })
               
            }
        },
        preQuestion(){
            if(this.data.nowIndex<=0){
                wx.showToast({
                    title: '已经是第一题了。',
                    icon: 'none',
                    duration: 2000
                })
                return false
            }
            
            this.setData({
                nowIndex: --this.data.nowIndex
                
            })
            
            this.buildRightIndex();
        },
        nextQuestion(){
            const _this = this
            
            if(this.data.nowIndex>=this.data.question.length-1){
                console.log('last')
                
                let type = utils.getAnswerType();
                if ( type==4) {
                    this.autoExamSubmit('已经答完最后一题了', true);
                }else{
                    
                    utils.showWxToast('已经是最后一题了。')
                }
                return false
                 
            }
            
            this.setData({
                nowIndex: ++this.data.nowIndex   
            })
            
            this.buildRightIndex();
        },
        removeUserWrongQuestion(qid){
            this.addOrRemoveWrongQuestion(  0);
        },
        addUserWrongQuestion(qid){
            this.addOrRemoveWrongQuestion(  1);
        },
        addOrRemoveWrongQuestion(  type){
            
            let data = {
                cid: this.getAnswerCid(),
                uid: this.getUserId(),
                id: this.data.question[this.data.nowIndex].id,
                type: type
            }
            apis.saveUserWrongAnswer(data).then(  res  => {
                console.log(res)
            })
        },
        initFavoriteQuestion(){
            const _this = this;
            let data = {
                cid: this.getAnswerCid(),
                uid: this.getUserId(),
                id: this.data.question[this.data.nowIndex].id 
            }
            apis.isFavoriteQuestion(data).then(   (res) => {
                let favorite = false;
                if (res) {
                    favorite = true;
                }
                _this.setData({favorite:favorite})
            })
        },
        favoriteQuestion( e){
            console.log(e)
            const _this = this;
            let type = e.currentTarget.dataset.type;
            console.log('type',type);
            let msg = '取消收藏成功';
            let favorite = false;
            if(type==1){
                msg = '收藏成功'
                favorite = true;
            }
            let data = {
                cid: this.getAnswerCid(),
                uid: this.getUserId(),
                id: this.data.question[this.data.nowIndex].id,
                type: type
            }
            apis.favoriteQuestion(data).then( res=>{
                
                let toastMsg = '';
                if (res) {
                    _this.setData({favorite:favorite})
                    toastMsg = msg
                }else{
                    toastMsg = '操作异常'
                }
                _this.showWxToast(toastMsg);
            })
        },
        showWxToast(toastMsg){
            utils.showWxToast(toastMsg);
        },
        to(url){
            
            if(this.data.ishave_page){
                wx.redirectTo({
                    url:"/pages/"+url+"/index?length="+this.data.question.length
                })
            }else{
                
                wx.navigateTo({
                    url:"/pages/"+url+"/index?length="+this.data.question.length
                })
            }
        },
        // 显示解析
        showAnaly(){
            this.setData({ isShow_analy:!this.data.isShow_analy})
        },
        // 计时的
        count_time(){
            let _this = this;
            
            let cTime = this.data.countTime;
            _this.data.time_inter = setInterval(function(){
                cTime-=1
                const min = Math.floor(cTime/60)<10 ? '0'+Math.floor(cTime/60) : Math.floor(cTime/60)
                const s = (cTime%60)<10 ? '0'+cTime%60 : cTime%60
                
                
                if (cTime<=0) {
                    _this.setData({ time : '00:00'  });
                    clearInterval(_this.data.time_inter)
                    console.log('倒计时结束自动交卷！');
                    _this.autoExamSubmit('亲，答题时间到了', false);
                    
                    
                }else{
                    _this.setData({ time :min+' : '+s });
                }
            },1000)
        },
        getAutoRemove(){
            return utils.getAutoRemove();
        },
        closeTips(){
            wx.setStorageSync('showTips', 1);
            this.setData({
                showTips: 0
            })
        },
        continueExam(){
            this.setData({
                examSubmit: 0
            })
        },
        startExamSubmit(){
            let number = this.data.number;
            let right = number.right||0;
            let count = number.count||0;
            let waitAnswer = 100-count;
            let result = utils.getExamResult(right);
            this.setData({
                examSubmit: 1,
                examAnsweredCount:count,
                waitAnswer:waitAnswer,
                examScore:right,
                examResult:result
            })
        },
        showQuestionBank(){
            wx.setStorageSync('conclusion', this.data.conclusion);
            this.to('bank')
        },
        autoExamSubmit(title,showCancel){
            console.log(showCancel,title)
            let that = this;
            wx.showModal({
                title:title,
                content:'点击确定自动交卷',
                showCancel:showCancel,
                cancelText:'检查检查',
                confirmText:'确定',
                cancelColor:'#5162e4',
                confirmColor:'#000000',
                
                success(res){
                    
                    if(res.confirm){
                        console.log(2222)
                        that.examSubmit();
                    }
                },
                fail(){
                    utils.showWxToast( '系统错误，请联系管理员');
                }
            })
        },
        examSubmit(){
            wx.showLoading({
                'title': '正在交卷，请稍候...',
                'mask': true
            });
            //TODO 请求后台保存答题结果
            let number = this.data.number;
            let right = number.right||0;
            let error = number.error||0;
            let useLeft = this.data.time;
            let timeArr = useLeft.split(':');
            let minute = timeArr[0];
            let second = timeArr[1];
            let m = parseInt(minute) ;
            let s = parseInt(second);
            second = m * 60 + s;
            let useTime =  this.data.countTime-second;
            console.log(this.data.time, minute,useTime )
            let data={
                uid: this.getUserId(),
                cid: this.getAnswerCid(),
                right: right,
                wrong: error
            }
            apis.saveSubmitUserExam(data).then(res=>{
                wx.hideLoading( );
                if (res) {
                    wx.redirectTo({
                        url: '/pages/result/index?score=' + right +'&time='+useTime,
                    })
                }else{
                    utils.showWxToast('提交试卷异常');
                }
            })
            
        },
        touchStart(e) {
            
            this.setData({
              "touch.x": e.changedTouches[0].clientX,
              "touch.y": e.changedTouches[0].clientY,
              animationData: this.turningAnimation.export()
            });
          },
          touchEnd(e) {
            
            let x = e.changedTouches[0].clientX;
            let y = e.changedTouches[0].clientY;
            let ret = utils.getTouchData(x,y,this.data.touch.x,this.data.touch.y);
            console.log(ret);
            if ('left'==ret) {
                this.createAnimationByFirst('100%');
                this.nextQuestion();
            }else if ('right'==ret){
                this.createAnimationByFirst('-100%');
                this.preQuestion();
            }
            
          },
          createAnimationByFirst(first){
            this.turningAnimation.translateX(first).step().translateX(0).opacity(1).step({
                duration: 100
              });
              this.setData({
                animationData: this.turningAnimation.export()
              });
          },
          modifyQuestion(){
            this.setData({
                showModify:true
            })
          },
          modifyClose(e){
              console.log('modifyClose');
              const modifyReason = this.selectComponent('#modifyReason');
              modifyReason.setData({value:''})
              
          },
          confirmModify(e){
             // console.log(e.detail.dialog   )
              console.log('确定提交纠错')
              const modifyReason = this.selectComponent('#modifyReason');
              let reason = modifyReason.value;
              if (reason) {
                //此时提交纠错
                let data={
                    uid:this.getUserId(),
                    reason:reason,
                    cid:this.getAnswerCid(),
                    qid:this.data.question[this.data.nowIndex].id
                }
                apis.questionCorrect(data).then(res=>{
                    if(res){
                        utils.showWxToast(res)
                    }
                })
                //console.log(data);
              } 
              
          },
          confirmText(e){
              console.log(e)
          },
          
    onShareAppMessage(res){
        let question = this.data.question[this.data.nowIndex];
        let  id = question.id;
        console.log('id',id);
        return {
            title:'亲爱的，这个题你会么？',
            imageUrl:'',//图片样式
            path:'/pages/share/index?show=1&type=5&qid=' +id
        }   
    },
    tabClick(e){
        console.log(e.detail);
        let index = e.detail.index;
        let showAnswer = false;
        if (index==1) {
            //背题模式
            showAnswer = true;
        }else{
            showAnswer = false;
        }
        this.setData({
            active:index,
            showAnswer:showAnswer
        })
        this.buildRightIndex();
    }
})