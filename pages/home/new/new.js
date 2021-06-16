// pages/new/new.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

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
  
  passQuery: function(e){

    // 传递的参数
    let query = e.currentTarget.dataset['bookno'];
    wx.navigateTo({
      url: '/pages/home/details/details?bookno=' + query
    })

},

  onLoad: function(options){
    wx.request({
      url: 'http://xinyun.1473.cn/Request.php',
      method: 'POST',
      data: {
        res: 'select_allbook'
      },
      header: {
        'content-type' : 'application/x-www-form-urlencoded'
      },
      success:(res)=>{
        const allbook =res.data;
        this.setData({
          allbook:allbook
        })
      },
    })
  },
})