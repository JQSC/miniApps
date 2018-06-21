// pages/index/index.js

//微信解密函数
var WXBizDataCrypt = require('../../utils/RdWXBizDataCrypt.js');
//全局的配置信息
var config = require('../../config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    runData: "",
    day:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const _this = this;

    wx.login({
      success: function(res) {
        if (res.code) {
          wx.request({
            url: config.openIdUrl,
            data: {
              appid: config.appid,
              secret: config.secret,
              js_code: res.code,
              grant_type: "authorization_code"
            },
            success: function(res) {
              var secretData = res.data;
              var pc = new WXBizDataCrypt(config.appid, res.data.session_key)
              wx.getWeRunData({
                success(res) {
                  var data = pc.decryptData(res.encryptedData, res.iv);
                  var stepInfo = data.stepInfoList[data.stepInfoList.length - 1];
                  //console.log(stepInfo)
                 var stepDate=new Date(parseInt(stepInfo.timestamp) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ')
                  _this.setData({
                    runData: stepInfo.step,
                    day: stepDate
                  })
                }
              })
            }
          })
        } else {
          console.log("登录失败! " + res.errMsg)
        }
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