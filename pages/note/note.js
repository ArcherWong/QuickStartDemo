Page({
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',                'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',                'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    name: '',
    output: '0',
    note: '',
    memberList: [],
    memberDetailList: []
  },
  memberInput: function(e) {
    this.setData({
      name: e.detail.value
    });
  },
  outputInput: function(e) {
    this.setData({
      output: e.detail.value
    });
  },
  noteInput: function(e) {
    this.setData({
      note: e.detail.value
    });
  },
  addMember: function(e) {
    var member = {
      name: this.data.name,
      output: this.data.output,
      note: this.data.note
    };
    if(member.name === '') {
      wx.showToast({
        title: '成员名不能为空',
        image: '../../images/failed.png',
        duration: 3000
      });
    } else {
      var memberList = this.data.memberList;
      var memberDetailList = this.data.memberDetailList;
      var oldMember = memberList.find(function(element) {
        return element.name === member.name;
      });
      if(oldMember === undefined) {
        memberList.push(member);
      } else {
        oldMember.output = Number(oldMember.output) + Number(member.output);
      }
      memberDetailList.push(member);
      this.setData({
        memberList: memberList,
        memberDetailList: memberDetailList
      });
      wx.setStorage({
        key: "memberList",
        data: memberList
      });
      wx.setStorage({
        key: "memberDetailList",
        data: memberDetailList
      });
    }
  },
  getResult: function() {
    var sum = 0;
    var memberList = this.data.memberList;
    var memberDetailList = this.data.memberDetailList;
    memberList.forEach(function(member) {
      sum += Number(member.output);
    });
    var average = sum / memberList.length;
    var newmemberList = memberList.map(function(member) {
      member.result = member.output - average;
      return member;
    });
    var newMemberDetailList = memberDetailList.map(function(member) {
      var currentMember = newmemberList.find(function(element) {
        return element.name === member.name;
      });
      member.result = currentMember.result;
      return member;
    });
    newMemberDetailList.sort(function compareName(a, b) {
      if (a.name > b.name) {
        return 1;
      }
      if (a.name < b.name) {
        return -1;
      }
      return 0;
    });
    this.setData({
      memberDetailList: newMemberDetailList
    });
    wx.setStorage({
      key: "memberList",
      data: memberList
    });
    wx.setStorage({
      key: "memberDetailList",
      data: memberDetailList
    });
  },
  clearStorage: function() {
    var that = this;
    wx.removeStorage({
      key: 'memberList',
      success: function(res) {
        that.setData({
          memberList: []
        });
      }
    });
    wx.removeStorage({
      key: 'memberDetailList',
      success: function(res) {
        that.setData({
          memberDetailList: []
        });
      }
    });
  },
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
  },
  onLoad: function () {
    var that = this;
    wx.getStorage({
      key: 'memberList',
      success: function(res) {
        that.setData({
          memberList: res.data
        });
      } 
    });
    wx.getStorage({
      key: 'memberDetailList',
      success: function(res) {
        that.setData({
          memberDetailList: res.data
        });
      } 
    });
  }
})
