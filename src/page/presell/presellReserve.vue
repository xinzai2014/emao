<template>
    <div v-if="showDomTag">
        <header class="user-tit declare-head"  v-if="showHeadStatus">
            <span class="white-lt" @click="backtrack"></span>
            立即抢购
        </header>

        <section class="car-info-wrap">
            <div class="car-parameter">
                <p class="car-name">{{overviewData.autoName}}</p>
                <div class="car-reserve-price">
                    <p>
                        <span>抢购价:</span>
                        <strong>{{overviewData.prePrice}}</strong>
                        <em>万</em>
                    </p>
                    <p>
                        <span>指导价：</span>
                        <em><i>{{overviewData.guidePrice}}</i>万</em>
                    </p>
                </div>

                <div class="car-parameter-tips">定金 {{overviewData.deposit}} 元，未按时到达指定仓库，退回定金并赔付500元代金券</div>

            </div>
        </section>

        <section class="car-colour-vount">
            <p class="car-colour-title">选择外观/内饰颜色和数量</p>
            <ul>
                <li v-for="(item,index) in stockData"">
                    <p><span>{{item.extColor}}</span> / <span>{{item.intColor}}</span> </p>
                    <p>库存： <span>{{item.sum}}</span> 台</p>
                    <p><span v-on:click="counterSubtract(index)">-</span> <span> <input type="text" v-model="item.default" @input="countMonitor(index)"></span> <span v-on:click="counterAugment(index)">+</span> </p>
                </li>
            </ul>
        </section>


        <section class="car-account-wrap">
            <p class="car-account-title">请使用公司账户将定金转入以下账户：</p>
            <ul>
                <li>
                    <span>公司名称：</span>
                    <em>{{bankInfoData.companyName}}</em>
                </li>
                <li>
                    <span>开户行：</span>
                    <em>{{bankInfoData.bankName}}</em>
                </li>
                <li>
                    <span>账号：</span>
                    <em>{{bankInfoData.account}}</em>
                </li>
                <li>
                    <span>定金金额：</span>
                    <em>{{earnesTotal}}</em>元
                </li>
            </ul>

            <!-- <ul>
                <li>
                    <span>公司名称：</span>
                    <em>成都一猫电子商务有限公司</em>
                </li>
                <li>
                    <span>开户行：</span>
                    <em>中国银行股份有限公司成都天府大道支行</em>
                </li>
                <li>
                    <span>账号：</span>
                    <em>127993140154</em>
                </li>
                <li>
                    <span>定金金额：</span>
                    <em>{{earnesTotal}}</em>元
                </li>
            </ul> -->

            <p class="car-account-voucher">上传付款凭证</p>


            <!--上传图片组件-->
            <uploader :uploadData="uploadData" @getUpload="getUpload"></uploader>

            <p class="car-account-tips">注：使用个人账户打款，定金无法开具增值税专用发票</p>
        </section>


        <section class="car-warehouse-wrap">
            <p class="car-warehouse-title">选择提货仓</p>
            <ul>
                <li v-for="(item,index) in pickUpWarehouseData" @click="chooseWarehouse(item,index)">
                    <i :class="{'weui-icon-success':item.isChooseWarehouse,'weui-icon-checked':!item.isChooseWarehouse}"></i>
                    <p>{{item.name}}</p>
                    <p>地址：{{item.address}}</p>
                </li>
            </ul>
            <div class="car-participation-wrap" v-if=' activityData.buttonIsShow == "1" '>
                <div class="car-participation" @click="chooseActivity">
                    <i :class="{'weui-icon-success':chooseActivityFlag,'weui-icon-checked':!chooseActivityFlag}"></i>
                    <p>参与活动：省内拼满{{activityData.assemblyNumber}}台， <span>{{activityData.pickUpArea}}</span> 提车</p>
                    <p>仓库地址：{{activityData.pickUpAddress}}</p>
                </div>
            </div>

        </section>

        <section class="car-reserve-btn">
            <input type="button" name="立即预定" value="立即预定" @click="submitData"/>
        </section>


        <alert-tip v-if="showAlert" @closeTip="showAlert = false" :alertText="alertText"></alert-tip>

    </div>
