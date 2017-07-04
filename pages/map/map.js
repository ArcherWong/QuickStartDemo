var app = getApp();

Page({
  data: {
    longitude: '',
    latitude: '',
    markers: [],
    polyline: [],
    controls: []
  },
  regionchange(e) {
  },
  markertap(e) {
  },
  controltap(e) {
    if(e.controlId === 1) {
      this.mapCtx.moveToLocation();
    } else if (e.controlId === 2) {
      this.setWeizhi();
    } else if (e.controlId === 3) {
      this.getWeizhi();
    } else if (e.controlId === 4) {
      this.getPolyline();
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
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          controls: [{
            id: 1,
            iconPath: '../../images/location.png',
            position: {
              left: 10,
              top: res.windowHeight - 115,
              width: 50,
              height: 50
            },
            clickable: true
          },{
            id: 2,
            iconPath: '../../images/map_button1.png',
            position: {
              left: res.windowWidth - 70,
              top: res.windowHeight - 180,
              width: 60,
              height: 30
            },
            clickable: true
          },{
            id: 3,
            iconPath: '../../images/map_button2.png',
            position: {
              left: res.windowWidth - 70,
              top: res.windowHeight - 140,
              width: 60,
              height: 30
            },
            clickable: true
          }, {
            id: 4,
            iconPath: '../../images/map_button3.png',
            position: {
              left: res.windowWidth - 70,
              top: res.windowHeight - 100,
              width: 60,
              height: 30
            },
            clickable: true
          }]
        });
      }
    });
  }
})