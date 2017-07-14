<template>
	<div>
		<div class="login-code clearfix">
            <input type="text" v-model="pass">
            <i v-text="codeText" @click="getCode"></i>
        </div>
	    <input class="login-btn" type="text" name="" value="登录" @click="login">
        <p class="login-another" @click="checkNav"><span>账号登录</span></p>
	</div>
</template>
<script>
	export default {
		name:'pass',
		data () {
		    return {
		      pass:"123456",
		      codeText:"获取验证码",
		      num:10
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
		            this.$router.push('/index'); //路由跳转
		          }).catch(function (error) {
		          	console.log(error);
		            console.log("登录失败了");
		          });
		    },
		    checkNav(){
		    	 this.$router.push('pass'); //路由跳转
		    },
		    getCode(){
		    	this.codeText = this.num+"s后重新获取";
		    	var that = this;
		    	window.timer = window.setInterval(()=>{
		    		console.log(this.num == 0+"---"+this.num)
		    		that.num--;
		    		that.codeText = this.num+"s后重新获取";
		    		if(!this.num){
		    			this.codeText = "重新获取";
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