</template>


<script>
    import uploader from '../../components/common/uploader/uploader';
    import alertTip from '../../components/common/alertTip/alertTip';
    export default{
        name:'presellReserve',
        data(){
            return {
                //上传付款凭证
                uploadData:{
                    url:"https://tcmapi.emao.com/upload",
                    count:1,                        //传几张照片
                    flag:"presellVoucher",           //照片标志
                    image:"static/presell-voucher.jpg"      //照片路径
                },
                dataURL:{},             //上传数据
                showAlert:false,  //是否显示弹窗
                alertText:null,   //弹窗的内容
                chooseActivityFlag:true,   //是否选择了参与活动
                chooseWarehouseFlag:false,  //是否选择了常规仓库
                formData: {       //表单提交的数据
                    token: '',     //token
                    id: '',        //活动id
                    extColorId: [],  //外饰
                    intColorId: [],  //内饰
                    sum: [],         //车的数量（数组格式）
                    payimg:[],       //付款凭证（数组格式）
                    warehouseId: '',  //常规仓库id
                    isJoinActivity: ''  //是否参加活动

                },
                activityData:{},    //参与活动模块的数据
                overviewData:{},    //车型相关数据
                bankInfoData:{},    //公司账户数据
                stockData:[],    //外观，内饰信息
                pickUpWarehouseData:[],  //仓库信息
                backtrackData:{},  //接口数据
                showHeadStatus:false,  //是否头部
                isChooseWarehouse:false,  //是否选择常规仓库
                showDomTag:false
            }
        },
        methods:{

            /*返回首页*/
            backtrack(){

                /*分情况判断*/
                /*从我的预售列表页来，返回到我的预售列表页*/
                /*从预售详情页面来，返回到预售详情*/
                var routeName = this.$store.getters.getPresellFlag.tag;
                if (routeName == "presellDetails") {
                    var id = this.$route.params.id;
                    this.$router.push("/presell/presellDetails/" + id);
                }else if (routeName == "presellList"){
                    this.$router.push("/presell/presellList")
                }

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


            /*判断是否是App*/
            isTcmApp(){
                // return navigator.userAgent.indexOf("tcm") !== -1;

                if (typeof(this.$route.query.token) == 'undefined' || this.$route.query.token == '') {
                    return false;
                } else {
                    return true;
                }
            },

            //隐藏导航条分享按钮
            hideShareButton() {
                var obj = {
                    actionname:"hideShareButton",//Native 函数名称：必填，Native 提供给 JS 的可用函数的函数名称
                    actionid:"messageId",//回调 ID：可选参数，与回调函数配套使用
                    callback:callback//回调函数：可选参数，native 处理完该消息之后回调 JS 的函数
                };
                this.tcmApp(obj);
            },

            /*区分app与wap做不同的渲染*/
            renderDom(){
                if (this.isTcmApp()){
                    document.title = "立即抢购";
                    this.showHeadStatus = false;
                    this.hideShareButton();
                }else{
                    this.showHeadStatus = true;
                }
            },

            /*上传图片相关*/
            getUpload(data,flag){
                console.log(data);
                this.dataURL[flag] = data;

                //this.formData.payimg = [{url: this.dataURL.presellVoucher}];
                this.formData.payimg = [{url: data[0]}];
            },

            /*获得数据*/
            getPresellReserve(){
                var dataToken = sessionStorage.token;
                var data = {
                    token:dataToken,
                    id : this.$route.params.id
                };
                this.$http({
                    url:'order/preSale/confirm',
                    methods:'GET',
                    params:data
                }).then(function(response){
                    var presellReserveData = response.body.data;
                    this.activityData = presellReserveData.activity;
                    this.overviewData = presellReserveData.overview;
                    this.bankInfoData = presellReserveData.bankInfo;
                    this.stockData = presellReserveData.stock;


                    var tagData = presellReserveData.pickUpWarehouse;

                    tagData.forEach((item,index)=>{
                       item.isChooseWarehouse = false;
                    });

                    this.pickUpWarehouseData = tagData;

                    this.showDomTag = true;


                })
            },

            /*定金金额相关*/
            counterSubtract(index){
                if (this.stockData[index].default == '') {
                    this.stockData[index].default = 0;
                }
                this.stockData[index].default = parseInt( this.stockData[index].default);
                this.stockData[index].default -= 1;
                if (this.stockData[index].default < 0) {
                    this.showAlert = true;
                    this.alertText = '数量不能小于0';
                    this.stockData[index].default = 0;
                }
            },


            counterAugment(index){
                if (this.stockData[index].default == '') {
                    this.stockData[index].default = 0;
                }
                this.stockData[index].default = parseInt(this.stockData[index].default);
                this.stockData[index].default += 1;
                if ( this.stockData[index].default >  this.stockData[index].sum ) {
                    this.showAlert = true;
                    this.alertText = '数量不能大于库存';
                    this.stockData[index].default = this.stockData[index].sum;
                }
            },

            countMonitor(index){
                if ( parseInt(this.stockData[index].default) > parseInt(this.stockData[index].sum)) {
                    this.showAlert = true;
                    this.alertText = "数量不能大于库存";
                }
            },

            /*仓库选中与否*/
            chooseWarehouse(item,index){
                item.isChooseWarehouse = !item.isChooseWarehouse;
                var that = this;
                that.pickUpWarehouseData.forEach(function(ele,ind){
                    if(!(index == ind)){
                        ele.isChooseWarehouse = false;
                    }
                });

            },


            /*是否参与活动*/
            chooseActivity(){
                var that = this;
                this.chooseActivityFlag = !this.chooseActivityFlag;
                if (this.chooseActivityFlag == false) {
                    this.showAlert = true;
                    this.alertText = "若不参加该活动，您只能前往所选仓库进行提车";
                }
            },

            /*表单数据提交*/
            submitData(){
                if (this.earnesTotal == 0) {
                    this.showAlert = true;
                    this.alertText = "请选择车型颜色并填写数量";
                    return
                }

                console.log(this.formData.payimg);
                if (this.formData.payimg == null || this.formData.payimg.length == 0 ) {
                    this.showAlert = true;
                    this.alertText = "请上传付款凭证";
                    return
                }


                var tag = this.pickUpWarehouseData.find((ele,index,arr)=>{
                    return ele.isChooseWarehouse == true;
                });

                if(!tag){
                    this.showAlert = true;
                    this.alertText = "请选择提车仓库";
                    return false;
                }

                 var that = this;
                //购买车的数量
                this.stockData.forEach(function(item,index){
                    if (item.default > 0) {
                        that.formData.extColorId.push(item.extColorId);
                        that.formData.intColorId.push(item.intColorId);
                        that.formData.sum.push(item.default);
                    }
                });


                var that = this;
                this.pickUpWarehouseData.forEach(function(item,index){
                    if (item.isChooseWarehouse == true) {
                        that.formData.warehouseId = item.id;
                    }
                })


                console.log(this.formData.warehouseId)

                if (this.chooseActivityFlag && this.activityData.buttonIsShow == '1') {
                    this.formData.isJoinActivity = '1';
                }else{
                    this.formData.isJoinActivity = '0';
                }

                this.formData.token = sessionStorage.token;
                this.formData.id = this.$route.params.id;


                //this.formData.payimg = [{url: this.dataURL.presellVoucher}];
                this.$http.post("order/preSale/create",this.formData).then(function(response){
                    this.backtrackData = response.body.data;
                    this.$store.dispatch("PRESELL_FLAG",
                            {
                                presellModel:this.overviewData.autoName,
                                presellPrice:this.overviewData.prePrice
                            }
                    );
                    this.$store.dispatch("PRESELL_DATA", this.backtrackData);
                    this.$store.dispatch("PRESELL_FLAG",
                            {
                                presellModel:this.overviewData.autoName,
                                presellPrice:this.overviewData.prePrice
                            }
                    );
                    if(this.isTcmApp()){
                        this.$router.push('/presell/presellSuccess?token=' + sessionStorage.token);
                    }else{
                        this.$router.push('/presell/presellSuccess');
                    }
                });
            },




//            submitData(){
//                this.$store.dispatch("PRESELL_FLAG",
//                        {
//                            presellModel:this.overviewData.autoName,
//                            presellPrice:this.overviewData.prePrice
//                        }
//                );
//                this.$store.dispatch("PRESELL_DATA", this.backtrackData);
//                if(this.isTcmApp()){
//                    this.$router.push('/presell/presellSuccess?token=' + sessionStorage.token);
//                    //alert(JSON.stringify(this.$router.query));
//                }else{
//                    this.$router.push('/presell/presellSuccess');
//                }
//            }


        },
        components:{
            uploader,
             alertTip
        },
        mounted(){
            if (!sessionStorage.token) {
                sessionStorage.token = this.$route.query.token;
            }
           this.getPresellReserve();
           this.renderDom();
        },
        computed:{
            earnesTotal:function(){
                var that = this;
                var total = 0;
                this.stockData.forEach(function(item,index){
                    total += item.default * that.overviewData.deposit
                });
                return total;
            }
        }

    }
</script>


<style>
    .user-tit{font-weight:normal;}
    .user-tit .white-lt {  position: absolute;  left: 0.48rem;  top: 0.4rem;  }
    .car-info-wrap{padding:.53rem .4rem .4rem;  background-color:#fff; }
    .car-parameter .car-name{font-size:.4rem;font-weight:bold;color:#000;line-height:.9333rem;}
    .car-reserve-price{clear:both;overflow:hidden;}
    .car-reserve-price p{float:left;}
    .car-reserve-price p:nth-of-type(1) {margin-right:1.0667rem;color:#fc3036;font-size:.4rem;}
    .car-reserve-price p:nth-of-type(1) strong{font-size:.427rem;font-weight:bold;}
    .car-reserve-price p:nth-of-type(1) em{font-size:.32rem;}
    .car-reserve-price p:nth-of-type(2) {font-size:.32rem;color:#999;}
    .car-reserve-price p:nth-of-type(2) em{text-decoration:line-through;}
    .car-reserve-price p:nth-of-type(2) em i{color:#999;}
    .car-parameter-tips{margin-top:.32rem;color:#ff825c;font-size:.3467rem;}
    .car-colour-vount{margin-top:.2667rem;padding:.53rem .4rem .4rem;background-color:#fff;}
    .car-colour-vount .car-colour-title{font-size: .4rem; font-weight: bold;  color: #000;}
    .car-colour-vount ul{margin-top:.5333rem;}
    .car-colour-vount ul li{height:1.333rem;line-height:1.333rem;border-bottom:1px solid #e0e0e0;font-size:.3733rem;}
    .car-colour-vount ul li p:nth-of-type(1) {float:left;color:#000;}
    .car-colour-vount ul li p:nth-of-type(2) {float:left;margin-left:.6rem;color:#999;}
    .car-colour-vount ul li p:nth-of-type(3) {float:right;}
    .car-colour-vount ul li p:nth-of-type(3) span{color:#d5aa5c;font-size:.4rem;}
    .car-colour-vount ul li p:nth-of-type(3) input{display:inline-block;width:.6667rem;height:.667rem;color:#333;margin-left:.0667rem;margin-right:.0667rem;line-height:.667rem;text-align:center;border:1px solid #d5aa5c;border-radius:.0667rem;}
    .car-colour-vount ul li:last-child{border-bottom:none;}
    .car-account-wrap{margin-top:.4rem;padding:.53rem .4rem .4rem;background-color:#fff;}
    .car-account-title{font-size: .4rem; color: #000;}
    .car-account-wrap ul{margin-top:.333rem;padding:.333rem;background-color:#fef9f1;}
    .car-account-wrap ul li{ margin-bottom:.333rem;font-size: .346rem;}
    .car-account-wrap ul li span{display:inline-block;width:1.7333rem;color: #999;}
    .car-account-wrap ul li em{color: #333;}
    .car-account-wrap ul li:last-child{margin-bottom:0;color:#fc3036;}
    .car-account-wrap ul li:last-child span{color:#fc3036;}
    .car-account-wrap ul li:last-child em{color:#fc3036;}
    .car-account-voucher{margin-top:.4rem;margin-bottom:.4rem;font-size:.4rem;}
    .car-account-tips{color:#fc3036;}
    .car-warehouse-wrap{margin-top:.4rem;margin-bottom:.4rem;padding:.53rem .4rem .4rem;background-color:#fff;}
    .car-warehouse-title{margin-bottom:.5333rem;font-size: .4rem; color: #000;}
    .car-warehouse-wrap ul{}
    .car-warehouse-wrap ul li{position:relative;margin-bottom:.4rem;  padding:.333rem .333rem .333rem 1.333rem;border:1px solid #e0e0e0;border-radius:.2667rem;}
    .car-warehouse-wrap ul li p:nth-of-type(1){margin-bottom:.2667rem;font-size:.3467rem;color: #000;}
    .car-warehouse-wrap ul li p:nth-of-type(2){font-size:.3467rem;color: #999;}
    .car-warehouse-wrap ul li i{position:absolute;top:.85rem;left:.5rem;}
    @font-face {
        font-weight: normal;
        font-style: normal;
        font-family: "weui";
        src: url('data:application/octet-stream;base64,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') format('truetype');
    }
    [class^="weui-icon-"], [class*=" weui-icon-"] {
        display: inline-block;
        vertical-align: middle;
        font: normal normal normal 14px/1 "weui";
        font-size: inherit;
        text-rendering: auto;
        -webkit-font-smoothing: antialiased;
    &:before{
         display: inline-block;
         margin-left: .2em;
         margin-right: .2em;
     }
    }
    .weui-check {
        position: absolute;
        left: -9999em;
    }
    .weui-check:checked + .weui-icon-checked:before {
        content: '\EA06';
        color: #F43530;
    }
    .weui-icon-checked:before {
        content: '\EA01';
        color: #C9C9C9;
        font-size: 0.54rem;
        display: block;
    }
    /*.weui-cell__hd {*/
        /*padding-right: 2em;*/
        /*float: left;*/
        /*display: inline-block;*/
        /*position: relative;*/
        /*top: 0.85rem;*/
        /*height: 2rem;*/
    /*}*/
    .weui-icon-success{
        font-size: 23px;
        color: red;
    }
    .weui-icon-success:before{
        content: "\EA06";
        font-size: 0.54rem;
    }
    .car-participation-wrap{margin-top:.4rem;padding-top:.4rem;border-top:1px dashed #d5aa5c;}
    .car-participation{position:relative;padding:.333rem .333rem .333rem 1.333rem;background-color:#fef9f1;}
    .car-participation i{position:absolute;top:.85rem;left:.5rem;}
    .car-participation p:nth-of-type(1){margin-bottom:.2667rem;color:#ff825c;}
    .car-participation p:nth-of-type(2){color:#999;}
    .car-reserve-btn{height:1.867rem;margin:0 auto;background-color:#fff;line-height:1.867rem;text-align:center;}
    .car-reserve-btn input{display:inline-block;width:6.667rem;height:1.1733rem;margin:0 auto;text-align:center;line-height:1.17333rem;font-size:.4rem;color:#fff;border:none;
        border-radius:.5867rem;background-color:#d5aa5c;}
</style>