<template>
	<div>
		<div class="spinner">
		  <div class="rect1"></div>
		  <div class="rect2"></div>
		  <div class="rect3"></div>
		  <div class="rect4"></div>
		  <div class="rect5"></div>
		</div>
	</div>
</template>
<script>
	export default {
		name:'loading',
		data () {
		    return {
		     
		    }
		},
		methods:{
		    
	    },
	    mounted(){
	    	const data = {
	            	phone:18611985439,
	            	password:123456
	            }
	    	this.$http({
	            url:"test/mockLogin",
	            method:"GET",
	            params:data
	        }).then(function (response) {
	            sessionStorage.dataToken = response.body.data.dataToken;
	            this.$router.push('/login/account'); //路由跳转
	            //this.$router.push('/index'); //路由跳转
	          }).catch(function (error) {
	          	console.log(error);
	            console.log("登录失败了");
	          });

	    	setTimeout(()=>{
	    		var token = "bbe214ab570d81dc8b1b6589d86e13d9";
	    		sessionStorage.token = token;
	            // if(token){
	            // 	this.$router.push('/index'); 
	            // }else{
	            // 	this.$router.push('/login/account');
	            // }
	    	},0)
	  	}
	}

</script>

<style>
.spinner {
  width: 100%;
  height: 1.5rem;
  text-align: center;
  position: absolute;
  top:50%;
  left:50%;
  transform:translateX(-50%) translateY(-50%);
}
 
.spinner > div {
  background-color: #67CF22;
  height: 100%;
  width: 0.25rem;
  display: inline-block;
   
  -webkit-animation: stretchdelay 1.2s infinite ease-in-out;
  animation: stretchdelay 1.2s infinite ease-in-out;
}
 
.spinner .rect2 {
  -webkit-animation-delay: -1.1s;
  animation-delay: -1.1s;
}
 
.spinner .rect3 {
  -webkit-animation-delay: -1.0s;
  animation-delay: -1.0s;
}
 
.spinner .rect4 {
  -webkit-animation-delay: -0.9s;
  animation-delay: -0.9s;
}
 
.spinner .rect5 {
  -webkit-animation-delay: -0.8s;
  animation-delay: -0.8s;
}
 
@-webkit-keyframes stretchdelay {
  0%, 40%, 100% { -webkit-transform: scaleY(0.4) } 
  20% { -webkit-transform: scaleY(1.0) }
}
 
@keyframes stretchdelay {
  0%, 40%, 100% {
    transform: scaleY(0.4);
    -webkit-transform: scaleY(0.4);
  }  20% {
    transform: scaleY(1.0);
    -webkit-transform: scaleY(1.0);
  }
}

</style>
