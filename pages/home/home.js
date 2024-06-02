// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList: [],
    navList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    //获取轮播图数据
    this.getSwiperList()
    //获取导航数据
    this.getNavList()
  },

  async getSwiperList() {
    try {
      // 发送请求示例
      const res = await wx.fly.get('/api/public/v1/home/swiperdata')
      if (res.meta.status !== 200) return wx.toast()
      //请求成功 赋值
      this.setData({
        swiperList: res.message
      })
    } catch (e) {
      console.log(e)
    }
  },
  async getNavList() {
    try {
      const res = await wx.fly.get('/api/public/v1/home/catitems')
      if (res.meta.status !== 200) return wx.toast()
      this.setData({
        navList: res.message
      })
    } catch (e) {
      console.log(e)
    }
  }
})