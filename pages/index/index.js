var app = getApp()

Page({
  data: {
    banners: [
  'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',   'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',   'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    nabGames: []
  },
  goNBA: function() {
    wx.navigateTo({
      url: "../nba/nba"
    })
  },
  goAerial: function() {
    wx.navigateTo({
      url: "../aerial/aerial"
    })
  },
  goDota2: function() {
    wx.navigateTo({
      url: "../dota2/dota2"
    })
  },
  goNote: function() {
    wx.navigateTo({
      url: "../note/note"
    })
  },
  onLoad: function () {
    var that = this;

    wx.request({
        url: 'https://op.juhe.cn/onebox/basketball/nba?key=a91fd255420fe93f33aca5448f4634ae',
        method: 'GET',
        header: {
            'content-type': 'json'
        },
        success: function(res) {
          that.setData({nbaGames: res.data.result.list[1].tr});
        }
    });
  }
})
