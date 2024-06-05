// pages/cate/components/my-search.js
Component({
    properties: {
        //商品的信息对象
        goods: {
            type: Object,
            value: {}
        }
    },
    data: {
        defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',
        formattedPrice: ''
    },
    methods: {
        toFixed(num) {
            return Number(num).toFixed(2)
        }
    },
    observers: {
        // 在监听器中处理价格格式化
        'goods.goods_price': function (price) {
            if (price !== 0) {
                this.setData({
                    formattedPrice: this.toFixed(price)
                })
            }
        }
    },
    attached() {
        //初始化格式化的价格
       const price = this.data.goods.goods_price;
       this.setData({
           formattedPrice: price !== undefined && price !== 0 ? this.toFixed(price) : '0.00'
       });
    }
})