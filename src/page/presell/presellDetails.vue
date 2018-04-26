<template>
    <div>
        <header class="user-tit declare-head" v-if="showHeadStatus">
            <span class="white-lt" @click="goToIndex"></span>
            预售车源
            <em>分享</em>
        </header>
        <!--预售详情-图片滚动-->
        <swiper :circular="circular" v-if="circular.length"></swiper>

        <section class="car-info-wrap">
            <div class="car-parameter">
                <p class="car-name">{{presellData.autoName}}</p>
                <div class="car-price">
                    <p>
                        <span>预售价:</span>
                        <strong>{{presellData.prePrice}}</strong>
                        <em>万</em>
                    </p>
                    <p>
                        <span>指导价：</span>
                        <em><i>{{presellData.guidePrice}}</i>万</em>
                    </p>
                    <p class="car-count-down">
                        <span>距结束剩余</span>
                        <span>{{presellData.endTime}}</span>
                    </p>
                    <p class="car-count-down" v-if="presellData.endTime == '' ">
                        <span>预售已结束</span>
                    </p>
                </div>
                <p class="car-parameter-tips">定金 {{presellData.deposit}} 元，未按时到达指定仓库，退回定金并赔付500元代金券</p>
            </div>

            <div class="car-time-place">
                <ul>
                    <li>
                        <span>可售范围：</span>
                        <em>{{presellData.area}}</em>
                    </li>
                    <li>
                        <span>到货时间：</span>
                        <em>{{presellData.arrivalTime}}</em>
                    </li>
                    <li>
                        <span>提货地点：</span>
                        <!-- <em>{{presellData.deliveryPlace}}</em> -->
                        <em>成都</em>
                    </li>
                    <li>
                        <span>车型颜色：</span>
                        <em>{{presellData.autoColor}}</em>
                    </li>
                    <li>
                        <span>生产日期：</span>
                        <em>{{presellData.productionTime}}</em>
                    </li>
                </ul>


                <div class="car-reserve" v-if="preSaleData.type == '2' ">
                    <p class="car-reserve-title">同省订购每满12台，即可享受发车到省</p>
                    <p class="car-reserve-tips">
                        <span>{{preSaleData.province}}</span>再订<i>{{preSaleData.endNum}}</i>台 <span>{{preSaleData.city}}</span> 提货
                    </p>
                    <div class="car-reserve-roll">
                        <ul ref="con1" :class="{anim:animate==true}">
                            <li v-for="item in preSaleData.buyList">
                                <span>{{item.time}}</span>
                                <span>{{item.dealer}}</span>
                                <span>{{item.num}}</span>
                            </li>
                        </ul>
                    </div>

                    <p class="car-share"><img src="../../assets/presell-share.png" alt="" @click="shareToWeichat"></p>
                    <p class="car-batch-count" v-if="preSaleData.batch > 0">已有<span>&nbsp;{{preSaleData.batch}}&nbsp;</span>批车辆发往{{preSaleData.city}}</p>
                </div>

            </div>

        </section>

        <section class="car-presell-flow">
            <p>预定流程</p>
            <img src="../../assets/car-presell-flow.png" alt="">
        </section>

        <section class="car-presell-explain">
            <p class="presell-explain-title">预定说明</p>
            <ul class="presell-explain-con">
                <li>
                    <span>1、</span>
                    定金可以抵扣车款；
                </li>
                <li>
                    <span>2、</span>
                    如因一猫原因造成车辆延迟到达指定仓库，经销商可以选择取消订单，一猫退回定金并赔付500元代金券；
                </li>
                <li>
                    <span>3、</span>
                    预定成功后，系统会为您自动生成全款订单，车辆入库后可补全款；
                </li>
                <li>
                    <span>4、</span>
                    如有疑问咨询当地销售经理，或联系客服 400-825-2368
                </li>
            </ul>
        </section>

        <section class="car-reserve-btn">
            <input v-if="presellData.endTime != '' " class="car-presell-present" type="button" name="立即预定" value="立即预定" @click="presellReserve"/>
            <input v-else class="car-presell-present-disabled" type="button" name="立即预定" value="立即预定" disabled/>
        </section>

        <alert-tip v-if="showAlert" @closeTip="showAlert = false" :alertText="alertText"></alert-tip>

    </div>
</template>


