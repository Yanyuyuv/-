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
    timeId: -1, //用来弄输入框定时器
    containerXY: 'translate(0px,0px)', //表单位置
    containerXYtime: '2s', //表单动画过渡时间
    containerXYtimer: null, //表单动画节流阀
    //以下是表单数据
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
      //0.3秒后将表单输入内容转移到data中
      clearTimeout(this.timeId)
      this.timeId = setTimeout(() => {
        let type = e.currentTarget.dataset.type

        this.setData({
          [type]: e.detail.value
        })
      }, 300)
    },

    //表单提交动画
    containerMover() {
      var that = this;
      clearTimeout(that.data.containerXYtimer)
      that.setData({
        containerXYtime: '2s',
        containerXY: 'translate(0,-100vh)'
      })
      //滑上去需要2秒 2秒后让表单出现在下方 同时清除上个表单
      that.setData({
        containerXYtimer: setTimeout(() => {
          that.setData({
            containerXYtime: '0s',
            containerXY: 'translate(0px,100vh)', //表单位置

            //清除表单
            direction: '',
            zhuanYe: '',
            name: '',
            studentNumber: '',
            phone: '',
            selfComment: ''

          })
          that.setData({
            containerXYtime: '2s',
            containerXY: 'translate(0px,0vh)', //表单位置
          })
        }, 2000)
      })
    },

    // 前端验证（验证手机格式之类的）
    webVerify() {
      var that = this;
      let {
        direction,
        zhuanYe,
        name,
        studentNumber,
        phone,
        selfComment
      } = this.data;
      // console.log(direction.toUpperCase().indexOf('UI'));
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

      let stuIdReg = /^3\d{9}$/;
      if (!stuIdReg.test(studentNumber)) {
        wx.showToast({
          title: '学号格式错误',
          icon: 'none'
        })
        return;
      }

      let phoneReg = /^1(3|4|5|6|7|8|9)\d{9}$/;
      if (!phoneReg.test(phone)) {
        wx.showToast({
          title: '手机号格式错误',
          icon: 'none'
        })
        return;
      }
      //表单确定提交模态框
      wx.showModal({
        title: '提交',
        content: '确定报名信息无误',
        cancelText: '还有问题',
        confirmText: '确定提交',
        success(res) {
          if (res.confirm) {
            // 给服务器发送请求
            that.sendRequest()
          } else if (res.cancel) {

          }
        }
      })



    },

    // 发送请求的函数
    async sendRequest() {
      var that = this;
      let {
        direction,
        zhuanYe,
        name,
        studentNumber,
        phone,
        selfComment
      } = this.data;


      //用来发送请求的data数据:
      let userInfo = {}
      userInfo.username = this.data.name;
      userInfo.phone = this.data.phone;
      userInfo.studId = this.data.studentNumber;
      userInfo.professional = this.data.zhuanYe;
      userInfo.interestGroups = this.data.direction;
      userInfo.selfIntroduction = this.data.selfComment
      // console.log(userInfo);

      let result = await request('/reg', userInfo, 'POST')

      // let result= await request('/reg',userInfo,'POST')
      // console.log(result);
      if (result.code == 200) {
        wx.showToast({
          title: '报名成功',
          icon: 'success',
          success() {
            //触发报名成功动画(移动表单 清除表单 移回表单)
            //表单提交动画
            that.containerMover()
            //清除用于发送请求的data数据
            userInfo = {}
          }
        })
      } else if (result.code == 1006) {
        wx.showToast({
          title: '您已经报名过',
          icon: 'error'
        })
      }

    }
  }
})