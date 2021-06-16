// pages/details/details.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: true,  
  },
  show: function () {     
    this.setData({ flag:false})
    wx.request({
      url: 'http://xinyun.1473.cn/Request.php',
      method:'POST',
      data:{
        res:'insert_borrowing,' + this.options.bookno + ',' + app.globalData.openid
      },
      header:{
        'content-type':'application/x-www-form-urlencoded'
      },
      success: (res) => {
        
      },
    })
  },  
  //消失   
  hide: function () {     
    this.setData({ flag: true})   
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
  onLoad: function(options){
    wx.request({
      url: 'http://xinyun.1473.cn/Request.php',
      method:'POST',
      data:{
        res:'select_bookno,' + options.bookno
      },
      header:{
        'content-type':'application/x-www-form-urlencoded'
      },
      success: (res) => {
        const that = this
        const articlecontent = res.data
        that.setData({
          allbook: articlecontent
        })
      },
    })
    // wx.request({
    //   url: 'http://xinyun.1473.cn/Request.php',
    //   method:'POST',
    //   data:{
    //     res:'insert_borrowing,' +'oP3bw4isUkKa1NyZoRuQQrtVgg-k'+ options.bookno
    //   },
    //   header:{
    //     'content-type':'application/x-www-form-urlencoded'
    //   },
    //   success: (res) => {
    //     // const that = this
    //     // const articlecontent = res.data
    //     // that.setData({
    //     //   allbook: articlecontent
    //     console.log(res)
    //     // })
    //   },
    // })
  },
})