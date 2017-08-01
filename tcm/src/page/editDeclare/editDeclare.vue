<template>
    <div>
        <!--头部-->
        <header class="user-tit">
            <router-link to="/declare">
                <a href="javascript:;" class="white-lt"></a>
            </router-link>
            提交申报资料
        </header>
        <!--提交申报资料-->
        <section class="submit-wrap">
            <div class="sales-item">
                <h3>{{orderInfo.name}}</h3>
                <p class="sales-color">{{orderInfo.color}}</p>
                <p class="submit-number">VIN：{{orderInfo.vinNumber}}</p>
            </div>
            <div class="submit-info">
                <div class="user-info">
                    客户姓名：<input type="text" placeholder="请填写买车用户姓名" v-model="dealerNameVal">
                </div>
                <div class="user-info">
                    客户电话：<input type="text" placeholder="请输入手机号码" v-model="dealerPhoneVal">
                </div>
                <div class="user-info">
                    身份证号：<input type="text" placeholder="请输入有效的身份证号码" v-model="dealerIDNumberVal">
                </div>
                <div class="user-info">
                    电子邮箱：<input type="text" placeholder="请输于邮箱地址" v-model="dealerEmailVal">
                </div>
            </div>
            <div class="submit-info">
                <div class="user-info">
                    <p class="submit-tit">请上传以下资料</p>
                </div>
                <div class="user-info">
                    <p class="user-info-tit">身份证正面照片</p>
                    <uploader :uploadData="uploadData1" @getUpload="getUpload"></uploader>


                </div>
                <div class="user-info">
                    <p class="user-info-tit">身份证背面照片</p>
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
                <div class="close-bt-out">
                    <button class="close-bt" @click="submitData">提交</button>
                    <p class="error-tips">{{errorTips}}</p>
                </div>

            </div>
        </section>

    </div>
</template>

<script>
    import uploader from '../../components/common/uploader/uploader'
    export default{
        name:"editDeclare",
        data(){
        return {
            orderId:null,
            dealerNameVal:'',
            dealerPhoneVal:'',
            dealerIDNumberVal:'',
            dealerEmailVal:'',
            goodsStockId:'',
            vinNum:'',
            errorTips:'',
            declareList:[],
            orderInfo : {},

            uploadData1:{
                url:"https://tcmapi.emao.com/upload",
                count:1,
                flag:"dealerName"
            },
            uploadData2:{
                url:"https://tcmapi.emao.com/upload",
                count:1,
                flag:"dealerPhone"
            },
            uploadData3:{
                url:"https://tcmapi.emao.com/upload",
                count:1,
                flag:"dealerIDNumber"
            },
            uploadData4:{
                url:"https://tcmapi.emao.com/upload",
                count:1,
                flag:"dealerEmail"
            },
            dataURL:{},

            formData:{
                token:"02fb128629f0bdb87489a18be9fdd289",
                //token:sessionStorage.token,
                order_num:'',
                goods_stock_id:'',
                name:'',
                phone:'',
                idcard:'',
                email:'',

                idcard_img_front:'',
                idcard_img_reverse:'',
                driving_license_img:'',
                invoice_img:''
            },

        }
    },
    methods:{
        //初始化拿数据
        //初始化拿数据
        getData(){
            //var token = sessionStorage.token;
            var token = "02fb128629f0bdb87489a18be9fdd289";
            this.$http({
                url:"order/full/detail",
                method:"GET",
                params:{
                    token:token,
                    order_num:this.orderId
                }
            }).then(function(response){
                this.orderInfo = response.body.data.orderInfo;
                this.vinNum = this.orderInfo.vinNumber;
            })
        },

        getUpload(data,flag){
            this.dataURL[flag] = data;
        },

        getFileURL(flag) {
            if (flag in this.dataURL && this.dataURL[flag].length > 0 ) {
                return this.dataURL[flag][0];
            } else {
                return '';
            }
        },


        submitData(){
            this.formData.order_num = this.vinNum;
            this.formData.goods_stock_id = this.goodsStockId;
            this.formData.name = this.dealerNameVal;
            this.formData.phone = this.dealerPhoneVal;
            this.formData.idcard = this.dealerIDNumberVal;
            this.formData.email = this.dealerEmailVal;


            this.formData.idcard_img_front = this.getFileURL('dealerName');
            this.formData.idcard_img_reverse = this.getFileURL('dealerPhone');
            this.formData.driving_license_img = this.getFileURL('dealerIDNumber');
            this.formData.invoice_img = this.getFileURL('dealerEmail');


            this.$http.post("order/sale/info",this.formData).then(function(response){
                console.log(response);
                this.$router.push('/declare');//跳转到售车申报列表页
            }).catch(function(error){
                console.log("请求失败");
                console.log(error);
                this.errorTips = error.body.msg;
            })
        }

    },
    mounted(){
        this.orderId = this.$route.params.id;
        this.goodsStockId = this.$route.query.goods_stock_id;
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
    }
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
    .user-info img{
        width:100%;
        height:100%;
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
</style>