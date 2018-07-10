<template>
    <div id="record">
        <p class="record_title">
            <span class="title_left">竞拍记录</span>
            <span class="title_more" @click="recordlist">查看更多 ></span>
        </p>
        <div class="record_list">
            <div class="list_title">
                <p>状态</p>
                <p>竞拍用户</p>
                <p>竞拍价</p>
                <p>时间</p>
            </div>
            <div class="list_cont" v-for="(item, index) in list" :key="index">
                <p>{{item.state}}</p>
                <p>{{item.user}}</p>
                <p>{{item.prize}}</p>
                <p>{{item.time}}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'record',
    data () {
        return {
            list: [
                {
                    state: '领先',
                    user: 'cu20280',
                    prize: '7.99万',
                    time: '10:25:22 05/06'
                },
                {
                    state: '出局',
                    user: 'cu20280',
                    prize: '7.99万',
                    time: '10:25:22 05/06'
                },
                {
                    state: '出局',
                    user: 'cuc020280',
                    prize: '7.99万',
                    time: '10:25:22 05/06'
                },
                {
                    state: '出局',
                    user: 'cu20280',
                    prize: '7.99万',
                    time: '10:25:22 05/06'
                }
            ]
        }
    },
    methods: {
        recordlist () {
            console.log('查看竞拍记录列表详情')
            this.$router.push('/recordlist')
        }
    },
    created () {
        console.log('获取竞拍id')
        var bidderId = this.$route.query.bidderId
        console.log(bidderId)
    }
}
</script>

<style scoped>
#record {
    box-sizing: border-box;
    padding: 0.53333rem 0.4rem;
    background: #fff;
}
.record_title {
    line-height: 0.533333rem;
    border-left: 0.05333rem solid #000;
    padding-left: 0.34666rem;
}
.title_left {
    color: #000;
    font-size: 0.46666rem;
    font-weight: 700;
}
.title_more {
    float: right;
    font-size: 0.32rem;
    color: #999;
}
.record_list {
    padding-top: 0.66667rem;
}
.list_title {
    padding-bottom: 0.56rem;
    font-size: 0.33333rem;
}
.list_title, .list_cont {
    width: 100%;
    display: flex;
}
.list_title p {
    display: inline-block;
}
.list_title p:nth-child(1) {
    width: 27%;
}
.list_title p:nth-child(2) {
    width: 31%;
}
.list_title p:nth-child(3) {
    width: 19%;
}
.list_title p:nth-child(4) {
    width: 23%;
    text-align: right;
}

.list_cont p {
    display: inline-block;
}
.list_cont p:nth-child(1) {
    width: 27%;
}
.list_cont p:nth-child(2) {
    width: 31%;
}
.list_cont p:nth-child(3) {
    width: 19%;
}
.list_cont p:nth-child(4) {
    width: 23%;
    text-align: right;
}


.list_cont {
    line-height: 0.66667rem;
    font-size: 0.26666rem;
}
</style>
