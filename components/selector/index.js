var util = require('../../utils/util.js')

var areaInfo = util.getMenuInfo();//所有省市区县数据
if (!areaInfo || areaInfo.length==0) {
  areaInfo = [{"children":[{"children":[{"children":[],"id":50,"name":"组织学与胚胎学"},{"children":[],"id":51,"name":"医学免疫学"},{"children":[],"id":52,"name":"人体寄生虫学"},{"children":[],"id":53,"name":"病理学"},{"children":[],"id":54,"name":"医学微生物学"},{"children":[],"id":55,"name":"系统解剖学"},{"children":[],"id":56,"name":"病理生理学"},{"children":[],"id":57,"name":"药理学"},{"children":[],"id":58,"name":"医学遗传学"},{"children":[],"id":59,"name":"生理学"},{"children":[],"id":60,"name":"局部解剖学"},{"children":[],"id":61,"name":"生物化学"},{"children":[],"id":62,"name":"细胞生物学"}],"id":40,"name":"基础医学"},{"children":[{"children":[],"id":63,"name":"神经病学"},{"children":[],"id":64,"name":"内科学"},{"children":[],"id":65,"name":"精神病学"},{"children":[],"id":66,"name":"外科学"},{"children":[],"id":67,"name":"妇产科学"},{"children":[],"id":68,"name":"医学心理学"},{"children":[],"id":69,"name":"儿科学"},{"children":[],"id":70,"name":"传染病学"},{"children":[],"id":71,"name":"皮肤性病学"},{"children":[],"id":72,"name":"诊断学"},{"children":[],"id":73,"name":"麻醉学"},{"children":[],"id":74,"name":"眼科学"}],"id":41,"name":"临床医学"},{"children":[{"children":[],"id":81,"name":"眼耳鼻咽喉口腔科护理学"},{"children":[],"id":82,"name":"健康评估"},{"children":[],"id":83,"name":"护理学基础"},{"children":[],"id":84,"name":"内科护理学"},{"children":[],"id":85,"name":"妇产科护理学"},{"children":[],"id":86,"name":"外科护理学"},{"children":[],"id":87,"name":"儿科护理学"}],"id":42,"name":"护理专业"},{"children":[{"children":[],"id":75,"name":"药物分析"},{"children":[],"id":76,"name":"天然药物化学"},{"children":[],"id":77,"name":"药事管理"},{"children":[],"id":78,"name":"中药鉴定学"},{"children":[],"id":79,"name":"药剂学"},{"children":[],"id":80,"name":"药物化学"}],"id":43,"name":"药学专业"},{"children":[{"children":[],"id":88,"name":"中医内科学"},{"children":[],"id":89,"name":"方剂学"},{"children":[],"id":90,"name":"中医儿科学"},{"children":[],"id":91,"name":"中医外科学"},{"children":[],"id":92,"name":"中医学基础"},{"children":[],"id":93,"name":"中药学"},{"children":[],"id":94,"name":"中医诊断学"}],"id":44,"name":"中医专业"},{"children":[{"children":[],"id":143,"name":"流行病学"}],"id":45,"name":"预防专业"},{"children":[{"children":[],"id":144,"name":"口腔内科学"},{"children":[],"id":145,"name":"口腔修复学"},{"children":[],"id":146,"name":"口腔组织病理学"},{"children":[],"id":147,"name":"口腔解剖生理学"},{"children":[],"id":148,"name":"口腔颌面外科学"}],"id":46,"name":"口腔医学"},{"children":[{"children":[],"id":116,"name":"中医综合历年真题"},{"children":[],"id":117,"name":"西医综合历年真题"}],"id":47,"name":"考研专区"},{"children":[{"children":[],"id":105,"name":"护理学基础"},{"children":[],"id":115,"name":"护理伦理"},{"children":[],"id":114,"name":"妊娠、分娩和产褥期疾病病人的护理"},{"children":[],"id":113,"name":"中医基础知识"},{"children":[],"id":112,"name":"人际沟通"},{"children":[],"id":111,"name":"新生儿和新生儿疾病的护理"},{"children":[],"id":110,"name":"精神障碍病人的护理"},{"children":[],"id":109,"name":"血液、造血器官及免疫疾病病人的护理"},{"children":[],"id":108,"name":"神经系统疾病病人的护理"},{"children":[],"id":107,"name":"法规与护理管理"},{"children":[],"id":106,"name":"肌肉骨骼系统和结缔组织疾病病人的护理"},{"children":[],"id":95,"name":"消化系统疾病病人的护理"},{"children":[],"id":104,"name":"损伤、中毒病人的护理"},{"children":[],"id":103,"name":"传染病病人的护理"},{"children":[],"id":102,"name":"生命发展保健"},{"children":[],"id":101,"name":"泌尿生殖系统疾病病人的护理"},{"children":[],"id":100,"name":"皮肤及皮下组织疾病病人的护理"},{"children":[],"id":99,"name":"循环系统疾病病人的护理"},{"children":[],"id":98,"name":"内分泌、营养及代谢疾病病人的护理"},{"children":[],"id":97,"name":"肿瘤病人的护理"},{"children":[],"id":96,"name":"呼吸系统疾病病人的护理"}],"id":48,"name":"护士资格考试"},{"children":[{"children":[],"id":130,"name":"历年真题"},{"children":[],"id":142,"name":"临床医学综合-代谢内分泌系统"},{"children":[],"id":141,"name":"临床医学综合-血液系统"},{"children":[],"id":140,"name":"临床医学综合-女性生殖系统"},{"children":[],"id":139,"name":"临床医学综合-传染病与性传播疾病"},{"children":[],"id":138,"name":"临床医学综合-泌尿系统"},{"children":[],"id":137,"name":"临床医学综合-心血管系统"},{"children":[],"id":136,"name":"临床医学综合-实践综合"},{"children":[],"id":135,"name":"临床医学综合-消化系统"},{"children":[],"id":134,"name":"临床医学综合-精神，神经系统"},{"children":[],"id":133,"name":"临床医学综合-其他"},{"children":[],"id":132,"name":"临床医学综合-运动系统"},{"children":[],"id":131,"name":"临床医学综合-呼吸系统"},{"children":[],"id":118,"name":"医学伦理学"},{"children":[],"id":129,"name":"预防医学"},{"children":[],"id":128,"name":"卫生法规"},{"children":[],"id":127,"name":"临床医学综合-儿科疾病"},{"children":[],"id":126,"name":"临床医学综合-风湿免疫性疾病"},{"children":[],"id":125,"name":"医学微生物学"},{"children":[],"id":124,"name":"生理学"},{"children":[],"id":123,"name":"医学免疫学"},{"children":[],"id":122,"name":"医学心理学"},{"children":[],"id":121,"name":"药理学"},{"children":[],"id":120,"name":"病理学"},{"children":[],"id":119,"name":"生物化学"}],"id":49,"name":"临床职业医师考试"}],"id":32,"name":"医卫类"},{"children":[],"id":1,"name":"国学百科"},{"children":[],"id":3,"name":"最强答题王"}];
}
var provinces = [];//省

