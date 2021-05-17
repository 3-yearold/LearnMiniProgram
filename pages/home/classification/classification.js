// pages/classification/classification.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    motto: 'Hello World',
    navbar: ['文学', '历史地理','医药卫生','艺术','语言文学','数理科学','军事'],
    currentTab:0,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },
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
// Page({
//   data: {
//     active:0,
//     currentTab:0
//   },
//   switchNav: function (e) {
//     var page = this;
//     var id = e.target.id;
//     if (this.data.currentTab == id) {
//       return false;
//     } else {
//       page.setData({
//         currentTab: id
//       });
//     }
//     page.setData({
//       active: id
//     });
//   }
//  })
