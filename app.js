App({
  globalData: {
    openid: null,
    addrees: 'http://xinyun.1473.cn/Request.php',
    userInfo: null
  },
  onLaunch : function() {
    const that = this;
    wx.login({ 
      success(res) {	
        if (res.code) {
          //登陆成功并成功返回code便发起网络请求获得OPENID
          console.log(res.code)
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session' ,
            data:{
              appid: 'wxd98e43123e09a9de',
              secret: '7a1fd2b44c7ff5f36198287f58eacf67',
              js_code: res.code,
              grant_type: 'authorization_code'
            },
            method : "GET",
            success:function(res){
              console.log(that)
              that.globalData.openid = res.data.openid
              wx.request({
                url: that.globalData.addrees,
                method: 'POST',
                data: {
                  res: 'select_readerid,'+res.data.openid
                },
                header: {
                  'content-type': 'application/x-www-form-urlencoded'
                },
                success: (r) => {
                  if(r.data[0]){
                    wx.switchTab ({
                      url: '/pages/home/index/index'
                    })
                  }else{
                    wx.navigateTo({
                      url: '/pages/index/index'
                    })
                  }
                },
              })
            }
          })
        }else{
        console.log('登录失败！'+res.errMsg);
        }
      }
    })
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              that.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (that.userInfoReadyCallback) {
                that.userInfoReadyCallback(res)
              }
              console.log(that.globalData.userInfo)
            }
          })
        }
      }
    })
  }
})

  