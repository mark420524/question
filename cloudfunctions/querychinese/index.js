// 云函数入口文件
const cloud = require('wx-server-sdk')
const axios = require("axios");
cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
    try {
        let chinese = event.chinese;
        let url = 'https://mark420524.github.io/jsondata/hanzi/' + chinese + '.json';
        let result = await axios.get(url)
        return {
            code: 0,
            data:result.data
        };
    }catch(err){
        //console.log(err)
        return {
            code: -1
        };
    }
}