var citys = [];//城市

var countys = [];//区县

var value = [0,0,0];//数据位置下标

var info = {};
var vali=[];

function updateAreaData( that, status, e){
    //获取省份数据
    var getProvinceData = function (){
      var s;
      provinces = [];
      
      for (var i = 0; i < areaInfo.length; i++) {
        s = areaInfo[i]; 
        provinces[i] = s;
      }
      getCityArr(0);
      
      //获取区县数据
      getCountyInfo(0, 0);

      //赋值
      info = {
        item: {
          provinces: provinces,
          citys: citys,
          countys: countys,
          value: value
        }
      }

      animationEvents(that, 200, false, 0);
    }

    // 获取地级市数据
    var getCityArr = function (count = 0) {
      var c;
      citys = [];
      
      for (var i = 0; i < provinces[count].children.length; i++) {
        c = provinces[count].children[i];
        citys[i] = c;
      }
      if (citys.length == 0) {
        citys[0] = { name: '' };
      }
    }

    // 获取区县数据
    var getCountyInfo = function (column0 = 0, column1 = 0) {
      var c;
      countys = [];
      let city = provinces[column0].children;
      if (city && city.length>0) {
        let countryInfo = city[column1].children;
        if (countryInfo && countryInfo.length>0) {
          for (let i = 0; i < countryInfo.length; i++) {
            countys[i] = countryInfo[i];
          }
        }
      }
      
      if (countys.length == 0) {
        countys[0] = { name: '' };
      }
      value = [column0, column1, 0];
    }
    
    //滑动事件
    var valueChange = function(e,that){
      var val = e.detail.value
       console.log(e)
      //判断滑动的是第几个column
      //若省份column做了滑动则定位到地级市和区县第一位
      if (value[0] != val[0]) {
        val[1] = 0;
        val[2] = 0;
        getCityArr(val[0]);//获取地级市数据
        getCountyInfo(val[0], val[1]);//获取区县数据
      } else {    //若省份column未做滑动，地级市做了滑动则定位区县第一位
        if (value[1] != val[1]) {
          val[2] = 0;
          getCountyInfo(val[0], val[1]);//获取区县数据
        }
      }
      value = val;

      assignmentData(that, that.data.item.show)

      console.log(val);
      
      //回调
      //callBack(val);

    }
   
    if (status == 0){ 
        //获取省份数据
       getProvinceData();
   }
    //滑动事件
    else{
      valueChange(e,that);
    }
    
}

//动画事件
function animationEvents(that, moveY, show, duration) {
  console.log("moveY:" + moveY + "\nshow:" + show);
  that.animation = wx.createAnimation({
    transformOrigin: "50% 50%",
    duration: duration,
    timingFunction: "ease",
    delay: 0
  })
  that.animation.translateY(moveY + 'vh').step()
  //赋值
  assignmentData(that,show)

}

//赋值
function assignmentData(that, show) {
  that.setData({
    item: {
      animation: that.animation.export(),
      show: show,
      provinces: provinces,
      citys: citys,
      countys: countys,
      value: value
    }
  })
}

module.exports = {
  updateAreaData: updateAreaData,
  animationEvents: animationEvents
}
