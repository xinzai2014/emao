<template>
    <div style="height:100%;">
        <!--头部-->
        <header class="user-tit">
            <!--<router-link to="/declare">-->
                <!--<a href="javascript:;" class="white-lt"></a>-->
            <!--</router-link>-->
            <a href="javascript:;" class="white-lt" @click="resetIndex"></a>
            申报资料
        </header>
        <!--提交申报资料-->
        <section class="submit-wrap">
            <div class="details-tit" v-if="declareType== 1 || declareType== 4 ">
                <h4 v-if="declareType== 4">
                    申报审核未通过
                </h4>
                <h4  v-if="declareType== 1">
                   售车申报审核中，请耐心等待
                </h4>
                <p v-if="declareType == 4 ">原因：{{saleInfo.reason}}</p>
            </div>

            <!--<div class="sales-item" v-if="declareType == 2 ">-->
                <!--<h3>{{orderInfo.name}}</h3>-->
                <!--<p class="sales-color">{{orderInfo.color}}</p>-->
                <!--<p class="submit-number">VIN：{{orderInfo.vinNumber}}</p>-->
            <!--</div>-->

            <!--<div class="sales-item" v-if="declareType == 1 || declareType== 4 ">-->
                <!--<h3>{{saleInfo.auto_name}}</h3>-->
                <!--<p class="sales-color">{{saleInfo.ext_color}}/{{saleInfo.int_color}}</p>-->
                <!--<p class="submit-number">VIN：{{saleInfo.vin_num}}</p>-->
            <!--</div>-->

            <div class="sales-item">
                <h3>{{saleInfo.auto_name}}</h3>
                <p class="sales-color">{{saleInfo.ext_color}}/{{saleInfo.int_color}}</p>
                <p class="submit-number">VIN：{{saleInfo.vin_num}}</p>
            </div>


            <div class="submit-info">
                <div class="user-info">
                    <div class="left">客户姓名：</div>
                    <div class="right">
                        <input type="text" v-validate="'name'" :class="{'input':true,'is-danger':errors.has('name')}" name="name" placeholder="请填写买车用户姓名" v-model="dealerNameVal">
                        <span v-show="errors.has('name')" class="help is-danger">{{errors.first('name')}}</span>
                    </div>
                </div>

                <div class="user-info">
                    <div class="left">客户电话：</div>
                    <div class="right">
                        <input type="text" v-validate="'mobile'" :class="{'input':true,'is-danger':errors.has('mobile')}" name="mobile" placeholder="请输入手机号码" v-model="dealerPhoneVal">
                        <span v-show="errors.has('mobile')" class="help is-danger">{{errors.first('mobile')}}</span>
                    </div>
                </div>

                <div class="user-info">
                    <div class="left">身份证号：</div>
                    <div class="right">
                        <input type="text" v-validate="'IDNumber'" :class="{'input':true,'is-danger':errors.has('IDNumber')}" name="IDNumber" placeholder="请输入有效的身份证号码" v-model="dealerIDNumberVal">
                        <span v-show="errors.has('IDNumber')" class="help is-danger">{{errors.first('IDNumber')}}</span>
                    </div>
                </div>

                <div class="user-info">
                    <div class="left">电子邮箱：</div>
                    <div class="right">
                        <input type="text" v-validate="'email'" :class="{'input':true,'is-danger':errors.has('email')}" name="email" placeholder="请输入邮箱地址" v-model="dealerEmailVal">
                        <span v-show="errors.has('email')" class="help is-danger">{{errors.first('email')}}</span>
                    </div>
                </div>



            </div>

            <!--待审核页面-->
            <div class="submit-info-list" v-if="declareType == 1 ">
                <div class="user-info-form">
                    <p class="user-info-tit">客户身份证正面照片</p>
                    <div class="user-info-pic" @click=showPopUp(saleInfo.idcard_img_front)>
                        <img :src="saleInfo.idcard_img_front" alt="">
                    </div>
                </div>
                <div class="user-info-form">
                    <p class="user-info-tit">客户身份证背面照片</p>
                    <div class="user-info-pic"  @click=showPopUp(saleInfo.idcard_img_reverse)>
                        <img :src="saleInfo.idcard_img_reverse" alt="">
                    </div>

                </div>
                <div class="user-info-form">
                    <p class="user-info-tit">购车发票</p>
                    <div class="user-info-pic"  @click=showPopUp(saleInfo.invoice_img)>
                        <img :src="saleInfo.invoice_img" alt="">
                    </div>

                </div>
                <div class="user-info-form">
                    <p class="user-info-tit">行驶证照片</p>
                    <div class="user-info-pic"  @click=showPopUp(saleInfo.driving_license_img)>
                        <img :src="saleInfo.driving_license_img" alt="">
                    </div>

                </div>
            </div>
            <!--待提交&&审核未通过页面-->
            <div class="submit-info"  v-if="declareType== 2 || declareType== 4 ">
                <div class="user-info">
                    <p class="submit-tit">请上传以下资料</p>
                </div>
                <div class="user-info">
                    <p class="user-info-tit">客户身份证正面照片</p>
                    <uploader :uploadData="uploadData1" @getUpload="getUpload"></uploader>
                </div>
                <div class="user-info">
                    <p class="user-info-tit">客户身份证背面照片</p>
                    <uploader :uploadData="uploadData2" @getUpload="getUpload"></uploader>

                </div>
                <div class="user-info">
                    <p class="user-info-tit">购车发票</p>
                    <uploader :uploadData="uploadData3" @getUpload="getUpload"></uploader>

                </div>
                <div class="user-info">
                    <p class="user-info-tit">行驶证照片</p>
                    <uploader :uploadData="uploadData4" @getUpload="getUpload"></uploader>

                </div>
            </div>

            <div class="close-bt-out"  v-if="declareType== 2 || declareType== 4 ">
                <button class="close-bt" @click="submitData" type="submit">提交</button>
            </div>
        </section>

        <div class="user-info-mask" v-if="showPopupStatus">
            <img :src="popUpData" alt="" @click="closePicPopUp">
        </div>

        <div class="mask" v-if="showPopup">
            <div class="cancel-car">
                <p class="prompt-tit">申报已提交，请等待审核。</p>
                <p class="prompt-btn"><span class="confirm" @click="closePopup">好的</span></p>
            </div>
        </div>

        <alert-tip v-if="showAlert" @closeTip="showAlert = false" :alertText="alertText"></alert-tip>

    </div>
