// subpkg/search/search.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        focus: true,
        timer: null,//延时器的timerId
        keywords: '',
        searchResults: [],//搜索结果列表
        historyList: [],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.setData({
            focus: true,
            historyList: JSON.parse(wx.getStorageSync('keywords') || '[]')
        });
    },
    async getSearchList() {
        try {
            if (this.data.keywords === '') {
                this.setData({
                    searchResults: []
                })
                return
            }
            const res = await wx.fly.get('/api/public/v1/goods/qsearch', { query: this.data.keywords })
            if (res.meta.status !== 200) return wx.toast()
            this.setData({
                searchResults: res.message
            })
            this.saveSearchHistory()
        } catch (e) {
            console.log(e)
        }
    },

    inputHandler(event) {
        clearTimeout(this.data.timer)
        this.setData({
            timer: setTimeout(() => {
                this.setData({
                    keywords: event.detail.value
                })
                //根据关键词，查询搜索建议列表
                this.getSearchList()
            }, 500)
        })
    },

    goToDetail(event) {
        const goods_id = event.currentTarget.dataset.id
        wx.navigateTo({
            url: '/subpkg/goods_detail/goods_detail?goods_id=' + goods_id,
        })
    },

    saveSearchHistory() {
        const { historyList, keywords } = this.data
        //将关键字从数组中删除（如果存在）
        const index = historyList.indexOf(keywords)
        if (index > -1) {
            historyList.splice(index, 1)
        }
        historyList.unshift(keywords)
        this.setData({
            historyList,
        })
        wx.setStorageSync('keywords', JSON.stringify(historyList))
    },
    cleanIpt() {
        this.setData({
            keywords: ''
        })
        this.getSearchList()
    },

    cleanHistory() {
        this.setData({
            historyList: []
        })
        wx.setStorageSync('keywords', '[]')
    },

    goToGoodsList(event) {
        const keywords = event.currentTarget.dataset.keywords
        wx.navigateTo({
            url: '/subpkg/goods_list/goods_list?query=' + keywords,
        })
    }
})