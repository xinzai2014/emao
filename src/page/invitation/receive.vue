<template>
	<div class="receive">
		<div class="content" v-if="false">
			<p class="center2">你的好友“{{}}”邀请你一起加入车商猫</p>
			<p class="center2 margin_20">送你<span>500元</span>购车优惠券</p>
			<p class="center2">你可以在<span>“车商猫-我的-优惠券”</span>中查看</p>
			<p class="center2">赶快点击立即下载车商猫App,开启购车之旅吧。</p>
			<input type="button" name="" value="下载车商猫App" class="login-btn">
		</div>
		<div class="content2">
			<p class="center2 font4">大芒果</p>
			<p class="center2">邀请你一起加入车商猫</p>
			<p class="center2">送你<span>500元</span>购车优惠券</p>
			<div class="login-info">
				<div class="login-phone">
					<input type="text" maxlength="11" placeholder="手机号"> 
					<span class="login-errror" style="display: none;">请输入正确的电话号码</span>
				</div>
				<div class="login-code clearfix">
					<input type="text" placeholder="验证码" name="code">
					 <i class="">获取验证码</i> 
					 <span class="login-errror" style="display: none;">请输入正确格式的验证码</span>
				</div>
				<input type="button" name="" value="立即领取" class="login-btn">
			</div>
		</div>
		<div class="received" v-show=""></div>
		<div class="receiveSuccess" v-show=""></div>
	</div>
</template>
<script>
	export default {
		data () {
		    return{		    	
		    	token:'',
		    	
		    }
		},
		methods:{
			//初始化
			fullData(){
            	var data = {
			        token:this.token
			    }
            	this.$http({
			        url:"dealer/show",
			        method:"GET",
			        params:data
			    }).then(function (response) { 
			    	this.data = response.body.data;
			    	if(this.data.joinStatus == 1){
			    		this.anchor = false
				    	this.showText = true;
				    }else{
				    	this.showText = false
				    	this.anchor = true
				    }
			    },function(){
			    })
			    
            },
            tcmApp(obj){ //app跳转
            	if (navigator.userAgent.indexOf("iPhone") > 0) {
	            	window.webkit.messageHandlers.tcmAppObject.postMessage(obj);//IOS
	            }
	            else {
	            	window.tcmAppObject.postMessage(JSON.stringify(obj));//Android
	            }
            }
		},
		mounted(){
			//组件初始化
			//加盟还是授权
			this.token = this.$route.query.token||sessionStorage.token;
	        this.fullData(); 
		}
	}

</script>
<style>
body,html{
		height: 100%;
	}
.receive{
	height:100%;
	background: url('../../assets/share.png') no-repeat #241e2a;
	background-size:100%;
	padding-top: 7.5rem;
	box-sizing: border-box;
}
.receive .center2{
	width:7.2rem;
	text-align: center;
	font-size: 0.4rem;
	margin:auto;
	line-height: 0.6rem
}

.receive .center2 span{
	color:red;
}
.receive .center2.margin_20{
margin-bottom: 0.4rem
}

.content2{
	position: relative;
	top: -0.8rem;
}

.login-phone{position:relative;width:7.333rem;height:.933rem;margin:.497rem auto 0;border-bottom:1px solid #eee;
}
.login-phone input{color:#FFF;display:block;width:7.333rem;height:.933rem;font-size: .453rem;border:none;background:none;
}
.login-errror{display:block;position:absolute;bottom:-.8rem;left:0;width:7.333rem;height:.8rem;line-height:.8rem;text-align:center;font-size:.373rem;color:#fff;background-color:#e94545;
}
.login-code{position:relative;width:7.333rem;height:.933rem;margin:.497rem auto 0;font-size:.6133rem;color:#fff;border-bottom:1px solid #eee;
}
.login-code input{color:#FFF;display:block;float:left;width:4rem;height:.933rem;font-size: .453rem;border:none;background-color:transparent;
}
.login-code i{display:block;float:right;font-size:.453rem;color:#ffdb7d;margin-top: 0.28rem;
}
.login-code .color-disabled{color:#999
}
.login-btn{display:block;width:5.867rem;height:1.1733rem;margin:0.8rem auto 0;text-align:center;font-size:.453rem;color:#fff;line-height:1.17333rem;border:none;Border-radius:.667rem;background-color:#d5aa5c;
}
.login-another{margin-top:.667rem;text-align:center;
}
.login-another span{font-size:.4rem;color:#fff;border-bottom:1px solid #eee;
}
.received{
	position: fixed;
	top:0;
	left: 0;
	width:100%;
	height: 100%;
	background: url('../../assets/received.png') no-repeat rgba(0,0,0,0.6);
	background-size: 100%;
}
.receiveSuccess{
	position: fixed;
	top:0;
	left: 0;
	width:100%;
	height: 100%;
	background: url('../../assets/receiveSuccess.png') no-repeat rgba(0,0,0,0.6);
	background-size: 100%;
}
	
	
</style>