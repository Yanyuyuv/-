//index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    //这里为啥要+47，是因为小程序的胶囊按钮距离手机浏览器之间还有7个像素的间距，同时NavigationBar高度为40px
    paddingTopNum: wx.getSystemInfoSync().statusBarHeight + 47,

    //查询弹框的显示
    searchDisplay: 0,

    touchS: 0,
    touchE: 0,
    //轮播图current
    swiperCurrent: 0,
    //轮播图节流阀
    swiperKey: 1,
    swiperTimer: null,
    //记录从主页2的边缘滑动
    // h2change: 1

  },
  // 查询弹框的展示
  searchDisplay(e) {
    //此功能需要与两个子组件连接（结果查询按钮和查询弹框×)
    // console.log('searchDisplay'+this.data.searchDisplay)
    // console.log(e.detail)
    this.setData({
      searchDisplay: e.detail
    })
  },
  //禁止原轮播图滑动功能
  catchTouchMove(e) {
    return false
  },
  //触摸开始事件
  touchStart: function (e) {
    if (this.data.swiperKey == 1) {
      var that = this
      // console.log(e.changedTouches[0].pageX)
      that.setData({
        touchS: e.changedTouches[0].pageX
      })
    }
  },
  //触摸结束事件
  touchEnd: function (e) {
    var that = this
    //只要结束就开启节流计时
    //一段时间后开启节流阀
    if (that.data.swiperTimer) clearTimeout(that.data.swiperTimer)
    that.setData({
      swiperTimer: setTimeout(() => {
        that.setData({
          swiperKey: 1
          // h2change: 1
        })
      }, 800)

    })

    //如果节流阀开启就转换页面
    if (this.data.swiperKey == 1) {
      that.setData({
        touchE: e.changedTouches[0].pageX,
        swiperKey: 0 //关闭节流阀
      })
      let start = that.data.touchS
      let end = that.data.touchE
      // console.log(start)
      // console.log(end)
      if (start < end - 50) {
        // console.log('向右滑，这里可以调用方法，及页面跳转事件')
        if (that.data.swiperCurrent > 0) { //没到最左边
          that.swiperCur(that.data.swiperCurrent - 1)

        }
      } else if (start > end + 50) {
        // console.log('向左滑，这里可以调用方法，及页面跳转事件')
        if (that.data.swiperCurrent < 2) { //没到最右边
          that.swiperCur(that.data.swiperCurrent + 1)
        }
      }
    }


  },
  // 轮播图Current改变事件：改变当前的swiperCurrent num为页数
  swiperCur: function (num) {
    var that = this
    // 开启节流阀
    //切换轮播图
    if (that.data.swiperKey == 0) {
      that.setData({
        swiperCurrent: num
      })
    }


  },
  bc(e) {
    this.setData({
      swiperCurrent: e.detail.current
    })
  },

  // 主页2内部轮播图的边缘确认
  h2Swiper: function (e) {
    var that = this
    //只要触发就开启节流计时
    //一段时间后开启节流阀
    if (that.data.swiperTimer) clearTimeout(that.data.swiperTimer)
    that.setData({
      swiperTimer: setTimeout(() => {
        that.setData({
          swiperKey: 1
          // h2change: 1
        })
      }, 800)

    })

    //开启轮播图切换条件
    that.setData({
      swiperKey: 0 //关闭节流阀
    })
    //轮播图切换
    that.swiperCur(e.detail.newCurrent)
  },

  onLoad() {}
})