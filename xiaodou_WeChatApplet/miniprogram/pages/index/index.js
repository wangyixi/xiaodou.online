//index.js
const app = getApp()

Page({
  data: {
    scrollTop:0,
    message:'123',
    contend:[],
    news_input_val:'',
    newsHeight:0,
    windowWidth:0,
    bindh:0,
    scrollTop:0,
  },

  foucus:function(e){
    let newsHeight=this.data.newsHeight
    let windowWidth = this.data.windowWidth
    let bindh=this.data.bindh
    if(bindh!=0){
      this.setData({
        newsHeight: newsHeight - bindh
      })
      return
    }
    this.setData({
      bindh: e.detail.height * 750 / windowWidth,
      newsHeight: newsHeight - e.detail.height * 750 / windowWidth
    })
  },

  blur: function (e) {
    let newsHeight = this.data.newsHeight
    let bindh=this.data.bindh
    this.setData({
      newsHeight: newsHeight + bindh
    })
  },

  toChat:function(){
      wx.navigateTo({
        url: '../tochat/tochat',
      })
  },

  getCon:function(e){
    this.setData({
      message:e.detail.value
    })
  },

  add:function(){
    var that =this
    let new_con=this.data.message
    let is_right=true
    let is_img=false
    let scrollTop = this.data.scrollTop
    let n=new_con.length
    var newstr = ""
    var flg = "\n"
    /*if (n > 12) {
      for (var i = 0; i < new_con.length; i += 12) {
        var tmp = new_con.substring(i, i + 12);
        newstr += tmp + flg;
      }
    } else */newstr = new_con
    let data = { new_con: newstr, is_right: is_right, is_img: is_img }
    let contend = this.data.contend
    contend.push(data)
    this.setData({
        contend:contend,
        news_input_val:'',
        scrollTop:contend.length*1000
    })
    wx.request({
      url: 'https://www.xiaodou.online/WEBX/wechat/wtest.php?txt=' + new_con,
      method: 'POST',
      header: {
        "content-type": "application/json"
      },
      success: function (res) {
        is_right = false
        let n = res.data.length
        newstr = res.data
        data = { new_con: res.data, is_right: is_right, is_img: is_img }
        contend = that.data.contend
        contend.push(data)
        that.setData({
          contend: contend,
          scrollTop: contend.length * 1000
        })
      },
      fail:function(res){
        console(res)
      }
    })
  },

  onLoad: function () {
    //获取页面高度
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          newsHeight: res.windowHeight * 750 / res.windowWidth-250,
          windowWidth:res.windowWidth
        })
      },
    })

    /*if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
   
    return
    }*/
    
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
  },

  onGetUserInfo: function(e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },

})
