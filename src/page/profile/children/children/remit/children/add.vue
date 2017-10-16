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
                        <uploader :uploadData="uploadData1" @getUpload="getUpload"></uploader>              
                    </div>
                    <button class="close-bt" @click="submitPerson">保存并使用</button>
                </div>
            </div>
        </section>
        <alert-tip v-if="showAlert" @closeTip="showAlert = false" :alertText="alertText"></alert-tip>
    </div>
</template>

<script>
    import alertTip from '../../../../../../components/common/alertTip/alertTip'
    import uploader from '../../../../../../components/common/uploader/uploader'
    export default {
        name:'auth',
        data () {
            return {
                //初始数据结构
                acountData:{ //公司账户
                    token:sessionStorage.getItem('token'),
                    pay_company:'',//汇款单位
                    bank_name:'',//账户名称
                    account:''//账号
                },
                personData:{
                    token:sessionStorage.getItem('token'),
                    name:'',//个人名称
                    bank_name:'',//账户名称
                    account:'',//账号
                    explan_path:'' //待付款说明图片
                },
                accountType:true, //切换显示
                uploadData1:{
                    url:"https://tcmapi.emao.com/upload",
                    count:1,
                    flag:"door",
                    image:'static/sample3.jpg'
                },
                dataURL:{},
                showAlert: false, //弹出框
                alertText: null, //弹出信息
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
                var reg = /^[0-9]*$/;
                if(!this.acountData.pay_company){
                    this.showAlert = true;
                    this.alertText = '请填写汇款单位信息';
                    return;
                }
                if(!this.acountData.bank_name){
                    this.showAlert = true;
                    this.alertText = '请填写开户行信息';
                    return;
                }
                if(!this.acountData.account){
                    this.showAlert = true;
                    this.alertText = '请填写汇款账户信息';
                    return;
                }
                if(!reg.test(this.acountData.account)){
                    this.showAlert = true;
                    this.alertText = '汇款账户只能是数字！';
                    return;
                }
                this.$http.post("dealerBank/createBank",this.acountData
                ).then(function (response) {
                    this.$set(this.acountData,{});
                    this.resetIndex();
                }).catch(function (error) {
                    this.showAlert = true;
                    this.alertText = error.body.msg
                });
                
            },
            getUpload(data,flag){
                this.dataURL[flag] = data;
                this.personData.explan_path = data[0];
            },
            submitPerson(){//个人账户
                var reg = /^[0-9]*$/;
                if(!this.personData.name){
                    this.showAlert = true;
                    this.alertText = '请填写姓名信息';
                    return;
                }
                if(!this.personData.bank_name){
                    this.showAlert = true;
                    this.alertText = '请填写银行信息';
                    return;
                }
                if(!this.personData.account){
                    this.showAlert = true;
                    this.alertText = '请填写汇款账户信息';
                    return;
                }
                if(!reg.test(this.personData.account)){
                    this.showAlert = true;
                    this.alertText = '汇款账户只能是数字';
                    return;
                }
                if(!this.personData.explan_path){
                    this.showAlert = true;
                    this.alertText = '请先上传代付款说明照片';
                    return;
                }
                this.$http.post("dealerBank/createPersonBank",this.personData
                ).then(function (response) {
                    this.$set(this.personData,{});
                    this.resetIndex();
                }).catch(function (error) {
                    this.showAlert = true;
                    this.alertText = error.body.msg
                });
            }        
        },
        mounted(){
        //组件初始完成
            
        },
        components:{
            uploader,
            alertTip
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
.account-lt-item{
    border-bottom:1px solid #e0e0e0;
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
.submit-lt{
    margin-left:0.8rem !important;
}
.layer{
    line-height:0.8rem;
    height:0.8rem;
    width:5.333333rem;
    font-size:0.32rem;
    color:#fff;
    text-align:center;
    background:rgba(0,0,0,0.8);
    position:fixed;
    bottom:0.4rem;
    left:50%;
    margin-left:-2.666667rem;
}
</style>
