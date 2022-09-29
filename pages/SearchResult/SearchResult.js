// pages/SearchResult/SearchResult.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //0未报名，1报名成功，2面试成功，3.....
    status:0,
    lineActive:-1,
    moveY:'translateY(0)'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    setTimeout(()=>{ this.statusAnimation(this.data.status);},1000)
   
    
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

  // 加载动画
  statusAnimation(status){
    if (status==0) {
      return
    }
    let movePercent=-15-(status-1)*25;
    this.setData({
      lineActive:1,
      moveY:'translateY'+`(${movePercent}%)`
    })
    console.log(this.data.moveY);
  }
})