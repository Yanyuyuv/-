// components/BackgroundImage/BackgroundImage.js
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
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //图片加载失败
    IMGerror(e) {
      wx.showToast({
        title: '网络异常',
        icon: 'error'
      })
    },
  }
})