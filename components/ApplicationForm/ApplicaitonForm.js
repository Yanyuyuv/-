// components/ApplicationForm/ApplicaitonForm.js
import request from '../../utils/request'
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
    timeId: -1,
    direction: '',
    zhuanYe: '',
    name: '',
    studentNumber: '',
    phone: '',
    selfComment: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //表单输入事件
    handleInput(e) {
      
      clearTimeout(this.timeId)
      this.timeId = setTimeout(() => {
        let type = e.currentTarget.dataset.type

        this.setData({
          [type]: e.detail.value
        })
      }, 300)
    },

    // 前端验证（验证手机格式之类的）
    webVerify() {
      let {
        direction,
        zhuanYe,
        name,
        studentNumber,
        phone,
        selfComment
      } = this.data;
      console.log(direction.toUpperCase().indexOf('UI'));
      // 首先保证全部填写
      if (!direction || !zhuanYe || !name || !studentNumber || !phone || !selfComment) {
        wx.showToast({
          title: '好像有表格没填完哟',
          icon: 'none'
        })
        return
      }

      if (direction.indexOf('前端') == -1 && direction.indexOf('后端') == -1 && direction.indexOf('后台') == -1 && direction.toUpperCase().indexOf('UI') == -1 && direction.indexOf('运营') == -1) {
        wx.showToast({
          title: '好像没有这个方向哟',
          icon: 'none'
        })
        return
      }

      let phoneReg = /^1(3|4|5|6|7|8|9)\d{9}$/;
      if (!phoneReg.test(phone)) {
        wx.showToast({
          title: '手机号格式错误',
          icon: 'none'
        })
        return;
      }

      // 给服务器发送请求
      this.sendRequest()
    },

    // 发送请求的函数
    async sendRequest(){
      let {direction,zhuanYe,name,studentNumber,phone,selfComment} = this.data;
      let userInfo={direction,zhuanYe,name,studentNumber,phone,selfComment}
      let result= await request('/reg',userInfo,'POST')
      console.log(result);
    }
  }
})