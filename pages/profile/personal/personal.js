// pages/profile/profile.js
const app = getApp()
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false
    titles:['文章','喜欢','借阅'],
    currentTab:0
  },
  
  handleTabClick(event){
    const index = event.detail.index
    // console.log(index)
    this.setData({
      currentTab:event.detail.index
    })
  },
  borrowing(event){
    // console.log(app.globalData.openid,event.target.id)
    const bookid = '9787544270878'
    wx.request({
      url: app.globalData.addrees,
      method: 'POST',
      data: {
        res: 'insert_borrowing,' + bookid + ',' + app.globalData.openid
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: (r) => {
        wx.showToast({
          title: '借阅成功！', // 标题
          icon: 'success',  // 图标类型，默认success
          duration: 1500,  // 提示窗停留时间，默认1500ms
        })
      }
    })
  }
})