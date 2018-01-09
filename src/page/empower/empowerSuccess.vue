<template>
    <div>
        <!--首页-品牌列表-头部-->
        <div class="brand-header-out" v-if="showHeadStatus">
            <header class="brand-list-header">
                <i class="white-lt brand-left-cion" @click="backtrack"></i>
                <strong class="brand-list-title">提交成功</strong>
            </header>
        </div>
        <section class="submit-succeed empower-guide">
            <img src="../../assets/empower-content.png" alt="">
            <p>认证资料已提交，请等待审核</p>
            <p class="tips">请保持您的电话畅通，会有区域经理与您联系。</p>
            <!--<input type="button" name="返回" value="返回" @click="goBack">-->
            <!--<p class="consult-tel">咨询电话 <a href="tel:400-825-2368">400-825-2368</a> </p>-->
        </section>
        <p class="empower-success-back"><input  type="button" name="返回" value="返回" @click="goBack"></p>
        <p class="consult-tel">咨询电话 <a href="tel:400-825-2368">400-825-2368</a> </p>
    </div>

</template>
<script>
    export default{
        name:"empowerSuccess",
        data(){
            return {
                token:null,
                showHeadStatus:true,
                title:null
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
            //电话按钮不显示
            telephoneButton(){ //电话
                var obj = {
                    actionname:"telephoneButton",//Native 函数名称：必填，Native 提供给 JS 的可用函数的函数名称
                    params:{hidden:1}//hidden=0显示电话按钮，hidden=1隐藏电话按钮
                };
                this.tcmApp(obj);//tcmApp 函数参见通信规则中的示例说明
            },
            //允许禁止返回
            enableGobackButton(){ //禁止返回
                var obj = {
                    actionname:"enableGobackButton",//Native 函数名称：必填，Native 提供给 JS 的可用函数的函数名称
                    params:{enable:1, title: "确定退出授权店认证"}//enable=0不允许返回，enable=1允许返回
                };
                this.tcmApp(obj);//tcmApp 函数参见通信规则中的示例说明
            },
            //关闭当前窗口
            closeCurrentWindow() {
                var obj = {
                    actionname:"closeCurrentWindow"//Native 函数名称：必填，Native 提供给 JS 的可用函数的函数名称
                };
                this.tcmApp(obj);//tcmApp 函数参见通信规则中的示例说明
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
            goBack(){
                if (this.isTcmApp()) {
                    //window.location = 'emaotaochemao://push/orderdetail?orderNumber=222&token=' + this.token;
                    this.closeCurrentWindow();
                } else {
                    this.$router.push({name:'profile'});
                }
            },
            backtrack(){
                this.$router.push({name:'profile'});
            },
            /*区分app与wap做不同的渲染*/
            renderDom(){
                if (this.isTcmApp()){
                    document.title = "提交成功";
                    this.showHeadStatus = false;
                    this.telephoneButton();
                    this.enableGobackButton();
                }else{
                    this.showHeadStatus = true;
                }
            }


        },
        mounted(){
            this.token = this.$route.query.token;
            this.renderDom();
        }

    }
</script>
<style>
    html{width:100%;background-color:#fff;}
    /*body{height:100%;background-color:#fff;}*/
    body{width:100%;height:100%;background-color:#fff;}
    .brand-header-out{position:relative;z-index:3;}
    /*.empower-guide{padding-top:3.76rem;padding-bottom:.27rem;background-color:#fff;}*/
    .empower-guide{position:fixed;width:100%;padding-top:3.76rem;padding-bottom:.27rem;background-color:#fff;}
    .empower-guide img{display:block;width:3.0667rem;height:3.0667rem;margin:0 auto .4rem;}
    .empower-guide p{color:#2c2c2c;font-size:.4533rem;line-height:.8667rem;text-align:center;}
    .empower-guide input{display:block;width:6.666rem;height:1.1733rem;margin:5.447rem auto 0;color:white;font-size:.4533rem;line-height:1.1733rem;text-align:center;background-color:#d6ab55;border:1px solid #d6ab55;border-radius:.533rem;}
    .empower-guide p span{color:#d6ab55;border-bottom:1px solid #d6ab55;}
    /*.empower-guide .consult-tel{margin-top:.85rem;color:#999;font-size:.373rem;}*/
    /*.empower-guide .consult-tel a{color:#999;}*/
    .empower-success-back{position:fixed;bottom:2rem;width:100%;text-align:center;}
    .empower-success-back input{display:block;width:6.666rem;height:1.1733rem;margin:5.447rem auto 0;color:white;font-size:.4533rem;line-height:1.1733rem;text-align:center;background-color:#d6ab55;border:1px solid #d6ab55;border-radius:.533rem;}
    .consult-tel{position:fixed;bottom:.667rem;width:100%;margin:0 auto;text-align:center;color:#999;font-size:.373rem;}
    .consult-tel a{color:#999;}
    .empower-guide .tips{color:#999;font-size:.373rem;}


</style>