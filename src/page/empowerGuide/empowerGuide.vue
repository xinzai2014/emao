<template>
    <div>
        <!--首页-品牌列表-头部-->
        <div class="brand-header-out" v-if="showHeadStatus">
            <header class="brand-list-header">
                <i class="white-lt brand-left-cion" @click="toProfile"></i>
                <strong class="brand-list-title">去升级</strong>
            </header>
        </div>
        <section class="empower-guide empower-guide-succeed">
            <img src="../../assets/empower-guide-certificate.png" alt="">
            <p class="empower-guide-welcome">欢迎申请成为一猫授权店</p>
            <p class="tips">您的账户需要补充授权店认证信息才可以成为</p>
            <p class="tips">我们的授权店！请务必填写真实有效信息，我</p>
            <p class="tips">们将对您提交的信息严格保密。</p>
            <input type="text" name="返回" value="去升级" @click="">
            <p class="consult-tel">咨询电话 <a href="tel:400-825-2368">400-825-2368</a> </p>
        </section>
    </div>

</template>
<script>
    export default {
        name: 'empowerGuide',
        data () {
        return{
            showHeadStatus:true,
            token:null,
            telephoneButtonFlag:false
        }
    },
    methods:{
        /*向App传值*/
       tcmApp(obj){
            //emaoAppObject 是 native 向 WebView 注册的用来响应 JS 消息的对象
            //向 native 发送消息（TODO:具体使用中可根据 navigator.userAgent 中的信息来判断系统类型，在不同的系统中分别调用下面对应的代码）
            //或者由服务器判断响应不同的平台脚本
            if (navigator.userAgent.indexOf("iPhone") > 0) {
                window.webkit.messageHandlers.tcmAppObject.postMessage(obj);//向 iOS 发送消息，Android 无效
            }
            else {
                window.tcmAppObject.postMessage(JSON.stringify(obj));//向 Android 发送消息，iOS 无效
            }

        },

        //显示/隐藏电话按钮
       telephoneButton(){
            var obj = {
                actionname:"telephoneButton",//Native 函数名称：必填，Native 提供给 JS 的可用函数的函数名称
                params:{hidden:(telephoneButtonFlag ? 0 : 1), phone: "400-000-1234"}//hidden=0显示电话按钮，hidden=1隐藏电话按钮
            };
            this.tcmApp(obj);//调用tcmApp 函数，向APP传值

            var text = "隐藏电话按钮"
            if (telephoneButtonFlag) { text = "显示电话按钮" }
            document.getElementById('telephoneButtonID').innerHTML = text;
            this.telephoneButtonFlag = !this.telephoneButtonFlag

        },




        /*判断是否是App*/
        isTcmApp(){
            // return navigator.userAgent.indexOf("tcm") !== -1;

            if (typeof(this.$route.query.token) == 'undefined' || this.$route.query.token == '') {
                return false;
            } else {
                return true;
            }
        },

        /*返回按钮*/
        toProfile(){
            if (this.isTcmApp()) {
                window.location = 'emaotaochemao://push/orderdetail?orderNumber=222&token=' + this.token;
            } else {
                this.$router.push({name:'profile'});
            }
        }

    },
    mounted(){
        this.token = this.$route.query.token;
        console.log(this.token);
    },
    components:{

    }
    }
</script>
<style>
   body{height:100%;background-color:#fff;}
    .brand-header-out{position:relative;z-index:3;}
    .empower-guide{padding-bottom:1.0rem;background-color:#fff;}
    .empower-guide-succeed{padding-top:1.493rem;}
    .empower-guide img{display:block;width:2.613rem;height:2.573rem;margin:0 auto .4rem;}
    .empower-guide p{color:#2c2c2c;font-size:.4533rem;line-height:.6rem;text-align:center;}
    .empower-guide input{display:block;width:6.666rem;height:1.1733rem;margin:5.447rem auto 0;color:white;font-size:.4533rem;line-height:1.1733rem;text-align:center;background-color:#d6ab55;border:1px solid #d6ab55;border-radius:.533rem;}
    .empower-guide-welcome{margin-bottom:.6rem;}
    .empower-guide p span{color:#d6ab55;border-bottom:1px solid #d6ab55;}
    .empower-guide .consult-tel{margin-top:.85rem;color:#999;font-size:.373rem;}
   .empower-guide .consult-tel a{color:#999;}
   .empower-guide .tips{color:#999;font-size:.373rem;}


</style>