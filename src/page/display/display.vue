<template>
    <div class="rating_page">
		<!--头部-->
		<header class="user-tit">
			<a @click="resetIndex" href="javascript:;" class="white-lt"></a>我的展车
		</header>
		<!--我的展车-->
	    <section class="full-wrap">
	        <div class="condition" ref="carWrap" v-show="showGame">
	        	<div class="condition-ct" v-if="games.length">
		            <div class="condition-tit">
		            	<p :class="{'head-fixed':scrollIndex == 0}">
		            		<b>申请中</b>
		            	</p>
		            </div>
		            <div class="full-item" v-for="(item,index) in games">
		            <router-link :to="{name:'displayDetail',params:{id:item.orderNum}}">
		                <h3>{{item.name}}</h3>
		                <p class="interior">{{item.color}}</p>
		                <p class="payment" v-if="item.status == 7 || item.status ==27">需付保证金：<span>{{item.price}}元</span></p>
		                <p class="payment payment-active" v-else>已付保证金：<span>{{item.price}}元</span></p> 
	                </router-link>
	                <div class="full-state">
		                    <div class="state-lt wait-active">
		                        <p class="state-wait">{{item.waitActive}}</p>
		                        <p class="state-time" v-show="item.remainingTime"  v-if="item.status == 7 || item.status ==27">剩余：{{item.remaining}}</p>
		                    </div>
		                    <div v-show="item.btnActive" v-if="item.status != 3" :class="item.status == 8? 'state-rt active' : 'state-rt'" @click="confirmCar(item)">{{item.btnActive}}</div>
		                </div>
		            </div>
	            </div>
	            <div class="condition-ct" v-if="games1.length">
		            <div class="condition-tit">
		                <p :class="games.length ? {'head-fixed':scrollIndex == 1} : {'head-fixed':scrollIndex == 0}">
		            		<b>在展</b>
		            	</p>
		            </div>
		            <div class="full-item" v-for="(item,index) in games1">
		            <router-link :to="{name:'displayDetail',params:{id:item.orderNum}}">
		                <h3>{{item.name}}</h3>
		                <p class="interior">{{item.color}}</p>
		                <p class="payment" v-if="item.status == 7 || item.status ==27">需付保证金：<span>{{item.price}}元</span></p>
		                <p class="payment payment-active" v-else>已付保证金：<span>{{item.price}}元</span></p> 
	                </router-link>
	                <div class="full-state">
		                    <div class="state-lt wait-active">
		                        <p class="state-wait">{{item.waitActive}}</p>
		                        <p class="state-time" v-show="item.remainingTime"  v-if="item.status == 7 || item.status ==27">剩余：{{item.remaining}}</p>
		                    </div>
		                    <div v-show="item.btnActive" v-if="item.status != 3" :class="item.status == 8? 'state-rt active' : 'state-rt'" @click="confirmCar(item)">{{item.btnActive}}</div>
		                </div>
		            </div>
	            </div>
	        </div>
	        <div :class="arr.length >=3 ?'branch default' : 'branch'">
	            <router-link to="/cancel"><p><i class="white-rt"></i>已退展车</p></router-link>
	            <router-link to="/purchase"><p><i class="white-rt"></i>已购展车</p></router-link>
	        </div>
	        <div class="no-auto server-no-response" v-show="!showGame">
	        	<img src="../../assets/no-order.png" alt="">
            	<p>暂无展车</p>
	        </div>
	    </section>
        <alert-tip v-if="showAlert" @closeTip = "showAlert = false" :alertText="alertText"></alert-tip>
    	<!-- 确认收货 -->
    	<div class="mask-receipt" v-show="receiptShow">
	        <div class="receipt">
	            <div class="receipt-tit">
	                <b>{{receiptData.name}}</b>
	                <span>{{receiptData.color}}</span>
	            </div>
	            <p class="receipt-code">{{receiptData.vinNumber}}</p>
	            <div class="options" v-if="receiptData.attachment">
	                <b>请确认随车附件：</b>
	                <p>{{receiptData.attachment}}</p>
	            </div>
	            <div class="receipt-btn"><span class="receipt-close" @click="receiptShow = !receiptShow">取消</span><span @click="receiptStatus">确认收货</span></div>
	        </div>
	    </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                //初始数据结构
                token : sessionStorage.token,
                perPage : 10, //每页条数，默认10
                page : 1, //第几页
        		games: [], //申请中数据
        		games1:[], //在展数据
        		arr:[], //用于判断状态
        		countNum:0,
                showAlert:false,  //错误弹出窗
		      	alertText:null, //错误提醒信息
		      	receiptData:{},
				receiptShow:false,
				showGame:true,
				scrollIndex:-1,
				carScrollHeight:[]
            }
        },
        methods:{
            //组件方法
            resetIndex(){
                this.$router.push({name:'profile'});
            },
            confirmCar(item){ //确认收货弹框信息
            	if(item.status=='4'){
            		this.receiptShow = !this.receiptShow;
					var data = {
		                token:this.token,
		                orderNum:item.orderNum
		            }
		            this.$http({
		                url:"order/full/receiptDetail",
		                method:"GET",
		                params:data
		            }).then(function (response) {
		            	this.receiptData = response.body.data;
		            }).catch(function (error) {
		                this.showAlert = true;
			          	this.alertText = error.body.msg
		            });
	            }
	            if(item.status=='7' || item.status=='27'){
	            	this.$router.push({name:'paymentSubmit'});
	            	this.$store.dispatch("RETURN_DATA", // 通过store传值
			            {
			                orderNum:item.orderNum,
			                orderId:item.id
			            }
		            );
	            }
	            if(item.status=='5'){
	            	this.$router.push({name:'balanceConfrim'});
	            	this.$store.dispatch("SPARE_DATA", // 通过store传值
			            {
			                orderNum:item.orderNum,
			                deposit:item.price
			            }
		            );
		            
	            }
				
            },
            receiptStatus(){
            	this.orderInfo.status = 5;
            	this.receiptShow = !this.receiptShow;
            	var that = this;
            	var data = {
	                token:this.token,
	                goods_stock_id:this.receiptData.id
	            }
	            this.$http.post(
	                "order/full/receipt",data
	            ).then(function (response) {
	            	//该状态
	            	this.showData();
	            }).catch(function (error) {
	                this.showAlert = true;
		          	this.alertText = error.body.msg
	            });
            },
            showData(){
            	var data = {
	            	token:this.token,
	            	perPage:this.perPage,
	            	page:this.page
	            }
	            this.$http({
	                url:"order/show/index",
	                method:"GET",
	                params:data
	            }).then(function (response) {
	                var list = response.body.data.list
	                for(var a in list){
	                	this.arr.push(list[a].status);
                		/*for(var i =0;i<=a;i++){*/
		                	if(list[a].status == 27){
		                		list[a].waitActive = '请重新提交';
						  		list[a].btnActive = '提交汇款凭证';
						  		this.countNum=list[a].remainingTime;
				                list[a].remaining=this.remaining;
				                this.remainingTime(list[a]);
				                this.games.push(list[a]);
		                		continue;
		                	}else if(list[a].status == 3){
							  	list[a].waitActive = '车辆出库中';
							  	list[a].btnActive = '';
							  	this.games.push(list[a]);
		                		continue;
		                	}else if(list[a].status == 4){
							  	list[a].waitActive = '车辆在途';
							  	list[a].btnActive = '确认收货';
							  	this.games.push(list[a]);
		                		continue;
		                	} else if(list[a].status == 5){
		                		list[a].waitActive = '展车在展';
							  	list[a].btnActive = '补余款';
							  	this.games1.push(list[a]);
		                		continue;
		                	}else if(list[a].status == 6){
							  	list[a].waitActive = '已取消';
							  	list[a].btnActive = '';
							  	this.games.push(list[a]);
		                		continue;
		                	}else if(list[a].status == 7){
		                		if(list[a].remainingTime == '' || list[a].remainingTime == '0'){
		                			list[a].waitActive = '已取消';
							  		list[a].btnActive = '';
							  		this.games.push(list[a]);
		                		}else{
		                			list[a].waitActive = '等待支付保证金';
								  	list[a].btnActive = '提交汇款凭证';
								  	this.countNum=list[a].remainingTime;
					                list[a].remaining=this.remaining;
					                this.remainingTime(list[a]);
					                this.games.push(list[a]);
		                		}
		                		continue;
		                	}else if(list[a].status == 8){
							  	list[a].waitActive = '付款审核中';
							  	list[a].btnActive = '';
							  	this.games.push(list[a]);
		                		continue;
		                	}else if(list[a].status == 9){
							  	list[a].waitActive = '已购买';
								list[a].btnActive = '';
								this.games.push(list[a]);
		                		continue;
		                	}else if(list[a].status == 10){
							  	list[a].waitActive = '展车退订已受理，等待接车';
								list[a].btnActive = '';
								this.games1.push(list[a]);
		                		continue;
		                	}else if(list[a].status == 11){
							  	list[a].waitActive = '已完成退车';
								list[a].btnActive = '';
								this.games.push(list[a]);
		                		continue;
		                	}else if(list[a].status == 28){
							  	list[a].waitActive = '补款中';
							  	list[a].btnActive = '';
							  	this.games1.push(list[a]);
		                		continue;
		                	}
		                /*}
*/					}
					if(this.games.length > 0 || this.games1.length > 0){
						this.showGame = this.showGame
					}else{
						this.showGame = !this.showGame;
					}
					setTimeout(()=>{
                        this.countHeight();
                    },100)
	            }).catch(function (error) {
	                this.showAlert = true;
		          	this.alertText = error.body.msg;
	            });
            },
            countHeight(){ //记录初始楼层高度
                const carContainer = this.$refs.carWrap;
                const listArr = Array.from(carContainer.children);
                listArr.forEach((item, index) => {
                    this.carScrollHeight[index] = item.offsetTop;
                });
                var that = this;
                document.addEventListener('scroll',function(){
                    var scrollTop = document.body.scrollTop;
                    that.carScrollHeight.forEach((item,index) => {
                        if(scrollTop>item){
                            that.scrollIndex = index;
                        }
                        if(scrollTop <= 88){
                        	that.scrollIndex = -1;
                        }
                    })
                })
            },
            //计算时间
            remainingTime(item){
                clearInterval(this.timers);
                item.timer = setInterval(() => {
		            if(item.remainingTime != 0) {
			              	item.remainingTime = parseInt(item.remainingTime)-60;
			              	if (item.remainingTime <=0) {
			                  	clearInterval(item.timer);
			                  	item.status=6;
			                  	item.waitActive = '已取消';
								item.btnActive = ''
			              	}	
			              this.countNum=item.remainingTime;
			              item.remaining=this.remaining;  
			            }
			    }, 60000);

            }
        },
        mounted(){
        //组件初始完成需要做什么
        	this.showData();
        	        	
        },
        computed: {
	    //转换时间成小时,分
	    	remaining: function (){
	          	let days = parseInt(this.countNum/60/60/24);
	           	let hours = parseInt((this.countNum-days*3600*24)/60/60);
	          	let minutes = parseInt((this.countNum-hours*3600)/60);
	          	if (hours < 10) {
		              days = '0' + days;
		        }
	          	if (hours < 10) {
	              	hours = '0' + hours;
	          	}
	          	if (minutes < 10) {
	              	minutes = '0' + minutes;
	          	}
	          	if(days){
		            return days + '天' + hours + '小时';
		        }else{
		            return hours + '小时' + minutes + '分钟';
		        }
	      	}        
	  	},
	  	watch:{ 
		    $route(){
		        this.showData();
		    }
		}


    }   
