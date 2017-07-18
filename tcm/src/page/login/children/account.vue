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
// import sha256 from 'crypto-js/sha256';
// import hmacSHA512 from 'crypto-js/hmac-sha512';
// import Base64 from 'crypto-js/enc-base64';

	export default {
		name:'pass',
		data () {
		    return {
		      pass:"",
		      errorPass:false
		    }
		},
		methods:{
			checkTel(){
		      var telExp = /^(1(3|4|5|7|8)[0-9]{1}\d{8})$/;
		        if(telExp.test(this.$parent.telephone)){
		           this.$parent.telError = false;
		         }else{
		           this.$parent.telError = true;
		           console.log("手机号码错误了");
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
		    		console.log("密码错误了");
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
		            password:this.pass
		        };
		        this.$http({
		            url:"passport/login",
		            method:"GET",
		            params:data
		        }).then(function (response) {
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
