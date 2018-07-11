<template>
    <div id="notice">
        <p class="message">
            <img src="./images/notice.png" alt="">
            <span>JP12345678用户刚刚加价</span>
        </p>
    </div>
</template>

<script>
export default {
    name: "notice",
    data () {
        return {
            list: {
                broadcast:  "JP12345678用户刚刚加价",
                bidderRecord: [
                    {
                        "temporaryState" : "领先",             //状态
                        "bidders" : "JP12345678",              //竞拍人
                        "bidderPrice" : "10.01万元",           //竞拍价
                        "bidderTime" : "2018-06-01 12:12;12",  //竞拍时间
                    }
                ]
            }
        }
    },
    created () {
        // var _this = this
        // setInterval(() => {
        //     _this.getdata()
        // }, 1000);
    },
    methods: {
        getdata () {
            console.log('aaa')
        }
    }
}
</script>

<style scoped>
#notice {
    height: 0.8rem;
    font-size: 0.32rem;
    color: #fff;
    padding-right: 0.26667rem;
    background: rgba(0, 0, 0, 0.7);
    position: absolute;
    top: 0.4rem;
    left: 0.4rem;
    z-index: 9;
}
.message {
    height: 0.8rem;
}
.message img {
    display: inline-block;
    width: 0.66667rem;
    float: left;
}
.message span {
    height: 0.8rem;
    line-height: 0.8rem;
}
</style>

