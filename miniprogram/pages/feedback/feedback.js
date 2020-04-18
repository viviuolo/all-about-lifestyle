Page({
  /**
   * 页面的初始数据
   */
  data: {
    showing: false,
    advice: {}
  },

  onShow: function (options) {
    this.getAdvice()
  },

  onHide: function () {
    this.addDevice()
  },

  reload: function () {
    this.clear()
    this.getAdvice()
  },

  skip: function () {
    this.addDevice()
    this.reload()
  },

  getAdvice: function () {
    const db = wx.cloud.database()
    db.collection('advices')
    .limit(1) // 限制返回数量为 1 条
    .get({
      success: res => {
        if (res.data.length === 0) {
          this.setData({ showing: false})
        } else {
          this.setData({ showing: true })
          this.setData({ advice: res.data[0] })
          this.deleteAdvice(this.data.advice._id)
        }
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
      }
    })
  },

  deleteAdvice: function (id) {
    if (!id) {
      return
    }

    wx.cloud.callFunction({
      name: 'db',
      data: {
        id,
        db: 'advices'
      }
    })
  },

  addDevice: function () {
    if (JSON.stringify(this.data.advice) === '{}') {
      return
    }

    const db = wx.cloud.database()
    db.collection('advices').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        name: this.data.advice.name,
        tip: this.data.advice.tip
      }
    })
    .then(() => {
      // TODO
    })
  },

  addIntoTips: function () {
    if (JSON.stringify(this.data.advice) === '{}') {
      return
    }
    const db = wx.cloud.database()
    db.collection('feedbacks').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        name: this.data.advice.name,
        tip: this.data.advice.tip
      }
    })
    .then(() => {
      wx.showToast({
        title: '添加成功',
        icon: 'success'
      })
      this.reload()
    })
  },

  clear: function () {
    this.setData({
      advice: {}
    })
  },
})