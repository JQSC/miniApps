// pages/component/common/common.js
var WxParse = require('../../wxParse/wxParse.js');

Component({
  /**
   * 组件的属性列表
   */
  properties: {
      item:{
        type: Object
      }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  attached: function () {

    WxParse.wxParse('text', 'html', this.data.item.text, this, 5);
  },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})
