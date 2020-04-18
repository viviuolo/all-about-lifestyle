// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const dbName = event.db
  const id = event.id
  // return db.collection(dbName).doc(event.id).remove()

  try {
    return await db.collection(dbName).where({
      _id: id
    }).remove()
  } catch (e) {
    console.error(e)
  }
}