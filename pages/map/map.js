var app = getApp();

Page({
  data: {
    longitude: '',
    latitude: '',
    markers: [],
    polyline: []
  },
  regionchange(e) {
  },
  markertap(e) {
  },
  controltap(e) {
  },
  moveToLocation: function() {
    this.mapCtx.moveToLocation();
  },
  setWeizhi: function() {
    var weizhi = {
      longitude: this.data.longitude,
      latitude: this.data.latitude
    };
    wx.setStorage({
      key: "weizhi",
      data: weizhi
    });
  },
  getWeizhi: function () {
    var that = this;
    wx.getStorage({
      key: 'weizhi',
      success: function (res) {
        that.setData({
          markers: [{
            id: "1",
            latitude: res.data.latitude,
            longitude: res.data.longitude,
            width: 50,
            height: 50,
            iconPath: "../../images/marker.png",
            title: "我从哪里来"
          }]
        });
      }
    });
  },
  getPolyline: function () {
    var that = this;
    wx.getStorage({
      key: 'weizhi',
      success: function (res) {
        that.setData({
          polyline: [{
            points: [{
              longitude: that.data.longitude,
              latitude: that.data.latitude
            }, {
              longitude: res.data.longitude,
              latitude: res.data.latitude
            }],
            color: "#FF0000DD",
            width: 2
          }]
        });
      }
    });
  },
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
  },
  onLoad: function (e) {
    this.mapCtx = wx.createMapContext('map');
    var that = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        that.setData({
          longitude: res.longitude,
          latitude: res.latitude
        });
      }
    });
  }
})