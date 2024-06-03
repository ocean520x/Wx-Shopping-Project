// pages/home/home.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        swiperList: [],
        navList: [],
        floorList: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        //获取轮播图数据
        this.getSwiperList()
        //获取导航数据
        this.getNavList()
        //获取楼层数据
        this.getFloorList()
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
    },
    async getFloorList() {
        try {
            const res = await wx.fly.get('/api/public/v1/home/floordata')
            console.log('res', res)
            if (res.meta.status !== 200) return wx.toast()
            res.message.forEach((floor) => {
                floor.product_list.forEach(prod => {
                    prod.url = '/subpkg/goods_list/goods_list?' + prod.navigator_url.split('?')[1]
                })
            })
            this.setData({
                floorList: res.message
            })
        } catch (e) {
            console.log(e)
        }
    },
    //点击分类
    onClickNav(event) {
        //    console.log('click',event.currentTarget.dataset.item)
        const item = event.currentTarget.dataset.item
        if (item.name === '分类') {
            wx.switchTab({
                url: '/pages/cate/cate',
            })
        }
    }
})