<template>
    <div id="rulebond">
        <p class="rule_title">
            <span class="title_left">保证金规则</span>
            <span class="title_more" @click="checkrules('7')">查看细则 ></span>
        </p>
        <div class="rulelist">
            <p>1.支付竞拍保证金，即可参与竞拍活动；</p>
            <p>2.未拍到将全额退还保证金；</p>
            <p>3.如有疑问请查看细则或联系客服<a class="tel" href="tel:400-825-2368" >400-825-2368</a>;</p>
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
        tcmApp(obj) {
      //emaoAppObject 是 native 向 WebView 注册的用来响应 JS 消息的对象
      //向 native 发送消息（TODO:具体使用中可根据 navigator.userAgent 中的信息来判断系统类型，在不同的系统中分别调用下面对应的代码）
      //或者由服务器判断响应不同的平台脚本
      if (navigator.userAgent.indexOf("iPhone") > 0) {
        window.webkit.messageHandlers.tcmAppObject.postMessage(obj); //向 iOS 发送消息，Android 无效
      } else {
        window.tcmAppObject.postMessage(JSON.stringify(obj)); //向 Android 发送消息，iOS 无效
      }
      },
        windowOpen() {
            var obj = {
            actionname: "windowOpen",//Native 函数名称：必填，Native 提供给 JS 的可用函数的函数名称
             url:  `https://tcm.m.emao.com/#/biding/ruledetails?bidderId=${this.$route.query.bidderId}`// 要打开的链接
             };
             this.tcmApp(obj);
            },
        checkrules (btnType) {
            console.log('查看细则')
            // 添加监测
            let token = this.$route.query.token;
            let bidderId = this.$route.query.bidderId;
            let uniqId = this.$route.query.uniqId;
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
                 this.windowOpen()
                
            } else {
                url = "https://tcmapi.emao.com/bidder/browseWapLog";
                params = {
                bidderId: bidderId,
                buttonType: buttonType,
                   uniqId:uniqId
                };
                this.$router.push('/biding/ruledetails')
                // window.location=`https://tcm.m.emao.com/#/biding?bidderId=${this.$route.query.bidderId}&uniqId=${this.$route.query.uniqId}`
                // console.log(55,this.$route.query.uniqId)
                // window.open(`https://tcm.m.emao.com/#/biding?bidderId=${this.$route.query.bidderId}&uniqId=${this.$route.query.uniqId}`)
            }
            this.$http({
                url: url,
                method: "POST",
                params: params
            })
            .then(function(res) {
                // console.log(res);
            })
            .catch(error => {
                console.log(error);
            });
           
            
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
    .rulelist p a{
        color: #d6ab55;
    }
</style>
