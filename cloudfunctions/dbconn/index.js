// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()

// 云函数入口函数
// event 中包含 dbName, method('delete', 'add', 'count')
exports.main = async (event, context) => {
  const dbName = event.dbName
  const method = event.method
  if (!dbName) {
    return;
  }

  if (method === 'delete') {
    const id = event.id
    try {
      return await db.collection(dbName).where({
        _id: id
      }).remove()
    } catch (e) {
      return false
    }
  } else if (method === 'add') {
    const data = event.data
    try {
      return await db.collection(dbName).add({
        data,
      })
    } catch (e) {
      return false
    }
  } else if (method === 'count') {
    return await db.collection(dbName).count()
  }
}