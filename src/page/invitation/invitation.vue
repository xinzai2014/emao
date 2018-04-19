<template>
	<div class="invitation2">
		<div class="rule_btn" @click="ruleShow"></div>
		<ul class="share">
			<li @click=""></li>
			<li @click="QRcodeShow"></li>
			<li @click=""></li>
		</ul>
		<div class="lookRecord" @click="lookRecord"></div>
		<div class="QRcode_pop" @click="QRcodeHide" v-show="QRcode">
			<img :src="QRcodeUrl"/>
		</div>
		<div class="rule_pop" @click="ruleHide"  v-show="rule">
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
		    	rule:false
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
            couponFun(){
            	window.location = encodeURI('emaotaochemao://push/answerquestion?companyname='+encodeURIComponent(this.companyName)+'&linkname='+encodeURIComponent(this.linkName)+'&identity='+encodeURIComponent(this.identity));
            	
            },
            lookRecord(){
            	this.$router.push({name:'record'});
            },
            QRcodeShow(){
            	this.QRcode=true;
            },
            QRcodeHide(){
            	this.QRcode=false;
            },
            ruleShow(){
            	this.rule=true;
            },
            ruleHide(){
            	this.rule=false;
            }

		},
		mounted(){
			//组件初始化
			this.token = this.$route.query.token||sessionStorage.token;
	        
		}
	}

</script>
<style>
html,body{
	height: 100%;
}
.invitation2{
	width:100%;
	height:100%;
	background: url(../../assets/invitation.jpg) no-repeat #241e2a;
	background-size:100%;
	position: relative;
}
.rule_btn{
	position:absolute;
	right: 0;
	width:1rem;
	height: 1rem;
	top:0.55rem;
}
.share{
	position: absolute;
	top:11.1rem;
}
.share li{
	width:2rem;
	height: 2rem;
	margin-left:1rem;
	float: left;
}
.lookRecord{
	position: absolute;
    top: 14.2rem;
    width: 4rem;
    height: 1rem;
    left: 3rem;
}
.QRcode_pop{
	position: fixed;
	top:0;
	left:0;
	width:100%;
	height: 100%;
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
.rule_pop{
	position: fixed;
	top:0;
	left:0;
	width:100%;
	height: 100%;
	background: url('../../assets/rule.png') rgba(0,0,0,0.6);
	background-size:100%;
}
</style>