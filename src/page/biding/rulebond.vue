<template>
    <div id="rulebond">
        <p class="rule_title">
            <span class="title_left">保证金规则</span>
            <span class="title_more" @click="checkrules(7)">查看细则 ></span>
        </p>
        <div class="rulelist">
            <p>1.支付竞拍保证金，即可参与竞拍活动；</p>
            <p>2.未拍到将全额退还保证金；</p>
            <p>3.如有疑问请查看细则或联系客服<span>400-825-2368</span>;</p>
        </div>
    </div>
</template>

<script>
export default {
    name:'rulebond',
    data(){
        return{

        }
    },
    computed: {
        // 判断是否是APP
        isTcmApp() {
            if (
                typeof this.$route.query.token == "undefined" ||
                this.$route.query.token == ""
            ) {
                return false;
            } else {
                return true;
            }
        }
    },
    methods: {
        checkrules () {
            console.log('查看细则')
            // 添加监测
            let token = this.$route.query.token;
            let bidderId = this.$route.query.bidderId;
            let buttonType = btnType;
            let url = "";
            let params = null;
            if (this.isTcmApp) {
                url = "https://tcmapi.emao.com/bidder/browseAppLog";
                params = {
                token: token,
                bidderId: bidderId,
                buttonType: buttonType
                };
            } else {
                url = "https://tcmapi.emao.com/bidder/browseWapLog";
                params = {
                bidderId: bidderId,
                buttonType: buttonType,
                   uniqId:uniqId
                };
            }
            this.$http({
                url: url,
                method: "GET",
                params: params
            })
            .then(function(res) {
                // console.log(res);
            })
            .catch(error => {
                console.log(error);
            });
            this.$router.push('/biding/ruledetails')
        }
    }
}
</script>

<style scoped>
    #rulebond {
        box-sizing: border-box;
        padding-bottom: 1.06666rem;
        padding-left: 0.4rem;
        padding-right: 0.4rem;
    }
    .rule_title {
        line-height: 0.53333rem;
        padding-bottom: 0.53333rem;
    }
    .title_left {
        font-size: 0.50667rem;
        font-weight: 700;
    }
    .title_more {
        float: right;
        font-size: 0.32rem;
        color: #999;
    }
    .rulelist p {
        font-size: 0.33333rem;
        line-height: 0.64rem;
    }
    .rulelist p span {
        color: #d6ab55;
    }
</style>
