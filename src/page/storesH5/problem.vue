<template>
	<div class="problem-wrap">
		<header class="brand-list-header header-fixed" v-show="titHide">
			<i class="white-lt brand-left-cion"></i> 
			<strong class="brand-list-title">几个小问题</strong>
		</header>
		<div class="problem-bg">
			<div class="problem-ct">
				<h3>{{linkName}}</h3>
				<p><span>{{identityName}}</span>{{companyName}}</p>
				<p class="counp-num">
					<span v-for="(item,index) in couponArr">您已获得{{item}}</span>
				</p>
			</div>
			<span class="problem-btn">领取优惠券</span>
			<span class="problem-icon"></span>
		</div>
	</div>
</template>
<script>
	export default {
		data () {
		    return{
		    	titHide:true, //是否显示导航
		    	token:'',
		    	companyName:'', //公司名称
		    	linkName:'',//用户名称
		    	identity:'',//职位
		    	couponStr:'',//优惠券
		    	couponArr:[], //优惠券数组
		    	identityName:'',//职位转汉字
		    }
		},
		methods:{
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
            },
            dataFun(){//数据处理
            	if(this.identity == 1){
            		this.identityName = '总经理'
            	}else if(his.identity == 2){
            		this.identityName = '销售主管'
            	}else if(his.identity == 3){
            		this.identityName = '其他'
            	}
            	var arr = this.couponStr.split(";");
            	for(var i = 0;i<arr.length;i++){
				    if(arr[i]==''||arr[i]==null||typeof(arr[i])==undefined){
				        arr.splice(i,1);
				        i=i-1;
				    }
				}
				this.couponArr = arr;
            	//console.log(manageTypeList);
            }

		},
		mounted(){
			//组件初始化
			this.token = this.$route.query.token||sessionStorage.token;
			this.companyName = this.$route.query.companyName;
	    	this.linkName = this.$route.query.linkName;
	    	this.identity = this.$route.query.identity;
	    	this.couponStr = this.$route.query.couponStr;
	    	this.dataFun();
		    if(this.$route.query.token){
	            this.titHide = false;
        		document.title='几个小问题';
	        }
	        
		}
	}

</script>
<style>
	.problem-wrap{
		width: 100%;
		height: 100%;
		background: #feeda4;
		position: absolute;
		left: 0;
		bottom: 0;
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
	.problem-bg{
		background: url('../../assets/problem.png');
		height: 16.08rem;
		width: 10.0rem;
		background-size: contain;
	}
	.problem-ct{
		width: 7.36rem;
		height: auto;
		margin:0 auto;
		padding-top:0.466667rem;
		overflow: hidden;
	}
	.problem-ct h3{
		font-size: 0.533333rem;
		line-height: 0.8rem;
		color: #ca5d28;
	}
	.problem-ct p{
		font-size: 0.32rem;
		line-height: 0.5rem;
		color: #ca5d28;
	}
	.problem-ct p span{
		margin-right: 0.333333rem;
	}
	.counp-num{
		margin: 6.0rem auto 0 auto;
		text-align: center;
		color: #d24053;
	}
	.counp-num span{
		display: block;
		width: 100%;
		font-size: 0.453333rem;
		line-height: 0.6rem;
	}
	.problem-btn{
		width: 6.666667rem;
		height: 1.173333rem;
		display: block;
		color: #fff;
		font-size: 0.453333rem;
		line-height: 1.173333rem;
		background: #f5596e;
		margin: 0.4rem auto 0 auto;
		border-radius: 0.586667rem;
		text-align: center;
	}
	.problem-icon{
		width: 10.0rem;
		height:6.426667rem;
		display: block;
		margin: 0 auto;
		background: url('../../assets/problem-icon.png');
		background-size: contain;
	}
</style>