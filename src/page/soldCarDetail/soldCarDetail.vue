<template>
    <div style="height:100%;">
        <!--头部-->
        <header class="user-tit">
            <router-link to="/soldCar">
                <a href="javascript:;" class="white-lt"></a>
            </router-link>
            车辆申报信息
        </header>
        <!--提交申报资料-->
        <section class="submit-wrap">
            <div class="sales-item">
                <h3>{{saleInfo.auto_name}}</h3>
                <p class="sales-color">{{saleInfo.ext_color}}/{{saleInfo.int_color}}</p>
                <p class="submit-number">VIN：{{saleInfo.vin_num}}</p>
            </div>

            <div class="submit-info-list">
                <div class="user-info">
                    <div class="left">客户姓名：</div>
                    <div class="right">
                        <p type="text">{{saleInfo.name}}</p>
                    </div>
                </div>

                <div class="user-info">
                    <div class="left">客户电话：</div>
                    <div class="right">
                       <p>{{saleInfo.phone}}</p>
                    </div>
                </div>

                <div class="user-info">
                    <div class="left">身份证号：</div>
                    <div class="right">
                       <p>{{saleInfo.idcard}}</p>
                    </div>
                </div>

                <div class="user-info">
                    <div class="left">电子邮箱：</div>
                    <div class="right">
                       <p>{{saleInfo.email}}</p>
                    </div>
                </div>

            </div>
            <div class="submit-info-list">
                <div class="user-info-form">
                    <p class="user-info-tit">身份证正面照片</p>
                   <div class="user-info-pic" @click=showPopUp(saleInfo.idcard_img_front)>
                       <img :src="saleInfo.idcard_img_front" alt="">
                   </div>
                </div>
                <div class="user-info-form">
                    <p class="user-info-tit">身份证背面照片</p>
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

        </section>

        <div class="user-info-mask" v-if="showPopupStatus">
            <img :src="popUpData" alt="" @click="closePopUp">
        </div>

    </div>
</template>

<script>
    import uploader from '../../components/common/uploader/uploader';
    export default{
        name:"soldCarDetail",
        data(){
        return {
            id:null, //
            errorTips:'',           //错误提示
            showAlert:false,        //显示错误提示与否
            alertText:null,         //错误提示内容
            showPopupStatus:false,        //显示弹窗与否
            saleInfo : {},          //订单信息
            popUpData:''            //弹窗的信息
        }
    },
    methods:{
        //初始化拿数据
        //初始化拿数据
        getData(){
            var token = sessionStorage.token;
            this.$http({
                url:"order/sale/detail",
                method:"GET",
                params:{
                    token:token,
                    id:this.id
                }
            }).then(function(response){
                 this.saleInfo = response.body.data;
            })
        },
        /*获取图片地址，显示遮罩弹窗和图片*/
        showPopUp(dataSrc){
            this.showPopupStatus = true;
            this.popUpData = dataSrc;
        },
        /*关闭遮罩弹窗和图片*/
        closePopUp(){
            this.showPopupStatus = false;
        }
    },
    mounted(){
        this.id = this.$route.params.id;
        this.getData();
    },
    components:{
        uploader
    }


    }
</script>

<style>
    /*售车申报*/
    .error-tips{ position: absolute;  bottom: -1.067rem;  color: red;  text-align: center;  margin: 0 auto;}
    .close-bt-out{position:relative;}
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
    .submit-info-list{
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
    .user-info .left{float:left;width:2.1333rem;}
    .user-info .right{position:relative;float:left;width:7.0667rem;}
    .user-info .right span{position:absolute;bottom:-.5333rem;left: 0.266667rem;color:red;font-size:.2933rem;}
    .user-info .right p{padding-left:.2667rem;font-size:.4rem;}
    .user-info input{
        display:inline-block;
        width:6.866667rem;
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
    .sample-ct{
        overflow:hidden;
        margin-top:0.533333rem;

    }
    .submit-lt{
        width:3.68rem;
        height:4.333333rem;
        float:left;
        margin:0 1.066667rem 0 0.4rem;
    }
    .submit-img{
        width:3.666667rem;
        height:2.773333rem;
        /*overflow:hidden;*/
    }
    .up-btn {
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
    .user-info .user-info-pic{margin-top:.5333rem;width:3.667rem;height:2.773rem;}
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
        font-size:0.453333rem;
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