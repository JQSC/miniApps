// pages/common/bar/bar.js
var WxParse = require('../../wxParse/wxParse.js');


Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    item: {
      type: Object
    }
  },
  /**
   * 组件的初始数据
   */
  data: {},
  attached: function() {
    /**
     * WxParse.wxParse(bindName , type, data, target,imagePadding)
     * 1.bindName绑定的数据名(必填)
     * 2.type可以为html或者md(必填)
     * 3.data为传入的具体数据(必填)
     * 4.target为Page对象,一般为this(必填)
     * 5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选)
     */
    var htmlEle = this.data.item;
    var htmlText = htmlEle ? htmlEle.text : "";
    WxParse.wxParse('text', 'html', htmlText, this, 2);
    //整合图片列表
    var pics = this.setPicsList();
    this.setData({
      pics: pics
    })
  },
  methods: {
    setPicsList: function() {
      var item = this.data.item;
      var pics="";
      if (item && item.pics) {
        pics = item.pics.map(function(o, i) {
          return o.large.url
        })
      }
      return pics
    },
    // 这里是一个自定义方法
    customMethod: function(e) {
      var item = e.currentTarget.dataset.item;
      getApp().globalData.comments = item;
      wx.navigateTo({
        url: '../wb-api/comment/comment?mid=' + item.mid
      })
    },
    previewImage: function(e) {
      var current = e.target.dataset.src;
      
      console.log(current, this.data.pics)
      wx.previewImage({
        current: current, // 当前显示图片的http链接  
        urls: this.data.pics // 需要预览的图片http链接列表  
      })
    }
  }
})