// subpkg/goods_list/goods_list.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        queryObj: {
            query: '',//关键字
            cid: '',//商品分类id
            pagenum: 1,
            pagesize: 10,
        },
        goodsList: [],
        total: 0,
        defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',
        isLoading: false,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        const { query, cid } = options
        this.data.queryObj.query = query || ''
        this.data.queryObj.cid = cid || ''
        this.getGoodsList()
    },

    onReachBottom() {
        const { pagenum, pagesize } = this.data.queryObj
        if (pagenum * pagesize >= this.data.total) return wx.toast('数据加载完毕！')
        if (this.data.isLoading) return
        this.data.queryObj.pagenum += 1
        this.getGoodsList()
    },

    //  下拉刷新事件
    onPullDownRefresh() {
        this.data.queryObj.pagenum = 1
        this.data.total = 0
        this.data.isLoading = false
        this.data.goodsList = []
        this.getGoodsList(() => wx.stopPullDownRefresh())

    },

    async getGoodsList(cb) {
        try {
            this.data.isLoading = true
            const res = await wx.fly.get('/api/public/v1/goods/search', this.data.queryObj)
            this.data.isLoading = false
            // 只要数据请求完毕，就立即按需调用 cb 回调函数
            cb && cb()
            if (res.meta.status !== 200) return wx.toast()
            this.setData({
                goodsList: [...this.data.goodsList, ...res.message.goods],
                total: res.message.total
            })
        } catch (e) {
            console.log(e)
        }
    },

    goToDetail(event) {
        const item = event.currentTarget.dataset.item
        wx.navigateTo({
            url: '/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id,
        })
    }
})