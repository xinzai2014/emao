<template>
	<div v-if="dataAc!=null" class="receive" :style="'background:'+dataAc.activityPicUrl">
		<div class="content" v-if="shareType==1">
			<p class="center2">你的好友“{{dataAc.userName}}”邀请你一起加入车商猫</p>
			<p class="center2 margin_20">送你<span>{{dataAc.couponPrice}}元</span>购车优惠券</p>
			<p class="center2">你可以在<span>“车商猫-我的-优惠券”</span>中查看</p>
			<p class="center2">赶快点击立即下载车商猫App,开启购车之旅吧。</p>
			<input type="button" name="" value="下载车商猫App" class="login-btn" @click="downLoadApp">
		</div>
		<div class="content2" v-if="shareType==2">
			<p class="center2 font4">{{dataAc.userName}}</p>
			<p class="center2">邀请你一起加入车商猫</p>
			<p class="center2">送你<span>{{dataAc.couponPrice}}元</span>购车优惠券</p>
			<div class="login-info">
				<div class="login-phone">
                  <input type="text"  v-model="telephone" maxlength="11" placeholder="手机号" ref="telephone">
                  <span class="login-errror" :class="{fadeIn:telError}" v-show="telError">请输入正确的电话号码</span>
              </div>
				<div class="login-code clearfix">
		            <input type="text" v-model="code" placeholder="验证码"  name="code"  ref="code">
		            <i v-text="codeText" @click="getCode" :class='{"color-disabled":disabled}'></i>
		            <span class="login-errror" :class="{fadeIn:errorCode}" v-show="errorCode">请输入正确格式的验证码</span>
		        </div>
				<input type="button" name="" value="立即领取" class="login-btn" @click="submit">
			</div>
		</div>
		<div class="received" v-show="received" @click="closePop">
			<span class="position_btn" @click="downLoadApp"></span>
		</div>
		<div class="receiveSuccess" v-show="receiveSuccess" @click="closePop">
			<span class="position_btn" @click="downLoadApp"></span>
		</div>
	</div>
</template>
<script>
	export default {
		data () {
		    return{	
		      dataAc:null,    	
	    	  token:'',
	    	  code:"",
		      codeText:"获取验证码",
		      num:60,
		      errorCode:false,
		      disabled:false,
		      telephone:'',
		      telError:false,
		      shareType:'',
		      received:false,
		      receiveSuccess:false,
		      dealerId:'',
		      activityId:''
		    }
		},
		methods:{
			//初始化			
			fullData(){
				var url=""
				if(this.shareType==1){
					url="invited/inviteShareByMess"
				}else{
					url="invited/inviteShareByUrl"
				}
            	var data = {
			        token:this.token,
			        activityId:sessionStorage.activityId,
			        dealerId:this.dealerId
			    }
            	this.$http({
			        url:url,
			        method:"GET",
			        params:data
			    }).then(function (response) { 
			    	this.dataAc = response.body.data;
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
            },
            downLoadApp(){
            	alert('下载车商猫App');
            },
            closePop(){
            	this.received=false
            	this.receiveSuccess=false
            },
		    getCode(){  //获取验证码
		    	if(this.disabled){
		    		return false;
		    	};
		    	if(!this.checkTel()) return "";
		    	this.$http.post(
            		"invited/getValidateCode",
            		{
	            		phone:this.telephone
	            	}
            	).then(function (response) {
		        	this.setCode();
		          },function(error){

		          })
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
			checkTel(){
		      var telExp = /^(1(3|4|5|7|8)[0-9]{1}\d{8})$/;
		        if(telExp.test(this.telephone)){
		           this.telError = false;
		         }else{
		           this.telError = true;
		           this.$refs.telephone.focus();
		           setTimeout(()=>{
		           		this.telError = false;
		           },1500);
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
		    		setTimeout(()=>{
		           		this.errorCode = false;
		           },1500);
		    		this.$refs.code.focus();
		    		return false;
		    	}
		    	return true;
			},
		    submit(){
		    	if(!this.checkTel()) return "";
				if(!this.checkCode()) return "";
		    	if(this.telError || this.errorCode){
		    		return false;
		    	}
		         var data = {
		            phone:this.telephone,
		            code:this.code,
		            dealerId:this.dealerId,
		            invitedType:this.invitedType,
		            activityId:this.activityId
		         };
		         // this.$http.post(
           //  		"invited/registerDealerUserByValidateCode",
           //  		 data
           //  	).then(function (response) {
           //  		//1 新用户 result
           //  		//2 老用户 
		        	// this.received=false
           //  		this.receiveSuccess=false
		         //  },function(error){

		         //  })
		    }
		},
		mounted(){		
			this.token = this.$route.query.token||sessionStorage.token;
			this.shareType = this.$route.query.invitedType||2
			this.dealerId = this.$route.query.dealerId
			this.activityId=this.$route.query.activityId
	        this.fullData(); 
		}
	}

</script>
<style scope>
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
.login-phone input{color:#999;display:block;width:7.333rem;height:.933rem;font-size: .453rem;border:none;background:none;
}
.login-errror{display:block;position:absolute;bottom:-.8rem;left:0;width:7.333rem;height:.8rem;line-height:.8rem;text-align:center;font-size:.373rem;color:#fff;background-color:#e94545;
}
.login-code{position:relative;width:7.333rem;height:.933rem;margin:.497rem auto 0;font-size:.6133rem;color:#fff;border-bottom:1px solid #eee;
}
.login-code input{color:#999;display:block;float:left;width:4rem;height:.933rem;font-size: .453rem;border:none;background-color:transparent;
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

.position_btn{
	position: absolute;
    width: 6rem;
    height: 1.5rem;
    top: 11.1rem;
    left: 2rem;
}

	
</style>