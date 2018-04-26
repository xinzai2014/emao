<template>
	<div class="receive">
		<header class="brand-list-header header-fixed" v-show="">
			<i class="white-lt brand-left-cion"></i> 
			<strong class="brand-list-title">来自好友的邀请</strong>
		</header>
		<div class="content" v-if="dataAc!=null&&shareType==1">
			<p class="center2">你的好友“{{dataAc.userName}}”邀请你一起加入车商猫</p>
			<p class="center2 margin_20">送你<span>{{dataAc.couponPrice}}元</span>购车优惠券</p>
			<p class="center2">你可以在<span>“车商猫-我的-优惠券”</span>中查看</p>
			<p class="center2">赶快点击下载车商猫App,开启购车之旅吧。</p>
			<input type="button" name="" value="下载车商猫App" class="login-btn" @click="downLoadApp">
		</div>
		<div class="content2" v-if="dataAc!=null&&(shareType==2||shareType==3)">
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
		<alert-tip v-if="showAlert" @closeTip="showAlert = false" :alertText="alertText"></alert-tip>
	</div>
</template>

<script>
import alertTip from '../../components/common/alertTip/alertTip'

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
		      activityId:'',
		      showAlert: false, //弹出框
      		 alertText: null, //弹出信息
		    }
		},
		  components:{
		    alertTip
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
			        activityId:this.activityId,
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
		          	if(error.body.code==403||error.body.code==506){
		          		this.showAlert = true;
		            	this.alertText = response.data.msg;
		          	}
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
		            invitedType:this.shareType,
		            activityId:this.activityId,
		            dealerName:this.dataAc.userName||'df'
		         };
		         this.$http.post(
            		"invited/registerDealerUserByValidateCode",
            		 data
            	).then(function (response) {
            		if(response.data.code==200){
            			if(response.data.data.result==1){
            				this.receiveSuccess=true
            			}else if(response.data.data.result==2){
            				this.received=true
            			}
            		}else{
            			this.showAlert = true;
		            	this.alertText = response.data.msg;
            		}
		          },function(error){
		          	if(error.body.code){
		          		this.showAlert = true;
		            	this.alertText = response.data.msg;
		          	}
		          })
		    },
		    downLoadApp(){
		    	 !(function(device, Cookie, window, document) {
				     //设备检测
				     var ua = window.navigator.userAgent;
				     var isMobileOrTablet = device.mobile() || device.tablet();
				     var isIOS = device.ios();
				     var isAndroid = device.android();
				     var isWeixin = /MicroMessenger/i.test(ua);
				     var isDesktop = device.desktop();

				     var toItunes = isMobileOrTablet &&
				         isIOS &&
				         !isWeixin;
				     var toUrl = !isWeixin && (!isIOS || isDesktop || isAndroid);

				     //这里绑定了click事件，移动端会有300ms的延迟，用户感受不出来，btn需要设置cursor:pointer的样式，并且阻止默认事件；
			         window.setTimeout(function() {
			             if (toUrl) { //直接下载
			                 window.location.href = '//emao-media-dev.oss-cn-beijing.aliyuncs.com/tob/app/down/app-emao-release_emao_sign.apk';
			             } else if (toItunes) { //跳转到itunes下载
			                 window.location.href = '//itunes.apple.com/cn/app/id1244067982';
			             } else if (isWeixin) { /**微信逻辑*/
			                 window.location.href = '//a.app.qq.com/o/simple.jsp?pkgname=com.emao.taochemao';
			             }
			         }, 600)
				 }(
				     function() { //设备检测代码

				         var device,
				             previousDevice,
				             addClass,
				             documentElement,
				             find,
				             handleOrientation,
				             hasClass,
				             orientationEvent,
				             removeClass,
				             userAgent;

				         // Save the previous value of the device variable.
				         previousDevice = window.device;

				         device = {};

				         // Add device as a global object.
				         window.device = device;

				         // The <html> element.
				         documentElement = window.document.documentElement;

				         // The client user agent string.
				         // Lowercase, so we can use the more efficient indexOf(), instead of Regex
				         userAgent = window.navigator.userAgent.toLowerCase();

				         // Main functions
				         // --------------

				         device.ios = function() {
				             return device.iphone() || device.ipod() || device.ipad();
				         };

				         device.iphone = function() {
				             return !device.windows() && find('iphone');
				         };

				         device.ipod = function() {
				             return find('ipod');
				         };

				         device.ipad = function() {
				             return find('ipad');
				         };

				         device.android = function() {
				             return !device.windows() && find('android');
				         };

				         device.androidPhone = function() {
				             return device.android() && find('mobile');
				         };

				         device.androidTablet = function() {
				             return device.android() && !find('mobile');
				         };

				         device.blackberry = function() {
				             return find('blackberry') || find('bb10') || find('rim');
				         };

				         device.blackberryPhone = function() {
				             return device.blackberry() && !find('tablet');
				         };

				         device.blackberryTablet = function() {
				             return device.blackberry() && find('tablet');
				         };

				         device.windows = function() {
				             return find('windows');
				         };

				         device.windowsPhone = function() {
				             return device.windows() && find('phone');
				         };

				         device.windowsTablet = function() {
				             return device.windows() && (find('touch') && !device.windowsPhone());
				         };

				         device.fxos = function() {
				             return (find('(mobile;') || find('(tablet;')) && find('; rv:');
				         };

				         device.fxosPhone = function() {
				             return device.fxos() && find('mobile');
				         };

				         device.fxosTablet = function() {
				             return device.fxos() && find('tablet');
				         };

				         device.meego = function() {
				             return find('meego');
				         };

				         device.cordova = function() {
				             return window.cordova && location.protocol === 'file:';
				         };

				         device.nodeWebkit = function() {
				             return typeof window.process === 'object';
				         };

				         device.mobile = function() {
				             return device.androidPhone() || device.iphone() || device.ipod() || device.windowsPhone() || device.blackberryPhone() || device.fxosPhone() || device.meego();
				         };

				         device.tablet = function() {
				             return device.ipad() || device.androidTablet() || device.blackberryTablet() || device.windowsTablet() || device.fxosTablet();
				         };

				         device.desktop = function() {
				             return !device.tablet() && !device.mobile();
				         };

				         device.television = function() {
				             var i, tvString;

				             television = [
				                 "googletv",
				                 "viera",
				                 "smarttv",
				                 "internet.tv",
				                 "netcast",
				                 "nettv",
				                 "appletv",
				                 "boxee",
				                 "kylo",
				                 "roku",
				                 "dlnadoc",
				                 "roku",
				                 "pov_tv",
				                 "hbbtv",
				                 "ce-html"
				             ];

				             i = 0;
				             while (i < television.length) {
				                 if (find(television[i])) {
				                     return true;
				                 }
				                 i++;
				             }
				             return false;
				         };

				         device.portrait = function() {
				             return (window.innerHeight / window.innerWidth) > 1;
				         };

				         device.landscape = function() {
				             return (window.innerHeight / window.innerWidth) < 1;
				         };

				         // Public Utility Functions
				         // ------------------------

				         // Run device.js in noConflict mode,
				         // returning the device variable to its previous owner.
				         device.noConflict = function() {
				             window.device = previousDevice;
				             return this;
				         };

				         // Private Utility Functions
				         // -------------------------

				         // Simple UA string search
				         find = function(needle) {
				             return userAgent.indexOf(needle) !== -1;
				         };

				         // Check if documentElement already has a given class.
				         hasClass = function(className) {
				             var regex;
				             regex = new RegExp(className, 'i');
				             return documentElement.className.match(regex);
				         };

				         // Add one or more CSS classes to the <html> element.
				         addClass = function(className) {
				             var currentClassNames = null;
				             if (!hasClass(className)) {
				                 currentClassNames = documentElement.className.replace(/^\s+|\s+$/g, '');
				                 documentElement.className = currentClassNames + " " + className;
				             }
				         };

				         // Remove single CSS class from the <html> element.
				         removeClass = function(className) {
				             if (hasClass(className)) {
				                 documentElement.className = documentElement.className.replace(" " + className, "");
				             }
				         };

				         // HTML Element Handling
				         // ---------------------

				         // Insert the appropriate CSS class based on the _user_agent.

				         if (device.ios()) {
				             if (device.ipad()) {
				                 addClass("ios ipad tablet");
				             } else if (device.iphone()) {
				                 addClass("ios iphone mobile");
				             } else if (device.ipod()) {
				                 addClass("ios ipod mobile");
				             }
				         } else if (device.android()) {
				             if (device.androidTablet()) {
				                 addClass("android tablet");
				             } else {
				                 addClass("android mobile");
				             }
				         } else if (device.blackberry()) {
				             if (device.blackberryTablet()) {
				                 addClass("blackberry tablet");
				             } else {
				                 addClass("blackberry mobile");
				             }
				         } else if (device.windows()) {
				             if (device.windowsTablet()) {
				                 addClass("windows tablet");
				             } else if (device.windowsPhone()) {
				                 addClass("windows mobile");
				             } else {
				                 addClass("desktop");
				             }
				         } else if (device.fxos()) {
				             if (device.fxosTablet()) {
				                 addClass("fxos tablet");
				             } else {
				                 addClass("fxos mobile");
				             }
				         } else if (device.meego()) {
				             addClass("meego mobile");
				         } else if (device.nodeWebkit()) {
				             addClass("node-webkit");
				         } else if (device.television()) {
				             addClass("television");
				         } else if (device.desktop()) {
				             addClass("desktop");
				         }

				         if (device.cordova()) {
				             addClass("cordova");
				         }

				         // Orientation Handling
				         // --------------------

				         // Handle device orientation changes.
				         handleOrientation = function() {
				             if (device.landscape()) {
				                 removeClass("portrait");
				                 addClass("landscape");
				             } else {
				                 removeClass("landscape");
				                 addClass("portrait");
				             }
				             return;
				         };

				         // Detect whether device supports orientationchange event,
				         // otherwise fall back to the resize event.
				         if (Object.prototype.hasOwnProperty.call(window, "onorientationchange")) {
				             orientationEvent = "orientationchange";
				         } else {
				             orientationEvent = "resize";
				         }

				         // Listen for changes in orientation.
				         if (window.addEventListener) {
				             window.addEventListener(orientationEvent, handleOrientation, false);
				         } else if (window.attachEvent) {
				             window.attachEvent(orientationEvent, handleOrientation);
				         } else {
				             window[orientationEvent] = handleOrientation;
				         }

				         handleOrientation();

				         return device

				     }(),
				     function() {
				         var define, module, exports;
				         var getKeys = Object.names || function(obj) {
				             var names = [],
				                 name = "";
				             for (name in obj) {
				                 if (obj.hasOwnProperty(name)) names.push(name);
				             }
				             return names;
				         };

				         function isPlainObject(value) {
				             return !!value && Object.prototype.toString.call(value) === "[object Object]";
				         }

				         function isArray(value) {
				             return value instanceof Array;
				         }

				         function toArray(value) {
				             return Array.prototype.slice.call(value);
				         }
				     }(),
				     window,
				     document
				 ));
		    }
		},
		mounted(){		
			this.token = this.$route.query.token||sessionStorage.token
			this.shareType = this.$route.query.invitedType
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
	background-size:contain;
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