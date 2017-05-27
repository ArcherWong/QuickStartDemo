Page({
  data: {
      videos:[
        'http://dn-dji-videos.qbox.me/cloud/1c1decb539a10f5a517bb91da146a6c9/720.mp4'
      ],
      tabs: ["航拍图片", "航拍视频", "航拍日记"],
      activeIndex: 0,
      sliderOffset: 0,
      sliderLeft: 0
  },
  tabClick: function (e) {
      this.setData({
          sliderOffset: e.currentTarget.offsetLeft,
          activeIndex: e.currentTarget.id
      });
  },
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
  },
  onLoad: function () {
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
          that.setData({
              sliderLeft: (res.windowWidth / that.data.tabs.length - res.sliderWidth) / 2,
              sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
          });
      }
  });
  }
})