<template>
	<div class="rating_page">
		<header class="user-tit">
			<a href="javascript:;" class="white-lt" @click="goback"></a>公司信息
		</header>
		<div class="details-tit" v-if="status">
            <h4>审核中</h4>
        </div>
		<section class="user-ct">
            <div class="user-bt"><span>{{info.auth_data.name}}</span>公司名称：</div>
            <div class="user-bt"><span>{{info.auth_data.address}}</span>公司地址：</div>
            <div class="user-bt"><span>{{info.auth_data.manager_name}}</span>总经理姓名：</div>
            <div><span>{{info.auth_data.manager_phone}}</span>总经理电话：</div>

            <div class="user-bt"><span>{{info.auth_data.activities}}</span>经营类型：</div>
            <div class="user-bt" v-if="info.auth_data.brand_auth">
            	<ul v-for="(item,index) in info.auth_data.brand_auth">
		            <li><em>{{item.brand_name}}</em>{{item.level}}</li>
	            </ul>
	            厂家授权品牌及级别：
            </div>
            <div><span>{{info.auth_data.repair_place}}</span>维修许可：</div>

            <div class="user-bt"><span>{{info.auth_data.qualification.legalPerson}}</span>法人姓名：</div>
            <div class="user-bt"><span>{{info.auth_data.qualification.bankName}}</span>企业开户行：</div>
            <div class="user-bt"><span>{{info.auth_data.qualification.bankNumber}}</span>企业银行账号：</div>
            <div><span>{{info.auth_data.qualification.TIN}}</span>纳税识别号：</div>
        </section>
	</div>
</template>
;
<script>
    export default {
        data () {
            return {
            	oneInfo:{},
            	info:{},
            	status:false
            }
        },
        methods:{
        	goback(){
        		this.$router.go(-1);
        	}
        },
        mounted(){
        	var dataToken = sessionStorage.token;
		    var data = {
		        token:dataToken
		    }
		    this.$http({
		        url:"dealerInfo/idCardAuth",
		        method:"GET",
		        params:data
		     }).then(function (response) {
		     	this.oneInfo=response.body.data;
		     	var info=response.body.data;
		     	if(info.auth_data.activities.indexOf('1')){
		     		info.auth_data.activities='合资';
		     	}
		     	if(info.auth_data.activities.indexOf('2')){
		     		info.auth_data.activities=info.auth_data.activities+',自主';
		     	}
		     	if(info.auth_data.activities.indexOf('3')){
		     		info.auth_data.activities=info.auth_data.activities+',豪华';
		     	}
		     	if(info.auth_data.brand_auth){
		     		for(var i=0;i<info.auth_data.brand_auth.length;i++){
			     		if(info.auth_data.brand_auth[i].level=='1'){
			     			info.auth_data.brand_auth[i].level="一级代理";
			     		}
			     		if(info.auth_data.brand_auth[i].level=='2'){
			     			info.auth_data.brand_auth[i].level="二级代理";
			     		}
			     	}
		     	}
		        this.info=info; 
		        if(this.info.auth_status=="3"){
		        	this.status=true;
		        }
		      }).catch(function (error) {
		        //this.showAlert = true;
		        //this.alertText = error.body.msg||"请求失败了";
		      });

        }
    }   
</script>

<style>
.details-tit {
    padding: 0.533333rem 0.4rem;
    background: #d5aa5c;
}
.details-tit h4 {
    font-size: 0.506667rem;
    color: #fff;
    line-height: 0.533333rem;
}
	.user-bt ul{
		float: right;
		color: #999;
		font-size: 0.346667rem;
	}
	.user-bt ul li em{
		margin-right:0.2rem;
	}
</style>