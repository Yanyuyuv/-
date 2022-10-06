// components/NavigationBar/NavigationBar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    paddingTopNum: wx.getSystemInfoSync().statusBarHeight+7  
    //这里为啥要+7，是因为小程序的胶囊按钮距离手机浏览器之间还有7个像素的间距，所以是为了让导航能够和胶囊按钮齐平
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
