<template>
    <div class="rating_page">
		<!--头部-->
		<header class="user-tit">
			<a @click="resetIndex" href="javascript:;" class="white-lt"></a>编辑汇款账户
		</header>
		<!--编辑汇款账户-->
		<section class="remits-edit" v-if="type == 1">
			<div class="remits-edit-ct">
				<div class="remits-edit-item">
					汇款账户类型：<input type="text" v-model="editData.account_type" disabled="disabled">
				</div>
				<div class="remits-edit-item">
					汇款单位：<input type="text" v-model="editData.pay_company">
				</div>
				<div class="remits-edit-item">
					开户行：<input type="text" v-model="editData.bank_name">
				</div>
				<div class="remits-edit-item">
					汇款账户：<input type="text" v-model="editData.account">
				</div>
			</div>
			<button class="close-bt" @click="acountEdit">保存并使用</button>
		</section>
		<section class="remits-edit" v-else>
			<div class="remits-edit-ct">
				<div class="remits-edit-item">
					汇款账户类型：<input type="text" v-model="editData.account_type" disabled="disabled">
				</div>
				<div class="remits-edit-item">
					个人名称：<input type="text" v-model="editData.name">
				</div>
				<div class="remits-edit-item">
					开户行：<input type="text" v-model="editData.bank_name">
				</div>
				<div class="remits-edit-item">
					汇款账户：<input type="text" v-model="editData.account">
				</div>
				<!-- <div class="remits-edit-item">
					待付款说明：<input type="text" v-model="editData.explan_path">
				</div> -->
			</div>
			<button class="close-bt" @click="personEdit">保存并使用</button>
		</section>
    </div>
</template>

<script>
    export default {
        data () {
            return {
              //初始数据结构
              editData:{},
              id:this.$route.params.id,//账户id
              Token:sessionStorage.getItem('token'),
              type:null //账户类型
            }
        },
        methods:{
            //组件方法
            resetIndex(){
                this.$router.push({name:'remit'});
            },
            acountEdit(){ //保存并使用公司
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
	                console.log("请求失败了");
	            });
            },
            personEdit(){
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
	                console.log("请求失败了");
	            });
            }
        },
        mounted(){
        //组件初始完成需要做什么
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
                console.log("请求失败了");
            });
        }
    }   
</script>

<style>
.rating_page{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
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
</style>
