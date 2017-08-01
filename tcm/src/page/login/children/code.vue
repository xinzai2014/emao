<template>
	<div>
		<div class="login-code clearfix">
            <input type="text" v-model="code"  name="code"  @input="checkCode">
            <i v-text="codeText" @click="getCode" :class='{"color-disabled":disabled}'></i>
            <span class="login-errror" v-show="errorCode">请输入正确格式的验证码</span>
        </div>
	    <input class="login-btn" type="text" name="" value="登录" @click="login">
        <p class="login-another" @click="checkNav"><span>账号登录</span></p>
	</div>
</template>
<script>
	export default {
		name:'code',
		data () {
		    return {
		      code:"",
		      codeText:"获取验证码",
		      num:10,
		      errorCode:false,
		      disabled:false
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
			checkCode(){
				var codeExp = /^[a-zA-Z0-9]{6}$/;
		    	if(codeExp.test(this.code)){
		    		this.errorCode = false;
		    	}else{
		    		this.errorCode = true;
		    		console.log("密码错误了");
		    		return false;
		    	}
		    	return true;
			},
		    login(){
		    	this.checkTel();
		    	this.checkCode();
		    	if(this.$parent.telError || this.errorCode){
		    		return false;
		    	}
		         var data = {
		            phone:this.$parent.telephone,//获取父组件实例
		            password:this.code,
		            dataToken:sessionStorage.dataToken
		         };
		        this.$http({
		            url:"passport/codeLogin",
		            method:"GET",
		            params:data
		        }).then(function (response) {
		            sessionStorage.dataToken = response.body.data.dataToken;
		            sessionStorage.phone = response.body.data.phone;
		            sessionStorage.token = 'bbe214ab570d81dc8b1b6589d86e13d9';
		            this.$router.push('/index'); //路由跳转
		          }).catch(function (error) {
		          	console.log(error);
		            console.log("登录失败了");
		          });
		    },
		    checkNav(){
		    	 this.$router.push('account'); //路由跳转
		    },
		    getCode(){
		    	if(this.disabled){
		    		return false;
		    	};
		    	this.$http.post(
		            "message/verify?token="+sessionStorage.token,
		            {
		            	phone:this.$parent.telephone
		            }
		        ).then(function (response) {
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
		    			this.num = 10;
		    			this.disabled = false;
		    			window.clearInterval(window.timer);
		    			return false;
		    		}
		    	},1000);
		    }
	    },
	    beforeRouteEnter (to, from, next) {
	    	console.log(123);
	    	next();
	    },
	    beforeRouteLeave (to, from, next) {
		    window.clearInterval(window.timer);
	    	next();
	  }
	}

</script>
