// pages/information/information.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    search: '',
    queryResult: [],
    isQuerySuccess: false,
    searchPlaceholder: '今天吃什么？'
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  setSearchStr: function (e) {
    // 取前20位
    const value = e.detail.value.substring(0, 20);
    this.setData({
      search: value
    })
  },

  onSearch: function () {
    const searchStr = this.data.search.trim()
    if (searchStr === '') {
      wx.showToast({
        icon: 'none',
        title: '不能为空'
      })
      return
    }
    const db = wx.cloud.database()
    db.collection('goods').where({
      name: db.RegExp({
        regexp: searchStr,
        options: 'i',
      })
    }).get({
      success: res => {
        this.buildQueryResult(res.data)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
      }
    })
  },

  buildQueryResult: function (result) {
    if (result.length > 0) {
      for (let i = 0, len = result.length; i < len; i++) {
        if (i === 0) {
          result[i]['open'] = true;
        } else {
          result[i]['open'] = false;
        }
      }
    }

    this.setData({
      queryResult: result,
      isQuerySuccess: true
    })
  },

  kindToggle: function (e) {
    const id = e.currentTarget.id;
    const tips = this.data.queryResult;
    for (let i = 0, len = tips.length; i < len; ++i) {
      if (tips[i]._id === id) {
        tips[i].open = !tips[i].open;
      } else {
        tips[i].open = false;
      }
    }
    this.setData({
      queryResult: tips
    })
  },

  clear: function () {
    this.setData({
      queryResult: [],
      search: '',
      isQuerySuccess: false
    })
  },

  redirectToAdvice: function () {
    wx.switchTab({
      url: '/pages/advice/advice'
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})