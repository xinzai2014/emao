<template>
    <div id="recordlist">
        <div class="list_title">
            <p>状态</p>
            <p>竞拍用户</p>
            <p>竞拍价</p>
            <p>时间</p>
        </div>
        <div class="listBox">
            <div class="list_cont" v-for="(item, index) in list" :key="index" :style="{'color': index==0? 'red':'#000'}">
                <p>{{item.state}}</p>
                <p>{{item.user}}</p>
                <p>{{item.prize}}</p>
                <p>{{item.time}}</p>
            </div>
            <div class="list_text">最多显示20条数据</div>
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
                    user: 'cu20280',
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
        getdata () {
            var bidderId = this.$route.query.bidderId;
            this.$http({
              url: 'https://tcmapi.emao.com/bidder/bidderRecord',
              type: 'GET',
              params: {
                bidderId: bidderId
              }
            })
            .then((res) => {
              console.log(res)
            })
            let len = this.list.length
            console.log(len)
            if (len > 20) {
                this.list = this.list.slice(0, 20)
            }
            console.log(this.list.length)
        }
    },
    created () {
        this.getdata()
    }
}
</script>

<style scoped>
#recordlist {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    overflow: hidden;
}
.list_title {
    font-size: 0.33333rem;
    line-height: 1.1333rem;
    border-bottom: 1px solid #e0e0e0;
    position: absolute;
    top: 0;
    left: 0;
}
.listBox {
    width: 100%;
    position: absolute;
    top: 1.1333rem;
    left: 0;
    bottom: 0;
    overflow-y: scroll;
    background: #f1f1f1;
    /* overflow: hidden; */
}
.list_text {
    padding-top: 0.5666rem;
    text-align: center;
    font-size: 0.29333rem;
    color: #999;
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
    width: 16%;
}
.list_title p:nth-child(4) {
    width: 26%;
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
    width: 16%;
}
.list_cont p:nth-child(4) {
    width: 26%;
    text-align: right;
}

.list_cont {
    line-height: 0.76667rem;
    font-size: 0.26666rem;
}
</style>
