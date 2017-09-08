<template>
	<div class="rating_page">
		<header class="user-tit">
			<a href="javascript:;" class="white-lt" @click="goback"></a>设置密码
		</header>
		<section class="set-code">
			<div>
				<input type="password" v-model="password" placeholder="请输入密码">
			</div>
			<button class="close-bt" @click="updatePassword">确认</button>
		</section>
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
            	password:""
            }
        },
        methods:{
        	goback(){
        		this.$router.go(-1);
        	},
        	codeToMD5(passwordWord){
				var password = passwordWord;
				var passwordMD5 = MD5(password);  //对象类型
				var passwordHash = hmac(passwordMD5.toString(),sessionStorage.dataToken); //转换成字符串在加密
				var passwordBase64 = Base64.stringify(Utf8.parse(passwordHash));  //先进行utf-8编码再进行base64
				return passwordBase64;
			},
			checkCode(){
				var codeExp = /^[a-zA-Z0-9]{6,14}$/;
		    	if(!codeExp.test(this.password)){
		    		this.$store.dispatch("ALERT", // 通过store传值
		              {
		                flag:true,
		                text:"请输入6-14位数字或字母密码"
		              }
		            );
		    		return false;
		    	}
		    	return true;
			},
        	updatePassword(){
        		if(!this.checkCode()) return "";
        		this.$http.post(
		            "passport/reset",
		            {
		            	token:sessionStorage.token,
		            	dataToken:sessionStorage.dataToken,
		            	code:this.codeToMD5(sessionStorage.code),
		            	new_password:MD5(this.password).toString()
		            }
		        ).then(function (response) {
		        	this.$store.dispatch("ALERT", // 通过store传值
		              {
		                flag:true,
		                text:"设置密码成功"
		              }
		            );
		            this.$router.push({name:"info"}); //路由跳转
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

        },
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