// pages/category/category.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isSearch: true,
    isClear: false,
    val: "",
    navbar: ['推荐', '关注'],
    currentTab: 0,
    navHeight: '',
    menuButtonInfo: {},
    searchMarginTop: 0,
    searchWidth: 0,
    searchHeight: 0,
    icon_like: 'http://xinyun.1473.cn/ative/shareimg/loves.png',
    icon_unlike: 'http://xinyun.1473.cn/ative/shareimg/love.png',
    like: false, //是否已点赞
    count: 0,
    article: []

  },
    onLike(e) {
    wx.vibrateShort() //手机振动API
    this.animation = wx.createAnimation({
      duration: 300, // 动画持续时间，单位 ms
      timingFunction: 'linear', // 动画的效果
      delay: 10, // 动画延迟时间，单位 ms
      transformOrigin: '50% 50%' // 动画的中心点
    })
    let likeCounts = e.currentTarget.dataset.like;
    let id = e.currentTarget.dataset.post;
    let like = this.data.like;
    likeCounts++;
    const article =this.data.article
    this.setData({
      likeCounts:article.likeCount
    })
    if(like==false){
      this.setData({
        like:!like
      })
    }
    var index =e.currentTarget.dataset.index;
    var message =this.data.article;
    for (let i in message){
      if(i == index){
        message[i].likeCount = parseInt(message[i].likeCount) + 1
      }
    }
    this.setData({
      article:message
    })
    wx.request({
      url: 'http://xinyun.1473.cn/Request.php',
      method: 'POST',
      data: {
        res: 'insert_addlike,'+ 'oP3bw4isUkKa1NyZoRuQQrtVgg-k,' + id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: (result) => {
        wx.request({
          url: 'http://xinyun.1473.cn/Request.php',
          method: 'POST',
          data: {
            res: 'update_addlike,' + id
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: (result) => {
    
          },
        })
      },
    })

  },

  details: function (e) {
    var articleid = e.currentTarget.dataset.article
    wx.navigateTo({
      url: '/pages/share/details/details?articleid=' + articleid
    })
  },

  book: function () {
    wx.navigateTo({
      url: '/pages/share/book/book'
    })
  },

  searchtitle: function () {
    wx.navigateTo({
      url: '/pages/share/search/search'
    })
  },

  swiperTab: function (e) {
    var that = this;
    that.setData({
      currentTba: e.detail.current
    });
  },
  //点击切换
  clickTab: function (e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
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
  passQuery: function(e){

    // 传递的参数
    let query = e.currentTarget.dataset['bookno'];
    wx.navigateTo({
      url: '/pages/home/details/details?bookno=' + query
    })

},
  clearTap: function () {
    this.setData({
      val: "",
      isSearch: true,
      isClear: false
    })
  },
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },
  switchTab: function (e) {
    this.setData({
      currentTab: e.detail.current
    });
    this.checkCor();
  },
  checkCor: function () {
    if (this.data.currentTab > 4) {
      this.setData({
        scrollLeft: 300
      })
    } else {
      this.setData({
        scrollLeft: 0
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {

    this.setData({
      menuButtonInfo: wx.getMenuButtonBoundingClientRect()
    })
    const { top, width, height, right } = this.data.menuButtonInfo
    wx.getSystemInfo({
      success: (res) => {
        const { statusBarHeight } = res
        const margin = top - statusBarHeight
        this.setData({
          navHeight: (height + statusBarHeight + (margin * 2)),
          searchMarginTop: statusBarHeight + margin,
          searchHeight: height,
          searchWidth: right - width
        })
      },
    })
    var that = this;
    //  高度自适应
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR - 180;
        that.setData({
          winHeight: calc
        });
      }
    });
    wx.request({
      url: 'http://xinyun.1473.cn/Request.php',
      method: 'POST',
      data: {
        res: 'select_article'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: (result) => {
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