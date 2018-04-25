<template>
    <div>
        <header class="user-tit declare-head" v-if="showHeadStatus">
            <span class="white-lt" @click="backtrack"></span>
            确认预定
        </header>

        <section class="car-reserved">提交成功，请等待财务审核，预计等待3小时</section>

        <!--<section class="car-reserved-tips" v-if="presellSuccessData.state == '100'">-->
            <!--<span>{{presellSuccessData.scope}}</span>再订 <span>{{presellSuccessData.num}}</span> 台，您即可在 <span>{{presellSuccessData.pickUpArea}}</span>提货-->
        <!--</section>-->


        <!--<section class="car-reserved-tips" v-if="presellSuccessData.state == '200' ">-->
            <!--拼板成功！您的车辆将会发运到 <span>{{presellSuccessData.pickUpArea}}</span>-->
        <!--</section>-->

        <!--<section class="car-reserved-tips" v-if=" presellSuccessData.state == '300' ">-->
            <!--{{presellSuccessData.msg}}-->
        <!--</section>-->

        <section class="car-reserved-tips">
            邀请友商，共享优质车源！
        </section>

        <section class="car-reserved-share">
            <input type="button" name="分享到微信 邀请友商" value="分享到微信 邀请友商" @click="shareToWeichat"/>
        </section>
    </div>
</template>

<script>
    export default{
        name:'presellSuccess',
        data(){
            return {
                presellSuccessData:{},  //成功页的数据
                state:'',               //渲染数据的判断值
                showHeadStatus:false,   //是否显示头部
                presellModel:null,      //分享里面的车型
                presellPrice:null       //分享里面的预售价格
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

            /*判断是否是App*/
            isTcmApp(){
                if (typeof(this.$route.query.token) == 'undefined' || this.$route.query.token == '') {
                    return false;
                } else {
                    return true;
                }
            },

            //向社交媒体分享信息
            shareMessage() {
                var obj = {
                    actionname:"shareMessage",//Native 函数名称：必填，Native 提供给 JS 的可用函数的函数名称
                    actionid:"messageId",//回调 ID：可选参数，与回调函数配套使用
                    //callback:callback,//回调函数：可选参数，native 处理完该消息之后回调 JS 的函数
                    toSNS:"weichat",//社交媒体参数，只有三个选项：weichat（微信），wcircle（微信朋友圈），qq
                    title:window.presellModel + ' 预售价：'  + window.presellPrice + '万',
                    subTitle:"",
                    imgUrl:"",
                    url:"https://m.emao.com/tcm.html"//要分享内容的 url
                };
                this.tcmApp(obj);



            },

            /*页面分享到微信*/
            shareToWeichat(){
                this.shareMessage();
            },

            /*区分app与wap做不同的渲染*/
            renderDom(){
                if (this.isTcmApp()){
                    document.title = "确认预定";
                    this.showHeadStatus = false;
                }else{
                    this.showHeadStatus = true;
                }
                window.presellModel = this.$store.getters.getPresellFlag.presellModel;
                window.presellPrice = this.$store.getters.getPresellFlag.presellPrice;
            },


            getPresellSuccessData(){
                this.presellSuccessData = this.$store.getters.getPresellData;
            },

            /*返回首页*/
            backtrack(){
                //从我预售进来的话，到我的预售列表
                //从预售详情进来，到预售详情页面
                var routeName = this.$store.getters.getPresellFlag.tag;
                console.log(routeName);
                if (routeName == presellDetails) {
                    var id = this.$store.getters.getPresellFlag.id;
                    this.$router.push("/presell/presellDetails/" + id);
                }else if (routeName == presellList){
                    this.$router.push("/presell/presellList")
                }

            },

        },
        mounted(){
            this.getPresellSuccessData();
            this.renderDom();
        }
    }
</script>
<style>
    html{width:100%;background-color:#fff;}
    body{width:100%;height:100%;background-color:#fff;}
    .user-tit{font-weight:normal;}
    .user-tit .white-lt {  position: absolute;  left: 0.48rem;  top: 0.4rem;  }
    .car-reserved{height:1.333rem;font-size:.3467rem;color:#333;line-height:1.33rem;text-align:center;background-color:#f3e6cc;}
    /*.car-reserved-tips{margin-top:1.6rem;font-size:.3467rem;text-align:center;}*/
    .car-reserved-tips{margin-top:1.6rem;font-size:.4rem;font-weight:bold;text-align:center;}
    .car-reserved-tips span{font-size:.48rem;font-weight:bold;}
    .car-reserved-share{position: fixed;  bottom: 2rem;  width: 100%;  text-align: center;}
    .car-reserved-share input{display: block;
        width: 6.666rem;
        height: 1.1733rem;
        margin: 5.447rem auto 0;
        color: white;
        font-size: .4533rem;
        line-height: 1.1733rem;
        text-align: center;
        background-color: #ff570f;
        border: 1px solid #ff570f;
        border-radius: .533rem;}
</style>