<template>
    <div class="rating_page">
		<!--头部-->
		<header class="user-tit">
			<a @click="resetIndex" href="javascript:;" class="white-lt"></a>编辑汇款账户
		</header>
        <div class="account-tit">
            <span :class="editData.account_type == '公司账户'? 'active':''" >公司账户</span>
            <span :class="editData.account_type == '公司账户'? '':'active'" >个人账户</span>
        </div>
		<!--编辑汇款账户-->
		<section class="remits-edit" v-if="type == 1">
			<div class="remits-edit-ct">
				<!--<div class="remits-edit-item">
					汇款账户类型：<input type="text" v-model="editData.account_type" disabled="disabled">
				</div>-->
				<div class="remits-edit-item">
					汇款单位：<input type="text" v-model="editData.pay_company">
				</div>
				<div class="remits-edit-item">
					开户银行：<input type="text" v-model="editData.bank_name">
				</div>
				<div class="remits-edit-item">
					汇款账户：<input type="text" v-model="editData.account">
				</div>
			</div>
			<button class="close-bt" @click="acountEdit">保存并使用</button>
		</section>
		<section class="remits-edit" v-else>
			<div class="remits-edit-ct">
				<!--<div class="remits-edit-item">
					汇款账户类型：<input type="text" v-model="editData.account_type" disabled="disabled">
				</div>-->
				<div class="remits-edit-item">
					姓名：<input type="text" v-model="editData.name">
				</div>
				<div class="remits-edit-item">
					银行：<input type="text" v-model="editData.bank_name">
				</div>
				<div class="remits-edit-item">
					汇款账户：<input type="text" v-model="editData.account">
				</div>
                <div class="payment-up">
                    <p class="payment-up-tit">代付款说明</p>
                    <uploader :uploadData="uploadData1" @getUpload="getUpload"></uploader>
                    <!--<div class="voucher-img">
                       <div class="voucher-lt">
                      <img :src="editData.explan_path">
                      </div>
                       <div class="voucher-lt">
                        <img :src="editData.explan_path">
                    </div>
                  </div>-->               
                </div>
			</div>
			<button class="close-bt" @click="personEdit">保存并使用</button>
		</section>
		<alert-tip v-if="showAlert" @closeTip="showAlert = false" :alertText="alertText"></alert-tip>
    </div>
</template>

<script>
	import alertTip from '../../../../../../components/common/alertTip/alertTip'
    import uploader from '../../../../../../components/common/uploader/uploader'
    export default {
        data () {
            return {
	            //初始数据结构
	            editData:{},
	            id:this.$route.params.id,//账户id
	            Token:sessionStorage.getItem('token'),
	            type:null, //账户类型
	            showAlert: false, //弹出框
	            alertText: null, //弹出信息
                uploadData1:{
                      url:"https://tcmapi.emao.com/upload",
                      count:1,
                      flag:"dai",
                      image:'static/sample1.jpg'
                  },
                  dataURL:{
                  },//图片地址
            }
        },
        methods:{
            //组件方法
            resetIndex(){
                this.$router.push({name:'remit'});
            },
              getUpload(data,flag){
                  this.dataURL[flag] = data;
                  this.editData.explan_path=this.dataURL[flag][0];
              },
            acountEdit(){ //保存并使用公司
            	var reg = /^[0-9]*$/;
                if(!this.editData.pay_company){
                    this.showAlert = true;
                    this.alertText = '汇款单位不能为空！';
                    return;
                }
                if(!this.editData.bank_name){
                    this.showAlert = true;
                    this.alertText = '开户行不能为空！';
                    return;
                }
                if(!this.editData.account){
                    this.showAlert = true;
                    this.alertText = '汇款账户不能为空！';
                    return;
                }
                if(!reg.test(this.editData.account)){
                    this.showAlert = true;
                    this.alertText = '汇款账户只能是数字！';
                    return;
                }
	            var data = {
	                token:this.Token,
	                id:this.id,
	                pay_company:this.editData.pay_company,
	                bank_name:this.editData.bank_name,
	                account:this.editData.account
	            }
	            this.$http.post("dealerBank/updateById",data
	            ).then(function (response) {
	                this.resetIndex();
	            }).catch(function (error) {
	                this.showAlert = true;
                    this.alertText = error.body.msg
	            });
            },
            personEdit(){
            	var reg = /^[0-9]*$/;
                if(!this.editData.name){
                    this.showAlert = true;
                    this.alertText = '姓名不能为空！';
                    return;
                }
                if(!this.editData.bank_name){
                    this.showAlert = true;
                    this.alertText = '开户行不能为空！';
                    return;
                }
                if(!this.editData.account){
                    this.showAlert = true;
                    this.alertText = '汇款账户不能为空！';
                    return;
                }
                if(!reg.test(this.editData.account)){
                    this.showAlert = true;
                    this.alertText = '汇款账户只能是数字！';
                    return;
                }
            	var data = {
	                token:this.Token,
	                id:this.id,
	                account_type:this.type,
	                name:this.editData.name,
	                bank_name:this.editData.bank_name,
	                account:this.editData.account,
	                explan_path:this.editData.explan_path
	            }
	            this.$http.post("dealerBank/updatePerson",data
	            ).then(function (response) {
	                this.resetIndex();
	            }).catch(function (error) {
	                this.showAlert = true;
                    this.alertText = error.body.msg
	            });
            }
        },
        mounted(){
        //组件初始完成
            var data = {
                token:this.Token,
                id:this.id
            }
            this.$http({
                url:"dealerBank/detailById",
                method:"GET",
                params:data
            }).then(function (response) {
                this.editData = response.body.data;
                this.type = response.body.data.account_type;
                if(this.editData.account_type == 1){
                	this.editData.account_type = '公司账户'
                }else{
                	this.editData.account_type = '个人账户'
                }
            }).catch(function (error) {
                this.showAlert = true;
                this.alertText = error.body.msg
            });
        },
        components:{
            //uploader,
            alertTip,
            uploader,
        }
    }   
</script>

<style>
.rating_page{
   position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow-y: scroll;
    background-color: #f5f5f5;
    width:10.0rem;
    z-index: 203;
}
/*编辑汇款账*/
.remits-edit-ct{
	background:#fff;
	overflow:hidden;
}
.remits-edit-item{
	margin:0 0.4rem;
	padding:0.533333rem 0;
	border-bottom:1px solid #eee;
	font-size:0.4rem;
}
.remits-edit-item input{
	display:inline-block;
	width:6.4rem;
	border:none;
	background:#fff;
}
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
.voucher-img{
  overflow:hidden;
  padding:0 0.4rem 0.533333rem 0.4rem;
}
.voucher-lt{

  width:3.666667rem;
  height:2.8rem;
  overflow:hidden;
  float:left;
  margin:0 0.466667rem;
  margin-bottom: 0.4rem;
}
.voucher-lt img{
  width:100%;
  height:100%;
}
.payment-up-tit{
    padding: 0.4rem 0.4rem 0 0.4rem;
    font-size: 0.4rem;
}
</style>
