// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const MAX = 100;
//该函数最多查询100条数据
// 云函数入口函数
exports.main = async (event, context) => {
    //const wxContext = cloud.getWXContext()
    let dbname = event.dbname;
    let params = event.params||{};
    let order = event.order || 'asc';
    let sort = event.sort || '_id';
    let limit = event.limit || MAX;
    if (limit>MAX) {
        limit = MAX;
    }
    return   db.collection(dbname).limit(limit).orderBy(sort,order)
        .where(params).get()
     
}