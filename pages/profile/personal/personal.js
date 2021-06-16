// pages/profile/profile.js
const app = getApp()
var dayjs = require('../../miniprogram_npm/dayjs/index')
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false
    titles:['文章','借阅中','收藏','借阅记录','喜欢'],
    currentTab:0,
    book:[],
    reader:[],//用户id
    borrowing:[],
    like:[],
    book:[],//书籍
    startX: 0, //开始x坐标
    startY: 0, //开始y坐标
    contentHeight:800,
    article: [],
    mearticle: []
  },
  // 静止滑动
  stopTouchMove: function() {
    return false;
    },
  onLoad: function (options) {
    // 页面滚动
    var height = wx.getSystemInfoSync().windowHeight;
     let windowHeight = height *(750/wx.getSystemInfoSync().windowWidth);
     this.setData({
       contentHeight:windowHeight - 400 -80
     }),
// 请求个人简介
    wx.request({
      url: 'http://xinyun.1473.cn/Request.php',
      method:'POST',
      data:{
        res:'select_readerid,'+'oP3bw4khWwOSjn2Ybf'
      },
      header:{
        'content-type':'application/x-www-form-urlencoded'
      },
      success:(res) => {
        // console.log(res)
        const reader = res.data;
        // console.log(reader)
        this.setData({
          reader:reader
        })
      }
    }),
    // 请求发布文章
    wx.request({
      url: 'http://xinyun.1473.cn/Request.php',
      method:'POST',
      data:{
        res:'select_mearticle,'+ app.globalData.openid
      },
      header:{
        'content-type':'application/x-www-form-urlencoded'
      },
      success:(result) => {
        const that = this
        const mearticle = result.data;
        that.setData({
          mearticle: mearticle
        })
        that.data.mearticle.forEach((item,index) => {
          let content = "mearticle["+ index +"].content"
          let _content = mearticle[index].content.replace(/\/逗号\//g  , ",").replace(/\<br\>/g, "\n");
          that.setData({
            // [content]: _contentreplace (/[,，]/g,'\/逗号/\\').replace(/\n/g,  "<br>"),
            [content]: _content
          })
        })
      }
    })
  },
  // 借阅中
_borrowing(e){
  wx.request({
   url: 'http://xinyun.1473.cn/Request.php',
   method:'POST',
   data:{
     res:'select_borrowing,' + app.globalData.openid
   },
   header:{
     'content-type':'application/x-www-form-urlencoded'
   },
   success:(res) => {
     const borrowing = res.data;
     console.log(borrowing)
     for (var index in borrowing) {
       borrowing[index].BDate=dayjs(borrowing[index].BDate).format('YYYY-MM-DD')
       borrowing[index].RDate=dayjs(borrowing[index].RDate).format('YYYY-MM-DD')
       this.setData({
         borrowing:borrowing
       })
      }
   }
 })
},
  // 续借功能
  renew:function(e){
    let index = e.currentTarget.dataset.index
    console.log(this.data.borrowing[index].borrowid)
    wx.request({
      url: 'http://xinyun.1473.cn/Request.php',
      method:'POST',
      data:{
        res:'update_borrowing,' + this.data.borrowing[index].borrowid
      },
      header:{
        'content-type':'application/x-www-form-urlencoded'
      },
      success:(res) => {
       this._borrowing()
      }
    })
  },
  // 归还功能
  delItem: function (e) {
    let index = e.currentTarget.dataset.index
    var boolid = (this.data.borrowing[index].borrowid)
    wx.showModal({
      title: '提示',
      content: '是否归还',
      confirmColor: "#0083ff",
      success: res => {
        wx.request({
          url: 'http://xinyun.1473.cn/Request.php',
          method:'POST',
          data:{
            res:'delete_borrowing,' + boolid
          },
          header:{
            'content-type':'application/x-www-form-urlencoded'
          },
          success:(res) => {
            this._borrowing()
            wx.showToast({
              title: '归还成功',
              icon: 'none',
              duration: 500     
            })  
          }
        })
      }
    })
  },
  // 收藏
_sud(e){
  wx.request({
    url: 'http://xinyun.1473.cn/Request.php',
    method:'POST',
    data:{
      res:'select_collectbook,' + 'oP3bw4isUkKa1NyZoRuQQrtVgg-k'
    },
    header:{
      'content-type':'application/x-www-form-urlencoded'
    },
    success:(res) => {
      const book = res.data;
      this.setData({
        book:book
      })
    }
  })
},
// 删除
del(e) {
  var index = e.currentTarget.dataset.index
  var boolid = this.data.book[index].bookid
  wx.showModal({
    title: '提示',
    content: '真的取消收藏嘛',
    confirmColor: "#0083ff",
    success: res => {
      console.log(boolid)
      wx.request({
        url: 'http://xinyun.1473.cn/Request.php',
        method:'POST',
        data:{
          res:'delete_collectbook,' + boolid
        },
        header:{
          'content-type':'application/x-www-form-urlencoded'
        },
        success:(res) => {
          this._sud()
          wx.showToast({
            title: '删除成功',
            icon: 'none',    //如果要纯文本，不要icon，将值设为'none'
            duration: 500     
          })  
        }
      })
    }
  })
},
  // 查看喜欢
  like(e){
    wx.request({
      url: 'http://xinyun.1473.cn/Request.php',
      method:'POST',
      data:{
        res:'select_islikearticle,' + app.globalData.openid
      },
      header:{
        'content-type':'application/x-www-form-urlencoded'
      },
      success:(result) => {
        const that = this
        const article = result.data;
        that.setData({
          article: article
        })
        that.data.article.forEach((item,index) => {
          let content = "article["+ index +"].content"
          let _content = article[index].content.replace(/\/逗号\//g  , ",").replace(/\<br\>/g, "\n");
          that.setData({
            // [content]: _contentreplace (/[,，]/g,'\/逗号/\\').replace(/\n/g,  "<br>"),
            [content]: _content
          })
        })
      }
    })
  },
  // 点击调用所有功能
  handleTabClick(event){
    const index = event.detail.index
    // 取出index
    // console.log(index)
    this.setData({
      currentTab:event.detail.index
    })
    // 根据索引值进行数据请求
    if(index == 1){
      this._borrowing()
    }
    if(index==2){
      this._sud()
    }
    if(index==3){
      this._borrowing()
    }
    if(index==4){
      this.like()
    }
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  // 获取用户信息
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
issuearticle: function() {
    wx.navigateTo({
      url: '/pages/profile/search/search'
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
// ~~~~~~~~~~~~
// 收藏滑动的触动方式
touchstart: function(e) {
  // console.log('进来了', e)
  //开始触摸时 重置所有删除
  this.data.book.forEach(function(v, i) {
    if (v.isTouchMove) {  //只操作为true的
      v.isTouchMove = false;
    }
  })
  this.setData({
    startX: e.changedTouches[0].clientX,
    startY: e.changedTouches[0].clientY,
    book: this.data.book
  })
},

// 滑动事件处理,一次只能滑出一个删除按钮
touchmove: function(e) {
  var that = this,
    index = e.currentTarget.dataset.index,  //当前索引
    startX = that.data.startX,  //开始X坐标
    startY = that.data.startY,  //开始Y坐标
    touchMoveX = e.changedTouches[0].clientX, //滑动变化X坐标
    touchMoveY = e.changedTouches[0].clientY, //滑动变化Y坐标
    //获取滑动角度
    angle = that.angle({
      X: startX,
      Y: startY
    }, {
      X: touchMoveX,
      Y: touchMoveY
    });
  that.data.book.forEach(function(v, i) {
    v.isTouchMove = false
    //滑动超过30度角 return
    if (Math.abs(angle) > 30) {
      return;
    }
    if (i == index) {
      if (touchMoveX > startX) {  //右滑
        v.isTouchMove = false
      } else {  //左滑
        v.isTouchMove = true
      }
    }
  })
  that.setData({
    book: that.data.book
  })
},

    /**
 * 计算滑动角度
 * start 起点坐标
 * end 终点坐标　　* Math.PI 表示一个圆的周长与直径的比例，约为 3.14159;PI就是圆周率π，PI是弧度制的π,也就是180°   */
angle: function(start, end) {
  var _X = end.X - start.X,
    _Y = end.Y - start.Y
  return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
}
})