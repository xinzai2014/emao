<template>
	<div>
		<div class="login-code clearfix">
            <input type="text" v-model="code"  name="code"  @click="checkCode" ref="code">
            <i v-text="codeText" @click="getCode" :class='{"color-disabled":disabled}'></i>
            <span class="login-errror" :class="{fadeIn:errorCode}" v-show="errorCode">请输入正确格式的验证码</span>
        </div>
	    <input class="login-btn" type="text" name="" value="登录" @click="login">
        <p class="login-another" @click="checkNav"><span>账号登录</span></p>
        <alert-tip v-if="showAlert" @closeTip = "showAlert = false" :alertText="alertText"></alert-tip>
	</div>
</template>
<script>
import MD5 from 'crypto-js/md5';
import hmac from 'crypto-js/hmac-md5';
import Utf8 from 'crypto-js/enc-utf8';
import Base64 from 'crypto-js/enc-base64';
import alertTip from '../../../components/common/alertTip/alertTip'
	export default {
		name:'code',
		data () {
		    return {
		      code:"",
		      codeText:"获取验证码",
		      num:60,
		      errorCode:false,
		      disabled:false,
		      showAlert:false,  //错误弹出窗
		      alertText:null //错误提醒信息
		    }
		},
		components:{
	    	alertTip
	    },
		methods:{
			codeToMD5(passwordWord){
				var password = passwordWord;
				var passwordMD5 = MD5(password);  //对象类型
				var passwordHash = hmac(passwordMD5.toString(),sessionStorage.dataToken); //转换成字符串在加密
				var passwordBase64 = Base64.stringify(Utf8.parse(passwordHash));  //先进行utf-8编码再进行base64
				return passwordBase64;
			},
			checkTel(){
		      var telExp = /^(1(3|4|5|7|8)[0-9]{1}\d{8})$/;
		        if(telExp.test(this.$parent.telephone)){
		           this.$parent.telError = false;
		         }else{
		           this.$parent.telError = true;
		           console.log("手机号码错误了");
		           this.$parent.$refs.telephone.focus();
		           setTimeout(()=>{
		           		this.$parent.telError = false;
		           },1500);
		           return false;
		         }
		         return true;
		    },
			checkCode(){
				var codeExp = /^[a-zA-Z0-9]{6}$/;
		    	if(codeExp.test(this.code)){
		    		this.errorCode = false;
		    	}else{
		    		this.errorCode = true;
		    		setTimeout(()=>{
		           		this.errorCode = false;
		           },1500);
		    		this.$refs.code.focus();
		    		return false;
		    	}
		    	return true;
			},
		    login(){
		    	if(!this.checkTel()) return "";
				if(!this.checkCode()) return "";
		    	if(this.$parent.telError || this.errorCode){
		    		return false;
		    	}
		         var data = {
		            phone:this.$parent.telephone,//获取父组件实例
		            code:this.codeToMD5(this.code),
		            dataToken:sessionStorage.dataToken
		         };
		        this.$http({
		            url:"passport/codeLogin",
		            method:"GET",
		            params:data
		        }).then(function (response) {
		            sessionStorage.token = response.body.data.token;
		            this.$router.push('/index'); //路由跳转
		          },function(error){
		          	this.showAlert = true;
		          	this.alertText = error.body.msg;
		          }).catch(function (error) {

		          });
		    },
		    checkNav(){
		    	 this.$router.push('account'); //路由跳转
		    },
		    getCode(){
		    	if(this.disabled){
		    		return false;
		    	};
		    	if(!this.checkTel()) return "";
		    	this.$http({
		            url:"message/login",
		            type:"GET",
		            params:{
			            	dataToken:sessionStorage.dataToken,
			            	phone:this.$parent.telephone
			            	},
		        }).then(function (response) {
		        	console.log(response);
		            //this.$router.push('/index'); //路由跳转
		          },function(error){
		          	console.log(error);
		          }).catch(function (error) {
		          	console.log(error);
		          });
		    	this.codeText = this.num+"s后重新获取";
		    	this.disabled = true;
		    	var that = this;
		    	window.timer = window.setInterval(()=>{
		    		that.num--;
		    		that.codeText = this.num+"s后重新获取";
		    		this.disabled = true;
		    		if(!this.num){
		    			this.codeText = "重新获取";
		    			this.num = 60;
		    			this.disabled = false;
		    			window.clearInterval(window.timer);
		    			return false;
		    		}
		    	},1000);
		    }
	    },
	    beforeRouteEnter (to, from, next) {
	    	next();
	    },
	    beforeRouteLeave (to, from, next) {
		    window.clearInterval(window.timer);
	    	next();
	  }
	}

</script>
