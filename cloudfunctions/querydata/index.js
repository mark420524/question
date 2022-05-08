// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
//该函数最多查询100条数据
// 云函数入口函数
exports.main = async (event, context) => {
    //const wxContext = cloud.getWXContext()
    let dbname = event.dbname;
    let params = event.params||{};
    let order = event.order || 'asc';
    let sort = event.sort || '_id';
    
    return   db.collection(dbname).orderBy(sort,order)
        .where(params).get()
     
}