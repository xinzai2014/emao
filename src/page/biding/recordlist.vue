<template>
    <div id="recordlist">
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
</template>

<script>
export default {
    name: 'recordlist',
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
    created () {
        // var bidderId = this.$route.query.bidderId;
        // this.$axios({
        //   url: 'https://tcmapi.emao.com/bidder/bidderRecord',
        //   type: 'GET',
        //   params: {
        //     bidderId: 8
        //   }
        // })
        // .then((res) => {
        //   console.log(res)
        // })
    }
}
</script>

<style scoped>
.list_title {
    font-size: 0.33333rem;
    line-height: 1.1333rem;
    border-bottom: 1px solid #e0e0e0;
}
.list_title, .list_cont {
    width: 100%;
    padding-left: 0.4rem;
    padding-right: 0.4rem;
    box-sizing: border-box;
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

.list_cont:nth-child(odd) {
    background: #f1f1f1;
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
