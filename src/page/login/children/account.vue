<template>
	<div>
		<div class="login-phone">
	      <input type="password" placeholder="密码" v-model="pass" maxlength="20" ref="password">
	      <span class="login-errror" :class="{fadeIn:errorPass}" v-show="errorPass">请输入密码</span>
	    </div>
	    <input class="login-btn" type="button" name="" value="登录" @click="login">
        <p class="login-another" @click="checkNav"><span>验证码登录</span></p>
        <section class="login-popup" v-show="showPasswordDialog">
	        <!--密码多次输入错误-->
	        <div class="login-failure">
	            <div class="login-failure-in">
	                <p class="login-tip">密码多次输入错误</p>
	                <p class="login-by-code">您可以先用验证码登录</p>
	                <p class="login-set-password">登录重新设置密码</p>
	            </div>
	            <p class="login-choose clearfix">
	                <span @click="closePasswordDialog">我再试试</span>
	                <span class="active" @click="checkNav">验证码登录</span>
	            </p>
	        </div>
	    </section>
	</div>
</template>
<script>
import MD5 from 'crypto-js/md5';
import hmac from 'crypto-js/hmac-md5';
import Utf8 from 'crypto-js/enc-utf8';
import Base64 from 'crypto-js/enc-base64';

	export default {
		name:'pass',
		data () {
		    return {
		      pass:"",
		      errorPass:false,
		      showPasswordDialog:false, //三次输错密码提示框
		      errorPasswordCount:0
		    }
		},
		mounted(){
		    this.getDataToken();
			// 100服务器用户名密码 13522641774 000000
		  },
		methods:{
			passwordToMD5(passwordWord){
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
		           setTimeout(()=>{
		           		this.$parent.telError = false;
		           },1500);
		           this.$parent.$refs.telephone.focus();
		           return false;
		         }
		         return true;
		    },
			checkPass(){
				var passExp = /^[a-zA-Z0-9]+$/;
		    	if(passExp.test(this.pass)){
		    		this.errorPass = false;
		    	}else{
		    		this.errorPass = true;
		    		setTimeout(()=>{
		           		this.errorPass = false;
		           },1500);
		    		this.$refs.password.focus();
		    		return false;
		    	}
		    	return true;
			},
		    login(){
		    	if(!this.checkTel()) return "";
				if(!this.checkPass()) return "";
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
		            sessionStorage.token = response.body.data.token;
		            sessionStorage.telephone = this.$parent.telephone;
		            this.passportCheck();
		          },function(error){
		          	console.log(error);
		          	if(error.body.code == 4011){
		          		this.errorPasswordCount++;
		          	}
		          	if(this.errorPasswordCount>=3){
		          		this.showPasswordDialog = true;
		          		return false;
		          	}
		          }).catch(function (error) {

		          }).finally(function(){
		          	 this.getDataToken();
		          });;
		    },
		    passportCheck(){ //登录成功后判断是否已通过注册认证
				this.$http({
		            url:"dealerInfo/idCardAuth?token="+sessionStorage.token,
		            method:"GET"
		        }).then(function (response) {
		        	var code = response.body.data["auth_status"];
		        	//return false;
		        	if(code == 1){ //已通过认证
		        		this.$router.push('/index');
		        	}else if(code == 3){ //在审核
		        		this.$router.push('/authResult');
		        	}else{
		        		this.$router.push('/auth');
		        	}
		        },function(){

		        });
		    },
		    checkNav(){
		    	 this.$router.push('code'); //路由跳转
		    },
		    closePasswordDialog(){
		    	this.showPasswordDialog = false;
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
	    }
	}
</script>
