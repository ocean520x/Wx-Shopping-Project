export function toast(title = '数据加载失败！', duration = 1500) {
  wx.showToast({
    title,
    duration,
    icon: 'none'
  })
}