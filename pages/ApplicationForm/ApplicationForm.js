// pages/ApplicationForm/ApplicationForm.js
import request from '../../utils/request'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    timeId: -1,
    direction:'',
    zhuanYe:'',
    name:'',
    studentNumber:'',
    phone:'',
    selfComment:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },



  handleInput(e) {
    clearTimeout(this.timeId)
    this.timeId = setTimeout(() => {
      let type=e.currentTarget.dataset.type
      
      this.setData({
        [type]:e.detail.value
      })
    }, 300)
  },

  // 前端验证（验证手机格式之类的）
  webVerify() {
    let {direction,zhuanYe,name,studentNumber,phone,selfComment}=this.data;
    console.log(direction.toUpperCase().indexOf('UI'));
    // 首先保证全部填写
    if (!direction || !zhuanYe || !name || !studentNumber || !phone || !selfComment) {
      wx.showToast({
        title: '好像有表格没填完哟',
        icon:'none'
      })
      return
    }

    if (direction.indexOf('前端')==-1 && direction.indexOf('后端')==-1 && direction.indexOf('后台')==-1 && direction.toUpperCase().indexOf('UI')==-1 && direction.indexOf('运营')==-1) {
      wx.showToast({
        title: '好像没有这个方向哟',
        icon:'none'
      })
      return
    }

    for(k in studentNumber){
      console.log(666);
      console.log(k);
    }

    let phoneReg=/^1(3|4|5|6|7|8|9)\d{9}$/;
    if (!phoneReg.test(phone)) {
      wx.showToast({
        title: '手机号格式错误',
        icon:'none'
      })
      return; 
    }
    
    // 给服务器发送请求
    
  }
})