<template>
	<div>
		<div class="login-phone">
	      <input type="password" placeholder="密码" v-model="pass" > 
	      <span class="login-errror" :class="{fadeIn:errorPass}" v-show="errorPass">请输入密码</span>
	    </div>
	    <input class="login-btn" type="text" name="" value="登录" @click="login">
        <p class="login-another" @click="checkNav"><span>验证码登录</span></p>
        <div class="dialog" v-show="showAjaxError">{{ajaxErrorData}}</div>
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
		      showAjaxError:null,
		      ajaxErrorData:null
		    }
		},
		mounted(){
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
		           		//this.$parent.telError = false;
		           },1500);
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
		            //this.$router.push('/index'); //路由跳转
		          },function(error){
		          	this.showAjaxError = true;
		          	this.ajaxErrorData = error.body.msg;
		          	setTimeout(()=>{
		          		this.showAjaxError = false
		          	},1500)
		          }).catch(function (error) {
		          });
		    },
		    checkNav(){
		    	 this.$router.push('code'); //路由跳转
		    }
	    }
	}
</script>