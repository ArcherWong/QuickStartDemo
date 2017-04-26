Page({
  data: {
    weather: {},
    days: '',
    in_theaters: [],
    coming_soon: []
  },
  getDay: function() {
    var meetDay = new Date(2017,1,9);
    var today = new Date();
    var days = parseInt(Math.abs(today - meetDay)/1000/60/60/24);
    return days
  },
  onLoad: function () {
    var that = this;
    var days = that.getDay();
    that.setData({days: days});
    
    wx.request({
        url: 'http://saweather.market.alicloudapi.com/area-to-weather?area=萧山',
        method: 'GET',
        header: {
            'content-type': 'json',
            'Authorization': 'APPCODE c25683c9439b42f0ad615eaa989384ab'
        },
        success: function(res) {
            that.setData({weather: res.data.showapi_res_body.f1});
        }
    });

    wx.request({
        url: 'https://api.douban.com/v2/movie/in_theaters',
        method: 'GET',
        header: {
            'content-type': 'json'
        },
        success: function(res) {
            that.setData({in_theaters: res.data.subjects});
        }
    });

    wx.request({
        url: 'https://api.douban.com/v2/movie/coming_soon',
        method: 'GET',
        header: {
            'content-type': 'json'
        },
        success: function(res) {
            that.setData({coming_soon: res.data.subjects});
        }
    });
  }
})