<template>
	<div class="rating_page">
		<header class="user-tit">
			<a href="javascript:;" class="white-lt" @click="goback"></a>设置密码
		</header>
		<section class="set-code">
			<div>
				<input type="text" v-model="telephone" placeholder="请输入注册的手机号码">
			</div>
			<div>
				<input type="text" v-model="code" placeholder="验证码">
				<span class="num-code" @click="getCode">{{codeText}}</span>
			</div>
			<button class="close-bt" @click="checkPassword">确认</button>
		</section>
		<transition name="router-slid">
            <router-view></router-view>
        </transition>
	</div>
</template>
<script>
import MD5 from 'crypto-js/md5';
import hmac from 'crypto-js/hmac-md5';
import Utf8 from 'crypto-js/enc-utf8';
import Base64 from 'crypto-js/enc-base64';
    export default {
        data () {
            return {
            	telephone:"",
            	code:"",
            	num:60,
            	disabled:false,
            	codeText:"获取验证码",
            }
        },
        methods:{
        	goback(){
        		this.$router.push({name:"info"}); //路由跳转
        	},
        	checkTel(){
		      	var telExp = /^(1(3|4|5|7|8)[0-9]{1}\d{8})$/;
		        if(!telExp.test(this.telephone)){
		           this.$store.dispatch("ALERT", // 通过store传值
		              {
		                flag:true,
		                text:"请输入正确的手机号码"
		              }
		            );
		           return false;
		        }
		        return true;
		    },
			checkCode(){
				var codeExp = /^[a-zA-Z0-9]{6}$/;
		    	if(!codeExp.test(this.code)){
		    		this.$store.dispatch("ALERT", // 通过store传值
		              {
		                flag:true,
		                text:"请输入正确的验证码"
		              }
		            );
		    		return false;
		    	}
		    	return true;
			},
			codeToMD5(passwordWord){
				var password = passwordWord;
				var passwordMD5 = MD5(password);  //对象类型
				var passwordHash = hmac(passwordMD5.toString(),sessionStorage.dataToken); //转换成字符串在加密
				var passwordBase64 = Base64.stringify(Utf8.parse(passwordHash));  //先进行utf-8编码再进行base64
				return passwordBase64;
			},
        	getCode(){  //获取验证码
        		if(this.disabled){
		    		return false;
		    	};
		    	if(!this.checkTel()) return "";
		    	if(!(this.telephone == sessionStorage.telephone)){
		    		this.$store.dispatch("ALERT", // 通过store传值
		              {
		                flag:true,
		                text:"请输入注册时的手机号码"
		              }
		            );
		            return false;
		    	}
		    	this.$http.post(
		            "message/verify",
		            {
		            	token:sessionStorage.token,
		            	phone:this.telephone
		            },
		        ).then(function (response) {
		        	this.setCode();
		        	this.$store.dispatch("ALERT", // 通过store传值
		              {
		                flag:true,
		                text:"验证码发送成功"
		              }
		            );
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
		    checkPassword(){
		    	if(!this.checkTel()) return "";
		    	if(!this.checkCode()) return "";
		    	this.$http.post(
		            "passport/verify",
		            {
		            	token:sessionStorage.token,
		            	dataToken:sessionStorage.dataToken,
		            	code:this.codeToMD5(this.code),
		            	phone:""
		            },
		        ).then(function (response) {
		        	sessionStorage.code = this.code;
		            this.$router.push({name:"passwordEdit"}); //路由跳转
		          },function(error){

		          }).catch(function (error) {

		          }).finally(function(){
		          	 this.getDataToken();
		          });

		    },
		    getDataToken(){ //获取dataToken
		    	this.$http({
		            url:"passport/key/notApp",
		            method:"GET"
		        }).then(function (response) {
		            sessionStorage.dataToken = response.body.data.dataToken;
		          }).catch(function (error) {

		          });
		    }
        },
        mounted(){
			//this.$router.push({name:"passwordEdit"}); //路由跳转
        },
        beforeRouteLeave (to, from, next) {
		    window.clearInterval(window.timer);
	    	next();
	  	}
    }   
</script>

<style>
	.set-code div{
		padding:0 0.4rem;
		background:#fff;
		font-size:0.4rem;
		color:#2c2c2c;
		border-bottom:1px solid #eee;
		position:relative;
	}
	.set-code div input{
		padding:0.533rem 0;
		border:none;
		display:block;
		border-bottom:1px solid #bbb;
		width:100%;
		line-height:0.4rem;
	}
	.set-code div:last-of-type input{
		border:none;
	}
	.num-code{
		color:#d5aa5c;
		position:absolute;
		top:50%;
		transform:translateY(-50%);
		right:0.533rem;
	}
</style>