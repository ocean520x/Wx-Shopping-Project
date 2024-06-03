// pages/cate/cate.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        wh: 0,
        cateList: [],
        active: 0,
        cateLevel2: [],
        scrollTop: 0,// 滚动条距离顶部的距离
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        const sysInfo = wx.getSystemInfoSync()
        this.setData({
            wh: sysInfo.windowHeight
        })
        //获取分类列表
        this.getCateList()
    },

    async getCateList() {
        try {
            const res = await wx.fly.get('/api/public/v1/categories')
            if (res.meta.status !== 200) return wx.toast()
            this.setData({
                cateList: res.message,
                cateLevel2: res.message[0].children
            })
        } catch (e) {
            console.log(e)
        }
    },

    activeChanged(event) {
        const i = event.currentTarget.dataset.index
        this.setData({
            active: i,
            cateLevel2: this.data.cateList[i].children,
            scrollTop: this.data.scrollTop ? 0 : 1
        })
    },

    gotoGoodsList(event) {
        const item=event.currentTarget.dataset.item
        wx.navigateTo({
          url: '/subpkg/goods_list/goods_list?cid='+item.cat_id,
        })
    }
})