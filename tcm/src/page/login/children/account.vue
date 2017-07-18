<template>
	<div>
		<div class="login-phone">
	      <input type="password" placeholder="密码" v-model="pass"> 
	      <span class="login-errror" style="display:none;">请输入密码</span>
	    </div>
	    <input class="login-btn" type="text" name="" value="登录" @click="login">
        <p class="login-another" @click="checkNav"><span>验证码登录</span></p>
	</div>
</template>
<script>
	export default {
		name:'pass',
		data () {
		    return {
		      pass:"123456"
		    }
		},
		methods:{
		    login(){
		         let options = {};
		         var data = {
		            phone:this.$parent.telephone,//获取父组件实例
		            password:this.pass
		         };
		        this.$http({
		            url:"test/mockLogin",
		            method:"GET",
		            params:data
		        }).then(function (response) {
		            sessionStorage.dataToken = response.body.data.dataToken;
		            sessionStorage.phone = response.body.data.phone;
		            sessionStorage.token = 'b943c46b5dbde5ccf1341a80da439509';
		            this.$router.push('/index'); //路由跳转
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
