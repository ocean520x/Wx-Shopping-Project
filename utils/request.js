const Fly=require('flyio')
const fly=new Fly()

// 配置基地址
fly.config.baseURL = 'https://www.uinav.com';

// 请求拦截器
fly.interceptors.request.use((request) => {
  // 显示加载提示
  wx.showLoading({
    title: '加载中...',
    mask: true
  });

  return request;
});

// 响应拦截器
fly.interceptors.response.use(
  (response) => {
    // 隐藏加载提示
    wx.hideLoading();
    return response.data;
  },
  (err) => {
    // 隐藏加载提示
    wx.hideLoading();
    console.error(err);
    return Promise.reject(err);
  }
);

module.exports = fly;