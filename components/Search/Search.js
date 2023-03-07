import request from '../../utils/request'

// components/Search/Search.js
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
    easeShow: 0,
    easeCloseTimer: null,
    studentNumber: 0
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
    //右上角×
    searchClose() {
      // console.log('你点击了×')
      //通过子组件向父组件传值 把父组件的searchDisplay改成0

      if (this.data.easeCloseTimer) clearInterval(this.data.easeCloseTimer)
      this.setData({
        easeShow: 0,
        easeCloseTimer: setTimeout(() => {
          this.triggerEvent('SearchDisplay', 0)
        }, 300)

      })


    },

    handleInput(e) {

      clearTimeout(this.timeId)
      this.timeId = setTimeout(() => {
        let type = e.currentTarget.dataset.type

        this.setData({
          [type]: e.detail.value
        })
      }, 300)
    },

    // 查询按钮
    async goSearch() {
      // 先判断姓名学号不为空
      let {
        studentNumber
      } = this.data;
      // 首先保证全部填写和填写正确
      let stuIdReg = /^3\d{9}$/;
      if (!stuIdReg.test(studentNumber)) {
        wx.showToast({
          title: '学号格式错误',
          icon: 'none'
        })
        return;
      }
      if (!studentNumber) {
        wx.showToast({
          title: '学号没填哟',
          icon: 'none'
        })
        return
      }

      // 向服务器发送请求，查看报名状态
      let uid = this.data.studentNumber;
      let result = await request(`/getProgress/${uid}`)
      console.log(result);
      if (result.code == 200) {
        if (!result.data.change.status) {
          wx.showToast({
            title: '您未报名',
            icon: 'none'
          })
        } else {
          // 报名成功的跳转到流程页
          wx.navigateTo({
            url: `/pages/SearchResult/SearchResult?stuId=${studentNumber}&direction=${result.data.change.direction}`,
          })
        }
      } else if (result.code == 1006) {
        wx.showToast({
          title: '无报名信息',
          icon: 'none'
        })
      } else {
        wx.showToast({
          title: '网络异常',
          icon: 'none'
        })
      }

      //把输入框的值传到（或者保存到本地
      //跳转查询页面
      // wx.navigateTo({
      //   url: `/pages/SearchResult/SearchResult?${}`,
      // })
    }
  },
  lifetimes: {
    attached() {
      this.setData({
        easeShow: 1
      })
    }
  }
})