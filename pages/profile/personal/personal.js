// pages/profile/profile.js
const app = getApp()
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false
    titles:['文章','喜欢'],
    currentTab:0
  },
  handleTabClick(event){
    const index = event.detail.index
    // console.log(index)
    this.setData({
      currentTab:event.detail.index
    })
  },

})