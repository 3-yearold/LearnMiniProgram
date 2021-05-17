// pages/index/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: null
  },
  formSubmit: function (e) {
    const that = this
    console.log('form发生了submit事件，携带数据为：', e.detail, app.globalData.openid);
    that.info = "insert_reader,"+app.globalData.openid
    for(var i in e.detail.value) {
      that.info += "," + e.detail.value[i]
      console.log(that.info)
    }
    wx.request({
      url: app.globalData.addrees,
      method: 'POST',
      data: {
        res: that.info
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: (r) => {
        wx.showToast({
          title: '操作成功！', // 标题
          icon: 'success',  // 图标类型，默认success
          duration: 1500,  // 提示窗停留时间，默认1500ms
          success: function (){
            setTimeout(function () {
              wx.reLaunch({
                url: '/pages/home/index/index',
              })
            }, 1000);
          }
        })
      }
    })
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

  }
})