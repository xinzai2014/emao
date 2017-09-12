<template>
    <div class="dialog-content" v-if="successData.flag" :class="{dialogAnimateStyle:successData.flag}">
        <!--首页-订单确认-头部-->
        <header class="brand-list-header">
            <i class="white-lt brand-left-cion" @click="goback"></i>
            <strong class="brand-list-title">{{pageMess.title}}</strong>
        </header>
        <!--订购成功-->
        <section class="order-succeed">
            <p class="order-succeed-first"><i class="order-first-logo"></i>{{pageMess.text}} <i class="order-succeed-logo"></i></p>
            <div class="order-second-out">
                <p class="order-succeed-second"><i></i>请在 <span>24小时</span>内汇款至以下银行账户</p>
                <div class="order-succeed-info">
                    <p class="clearfix"><span>汇款银行：</span><strong>{{successData.bankName}}</strong></p>
                    <p class="clearfix"><span>公司名称：</span><strong>{{successData.companyName}}</strong></p>
                    <p class="clearfix"><span>账号：</span><strong>{{successData.account}}</strong></p>
                    <p class="order-send" @click="sendMessage" :class='{"color-disabled":disabled}'>{{codeText}}</p>
                </div>
                <ul class="order-secceed-explain">
                    <li>汇款说明：</li>
                    <li>1.汇款后请上传汇款凭证</li>
                    <li>2.未按时间付款的订单系统将自动取消</li>
                </ul>
            </div>
            <p class="order-succeed-second order-succeed-third"><i></i>一猫确认收款后发货</p>
        </section>
        <section class="order-succeed-bottom clearfix">
            <div class="order-to-apply" @click="goIndex">返回订车页</div>
            <div class="order-to-check" @click="goDetail(successData.orderNum)">查看详情</div>
        </section>
    </div>
</template>

