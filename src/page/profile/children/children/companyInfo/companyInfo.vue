<template>
	<div class="rating_page" v-if="load">
		<header class="user-tit">
			<a href="javascript:;" class="white-lt" @click="goback"></a>公司信息
		</header>
		<div class="details-tit" v-if="data_status">
            <h4>审核中</h4>
        </div>
		<section class="user-ct">
            <div class="user-bt"><span>{{info.auth_data.name}}</span>公司名称：</div>
            <div class="user-bt"><span>{{info.auth_data.address}}</span>公司地址：</div>
            <div class="user-bt"><span>{{info.auth_data.manager_name}}</span>总经理姓名：</div>
            <div><span>{{info.auth_data.manager_phone}}</span>总经理电话：</div>

            <div class="user-bt"><span>{{info.auth_data.activities}}</span>经营类型：</div>
            <div class="user-bt">
              <p class="userAuth-list">
                <span v-if="!info.auth_data.brand_auth.length">无</span>
                <ul v-else v-for="(item,index) in info.auth_data.brand_auth">
                  <li><em>{{item.brand_name}}</em><em>{{item.level}}</em></li>
                </ul>
              </p>
	            厂家授权品牌及级别：
            </div>
            <div><span>{{info.auth_data.repair_place}}</span>维修许可：</div>

            <div class="user-bt"><span>{{info.auth_data.qualification.legalPerson}}</span>法人姓名：</div>
            <div class="user-bt"><span>{{info.auth_data.qualification.bankName}}</span>企业开户行：</div>
            <div class="user-bt"><span>{{info.auth_data.qualification.bankNumber}}</span>企业银行账号：</div>
            <div class="user-bt"><span>{{info.auth_data.qualification.TIN}}</span>纳税识别号：</div>
            <!--<div><span>{{info.auth_data.qualification.generalTaxpayer}}</span>一般納稅人：</div>-->
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
            	data_status:false,
            	load:false
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
		     	info.auth_data.activities=info.auth_data.activities.replace('1','合资').replace('2','自主').replace('3','豪华');
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
		     	if('generalTaxpayer' in info.auth_data.qualification){
		     		info.auth_data.qualification.generalTaxpayer='是';
		     	}
		     	if(info.auth_data.repair_place!=''||info.auth_data.road_license!=''){
		     		info.auth_data.repair_place="具备";
		     	}else{
		     		info.auth_data.repair_place="不具备";
		     	}
		        this.info=info;
		        this.load=true;
		      }).catch(function (error) {
		        //this.showAlert = true;
		        //this.alertText = error.body.msg||"请求失败了";
		      });

		      //资料是否齐全
		    this.$http({
		        url:"dealerInfo/dataStatus",
		        method:"GET",
		        params:data
		     }).then(function (response) {
		        if(response.body.data.data_status=="3"){
		            this.data_status=true;
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

.userAuth-list{
  float:right;
  width: 40%;
}

.userAuth-list li{
  padding-bottom:0.2667rem;
}
	.user-bt ul{
		color: #999;
		font-size: 0.346667rem;
	}
	.user-bt ul li em{
		width:50%;
    display: inline-block;
	}
.user-bt ul li em:nth-of-type(2){
  text-align:right;
}

.user-bt ul:last-of-type li{
  padding-bottom:0;
}
</style>
