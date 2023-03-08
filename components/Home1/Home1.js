// components/Home1.js
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
    show:false,
    IMGOKNum: 0,
    loadingOpa: 1,
    loadingDisplay:true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //图片加载完毕
    IMGOK(e) {
      this.setData({
        IMGOKNum: this.data.IMGOKNum + 1,
      })
      // console.log(this.data.IMGOKNum)
      if (this.data.IMGOKNum == 4) {
        this.setData({
          loadingOpa: 0
        })
        setTimeout(() => {
          this.setData({
            // loadingDispaly: 0
            loadingDisplay:false
          })

        }, 2000);
      }
    },
    //图片加载失败
    IMGerror(e) {
      wx.showToast({
        title: '网络异常',
        icon: 'error'
      })
    }
  },
  lifetimes:{
    created(){
      this.setData({
        show:true
      })
    }
  }
})