<script>
export default {
	name: 'orderConfrim',
	data () {
	    return {
	    	successData:{},
			codeText:"发送到手机", //下单成功后发送短信到手机
            num:60, //下单成功后倒计时
            disabled:false,
            messageData:{},
            pageMess:{}
	    }
	},
	methods:{
        goback(){
            if(this.$store.state.addressFlag == "balanceConfrim"){
                this.goDetail(this.successData.orderNum)
                return "";
            }
            this.$router.push("/serie/" + this.$store.state.fullPaymentData.serieId);
        },
        goIndex(){
            this.$router.push("/index");
        },
        goDetail(id){
            this.$router.push("/" + this.pageMess.tag +"/" + id);
        },
        sendMessage(){  //发送成功短信
            if(this.disabled){
                return false;
            }
            this.messageData["token"] = sessionStorage.token;
            this.messageData["phone"] = this.$store.state.defaultAdress.phone;
            this.messageData["content"] = "【一猫汽车】您已提交订单，请在24小时内汇款，逾期订单取消需重新下单。汇款银行：" + 
                this.successData.bankName+ ",账号：" + 
                this.successData.account + ",公司名称：" + 
                this.successData.companyName + "如有疑问可拨打客服：400-000-1234。"
            this.$http.post(
                  "message/send",
                  this.messageData,
              ).then(function (response) {
                this.setCode();
            },function(){

            })
        },
        setCode(){ //验证码效果
            this.codeText = this.num+"s";
            this.disabled = true;
            var that = this;
            window.timer = window.setInterval(()=>{
                that.num--;
                that.codeText = this.num+"s";
                this.disabled = true;
                if(!this.num){
                    this.codeText = "发送到手机";
                    this.num = 60;
                    this.disabled = false;
                    window.clearInterval(window.timer);
                    return false;
                }
            },1000);
        }
    },
	mounted(){
        this.successData = this.$store.state.successData;
        switch(this.$store.state.addressFlag)
        {
            case "orderConfrim":
                this.pageMess = {
                    title:"订购成功",
                    text:"在线订购车辆成功",
                    tag:"orderDetail"
                }
                break;
            case "displayConfrim":
                this.pageMess = {
                    title:"申请成功",
                    text:"申请展车成功",
                    tag:"displayDetail"
                }
                break;
            case "balanceConfrim":
                this.pageMess = {
                    title:"订购成功",
                    text:"订购成功",
                    tag:"orderDetail"
                }
                break;
        }
	},
    beforeRouteLeave (to, from, next) {
        window.clearInterval(window.timer);
        next();
    }
}
</script>
<style>
.brand-list-header{overflow:hidden;height:1.1733rem;text-align:center;line-height:1.1733rem;font-size:.4rem;color:#fff;background-color:#27282f;}
/*订购成功页面*/
.order-succeed{height:100%;padding:.5333rem .4rem 0 .4rem;background-color:#fff;}
.order-succeed-first{margin-bottom:1.067rem;font-size:.4rem;color:#2ac26e;font-weight:600;}
.order-first-logo{display:inline-block;width:.5333rem;height:.533rem;margin-right:.2667rem;vertical-align:bottom;background:url("../../../assets/first-icon.png");background-size:100% 100%;}
.order-succeed-logo{display:inline-block;width:.4rem;height:.4rem;margin-left:.2133rem;vertical-align:bottom;background:url("../../../assets/complete-icon.png");background-size:100% 100%;}
.order-succeed-second i{display:inline-block;width:.5333rem;height:.533rem;margin-right:.2667rem;vertical-align: bottom;background:url("../../../assets/second-icon.png");background-size:100% 100%;}
.order-succeed-second span{color:#fc3D36;}
.order-succeed-second {font-size:.4rem;color:#2c2c2c;}
.order-succeed-info{margin:.5333rem .8rem .4rem .8rem;padding-top:.5333rem;border:1px solid #d5aa5c;line-height:1.2;}
.order-succeed-info p{margin-bottom:.4rem;font-size:.4rem;}
.order-succeed-info p span{display:block;float:left;width:2rem;padding-left:.2667rem;text-align:right;color:#999;}
.order-succeed-info p strong{display:block;margin-left:2.2rem;padding-right:.133rem;color:#2c2c2c;}
.order-succeed-info .order-send{height:1.2rem;margin-bottom:0;line-height:1.2rem;font-size:.4533rem;color:#fff;text-align:center;background-color:#d5aa5c;}
.order-succeed-info .color-disabled{background:#999}
.order-secceed-explain{margin:.4rem .8rem 0 .8rem;}
.order-secceed-explain li{margin-bottom:.3333rem;font-size:.32rem;color:#999;}
.order-succeed-third{font-size:.4rem;color:#2c2c2c;}
.order-succeed-third i{display:inline-block;width:.5333rem;height:.533rem;margin-right:.2667rem;background:url("../../../assets/third-icon.png");background-size:100% 100%;}
.order-succeed-bottom{position:fixed;bottom:.533rem;left:.4rem;right:.4rem;}
.order-succeed-third{margin-top:1.0667rem;}
.order-succeed-bottom div{float:left;width:4.4rem;height:1.067rem;font-size:.4267rem;line-height:1.067rem;text-align:center;border-radius:.4rem;}
.order-to-apply{margin-right:.4rem;color:#2c2c2c;background-color:#f6f5fa;}
.order-to-check{color:#fff;background-color:#d5aa5c;}


.dialog-content{
    position:fixed;
    top:0;
    left:0;
    height:100%;
    width:100%;
    transform:translateX(100%); 
}


@keyframes dialogAnimate
{
0% {transform:translateX(100%);opacity: 0}
100% {transform:translateX(0);opacity: 1}
}


.dialogAnimateStyle {
    animation: dialogAnimate 0.8s;
    animation-iteration-count:1;
    animation-fill-mode: forwards;
    animation-timing-function: ease-in-out;
}

</style>