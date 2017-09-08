<template>
	<div>
		<div class="login-code clearfix">
            <input type="text" v-model="code"  name="code"  @click="checkCode" ref="code">
            <i v-text="codeText" @click="getCode" :class='{"color-disabled":disabled}'></i>
            <span class="login-errror" :class="{fadeIn:errorCode}" v-show="errorCode">请输入正确格式的验证码</span>
        </div>
	    <input class="login-btn" type="button" name="" value="登录" @click="login">
        <p class="login-another" @click="checkNav"><span>账号登录</span></p>
	</div>
</template>
<script>
import MD5 from 'crypto-js/md5';
import hmac from 'crypto-js/hmac-md5';
import Utf8 from 'crypto-js/enc-utf8';
import Base64 from 'crypto-js/enc-base64';
	export default {
		name:'code',
		data () {
		    return {
		      code:"",
		      codeText:"获取验证码",
		      num:60,
		      errorCode:false,
		      disabled:false
		    }
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
		            sessionStorage.telephone = this.$parent.telephone;
		            this.passportCheck();
		          },function(error){

		          }).catch(function (error) {

		          }).finally(function(){
		          	 this.getDataToken();
		          })
		    },
		    passportCheck(){ //登录成功后判断是否已通过注册认证
				this.$http({
		            url:"dealerInfo/idCardAuth?token="+sessionStorage.token,
		            method:"GET"
		        }).then(function (response) {
		        	var code = response.body.data["auth_status"];
		        	if(code == 1){ //已通过认证
		        		this.$router.push('/index');
		        	}else if(code == 3){ //在审核
		        		this.$router.push('/authResult');
		        	}else{
		        		this.$router.push('/auth');
		        	} 
		        	// //路由跳转
		        },function(){

		        });
		    },
		    checkNav(){
		    	 this.$router.push('account'); //路由跳转
		    },
		    getCode(){  //获取验证码
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
		        	this.setCode();
		            //this.$router.push('/index'); //路由跳转
		          },function(error){

		          }).catch(function (error) {

		          }).finally(function(){
		          	 this.getDataToken();
		          });
		    },
		    setCode(){
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
		    },
		    getDataToken(){ //获取dataToken
		    	this.$http({
		            url:"passport/key/notApp",
		            method:"GET"
		        }).then(function (response) {
		            sessionStorage.dataToken = response.body.data.dataToken;
		          }).catch(function (error) {
		          	console.log(error);
		            console.log("登录失败了");
		          });
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
