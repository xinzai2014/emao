<template>
    <div class="rating_page">
		<!--头部-->
        <header class="user-tit">
            <a @click="resetIndex" href="javascript:;" class="white-lt"></a>新增汇款账户
        </header>
        <!--新增汇款账户-->
        <section class="account-wrap">
            <div class="account-tit">
                <span :class="accountType? 'active':''" @click="accountShow(false)">公司账户</span>
                <span :class="accountType? '':'active'" @click="accountShow(true)">个人账户</span>
            </div>
            <div class="account-ct">
                <!--公司账户 -->
                <div class="account-lt account-info"  v-show="accountType">
                    <div class="account-lt-item">
                        <label>汇款单位：</label>
                        <input type="text" v-model="acountData.pay_company">
                    </div>
                    <div class="account-lt-item">
                        <label>开户行：</label>
                        <input type="text" v-model="acountData.bank_name">
                    </div>
                    <div class="account-lt-item">
                        <label>汇款账户：</label>
                        <input type="text" v-model="acountData.account">
                    </div>
                    <button class="close-bt" @click="submitAcount">保存并使用</button>
                </div>
                <!--个人账户 -->
                <div v-show="!accountType" class="account-rt account-info">
                    <div class="account-lt-item">
                        <label>姓名：</label>
                        <input type="text" v-model="personData.name">
                    </div>
                    <div class="account-lt-item">
                        <label>银行：</label>
                        <input type="text" v-model="personData.bank_name">
                    </div>
                    <div class="account-lt-item">
                        <label>汇款账户：</label>
                        <input type="text" v-model="personData.account">
                    </div>
                    <div class="payment-up">
                        <p class="payment-up-tit">代付款说明</p>
                        <div class="payment-lt">
                            <div class="payment-img"><img src="../../../../../../assets/up-bg.jpg"></div>
                            <p class="up-btn">上传</p>
                            <input type="hidden" v-model="personData.account" >
                        </div>
                        <div class="payment-rt">
                            <div class="payment-img"><img src="../../../../../../assets/up-bg1.jpg"></div>
                        </div>
                    </div>
                    <button class="close-bt" @click="submitPerson">保存并使用</button>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                //初始数据结构
                acountData:{ //公司账户
                    token:sessionStorage.getItem('token'),
                    pay_company:'',//汇款单位
                    bank_name:'',//账户名称
                    account:'',//账号
                },
                personData:{
                    token:sessionStorage.getItem('token'),
                    name:'',//个人名称
                    bank_name:'',//账户名称
                    account:'',//账号
                    explan_path:'String' //待付款说明图片
                },
                accountType:true, //切换显示
            }
        },
        methods:{
            //组件方法
            resetIndex(){
                this.$router.push({name:'remit'});
            },
            accountShow(type){
                if(type){
                    this.accountType = false
                }else{
                    this.accountType = true
                }
            },
            submitAcount(){//公司账户
                this.$http.post("dealerBank/createBank",this.acountData
                ).then(function (response) {
                    this.$set(this.acountData,{});
                    this.resetIndex();
                }).catch(function (error) {
                    console.log("请求失败了");
                });
            },
            submitPerson(){//个人账户
                this.$http.post("dealerBank/createPersonBank",this.personData
                ).then(function (response) {
                    this.$set(this.acountData,{});
                    this.resetIndex();
                }).catch(function (error) {
                    console.log("请求失败了");
                });
            }
        },
        mounted(){
        //组件初始完成需要做什么
            
        }
    }   
</script>

<style>
/*新增汇款账*/
.account-tit{
    overflow:hidden;
    background:#fff;
}
.account-tit span{
    display:block;
    float:left;
    width:5.0rem;
    height:1.453333rem;
    border-bottom:1px solid #e0e0e0;
    font-size:0.4rem;
    color:#e0e0e0;
    text-align:center;
    line-height:1.453333rem;
}
.account-tit span.active{
    border-color:#2c2c2c;
    color:#2c2c2c;
}
.account-lt-item,.payment-up-tit{
    padding:0.533333rem 0.4rem;
    font-size:0.4rem;
    background:#fff;
}
.account-lt-item label{
    width:2.0rem;
}
.account-lt-item input{
    display:inline-block;
    width:6.666667rem;
    border:none;
    line-height:0.4rem;
}
.payment-up{
    background:#fff;
    overflow:hidden;
}
.payment-lt{
    height:4.8rem;
    width:3.666667rem;
    float:left;
    margin:0 1.04rem 0 0.8rem;
}
.payment-img{
    width:3.666667rem;
    height:2.773333rem;
    overflow:hidden;
}
.payment-img img{
    width:100%;
    height:100%;
}
.up-btn{
    width:2.64rem;
    height:1.053333rem;
    line-height:1.053333rem;
    border:1px solid #d6ab55;
    border-radius:0.533333rem;
    font-size:0.373333rem;
    color:#bb8800;
    margin:0.4rem 0;
    text-align:center;
}
.payment-rt{
    float:left;
    width:3.666667rem;
    height:2.773333rem;
}

</style>
