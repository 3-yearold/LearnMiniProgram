// pages/classification/classification.js
const app = getApp()
const network = require('../../../network.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    motto: 'Hello World',
    navbar: [],
    currentTab:0,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') ,// 如需尝试获取用户信息可改为false
    sort:[]
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
  gaintypebook: function(e) {
    let query
    if(typeof e == 'string'){
      query = e;
    }else{
      query = e.currentTarget.dataset['index'];
    }
    console.log(app.findKey(app.globalData.booktype,query))
    wx.request({
      url: 'http://xinyun.1473.cn/Request.php',
      method:'POST',
      data:{
        res:'select_typebook,' + app.findKey(app.globalData.booktype,query)
      },
      header:{
        'content-type':'application/x-www-form-urlencoded'
      },
      success: (result) => {
        console.log(result)
        const sort = result.data
        this.setData({
          sort:sort
        })
        
      },
    })
  },
  onLoad: function (options) {
    const that = this
    const arr = []
    for(var i in app.globalData.booktype){
      arr.push(app.globalData.booktype[i])
    }
    that.setData({
      navbar: arr
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.gaintypebook('马克思主义、列宁主义、毛泽东思想、邓小平理论')
  }
})