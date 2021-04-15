// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    historyList: [],     // 历史记录
    hotList: ['菩提珠串', '金石/拓片', '翡翠原石', '和田玉', '邮票', '珍珠'],    // 热门推荐
  },
 //点击切换
 clickTab: function( e ) { 
  
  var that = this; 
 
  if( this.data.currentTab === e.target.dataset.current ) { 
   return false; 
  } else { 
   that.setData( { 
    currentTab: e.target.dataset.current 
   }) 
  } 
 } ,
 getInput: function (e) {
   this.setData({
     val: e.detail.value
   })
   if (this.data.val.length > 0) {
     this.setData({
       isSearch: false,
       isClear: true
     })
   } else {
     this.setData({
       isSearch: true,
       isClear: false
     })
   }
 },

 clearTap: function () {
   this.setData({
     val: "",
     isSearch: true,
     isClear: false
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