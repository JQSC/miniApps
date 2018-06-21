Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: '',
    comments: []

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var item = getApp().globalData.comments;

    this.setData({
      content: item
    })
    var _this = this;

    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: 'https://m.weibo.cn/api/comments/show',
      data: {
        id: options.mid,
        page: 1
      },
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        wx.hideLoading();
        var dataArr = res.data.data.data.map(function(o, i) {
          return {
            name: o.user.screen_name,
            date: o.created_at,
            text: o.text,
            id: i
          }
        })
        _this.setData({
          comments: dataArr
        })

      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})