// pages/details/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stars: [0, 1, 2, 3, 4],
    normalSrc: '/ative/shareimg/no-star.png',
    selectedSrc: '/ative/shareimg/star.png',
    halfSrc: '/ative/shareimg/star.png',
    icon_like: '/ative/shareimg/loves.png',
    icon_unlike: '/ative/shareimg/love.png',
    like:false, //是否已点赞
    count:0
  },
  onLike(e) {

    wx.vibrateShort() //手机振动API


 this.animation = wx.createAnimation({
   duration: 300, // 动画持续时间，单位 ms
   timingFunction: 'linear', // 动画的效果
   delay: 10, // 动画延迟时间，单位 ms
   transformOrigin: '50% 50%' // 动画的中心点
 })


 let like = this.properties.like
 let count = this.properties.count

 count = like ? count - 1 : count + 1

 if (!like) {
   setTimeout(function () {

     this.animation.scale(1.5).step();
     this.animation.scale(1.0).step();

     this.setData({
       animation: this.animation.export()
     });

   }.bind(this), 50);
 }

 this.setData({
   count,
   like: !like
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