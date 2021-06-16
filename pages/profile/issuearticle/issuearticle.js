// pages/profile/issuearticle/issuearticle.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    concent: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  bindFormSubmit : function(event){
    const content = event.detail.value.concent.replace (/[,，]/g,'\/逗号/\\').replace(/\n/g,  "<br>")
    console.log('insert_article,' + app.globalData.openid + ',' + app.globalData.bookno + ',' + content)
    wx.request({
      url: 'http://xinyun.1473.cn/Request.php',
      method: 'POST',
      data : {
        res : 'insert_article,' + app.globalData.openid + ',' + app.globalData.bookno + ',' + content
      },
      header:{
        'content-type':'application/x-www-form-urlencoded'
      },
      success : (result) => {
        console.log(result)
        wx.showToast({
          title: '操作成功！', // 标题
          icon: 'success',  // 图标类型，默认success
          duration: 1500,  // 提示窗停留时间，默认1500ms
          success: function (){
            setTimeout(function () {
              wx.reLaunch({
                url: '/pages/share/category/category',
              })
            }, 1000);
          }
        })
      }
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