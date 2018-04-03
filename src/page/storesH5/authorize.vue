<template>
	<div>
		<!-- 加盟 -->
		<div class="franch-wrap" v-show="!anchor">
			<header class="brand-list-header header-fixed" v-show="titHide">
				<i class="white-lt brand-left-cion"></i> 
				<strong class="brand-list-title">权益选择</strong>
			</header>
			<div class="franch-franch">
				<span class="franch-tit"></span>
				<div class="franch-ct">
					<p class="franch-top">
						<span class="link-auth" @click="authShow"></span>
					</p>
					<p class="franch-text" if="data.joinStatus == 0 || data.joinStatus == 1">
						<span v-for="(item,index) in data.joinCouponData">{{item.price}}*{{item.num}}优惠券</span>
					</p>
					<div class="franch-btn" @click="franchFun">成为加盟店</div>
				</div>
			</div>
		</div>
		<!-- 授权 -->
		<div class="auth-wrap" v-show="anchor">
			<header class="brand-list-header header-fixed" v-show="titHide">
				<i class="white-lt brand-left-cion"></i> 
				<strong class="brand-list-title">权益选择</strong>
			</header>
			<span class="anchor-tit"></span>
			<div class="anchor-ct" if="data.joinStatus == 1">
				<div class="new-ct" id="newAnchor" v-if="data.grantStatus == 0">
					<span class="new-top"></span>
					<div class="new-reward">
						<span v-for="(item,index) in data.grantCouponData">{{item.price}}*{{item.num}}优惠券</span>
					</div>
					<span class="anchor-icon"></span>
					<div class="new-cost">{{data.grantExpense}}</div>
					<div class="new-btn" v-if="showText" @click="layerFun">需先申请加盟店</div>
					<div class="new-btn" v-else @click="authFun('newAnchor',1)">成为新车授权店</div>
				</div>
				<div class="parallel-ct" id="paraAnchor" v-if="data.empowerImportedStatus == 0">
					<span class="parallel-top"></span>
					<div class="new-reward">
						<span v-for="(item,index) in data.empowerImportedCouponData">{{item.price}}*{{item.num}}优惠券</span>
					</div>
					<span class="anchor-icon"></span>
					<div class="new-cost">{{data.empowerImportedExpense}}</div>
					<div class="parallel-btn" v-if="showText" @click="layerFun">需先申请加盟店</div>
					<div class="parallel-btn" v-else @click="authFun('paraAnchor',2)">成为平行进口车授权店</div>
				</div>
				<div class="fast-ct" id="fastAnchor" v-if="data.empowerFastStatus == 0">
					<span class="fast-top"></span>
					<div class="new-reward">
						<span v-for="(item,index) in data.empowerFastCouponData">{{item.price}}*{{item.num}}优惠券</span>
					</div>
					<span class="anchor-icon"></span>
					<div class="new-cost">{{data.empowerFastExpense}}</div>
					<div class="fast-btn" v-if="showText" @click="layerFun">需先申请加盟店</div>
					<div class="fast-btn" v-else @click="authFun('fastAnchor',3)">成为快弹车授权店</div>
				</div>
			</div>
			<div class="layer-mask" v-show="layerMask">
				<div class="layer-ct">
					<p class="layer-tit">如果您要申请授权业务，需要先加盟一猫。</p>
					<p class="layer-btn">
						<span @click="closeLayer">取消</span>
						<span class="layer-link" @click="franchFun">申请加盟</span>
					</p>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data () {
		    return{
		    	titHide:true, //是否显示导航
		    	layerMask:false, //弹框
		    	anchor:true, //加盟or授权  false加盟true授权(是否有锚点)
		    	showText:true,//按钮显示什么文字
		    	token:'',
		    	anchorName:'',
		    	data:{
				      /*"joinStatus": 2,
				      "empowerImportedStatus": 0,
				      "grantStatus": 0,
				      "empowerFastStatus": 0,
				      "empowerFastExpense": "10万or20万/永久",
				      "grantExpense": "¥12000/年",
				      "empowerImportedExpense": "¥6000/年",
				      "dataStatus":1,
				      "joinCouponData" : [{
				              "name":"加盟通过发放",
				              "price":"1000",
				              "num":"2"
				         },
				         {
				              "name":"加盟通过发放",
				              "price":"600",
				              "num":"3"
				         }],
				      "empowerImportedCouponData":[{
				              "name":"通过发放",
				              "price":"1000",
				              "num":"2"
				         }],
				       "grantCouponData":[{
				              "name":"通过发放",
				              "price":"1000",
				              "num":"2"
				         }],
				       "empowerFastCouponData":[{
				              "name":"通过发放",
				              "price":"1000",
				              "num":"2"
				         }]*/
				}
		    }
		},
		methods:{
			layerFun(){ //弹框
				this.layerMask = true;
			},
			closeLayer(){ //关闭弹框
				this.layerMask = false;
			},
			authShow(){ //显示授权页
				this.anchor = true;
			},
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
				    	this.showText = true;
				    }else{
				    	this.showText = false
				    }
			    },function(){
			    })
			    
            },
            franchFun(){ //加盟跳转
            	window.location = 'emaotaochemao://push/infocomplete?type=0';
            	this.layerMask = false;
            },
            authFun(tagUrl,status){ //授权店跳转
            	if(!this.data.dataStatus){ //没有填写打款账户
            		window.location = 'emaotaochemao://push/bankaccount?anchor=' + tagUrl;
            	} else{
            		if(status == 1){ //新车
            			window.location = 'emaotaochemao://push/infocomplete?type=' + status;
            		}
            		if(status == 2){ //平行
            			var data = {
					        token:this.token
					    }
		            	this.$http({
					        url:"dealer/changeStatus",
					        method:"GET",
					        params:data
					    }).then(function (response) { 
					    	var data = response.body.data;
					    	if(data.status){ //新车信息已提交
					    		window.location = 'emaotaochemao://push/infosubmit?msg=' + data.msg;
					    	}else{
					    		window.location = 'emaotaochemao://push/infocomplete?type=' + status;
					    	}
					    	

					    },function(){
					    })
            			
            		}
            		if(status == 3){ //快弹车
            			window.location = 'emaotaochemao://push/infocomplete?type=' + status;
            			
            		}
            	}
            },
            goAnchor() {
            	if(this.anchorName){
            		var anchor = document.getElementById(this.anchorName);
            		if(this.anchorName == 'newAnchor'){
            			window.scrollTo(0,0);
            		}else{
            			window.scrollTo(0,(anchor.offsetTop)+180);
            		}
            		
            		
            	}
		        
		    },
            tcmApp(obj){ //app跳转
            	if (navigator.userAgent.indexOf("iPhone") > 0) {
	            	window.webkit.messageHandlers.tcmAppObject.postMessage(obj);//IOS
	            }
	            else {
	            	window.tcmAppObject.postMessage(JSON.stringify(obj));//Android
	            }
            },
            closeCurrentWindow() {
                var obj = {
                    actionname:"closeCurrentWindow"//Native 函数名称：必填，Native 提供给 JS 的可用函数的函数名称
                };
                this.tcmApp(obj);//tcmApp 函数参见通信规则中的示例说明
            }
		},
		mounted(){
			//组件初始化
			//加盟还是授权
			this.token = this.$route.query.token||sessionStorage.token;
			this.anchorName = this.$route.query.anchor || '';
			if(this.anchorName){
				this.anchor = true;
			}else{
				this.anchor = false;
			}
	        this.fullData();
	        
	        if(this.token){
	            this.titHide = false;
        		document.title='权益选择';
	        }
	        setTimeout(()=>{
	        	this.goAnchor();
	        },1000)
	        
		}
	}

