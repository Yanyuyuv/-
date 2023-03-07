// components/Home2/Home2.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // this.properties.inxSwiperCurrent
    //记录父组件当前页面数
    inxSwiperCurrent: {
      type: Number
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    touchS: 0,
    touchE: 0,
    //轮播图current(当主页2个current到底底部要开启冒泡)
    swiperCurrent: 0,
    //轮播图节流阀
    swiperKey: 1,
    swiperTimer: null,

  },

  /**
   * 组件的方法列表
   */
  methods: {
    //禁止原生轮播图
    catchTouchMove(e) {
      return false
    },
    //触摸开始事件
    h2touchStart: function (e) {
      var that = this
      // console.log(e.changedTouches[0].pageX)
      that.setData({
        touchS: e.changedTouches[0].pageX
      })
    },
    //触摸结束事件
    h2touchEnd: function (e) {
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
        }, 600)

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
          } else if (that.data.swiperCurrent == 0) { //到了最左边
            let beforSwiper = this.properties.inxSwiperCurrent - 1
            that.triggerEvent('h2Swiper', {
              newCurrent: beforSwiper
            })
          }
        } else if (start > end + 50) {
          // console.log('向左滑，这里可以调用方法，及页面跳转事件')
          if (that.data.swiperCurrent < 3) { //没到最右边
            that.swiperCur(that.data.swiperCurrent + 1)
          } else if (that.data.swiperCurrent == 3) { //到了最右边
            //变换父组件swiper
            let nextSwiper = this.properties.inxSwiperCurrent + 1
            that.triggerEvent('h2Swiper', {
              newCurrent: nextSwiper
            })
          }

        }

      }

    },
    bc(e) {
      this.setData({
        swiperCurrent: e.detail.current
      })
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
  }


})