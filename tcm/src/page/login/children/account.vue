<template>
	<div>
		<div class="login-phone">
	      <input type="password" placeholder="密码" v-model="pass" @input="checkPass" > 
	      <span class="login-errror" v-show="errorPass">请输入密码</span>
	    </div>
	    <input class="login-btn" type="text" name="" value="登录" @click="login">
        <p class="login-another" @click="checkNav"><span>验证码登录</span></p>
	</div>
</template>
<script>
import MD5 from 'crypto-js/md5';
import hmac from 'crypto-js/hmac-md5';
import Base64 from 'crypto-js/enc-base64';


	export default {
		name:'pass',
		data () {
		    return {
		      pass:"",
		      errorPass:false
		    }
		},
		mounted(){
		    //组件初始完成需要做什么
		    this.passwordToMD5("13012345602")

		  },
		methods:{
			passwordToMD5(passwordWord){
				var password = passwordWord;
				console.log("原始密码：" + password);
				var passwordMD5 = MD5(password); 
				console.log("MD5后：" +passwordMD5);
				var passwordHash = hmac(passwordMD5,"yyxyE1ygvJ8beuKx");
				console.log("hmac后：" +passwordHash);
				var passwordBase64 =  passwordHash.toString(Base64);
				console.log("base64后：" +passwordBase64);
				return passwordBase64;
			},
			checkTel(){
		      var telExp = /^(1(3|4|5|7|8)[0-9]{1}\d{8})$/;
		        if(telExp.test(this.$parent.telephone)){
		           this.$parent.telError = false;
		         }else{
		           this.$parent.telError = true;
		           return false;
		         }
		         return true;
		    },
			checkPass(){
				var passExp = /^[a-zA-Z0-9]{6}$/;
		    	if(passExp.test(this.pass)){
		    		this.errorPass = false;
		    	}else{
		    		this.errorPass = true;
		    		return false;
		    	}
		    	return true;
			},
		    login(){
		    	this.checkTel();
		    	this.checkPass();
		    	if(this.$parent.telError || this.errorPass){
		    		return false;
		    	}
		        var data = {
		        	dataToken:sessionStorage.dataToken,
		            phone:this.$parent.telephone,//获取父组件实例
		            password:this.passwordToMD5(this.pass)
		        };
		        this.$http({
		            url:"passport/login",
		            method:"GET",
		            params:data
		        }).then(function (response) {
		            sessionStorage.dataToken = response.body.data.dataToken;
		            sessionStorage.phone = response.body.data.phone;
		            sessionStorage.token = 'bbe214ab570d81dc8b1b6589d86e13d9';
		            this.$router.push('/index'); //路由跳转
		          },function(error){
		          	console.log(error);
		            console.log("登录失败了");
		          }).catch(function (error) {
		          	console.log(error);
		            console.log("登录失败了");
		          });
		    },
		    checkNav(){
		    	 this.$router.push('code'); //路由跳转
		    }
	    }
	}
</script>