</script>

<style>
.no-auto{
    text-align: center;
    font-size: 0.453333rem;
    padding: 4.0rem 0;
    position: absolute;
    width: 100%;
    left: 0;
}
.no-auto img{display:block;width:3.0667rem;height:3.0667rem;margin:0 auto .4rem;}
.no-auto p{color:#2c2c2c;font-size:.4533rem;line-height:.8667rem;text-align:center;}
.no-auto input{display:block;width:3.893rem;height:1.1733rem;margin:2.3467rem auto 0;color:#d6ab55;font-size:.4533rem;line-height:1.1733rem;text-align:center;background-color:transparent;border:1px solid #d6ab55;border-radius:.533rem;}

/*我的展车*/
.rating_page{
	background:#f5f5f5;
}
.condition-ct{
	overflow:hidden;
	margin-bottom:0.4rem;
}
.full-item{
	padding:0.533333rem 0.4rem;
	border-bottom:1px solid #e0e0e0;
	overflow:hidden;
	background:#fff;
}
.condition-ct .full-item:last-child{
	border-bottom:none;
}
.full-item h3{
	font-size:0.426667rem;
}
.full-item .interior{
	font-size:0.346667rem;
	color:#999;
	margin-top:0.266667rem;
}
.full-item .payment{
	font-size:0.373333rem;
	color:#2c2c2c;
	padding:0.4rem 0;
}
.full-item .payment span,.state-wait{
	color:#fc3036;
}
.full-item .payment.payment-active span{
	color:#2c2c2c;
}
.full-state{
	height:1.066667rem;
	overflow:hidden;
	margin-top:0.533333rem;
}
.state-lt{
	float:left;
	width:6.266667rem;
	line-height:0.533333rem;
	font-size:0.373333rem;
}
.state-time{
	font-size:0.32rem;
	color:#999;
}
.state-rt{
	float:left;
	width:2.773333rem;
	height:1.066667rem;
	line-height:1.066667rem;
	text-align:center;
	color:#fff;
	font-size:0.373333rem;
	background:#d5aa5c;
	border-radius:0.533333rem;
}
.state-wait{
	line-height:1.066667rem;
}
.state-rt.active{
	background:#cccccc;
}
.wait-active .state-wait{
	line-height:0.533333rem;
}
.condition-tit{
	background:#fff;
	height:1.493333rem;
}
.condition-tit p{
	background:#fff;
	height:1.493333rem;
	width:100%;
}
.head-fixed{
	position:fixed;
	left:0;
	top:0;
}
.condition-tit b{
	display:block;
	font-size:0.453333rem;
	padding-left:0.4rem;
	font-weight:normal;
	line-height:1.42rem;
	height:1.42rem;
	width:4rem;
	border-bottom:1px solid #2c2c2c;
}
.condition:last-child .full-item:last-child{
	border-bottom:none;
}
.branch{
	margin-top:0.4rem;
	background:#fff;
	width:100%;
	position:fixed;
	left:0;
	bottom:0;
}
.branch.default{
	position:static;
}
.branch p{
	padding:0.533333rem 0.4rem;
	border-bottom:1px solid #eee;
	font-size:0.346667rem;
	color:#2c2c2c;
	overflow:hidden;
}
.branch p i{
	float:right;
	position:static;
}
/*待收货弹框*/
.mask-receipt{
	width:100%;
	height:100%;
	position:fixed;
	left:0;
	top:0;
	background:rgba(0,0,0,0.8);
}
.receipt{
	width:7.2rem;
	position:fixed;
	left:50%;
	margin-left:-3.6rem;
	top:25%;
	background:#fff;
	border-radius:0.133333rem;
	overflow:hidden;
}
.receipt-tit{
	width:5.026667rem;
	min-height:1.6rem;
	border-bottom:1px solid #2c2c2c;
	margin:0.533333rem auto;
	text-align:center;
}
.receipt-tit b{
	display:block;
	font-size:0.4rem;
	color:#2c2c2c;
}
.receipt-tit span{
	display:block;
	font-size:0.32rem;
	color:#999;
	padding:0.133333rem 0;
}
.receipt-code{
	font-size:0.453333rem;
	color:#d6ab55;
	text-align:center;
	margin-bottom:0.533333rem;
}
.options{
	padding:0 0.533333rem;
	font-size:0.346667rem;
	color:#2c2c2c;
	padding-bottom:0.533333rem;
}
.options b{
	display:block;
	
}
.receipt-btn{
	font-size:0.453333rem;
	color:#fff;
	text-align:center;
	line-height:1.173333rem;
	
}
.receipt-btn span{
	display:inline-block;
	width:50%;
	height:1.173333rem;
	background:#d6ab55;
	cursor:pointer;
}
.receipt-btn span.receipt-close{
	background:#f5f5f5;
	color:#000;
}

 
</style>