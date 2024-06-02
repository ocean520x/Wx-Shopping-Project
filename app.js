import { toast } from './utils/toast'
const fly = require('./utils/request')

// app.js
App({
  onLaunch() {
    wx.fly = fly
    wx.toast = toast
  },
  globalData: {
    userInfo: null
  }
})
