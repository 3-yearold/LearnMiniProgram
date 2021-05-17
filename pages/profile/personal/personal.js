// pages/profile/profile.js
const app = getApp()
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false
    titles:['文章','借阅中','收藏','借阅记录','喜欢'],
    currentTab:0,
    delBtnWidth:160,
    data: [{ content: "1", right: 0 }, { content: "2", right: 0 }, ],
    book:[{title:'活着',writer:'余华',type:'| 长篇小说',content:'在大时代背景下，随着内战、三反五反，大',right: 0,startime:'2021-04-16',endtime:'2021-04-18',lastime:'2'},
          {title:'鼠疫',writer:'[俄] 列夫·托尔斯泰',type:'',content:'写的故事发生在20世纪40年代，地点是阿尔',right: 0,startime:'2021-04-16',endtime:'2021-04-18',lastime:'2'},
          {title:'鼠疫',writer:'[俄] 列夫·托尔斯泰',type:'',content:'写的故事发生在20世纪40年代，地点是阿尔',right: 0,startime:'2021-04-16',endtime:'2021-04-18',lastime:'2'},
        ],
    isScroll:true,
    windowHeight:0,
  },
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowHeight: res.windowHeight
        });
      }
    });
  },
  drawStart: function (e) {
    // console.log("drawStart");  
    var touch = e.touches[0]

    for(var index in this.data.book) {
      var item = this.data.book[index]
      item.right = 0
    }
    this.setData({
      book: this.data.book,
      startX: touch.clientX,
    })

  },
  drawMove: function (e) {
    var touch = e.touches[0]
    var item = this.data.book[e.currentTarget.dataset.index]
    var disX = this.data.startX - touch.clientX
    
    if (disX >= 20) {
      if (disX > this.data.delBtnWidth) {
        disX = this.data.delBtnWidth
      }
      item.right = disX
      this.setData({
        isScroll: false,
        book: this.data.book
      })
    } else {
      item.right = 0
      this.setData({
        isScroll: true,
        book: this.data.book
      })
    }
  },  
  drawEnd: function (e) {
    var item = this.data.book[e.currentTarget.dataset.index]
    if (item.right >= this.data.delBtnWidth/2) {
      item.right = this.data.delBtnWidth
      this.setData({
        isScroll: true,
        book: this.data.book,
      })
    } else {
      item.right = 0
      this.setData({
        isScroll: true,
        book: this.data.book,
      })
    }
  },
  // 续借功能
  renew:function(e){
    let index = e.currentTarget.dataset.index
    let lastime = 'book['+index+'].lastime'
    this.setData({
       	[lastime]: this.data.book[index].lastime-1+8
    })
    wx.showToast({
      title: '续借成功',
      icon: 'none',    //如果要纯文本，不要icon，将值设为'none'
      duration: 500     
    })  
  },
  // 删除功能
  delItem: function (e) {
    // 获取索引值
    var index = e.currentTarget.dataset.index
    // console.log(index);
    var book=this.data.book;
    book.splice(index,1)
    this.setData({
      book: this.data.book
    })
    wx.showToast({
      title: '归还成功',
      icon: 'none',    //如果要纯文本，不要icon，将值设为'none'
      duration: 500     
    })  
 
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  handleTabClick(event){
    const index = event.detail.index
    // console.log(index)
    this.setData({
      currentTab:event.detail.index
    })
  },

})