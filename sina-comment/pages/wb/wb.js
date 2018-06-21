//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    commentList: []
  },
  onLoad: function() {
    this.requestWB()
  },
  requestWB: function() {
    wx.showLoading({
      title: '加载中...',
    })
    var _this = this;
    wx.request({
      //url: 'https://m.weibo.cn/api/container/getIndex?containerid=1005052524431250', 
      url: 'https://m.weibo.cn/api/container/getIndex',
      data: {
        containerid: "1076032524431250",
      },
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        wx.hideLoading()
        var dataArr = res.data.data.cards.map(function(o, i) {
          return {
            name: "豆蔻肥仔",
            date: o.mblog.created_at,
            text: o.mblog.text,
            comments: o.mblog.comments_count,
            id: i,
            mid: o.mblog.mid,
            pics: o.mblog.pics ? o.mblog.pics : ""
          }
        })
        _this.setData({
          commentList: dataArr
        })
      }
    });
  },
  upper: function() {
    //this.requestWB()
  }
})