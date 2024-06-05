// pages/cate/components/my-search.js
Component({
    properties: {
        //背景颜色
        bgColor: {
            type: String,
            value: '#c00000'
        },
        //圆角尺寸
        radius: {
            type: Number,
            value: 18
        }
    },
    methods:{
        searchBoxHandler() {
            this.triggerEvent('click')
        }
    }
})