</script>
<style scoped>
	body,html{
		height: auto;
	}
</style>
<style>
	.franch-wrap{
		width: 100%;
		background: #000;
		overflow: hidden;

	}
	.brand-list-header {
	    position: relative;
	    z-index: 25;
	    overflow: hidden;
	    height: 1.1733rem;
	    text-align: center;
	    font-size: 0.4rem;
	    line-height:1.1733rem;
	    color: #fff;
	    background-color: #27282f;
	}
	.brand-left-cion {
	    position: absolute;
	    left: .4666rem;
	    top: .4rem;
	}
	.franch-franch{
		overflow: hidden;
		position: relative;
	}
	.franch-franch .franch-tit{
		position: absolute;
		left: 0;
		top: 0;
		display: block;
		width: 10.0rem;
		height: 6.373333rem;
		background: url('../../assets/h5-tit.png');
		background-size: contain;
	}
	.franch-ct{
		width: 8.0rem;
		margin: 4.666667rem auto 0.6rem auto;
		background: rgba(84,63,25,0.4);
		border: 1px solid #825b14;
		border-radius: 0.266667rem;
		overflow: hidden;
		position: relative;
	}
	.franch-top{
		display: block;
		background: url('../../assets/franch.png');
		background-size: contain;
		width: 8.0rem;
		height: 8.293333rem;
		margin: 0 auto;
		overflow: hidden;
	}
	.link-auth{
		display: block;
		cursor: pointer;
		width: 3.6rem;
		height: 0.866667rem;
		margin: 5.786667rem auto 0 auto;
	}
	.franch-text{
		text-align: center;
		color: #fff;
		line-height: 0.466667rem;
		font-size: 0.426667rem;
		margin: 0.2rem auto 0 auto;
	}
	.franch-text span{
		display: block;
		margin-top: 0.2rem;
	}
	.franch-btn,.new-btn,.parallel-btn,.fast-btn{
		width: 6.133333rem;
		height: 1.2rem;
		line-height: 1.2rem;
		color: #fff;
		margin: 1.066667rem auto 1.066667rem auto;
		font-size: 0.5rem;
		text-align: center;
		background: #c89b48;
		border-radius: 0.586667rem;
	}

	.auth-wrap{
		width: 100%;
		height: 100%;
		background: #000;
		padding-bottom: 0.933333rem;
	}
	.anchor-ct{
		position: relative;
		margin-top: -2.4rem;
		/*overflow: hidden;*/
	}
	.anchor-tit{
		display: block;
		width: 10.0rem;
		height: 6.626667rem;
		background: url('../../assets/h5-tit1.png');
		background-size: contain;
	}

	.new-ct,.parallel-ct,.fast-ct{
		width: 8.0rem;
		margin: 0.866667rem auto 0 auto;
		background: rgba(84,63,25,0.4);
		border: 1px solid #825b14;
		border-radius: 0.266667rem;
		overflow: hidden;
		position: relative;
	}
	.new-top{
		display: block;
		width: 8.0rem;
		height: 11.8rem;
		background: url('../../assets/auth1.png');
		background-size: contain;

	}
	.parallel-top{
		display: block;
		width: 8.0rem;
		height: 11.84rem;
		background: url('../../assets/auth2.png');
		background-size: contain;
	}
	.fast-top{
		display: block;
		width: 8.0rem;
		height: 11.933333rem;
		background: url('../../assets/auth3.png');
		background-size: contain;
	}
	.new-reward,.new-cost{
		font-size: 0.426667rem;
		line-height: 0.533333rem;
		text-align: center;
		color: #fff;
		margin:0 auto;
		overflow: hidden;
	}
	.new-reward span{
		display: block;
		margin-top: 0.2rem;
	}
	.anchor-icon{
		display: block;
		width: 8.0rem;
		height: 0.96rem;
		background: url('../../assets/auth.png');
		background-size: contain;
		margin: 0.533333rem auto 0.15rem auto;
	}

	.layer-mask{
		position: fixed;
		top: 50%;
		left: 50%;
		margin-left: -3.6rem;
		margin-top: -1.6rem;
		width: 7.2rem;
		height: 3.2rem;
		background: #fff;
		border-radius: 0.133333rem;
		overflow: hidden;
	}
	.layer-ct{
		position: relative;
		width: 7.2rem;
		height: 3.2rem;
	}
	.layer-tit{
		font-size: 0.4rem;
		line-height: 0.6rem;
		padding: 0.6rem;
	}
	.layer-btn{
		position: absolute;
		right: 0;
		bottom: -0.026667rem;
		width: 100%;
		background: #f5f5f5;
		font-size: 0.453333rem;
		height: 1.173333rem;
		line-height: 1.173333rem;
	}
	.layer-btn span{
		width: 50%;
		display: block;
		float: left;
		text-align: center;
	}
	.layer-btn span.layer-link{
		background: #d6ab55;
		color: #fff;
	}
	
</style>