// pages/search/search.js
var app =getApp();
var search = ''

Page({

  /**
   * 页面的初始数据
   */
  data: {
    historyList: [],     // 历史记录
    content_Show:true,
    phbook:[],
    search:[],
    ph:[],
  },

  changeSearch: function(e) {
    let that = this;
    var inputSearch = e.detail.value;
    that.setData({
      search: inputSearch
    })
    console.log(e)
    wx.request({
      url: 'http://xinyun.1473.cn/Request.php',
      method:'POST',
      data:{
        res:'select_somebook,' + inputSearch
      },
      header:{
        'content-type':'application/x-www-form-urlencoded'
      },
      success: (result) => {
        console.log(result)
      },
    })
  },

searchinput:function(e){
  
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: 'http://xinyun.1473.cn/Request.php',
      method:'POST',
      data:{
        res:'select_somebook,'
      },
      header:{
        'content-type':'application/x-www-form-urlencoded'
      },
      success: (res) => {
        console.log(res)
        const phbook = res.data;
        this.setData({
          phbook : phbook
        })
      },
    })
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