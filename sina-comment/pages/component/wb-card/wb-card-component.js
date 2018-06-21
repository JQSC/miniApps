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
  data: {
    // 这里是一些组件内部数据
    someData: {}
  },
  attached: function() {
    /**
     * WxParse.wxParse(bindName , type, data, target,imagePadding)
     * 1.bindName绑定的数据名(必填)
     * 2.type可以为html或者md(必填)
     * 3.data为传入的具体数据(必填)
     * 4.target为Page对象,一般为this(必填)
     * 5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选)
     */
    var item = this.data.item;
    console.log(item)
    WxParse.wxParse('text', 'html', item ? item.text : "", this, 2);
  },
  methods: {
    // 这里是一个自定义方法
    customMethod: function(e) {
      var item = e.currentTarget.dataset.item;
      getApp().globalData.comments = item;
      wx.navigateTo({
        url: '../wb-api/comment/comment?mid=' + item.mid
      })
    },
    pickPicsHtml:function(){

    }
  }
})