<script>
    import swiper from '../../components/common/swiper/swiper'
    import alertTip from '../../components/common/alertTip/alertTip';
    export default{
        name:'presellDetails',
        data(){
            return {
                //轮播图数据
                circular:[],
                animate:false,  //是否运动
                presellData:{},  //页面数据
                preSaleData:{},  //预售信息
                showHeadStatus:false,  //是否显示头部
                showAlert:false,  //是否显示弹窗
                alertText:null   //弹窗提示信息

            }
        },
        created(){
            /*文字滚动效果*/
            setInterval(this.scroll,2000)
        },
        methods:{
            //单行文字滚动
            scroll(){
                this.animate=true;    // 因为在消息向上滚动的时候需要添加css3过渡动画，所以这里需要设置true
                setTimeout(()=>{      //  这里直接使用了es6的箭头函数，省去了处理this指向偏移问题，代码也比之前简化了很多
                    this.presellData.preSale.buyList.push(this.presellData.preSale.buyList[0]);  // 将数组的第一个元素添加到数组的
                    this.presellData.preSale.buyList.shift();               //删除数组的第一个元素
                    this.animate=false;  // margin-top 为0 的时候取消过渡动画，实现无缝滚动
                },500)
            },

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

            //向导航条上添加分享按钮
            addShareButton() {
                var obj = {
                    actionname:"addShareButton",//Native 函数名称：必填，Native 提供给 JS 的可用函数的函数名称
                    actionid:"messageId",//回调 ID：可选参数，与回调函数配套使用
                    //callback:callback,//回调函数：可选参数，native 处理完该消息之后回调 JS 的函数
                    buttonTitle:"分享",//分享按钮的标题；可选参数，与 buttonImage 二选一
                    //buttonImage:"url",//分享按钮的图片地址；可选参数，与 buttonTitle 二选一；若没有该参数，或者 image 的地址为空，则使用 buttonTitle。若有此参数则优先使用该参数
                    title:window.presellModel + ' 预售价：'  + window.presellPrice + '万',
                    subTitle:"",
                    imgUrl:"",
                    url:"https://m.emao.com/tcm.html"//要分享内容的 url
                };
                this.tcmApp(obj);
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

            //用 JS 函数在新窗口打开指定链接
            windowOpen() {
                var obj = {
                    actionname: "windowOpen",//Native 函数名称：必填，Native 提供给 JS 的可用函数的函数名称
                    url: window.location.origin + '/#/presell/presellReserve/' + window.id// 要打开的链接
                };
                this.tcmApp(obj);
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

            /*区分app与wap做不同的渲染*/
            renderDom(){
                if (this.isTcmApp()){
                    document.title = "预售详情";
                    this.showHeadStatus = false;
//                    var timer;
//                    timer = setTimeout( function(){
//                        addShareButton()
//                    },2000);
//
//                    timer();

                    console.log(1);

                    //setTimeout(this.addShareButton,1500);

                }else{
                    this.showHeadStatus = true;
                }
            },

            /*返回首页*/
            goToIndex(){
                this.$router.push("/index");
            },

            /*页面分享到微信*/
            shareToWeichat(){
                this.shareMessage();
            },

            /*立即预定*/
            presellReserve(){
                if (this.presellData.preStockNum == '0') {
                    this.showAlert = true;
                    this.alertText = "抱歉，车辆已售罄";
                    return false;
                }
                if (this.isTcmApp()) {
                    //var id = this.$route.params.id;
                    window.id = this.$route.params.id;
                    //window.open("/#/presell/presellReserve/" + id,'_blank');
                    this.windowOpen();

                }else{
                    var id = this.$route.params.id;
                    this.$router.push('/presell/presellReserve/' + id);
                    this.$store.dispatch("PRESELL_FLAG",
                            {
                                tag:'presellDetails',
                                id:id
                            }
                    )
                }

            },

            //获取数据
            getPresellDetails(){
                var dataToken = sessionStorage.token;
                var data = {
                    token:dataToken,
                    id : this.$route.params.id
                };
                this.$http({
                    url:'preSale/detail',
                    methods:'GET',
                    params:data
                }).then(function(response){
                    this.presellData = response.body.data;
                    this.circular = response.body.data.circular;
                    this.preSaleData = response.body.data.preSale;
                    this.presellModel = response.body.data.autoName;
                    this.presellPrice = response.body.data.prePrice;
                    window.presellModel = response.body.data.autoName;
                    window.presellPrice = response.body.data.prePrice;
                    this.addShareButton();
                })
            }




        },
        mounted(){
            if (!sessionStorage.token) {
                sessionStorage.token = this.$route.query.token;
            }
            this.getPresellDetails();
            this.renderDom();
         },
        components:{
            swiper,
            alertTip
        }


    }
</script>

<style>
    .user-tit{font-weight:normal;}
    .declare-head{position:relative;}
    .declare-head em{position:absolute;right:.4rem;color:#d5aa5c;}
    .car-info-wrap{padding:.53rem .4rem .4rem;  background-color:#fff;  }
    .car-parameter{padding-bottom:.4rem;border-bottom:1px solid #e0e0e0;}
    .car-parameter .car-name{font-size:.4rem;font-weight:bold;color:#000;line-height:.9333rem;}
    .car-price{position:relative;}
    .car-price p:nth-of-type(1) {color:#fc3036;font-size:.4rem;}
    .car-price p:nth-of-type(1) strong{font-size:.427rem;font-weight:bold;}
    .car-price p:nth-of-type(1) em{font-size:.32rem;}
    .car-price p:nth-of-type(2) {font-size:.32rem;color:#999;}
    .car-price p:nth-of-type(2) em{text-decoration:line-through;}
    .car-price p:nth-of-type(2) em i{color:#999;}
    .car-count-down{position:absolute;top:0;right:-.4rem;padding:.1333rem .4rem;color:#fff;border-top-left-radius:.667rem;border-bottom-left-radius:.667rem;background-color:#fc3238;}
    .car-count-down span{display:block;}
    .car-count-down span:nth-of-type(2){font-size:.3467rem;font-weight:bold;}
    .car-parameter-tips{margin-top:.32rem;color:#ff825c;font-size:.3467rem;}
    .car-time-place{padding-top:.4rem;}
    .car-time-place ul li{margin-bottom:.267rem;}
    .car-time-place ul li span{font-size:.32rem;color:#999;}
    .car-time-place ul li em{font-size:.32rem;color:#333;}
    .car-reserve{display:none;padding:.467rem .5333rem;background-color:#fef9f1;}
    .car-reserve-title{line-height:.9333rem;font-size:.372rem;color:#000;text-align:center;}
    .car-reserve-tips{margin-bottom:.4rem;text-align:center;font-size:.3467rem;color:#ff5825;}
    .car-reserve-tips i{font-weight:bold;font-style:normal;}
    .car-reserve-roll{overflow:hidden;height:1.8rem;}
    /*.car-reserve-roll ul{height:.4267rem;}*/
    .car-reserve-roll ul li{height:.4rem;margin-bottom:.267rem;line-height:.4rem;font-size:.32rem;text-align:center;color:#999;}
    /*.car-reserve-roll ul li span:nth-of-type(2){margin-left:1.333rem;margin-right:1.0667rem;}*/

    .car-reserve-roll ul li span:nth-of-type(2){margin-left:.5rem;margin-right:.5rem;}

    .car-share{text-align:center;}
    .car-share img{width:7.147rem;height:1.68rem;}
    .car-batch-count{text-align:center;color:#2c2c2c;font-size:.32rem;}
    .car-presell-flow{margin-top:.4rem;padding-top:.533rem;padding-bottom:.533rem;text-align:center;background-color:#fff;}
    .car-presell-flow p{font-size:.372rem;color:#000;text-align:center;}
    .car-presell-flow img{width:7.707rem;height:1.88rem;margin-top:.867rem;}
    /*.car-presell-explain{margin-top:.4rem;margin-bottom:.4rem;padding:.533rem;background-color:#fff;}*/
    .car-presell-explain{margin-top:.4rem;margin-bottom:1.4rem;padding:.533rem;background-color:#fff;}
    .presell-explain-title{margin-bottom:.6rem;font-size:.3467rem;color:#000;text-align:center;}
    .presell-explain-con li{position:relative;margin-left:.6rem;margin-bottom:.267rem;color:#999;font-size:.4rem;line-height:.533rem;}
    .presell-explain-con li span{position:absolute;left:-.6rem;}
    .car-reserve-btn{display:inline-block;position:fixed;bottom:0;left:0;height:1.867rem;width:100%;margin:0 auto;background-color:#fff;line-height:1.867rem;text-align:center;border-top:1px solid #e7e7e7;}
    .car-reserve-btn .car-presell-present{display:inline-block;width:6.667rem;height:1.1733rem;margin:0 auto;text-align:center;line-height:1.17333rem;font-size:.4rem;color:#fff;border:none;border-radius:.5867rem;background-color:#d5aa5c;}
    .car-reserve-btn .car-presell-present-disabled{display:inline-block;width:6.667rem;height:1.1733rem;margin:0 auto;text-align:center;line-height:1.17333rem;font-size:.4rem;color:#999;border:none;border-radius:.5867rem;background-color:#e6e6e6;}


    /*#box{*/
        /*width: 300px;*/
        /*height: 32px;*/
        /*overflow: hidden;*/
        /*padding-left: 30px;*/
        /*border: 1px solid black;*/
    /*}*/
    .anim{
        transition: all 0.5s;
        margin-top: -.4rem;
    }
    /*#con1 li{*/
        /*list-style: none;*/
        /*line-height: 30px;*/
        /*height: 30px;*/
    /*}*/

</style>