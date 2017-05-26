var app = getApp();

Page({
  data: {
    longitude: '',
    latitude: '',
    markers: [],
    polyline: [],
    controls: [{
      id: 1,
      iconPath: '../../images/location.png',
      position: {
        left: 0,
        top: 450,
        width: 50,
        height: 50
      },
      clickable: true
    }]
  },
  regionchange(e) {
  },
  markertap(e) {
  },
  controltap(e) {
    if(e.controlId === 1) {
      this.mapCtx.moveToLocation();
    }
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