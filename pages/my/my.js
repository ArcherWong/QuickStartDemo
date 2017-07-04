Page({
  data: {
    weather: {},
    days: '',
    todoList: [],
    doneList: [],
    todo: ''
  },
  getDay: function() {
    var meetDay = new Date(2017,1,9);
    var today = new Date();
    var days = parseInt(Math.abs(today - meetDay)/1000/60/60/24);
    return days
  },
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
  },
  todoInput: function(e) {
    this.setData({
      todo: e.detail.value
    });
  },
  addTodo: function() {
    this.data.todoList.push(this.data.todo);
    this.setData({
      todoList: this.data.todoList
    });
  },
  deleteTodo: function (e) {
    this.data.todoList.splice(e.target.dataset.index, 1);
    this.setData({
      todoList: this.data.todoList
    });
  },
  doneTodo: function (e) {
    this.data.doneList.push(this.data.todoList[e.target.dataset.index]);
    this.data.todoList.splice(e.target.dataset.index, 1);
    this.setData({
      todoList: this.data.todoList,
      doneList: this.data.doneList
    });
  },
  deleteDone: function (e) {
    this.data.doneList.splice(e.target.dataset.index, 1);
    this.setData({
      doneList: this.data.doneList
    });
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
  }
})