<template>
	<div class="invitation2">
		<header class="brand-list-header header-fixed" v-show="">
			<i class="white-lt brand-left-cion"></i> 
			<strong class="brand-list-title">邀请好友</strong>
		</header>
		<div class="invitation2in">
			<div class="rule_btn" @click="ruleShow"></div>
		</div>
		
		<ul class="share">
			<li @click="shortMessage"></li>
			<li @click="QRcodeShow"></li>
			<li @click="showShareDialog"></li>
		</ul>
		<div class="lookRecord" @click="lookRecord"></div>
		<div class="QRcode_pop" @click="QRcodeHide" v-show="QRcode">
			<img :src="QRcodeUrl"/>
		</div>
		<div class="frame" v-show="rule">
			<div class="rule_pop">
				<span class="clone" @click="ruleHide"></span>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data () {
		    return{
		    	token:'',
		    	QRcode:false,
		    	QRcodeUrl:'',
		    	rule:false,
		    	activityId:''
		    }
		},
		methods:{
			tcmApp(obj){ //app跳转
            	if (navigator.userAgent.indexOf("iPhone") > 0) {
	            	window.webkit.messageHandlers.tcmAppObject.postMessage(obj);//IOS
	            }
	            else {
	            	window.tcmAppObject.postMessage(JSON.stringify(obj));//Android
	            }
            },
            lookRecord(){
            	// this.$router.push({name:'record',query:{token:this.token,activityId:this.activityId}});
            	var that=this;
            	var obj = {
			        actionname: "windowOpen",//Native 函数名称：必填，Native 提供给 JS 的可用函数的函数名称
			        url: 'https://tcm.m.emao.com//#/invitation/record?&activityId='+that.activityId
			    };
				that.tcmApp(obj);
            },
            QRcodeShow(){
            	var data={
            		token:this.token,
            		activityId:this.activityId,
            		requestType:0,
            		invitedType:2
            	}
            	this.$http({
		            url:"link/createLink",
		            method:"GET",
		            params:data
		        }).then(function (response) {
		            this.QRcodeUrl = response.body.data.url;
		            this.QRcode=true;
		          },function(error){

		          })
            },
            QRcodeHide(){
            	this.QRcode=false;
            },
            ruleShow(){
            	this.rule=true;
            },
            ruleHide(){
            	this.rule=false;
            },
            shortMessage(){//短信
            	window.location = 'emaotaochemao://push/messageinvite?activityid='+this.activityId;
            },
            showShareDialog(){//更多
            	var data={
	        		token:this.token,
	        		activityId:this.activityId,
	        		requestType:1,
	        		invitedType:3
	        	}
	        	this.$http({
		            url:"link/createLink",
		            method:"GET",
		            params:data
		        }).then(function (response) {
		            let url = response.body.data.url;
		            let userName=response.body.data.userName;
		            let couponPrice=response.body.data.couponPrice;
		            var obj = {
				        actionname:"showShareDialog",//Native 函数名称：必填，Native 提供给 JS 的可用函数的函数名称
				        actionid:"messageId",//回调 ID：可选参数，与回调函数配套使用
				        title:"汽车经销商的机会来了，你还不抓紧上车？来自好友的邀请。",
				        subTitle:'你的好友“'+userName+'”邀请你一起加入车商猫，送你'+couponPrice+'元购物优惠券',
				        imgUrl:'https://zt.m.emao.com/img/shareApp.png',
				        url:url//要分享内容的 url
				    };
				    this.tcmApp(obj);
		          },function(error){

		          })
            	
            }
		},
		mounted(){
			//组件初始化
			this.token = this.$route.query.token||sessionStorage.token;
			this.activityId = this.$route.query.activityId;  
			document.title='邀请好友';
		}
	}

</script>
<style>
html,body{
	height: 100%;
	width: 100%;
	background: #241e2a;
}

.invitation2{
	width:100%;
	height:16.08rem;
	background: #241e2a;
	margin: auto;
}
.invitation2in{
	width:100%;
	height:10.693333rem;
	background: url(../../assets/zc_02.png) no-repeat;
	background-size:100%;
	position: relative;
	margin: auto;
}
.rule_btn{
	position:absolute;
	right: 0;
	width:2rem;
	height: 2rem;
	top:0.55rem;
	cursor: pointer;
}
.share{
	background: red;
	width:10rem;
	height:3.0rem;
	background: url(../../assets/zc_03.png) no-repeat;
	background-size:100%;
}
.share li{
	width:2rem;
	height: 2rem;
	margin-left:1rem;
	float: left;
	cursor: pointer;
}
.lookRecord{
	width:10rem;
	height:2.36rem;
	background: url(../../assets/zc_04.jpg) no-repeat;
	background-size:100%;	
}
.QRcode_pop{
	position: fixed;
	top:0;
	left:0;
	width:100%;
	height: 16.08rem;
	background: url('../../assets/QRcode.png') rgba(0,0,0,0.6);
	background-size:100%;
}
.QRcode_pop img{
	width:4.75rem;
	height:4.75rem;
	position: absolute;
	top:6.5rem;
	left:2.6rem;
}
.frame{
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0;
	left: 0;
	overflow-y:scroll; 
	padding: 1rem 0;
	box-sizing: border-box;
	background: rgba(0,0,0,0.6);
}
.rule_pop{
	width:9.28rem;
	height:14.253333rem;
	background: url(../../assets/zc_05.png) no-repeat;
	background-size:100%; 
	margin: 0  auto;
	position: relative;
}
.clone{
	display: block;
	width: 1.066667rem;
	height: 1.066667rem;
	position: absolute;
	right: -0.266667rem;
	top: -0.366667rem;
	background: url(../../assets/zc_06.png) no-repeat;
	background-size:100%;
}
</style>