</template>

<script>
    import uploader from '../../components/common/uploader/uploader';
    import alertTip from '../../components/common/alertTip/alertTip';
    export default{
        name:"editDeclare",
        data(){
        return {
            orderId:null, //
            dealerNameVal:'',       //客户姓名
            dealerPhoneVal:'',      //客户电话
            dealerIDNumberVal:'',   //身份证号
            dealerEmailVal:'',      //电子邮箱
            goodsStockId:'',        //
            vinNum:'',              //
            name:'',                //姓名
            mobile:'',              //电话
            IDNumber:'',            //身份证号
            email:'',               //邮箱
            showAlert:false,        //显示错误提示与否
            alertText:null,         //错误提示内容
            showPopup:false,        //显示弹窗与否
            showPopupStatus:false,        //显示图片弹窗与否
            declareList:[],
            orderInfo : {},         //订单信息
            saleInfo: {
                'auto_name':null,
                'ext_color':null,
                'int_color':null,
                'vin_num':null
            },           //申报资料审核未通过信息
            declareType:'',         //申报资料状态
            id : '',                //售车申报资料id

            //上传蹄片插件
            //上传身份证正面照片
            uploadData1:{
                url:"https://tcmapi.emao.com/upload",
                count:1,                        //传几张照片
                flag:"frontOfIDCard",           //粘片标志
                image:"static/sample7.jpg"      //照片路径
            },
            //上传身份证背面照片
            uploadData2:{
                url:"https://tcmapi.emao.com/upload",
                count:1,
                flag:"backOfIDCard",
                image:"static/sample8.jpg"
            },
            //上传购车发票
            uploadData3:{
                url:"https://tcmapi.emao.com/upload",
                count:1,
                flag:"invoiceForCarPurchase",
                image:"static/sample16.jpg"
            },
            //上传行驶证照片
            uploadData4:{
                url:"https://tcmapi.emao.com/upload",
                count:1,
                flag:"drivingLicense",
                image:"static/sample15.jpg"
            },


            dataURL:{},             //上传数据

            //表单数据
            formData:{
                token:sessionStorage.token,        //token
                order_num:'',                      //订单号
                goods_stock_id:'',                 //商品id
                name:'',                           //姓名字段
                phone:'',                          //电话字段
                idcard:'',                         //身份证号字段
                email:'',                          //邮箱字段

                idcard_img_front:'',               //身份证正面字段
                idcard_img_reverse:'',             //身份证反面字段
                driving_license_img:'',            //购车发票字段
                invoice_img:''                     //行驶证照片字段
            }

        }
    },
    methods:{
        //回到上一级
        resetIndex(){
            this.$router.go(-1);
        },
        //获取待审核，审核驳回数据
        getData(){
            var token = sessionStorage.token;
            //初始化拿申报资料数据
            this.$http({
                url:"order/sale/detail",
                method:"GET",
                params:{
                    token:token,
                    id:this.id
                }
            }).then(function(response){
                this.saleInfo = response.body.data;
                this.dealerNameVal = this.saleInfo.name;
                this.dealerPhoneVal = this.saleInfo.phone;
                this.dealerIDNumberVal = this.saleInfo.idcard;
                this.dealerEmailVal = this.saleInfo.email;
                this.vinNum = this.saleInfo.vin_num;
                this.goodsStockId = this.saleInfo.goods_stock_id;


//                this.formData.auto_name = this.saleInfo.auto_name;
//                this.formData.ext_color = this.saleInfo.ext_color;
//                this.formData.int_color = this.saleInfo.int_color;
//                this.formData.vin_num = this.saleInfo.vin_num;


                /*设置图片路径*/
                /*购车发票路径*/
                if(this.saleInfo.invoice_img){
                    this.$set(this.uploadData3,"imgArr",[this.saleInfo.invoice_img])
                    this.formData.driving_license_img = this.saleInfo.invoice_img;
                }

                /*行驶证照片*/
                if(this.saleInfo.driving_license_img){
                    this.$set(this.uploadData4,"imgArr",[this.saleInfo.driving_license_img])
                    this.formData.invoice_img = this.saleInfo.driving_license_img;
                }

                /*身份证正面照片*/
                if(this.saleInfo.idcard_img_front){
                    this.$set(this.uploadData1,"imgArr",[this.saleInfo.idcard_img_front])
                    this.formData.idcard_img_front = this.saleInfo.idcard_img_front;
                }

                /*身份证背面照片*/
                if(this.saleInfo.idcard_img_reverse){
                    this.$set(this.uploadData2,"imgArr",[this.saleInfo.idcard_img_reverse])
                    this.formData.idcard_img_reverse = this.saleInfo.idcard_img_reverse;
                }

                this.ajaxLoading = true; //图片插件必须要整理了，先这样吧

            })


        },

        /*获取待编辑数据*/
        getEditData(){
            var token = sessionStorage.token;
            this.$http({
                url:"order/full/detail",
                method:"GET",
                params:{
                    token:token,
                    order_num:this.orderId
                }
            }).then(function(response){
                var arr = response.body.data.orderInfo.name.split(' ');
                arr.shift();//删除数组最后一个元素
                response.body.data.orderInfo.name = arr.join(' ');//在拼接成字符串

                this.orderInfo = response.body.data.orderInfo;
                this.saleInfo.auto_name = this.orderInfo.name;
                this.saleInfo.ext_color = this.orderInfo.color.split("/")[0];
                this.saleInfo.int_color = this.orderInfo.color.split("/")[1];
                this.saleInfo.vin_num = this.orderInfo.vinNumber;

                this.vinNum = this.orderInfo.vinNumber;


//                this.formData.auto_name = this.orderInfo.name;
//                this.formData.ext_color = this.orderInfo.color.split("/")[0];
//                this.formData.int_color = this.orderInfo.color.split("/")[1];
//                this.formData.vin_num = this.orderInfo.vinNumber;



            })
        },

        getUpload(data,flag){
            this.dataURL[flag] = data;


            for(flag in this.dataURL){
                switch (flag)
                {
                    case "frontOfIDCard":
                        this.formData.idcard_img_front = this.dataURL[flag][0];
                        break;
                    case "backOfIDCard":
                        this.formData.idcard_img_reverse = this.dataURL[flag][0]
                        break;
                    case "invoiceForCarPurchase":
                        this.formData.driving_license_img = this.dataURL[flag][0]
                        break;
                    case "drivingLicense":
                        this.formData.invoice_img = this.dataURL[flag][0]
                        break;
                }
            }

        },

        getFileURL(flag) {
            if (flag in this.dataURL && this.dataURL[flag].length > 0 ) {
                return this.dataURL[flag][0];
            } else {
                return '';
            }
        },



        /*获取图片地址，显示遮罩弹窗和图片*/
        showPopUp (dataSrc){
            this.showPopupStatus = true;
            this.popUpData = dataSrc;
        },
        /*关闭遮罩弹窗和图片*/
        closePicPopUp(){
            this.showPopupStatus = false;
        },
        //关闭弹窗
        closePopup(){
            this.showPopup = false;
            this.declareType = 1;
           Object.assign(this.saleInfo,this.formData);


        },

        //提交表单数据
        submitData(){
            //判断姓名，手机号，身份证，邮箱，身份证正反面，购车发票，行驶证照片 是否为空
            if (!this.dealerNameVal) {
                this.showAlert = true;
                this.alertText = '请填写姓名';
                return ;
            }

            if (!this.dealerPhoneVal) {
                this.showAlert = true;
                this.alertText = '请填写正确的手机号';
                return ;
            }

            if (!this.dealerIDNumberVal) {
                this.showAlert = true;
                this.alertText = '请填写有效的身份证号码';
                return ;
            }

            if (!this.dealerEmailVal) {
                this.showAlert = true;
                this.alertText = '请输入邮箱地址';
                return ;
            }

            if (!this.formData.idcard_img_front) {
                this.showAlert = true;
                this.alertText = '请上传身份证正面照片';
                return ;
            }

            if (!this.formData.idcard_img_reverse) {
                this.showAlert = true;
                this.alertText = '请上传身份证背面照片';
                return ;
            }

            if (!this.formData.driving_license_img) {
                this.showAlert = true;
                this.alertText = '请上传购车发票';
                return ;
            }

            if (!this.formData.invoice_img) {
                this.showAlert = true;
                this.alertText = '请上传行驶证照片';
                return ;
            }

            var This = this;
            //判断姓名，手机号，身份证，邮箱字段填写是否报错
            this.$validator.validateAll().then(function (result) {
                if (result) {
                    This.formData.order_num = This.vinNum;
                    This.formData.goods_stock_id = This.goodsStockId;
                    This.formData.name = This.dealerNameVal;
                    This.formData.phone = This.dealerPhoneVal;
                    This.formData.idcard = This.dealerIDNumberVal;
                    This.formData.email = This.dealerEmailVal;


//                    This.formData.idcard_img_front = This.getFileURL('frontOfIDCard');
//                    This.formData.idcard_img_reverse = This.getFileURL('backOfIDCard');
//                    This.formData.driving_license_img = This.getFileURL('invoiceForCarPurchase');
//                    This.formData.invoice_img = This.getFileURL('drivingLicense');


                    This.$http.post("order/sale/info",This.formData).then(function(response){
                        This.id = response.body.data.id;
                        This.showPopup = true;

                    }).catch(function(error){
                        This.showAlert = true;
                        This.alertText = error.body.msg;
                    })
                }else{
                    return;
                }
            });


        }





    },
    mounted(){
        this.id = this.$route.query.id;
        if(this.$route.query.is_sell){
            this.declareType = this.$route.query.is_sell;
        }else{
            this.declareType = 4;
        }


        this.orderId = this.$route.query.orderNum;
        this.goodsStockId = this.$route.query.goods_stock_id;
        if(this.declareType == '2'){
            this.getEditData();
        }else{
            this.getData();
        }

        // 自定义内置规则的错误信息
        const dictionary = {
            'zh_CN': {
                messages: {
                    email: function (field, args) {
                        return '电子邮箱不正确';
                    }
                }
            }
        };
        this.$validator.updateDictionary(dictionary);


        //自定义验证规则
        //手机号定义
        const isMobile = {
            messages: {
                'zh_CN': function (field, args) {
                    return  '电话号不正确';
                }
            },
            validate: function (value, args) {
                return value.length == 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)
            }
        };
        this.$validator.extend('mobile', isMobile);



        //姓名定义
        const isName = {
            messages: {
                'zh_CN': function (field, args) {
                    return  '姓名不正确';
                }
            },
            validate: function (value, args) {
                return /^([\u4e00-\u9fa5]+|([a-zA-Z]+\s?)+)$/.test(value)
            }
        };
        this.$validator.extend('name', isName);


        //身份证号码定义
        const isIDNumber = {
            messages: {
                'zh_CN': function (field, args) {
                    return  '身份证号不正确';
                }
            },
            validate: function (value, args) {
//                return /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(value)
                return /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/.test(value)
            }
        };
        this.$validator.extend('IDNumber', isIDNumber);






    },
    components:{
        uploader,
                alertTip
    }


    }
