// pages/details/details.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stars: [0, 1, 2, 3, 4],
    normalSrc: 'http://xinyun.1473.cn/ative/shareimg/no-star.png',
    selectedSrc: 'http://xinyun.1473.cn/ative/shareimg/star.png',
    halfSrc: 'http://xinyun.1473.cn/ative/shareimg/star.png',
    icon_like: 'http://xinyun.1473.cn/ative/shareimg/loves.png',
    icon_unlike: 'http://xinyun.1473.cn/ative/shareimg/love.png',
    like:false, //是否已点赞
    count: 0,
    release: '',
    comment: '',
    commentcount: 0,
    articlecontent: {}
  },
  onLike(e) {

    wx.vibrateShort() //手机振动API


 this.animation = wx.createAnimation({
   duration: 300, // 动画持续时间，单位 ms
   timingFunction: 'linear', // 动画的效果
   delay: 10, // 动画延迟时间，单位 ms
   transformOrigin: '50% 50%' // 动画的中心点
 })


 let like = this.properties.like
 let count = this.properties.count

 count = like ? count - 1 : count + 1

 if (!like) {
   setTimeout(function () {

     this.animation.scale(1.5).step();
     this.animation.scale(1.0).step();

     this.setData({
       animation: this.animation.export()
     });

   }.bind(this), 50);
 }

 this.setData({
   count,
   like: !like
 })

},
Release_input : function(e){
  let that = this;
  var inputRelease = e.detail.value;
  that.setData({
    release : inputRelease
  })
},
Release : function(e){
  let that = this
  if(that.data.release){
    wx.request({
      url: 'http://xinyun.1473.cn/Request.php',
      method:'POST',
      data:{
        res:'insert_comment,' + that.data.release + ',' + app.globalData.openid + ',' + this.options.articleid
      },
      header:{
        'content-type':'application/x-www-form-urlencoded'
      },
      success: (result) => {
        wx.showToast({
          title: '操作成功！', // 标题
          icon: 'success',  // 图标类型，默认success
          duration: 1500,  // 提示窗停留时间，默认1500ms
          success: function (){
            that.setData({
              release: ''
            })
          }
        })
        wx.request({
          url: 'http://xinyun.1473.cn/Request.php',
          method:'POST',
          data:{
            res:'select_comment,' + this.options.articleid
          },
          header:{
            'content-type':'application/x-www-form-urlencoded'
          },
          success: (res) => {
            const comment = res.data;
            this.setData({
              comment : comment,
              commentcount : res.data.length
            })
          },
        })
      },

    })
  }else {
    wx.showToast({
      title: '不能发表空的评论', // 标题
      icon: 'none',  // 图标类型，默认success
      duration: 1500,  // 提示窗停留时间，默认1500ms
      success: function (){
      }
    })
  }
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    wx.request({
      url: 'http://xinyun.1473.cn/Request.php',
      method:'POST',
      data:{
        res:'select_one_article,' + options.articleid
      },
      header:{
        'content-type':'application/x-www-form-urlencoded'
      },
      success: (res) => {        
        const that = this
        const articlecontent = res.data[0]
        that.setData({
          articlecontent: articlecontent,
        })
        let content = "articlecontent.content"
        let _content = articlecontent.content.replace(/\/逗号\//g  , ",").replace(/\<br\>/g, "\n");
        that.setData({
          // [content]: _contentreplace (/[,，]/g,'\/逗号/\\').replace(/\n/g,  "<br>"),
          [content]: _content
        })
      },
    })
    wx.request({
      url: 'http://xinyun.1473.cn/Request.php',
      method:'POST',
      data:{
        res:'select_comment,' + options.articleid
      },
      header:{
        'content-type':'application/x-www-form-urlencoded'
      },
      success: (res) => {
        const comment = res.data;
        this.setData({
          comment : comment,
          commentcount : res.data.length
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