<template>
    <div id="subsuccess">
        <div class="cont-txt">
            <p class="tip-pic">
                <img src="./images/icon-success.jpg" alt="">
            </p>
            <p class="tip-state">申请提交成功</p>
            <p class="tip-msg">业务经理将在1~3个工作日内与您电话联系，<br>请保持电话畅通</p>
        </div>
        <p class="telephone">
            <span>客服电话:</span>
            <a style="color:#d5aa5c" href="tel:4000133918" @click="addFn('8')">400-013-3918</a>
        </p>
    </div>
</template>

<script>
export default {
    name: 'subsuccess',
    created () {
        document.title = "提交成功"
    },
    methods: {
        addFn (buttonType) {
            var token = this.$route.query.token;
            var params = {
                token: token,
                openPage: '1',
                extendType: '5',
                projectType: buttonType
            }
            this.$http({
                url:"finance/appBrowseBlog",
                method:"POST",
                params: params
            }).then(function (response) {
                console.log(response)
            }).catch(function (error) {
                console.log(error)
            });
        }
    }
}
</script>

<style scoped>
.cont-txt {
    text-align: center;
    padding-top: 2.13333rem;
}
.tip-pic {
    width: 1.6rem;
    height: 1.6rem;
    border-radius: 100%;
    border: 1px solid #ccc;
    margin: 0.4rem auto;
}
.tip-pic img {
    display: inline-block;
    width: 100%;
    height: 100%;
    border-radius: 100%;
}
.tip-state {
    font-size: 0.6rem;
    color: #2ac26e;
    padding-bottom: 0.8rem;
}
.tip-msg {
    font-size: 0.37333rem;
    line-height: 0.64rem;
    color: #2c2c2c;
}
.telephone {
    position: absolute;
    width: 100%;
    bottom: 1rem;
    padding-top: 0.65333rem;
    text-align: center;
    font-size: 0.29333rem;
}
.telephone span {
    color: #999;
}
</style>