</script>

<style>
    /*售车申报*/
    .error-tips{ position: absolute;  bottom: -1.067rem;  color: red;  text-align: center;  margin: 0 auto;}
    .close-bt-out{height: 1.705rem;padding-top: .535rem;}
    .close-bt-out .close-bt{width: 5.333333rem;height: 1.17rem;line-height: 1.17rem;text-align: center;margin: 0 auto .535rem;font-size: 0.453333rem;color: #fff;background: #d5aa5c;border-radius: 0.586667rem;border: none;display: block;cursor: pointer;}
    .sales-item{
        padding:0.533333rem 0.4rem;
        overflow:hidden;
        background:#fff;
        max-height:99999px;
    }
    .sales-item h3{
        font-size:0.426667rem;
        line-height:0.466667rem;
    }
    .sales-color{
        font-size:0.346667rem;
        color:#999;
        margin-top:0.266667rem;
    }
    .submit-number{
        font-size:0.373333rem;
        color:#fc3036;
        margin-top:0.533333rem;
    }

    /*信息*/
    .submit-info{
        background:#fff;
        overflow:hidden;
        margin-top:0.4rem;
    }
    .user-info{
        padding:0.533333rem 0;
        margin:0 0.4rem;
        border-bottom:1px solid #eee;
        font-size:0.4rem;
        color:#2c2c2c;
        overflow:hidden;
    }
    .user-info .left{float:left;width:2.1333rem;height:.4rem;line-height:.4rem;}
    .user-info .right{position:relative;float:left;width:7.0667rem;height:.4rem;line-height:.4rem;}
    .user-info .right span{position:absolute;bottom:-.5333rem;left: 0.266667rem;color:red;font-size:.2933rem;}
    .user-info input{
        display:block;
        width:6.866667rem;
        height:.4rem;
        border:none;
        line-height:0.4rem;
        margin-left:0.266667rem;
    }
    .user-info:last-child{
        border:none;
    }
    .submit-tit{
        font-size:0.506667rem;
    }
    /*.user-info img{*/
    /*width:100%;*/
    /*height:100%;*/
    /*}*/
    .sample-ct{
        overflow:hidden;
        margin-top:0.533333rem;

    }
    .user-info .submit-lt{
        width:3.68rem;
        height:4.333333rem;
        float:left;
        margin:0 1.066667rem 0 0.4rem;
    }
    .user-info .submit-img{
        width:3.666667rem;
        height:2.773333rem;
        /*overflow:hidden;*/
    }
    .user-info .up-btn {
        border: 1px solid #d6ab55;
        border-radius: 0.533333rem;
        color: #bb8800;
        font-size: 0.373333rem;
        height: 1.05333rem;
        line-height: 1.05333rem;
        margin: 0.4rem auto;
        text-align: center;
        width: 2.64rem;
    }
    .user-info .upfile{display:none;}

    .user-info-mask{position: fixed;width: 100%;height: 100%;top: 0;left: 0;background: rgba(0,0,0,0.85);}
    .user-info-mask img{position:absolute;top:50%;width:100%;height:100%;-webkit-transform: translateY(-50%);transform: translateY(-50%);}
    .mask{
        width:100%;
        height:100%;
        background:rgba(0,0,0,0.8);
        position:fixed;
        left:0;
        top:0;
    }
    .cancel-car{
        position:fixed;
        width:7.2rem;
        background:#fff;
        border-radius:0.133333rem;
        overflow:hidden;
        left:50%;
        top:50%;
        margin-top:-1.866667rem;
        margin-left:-3.6rem;
    }
    .prompt-tit{
        text-align:center;
        font-size:0.4rem;
        color:#2c2c2c;
        margin:0.986667rem 0;
    }
    .prompt-btn{
        background:#f5f5f5;
        overflow:hidden;
        height:1.173333rem;
        line-height:1.173333rem;
    }
    .prompt-btn span{
        display:block;
        width:100%;
        float:left;
        text-align:center;
        font-size:0.453333rem;
    }
    .prompt-btn span.confirm{
        background:#d6ab55;
        color:#fff;
    }
    .details-tit{
        padding:0.533333rem 0.4rem;
        background:#d5aa5c;
    }
    .details-tit h4{
        font-size:0.506667rem;
        color:#fff;
        line-height:0.533333rem;
    }
    .details-tit h4 span{
        float:right;
        font-size:0.346667rem;
    }
    .details-tit p{
        font-size:0.346667rem;
        color:#fff;
        margin-top:0.533333rem;
    }



    .submit-info-list{
        background:#fff;
        overflow:hidden;
        margin-top:0.4rem;
    }
    .user-info-form .submit-lt{
        width:3.68rem;
        height:4.333333rem;
        float:left;
        margin:0 1.066667rem 0 0.4rem;
    }
    .user-info-form .submit-img{
        width:3.666667rem;
        height:2.773333rem;
        /*overflow:hidden;*/
    }
    .user-info-form .up-btn {
        border: 1px solid #d6ab55;
        border-radius: 0.533333rem;
        color: #bb8800;
        font-size: 0.373333rem;
        height: 1.05333rem;
        line-height: 1.05333rem;
        margin: 0.4rem auto;
        text-align: center;
        width: 2.64rem;
    }
    .user-info-form{
        padding: 0.533333rem 0;
        margin: 0 0.4rem;
        border-bottom: 1px solid #eee;
        font-size: 0.4rem;
        color: #2c2c2c;  overflow: hidden;
    }
    .user-info-form .user-info-pic{margin-top:.5333rem;width:3.667rem;height:2.773rem;}
    .user-info-form .user-info-pic img{width:100%;height:100%;}
</style>
