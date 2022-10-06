// components/InquiryRegistrationButton/InquiryRegistrationButton.js
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
  // 前往报名页
  goApplicationForm(){
    this.triggerEvent('h2Swiper',{
      newCurrent: 2
    })
  },

  // 结果查询
  goSearch(){
    this.triggerEvent('SearchDisplay',1)
  }
}
  })
