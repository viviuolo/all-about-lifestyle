// pages/advice.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    tip: ''
  },

  bindNameInput: function (e) {
    this.setData({
      name: e.detail.value
    })
  },

  bindTipInput: function (e) {
    this.setData({
      tip: e.detail.value
    })
  },

  submit: function () {
    const name = this.data.name.trim()
    const tip = this.data.tip.trim()
    if (name === '' || tip === '') {
      wx.showToast({
        icon: 'none',
        title: '名称和建议不能为空'
      })
      return
    }

    const db = wx.cloud.database()
    db.collection('advices').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        name,
        tip
      }
    })
    .then(() => {
      this.clearData()
      wx.showToast({
        title: '谢谢你的建议',
        icon: 'success'
      })
    })
  },

  clearData: function() {
    this.setData({
      name: '',
      tip: ''
    })
  },
})