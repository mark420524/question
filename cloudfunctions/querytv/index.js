// 云函数入口文件
const cloud = require('wx-server-sdk')
const axios = require("axios");
cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
    try {
        let result = await axios.get('https://mark420524.github.io/iptvapi/iptvstream.json')
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