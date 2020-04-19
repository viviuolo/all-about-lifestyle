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
    wx.showLoading()
    const db = wx.cloud.database()
    db.collection('advices')
    .limit(1) // 限制返回数量为 1 条
    .get({
      success: res => {
        wx.hideLoading()
        if (res.data.length === 0) {
          this.setData({ showing: false})
        } else {
          this.setData({ showing: true })
          this.setData({ advice: res.data[0] })
          this.deleteAdvice(this.data.advice._id)
        }
      },
      fail: err => {
        wx.hideLoading()
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
      name: 'dbconn',
      data: {
        id,
        dbName: 'advices',
        method: 'delete'
      }
    })
  },

  addDevice: function () {
    if (JSON.stringify(this.data.advice) === '{}') {
      return
    }

    wx.cloud.callFunction({
      name: 'dbconn',
      data: {
        dbName: 'advices',
        method: 'add',
        data: {
          name: this.data.advice.name,
          tip: this.data.advice.tip
        }
      }
    }).then(() => {
      // TODO
    })
  },

  addIntoTips: function () {
    if (JSON.stringify(this.data.advice) === '{}') {
      return
    }

    wx.showLoading({ title: '提交中' })
    wx.cloud.callFunction({
      name: 'dbconn',
      data: {
        dbName: 'feedbacks',
        method: 'add',
        data: {
          name: this.data.advice.name,
          tip: this.data.advice.tip
        }
      }
    }).then(() => {
      wx.hideLoading()
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