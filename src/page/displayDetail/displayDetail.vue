<template>
    <div class="rating_page">
		<!--头部-->
		<header class="user-tit">
			<a @click="resetIndex" href="javascript:;" class="white-lt"></a>展车详情
		</header>
		<!--展车详情-->
	    <section class="details-wrap">
		    <div>
		        <div class="details-tit" v-show="timeShow">
		            <h4 v-if="orderInfo.status=='4'"><span>{{orderInfo.remaining}}后自动确认收货</span>{{statusText}}</h4>
		            <h4 v-else><span>{{orderInfo.remaining}}</span>{{statusText}}</h4>
		            <p v-if="orderInfo.status=='27'">原因：{{orderInfo.auditInstructions}}</p>
		        </div>
		        <div class="details-tit" v-show="!timeShow">
		            <h4>{{statusText}}</h4>
		            <!--<p v-show="orderInfo.auditInstructions">{{orderInfo.auditInstructions}}</p>-->
		        </div>
		        <div class="order-ct">
		            <div class="order-full">
		                <h3>{{orderInfo.name}}</h3>
		                <p class="interior">{{orderInfo.color}}</p>
		                <p class="payment"><em> &times;{{orderInfo.num}}</em>指导价：<span>{{orderInfo.price}}元</span></p>
		                <p class="car-vin" v-if="orderInfo.vinNumber && orderInfo.status !='8'"><span>{{vinActive}}</span>车辆VIN码：{{orderInfo.vinNumber}}</p>
		            </div>
		            <p class="leave" v-show="orderInfo.remark">
		                <span>买家留言：</span>{{orderInfo.remark}}
		            </p>
		        </div>
		    </div>
	        <div class="details-addres">
	            <div class="receipt-title">收货信息</div>
	            <div class="details-user">
	                <span>{{address.phone}}</span>收货人：{{address.name}}
	            </div>
	            <p>收货地址：{{address.address}}</p>
	        </div>
	        <div class="request-ct ">
	            <p class="remit-tit">保证金</p>
	            <p :class="paymentActive ? 'bond active':'bond'"><span>{{payment}}</span>支付状态：</p>
	            <p class="bond"><span>￥{{capitalInfo.totalPrice}}</span>金额：</p>
	            <p class="bond"><span>-￥{{capitalInfo.coupon}}</span>优惠券抵扣(不可开票)：</p>
	            <!--<p class="bond"><span>-{{capitalInfo.deposit}}</span>保证金：</p>-->
	            <p class="bond active bond-bt" v-if="orderInfo.status != 5 && orderInfo.status != 28 && orderInfo.status != 10 && orderInfo.status != 4 && orderInfo.status != 3 && orderInfo.status != 9&& orderInfo.status != 11 && orderInfo.status != 8"><span>￥{{capitalInfo.deduction}}</span>需付款：</p>
	            <p class="bond bond-bt" v-else><span>￥{{capitalInfo.deduction}}</span>实付款：</p>
	            <div v-if="orderInfo.status != 6 && orderInfo.status != 11 && orderInfo.status != 10">
		            <div class="ayment-info" v-if="bankInfo.accountType == 2">
			            <p>
		                    <label>付款人：</label>
		                    <span>{{bankInfo.companyName}}</span>
		                </p>
		                <p>
		                    <label>银行：</label>
		                    <span>{{bankInfo.bankName}}</span>
		                </p>
		                <p :class=" huang ? 'send-phone huang':'send-phone'" @click="sendMes" v-if="orderInfo.status=='7'||orderInfo.status=='27'">{{sendText}}</p>
	                  	<router-link :to="{name:'payment',params:{id:orderInfo.orderNum}}" v-if="orderInfo.status=='8'|| orderInfo.status=='3'|| orderInfo.status=='4'|| orderInfo.status=='5'|| orderInfo.status=='28'||orderInfo.status=='9'">
	                    	<p class="ayment-details">查看详情</p>
	                  	</router-link>
		            </div>
		            <div class="ayment-info" v-else-if="bankInfo.accountType == ''">
			            <p>
		                    <label>汇款银行：</label>
		                    <span>{{bankInfo.bankName}}</span>
		                </p>
		                <p>
		                    <label>公司名称：</label>
		                    <span>{{bankInfo.companyName}}</span>
		                </p>
		                <p>
		                    <label>账号：</label>
		                    <span>{{bankInfo.account}}</span>
		                </p>
		                <p :class=" huang ? 'send-phone huang':'send-phone'" @click="sendMes" v-if="orderInfo.status=='7'||orderInfo.status=='27'">{{sendText}}</p>
	                  	<router-link :to="{name:'payment',params:{id:orderInfo.orderNum}}" v-if="orderInfo.status=='8'|| orderInfo.status=='3'|| orderInfo.status=='4'|| orderInfo.status=='5'|| orderInfo.status=='28'||orderInfo.status=='9'">
	                    	<p class="ayment-details">查看详情</p>
	                  	</router-link>
		            </div>
		            <div v-else>
		                <div class="send-to">
		                	<p>
			                    <label>汇款单位：</label>
			                    <span>{{bankInfo.companyName}}</span>
			                </p>
			                <p>
			                    <label>开户行：</label>
			                    <span>{{bankInfo.bankName}}</span>
			                </p>
			                <p :class=" huang ? 'send-phone huang':'send-phone'" @click="sendMes" v-if="orderInfo.status=='7'||orderInfo.status=='27'">{{sendText}}</p>
	                  		<router-link :to="{name:'payment',params:{id:orderInfo.orderNum}}" v-if="orderInfo.status=='8'||orderInfo.status=='3'||orderInfo.status=='4'||orderInfo.status=='5'||orderInfo.status=='28' ||orderInfo.status=='9'">
	                    		<p class="ayment-details">查看详情</p>
	                  		</router-link>
			            </div>
			            <div class="nstructions" v-if="orderInfo.status!='8'&&orderInfo.status!='3'&&orderInfo.status!='4'&&orderInfo.status!='5'&&orderInfo.status!='9'&&orderInfo.status!='28'">
			                <span>汇款说明：</span>
			                <em>1.汇款后请上传汇款凭证</em>
			                <em>2.未按时间付款的订单系统将自动取消</em>
			            </div>
		            </div>
	            </div>
	        </div>
	        <router-link :to="{name:'orderDetail',params:{id:orderInfo.balanceOrderNumber}}">
	        	<div class="replen" v-if="orderInfo.balanceOrderNumber"><i class="white-rt"></i>补款订单：{{orderInfo.balanceOrderNumber}}</div>
	        </router-link>
	        <div class="record" v-if="record.length">
	            <span>展车记录</span>
	            <span class="record-time" v-for="(item,index) in record"><em>{{cancelTime(item)}}</em>{{item.des}}：</span>
	        </div>
	        <div class="website" v-show="process">
	            <span>退订展车流程</span>
	            <span class="website-info">1.联系服务顾问沟通退车事宜</span>
	            <span class="website-info">2.办理接车及退款手续</span>
	        </div>
	        <p class="cancel" v-show="carCancel" @click="maskShow = !maskShow">取消申请</p>
	        <p class="cancel" v-show="vanShow" @click="vanLayer">退订展车</p>
	        <div v-show="btmBtn">
		        <p class="visib-98"></p>
		        <div class="remits-fixed active" v-if="orderInfo.status == '8'">{{btnText}}</div>
		        <div class="remits-fixed" v-if="orderInfo.status == '5'" @click="balanceConfrim">
		        	{{btnText}}
		        </div>
		        <div class="remits-fixed" @click="confirmCar" v-if="orderInfo.status == '4'">{{btnText}}</div>
		        <div class="remits-fixed" v-if="orderInfo.status=='7'||orderInfo.status=='27'" @click="paymentSubmit">
	              	提交汇款凭证
	          	</div>

	        </div>
	    </section>
	    <!-- 取消展车 -->
		<div class="mask" v-show="maskShow">
	        <div class="cancel-car">
	            <p class="prompt-tit">确认取消申请展车吗？</p>
	            <p class="prompt-btn">
		            <span @click="maskShow = !maskShow">点错了</span>
		            <span @click="cancelOrder" class="confirm">确认取消</span>
	            </p>
	        </div>
    	</div>
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
		<!-- 退订展车 -->
	    <div class="unsub-mask" v-show="vanMask">
	        <div class="unsub-ct">
	            <div class="unsub-tp">{{vanInfo.title}}</div>
	            <div class="unsub-adviser">
	                <span>{{vanInfo.phone}}</span>{{vanInfo.name}}<em>{{vanInfo.position}}</em>
	            </div>
	            <p class="unsub-btn">
	                <span @click="vanMask = !vanMask">取消</span>
	                <span class="active"><a :href="'tel:'+vanInfo.phone">拨打电话</a></span>
	            </p>
	        </div>
	    </div>
		<alert-tip v-if="showAlert" @closeTip = "showAlert = false" :alertText="alertText"></alert-tip>
    </div>
</template>

<script>
import alertTip from '../../components/common/alertTip/alertTip'
    export default {
        data () {
            return {
              	//初始数据结构
               	orderNum:this.$route.params.id,//订单号
              	Token:sessionStorage.getItem('token'),
              	maskShow:false, //弹框显示
              	orderInfo:{}, //订单信息
              	bankInfo:{}, //银行信息
              	capitalInfo:{}, //保证金
              	record:[], //申请时间
              	address:{}, //收货地址
              	statusText:null, //状态
              	timeShow:false, //是否有倒计时
              	countNum:0,
              	payment:'已支付', //支付状态
              	paymentActive:false,
              	vinActive:'待发货',//车辆VIN编码状态
              	btmBtn:false, //底部按钮
              	btnText:'提交汇款凭证', //按钮文字
              	process:false, //退订流程
              	carCancel:false, //取消展车是否显示
              	receiptShow:false, //确认收货是否显示
              	receiptData:{}, //确认收货弹框数据
              	vanShow:false, //是否有显示退订展车
              	vanMask:false, //是否显退订示弹框
              	vanInfo:{}, //展车退订弹框数据
              	sendText:'发送到手机',
              	showAlert:false,  //错误弹出窗
		      	alertText:null, //错误提醒信息
		      	huang:true
            }
        },
        components:{
	    	alertTip
	    },
        methods:{
            //组件方法
            resetIndex(){
	            if(sessionStorage.infoUrl == 'resultSuccess'){
			        this.$router.push({name:'resultSuccess'});
			    }else{
			        var data = this.$store.getters.getOrderURL;
		            this.$router.push({
		                path:"/" + data.tag +"/"+ data.id
		            });
			    }

            },
            paymentSubmit(){
            	this.$router.push({name:'paymentSubmit'});
            	this.$store.dispatch("RETURN_DATA", // 通过store传值
                  {
                      orderNum:this.orderInfo.orderNum,
                      orderId:this.orderInfo.id
                  }
                );
              this.$store.dispatch("PAYMENT_URL", // 通过store传值
                {
                  tag:"displayDetail",
                  id:this.orderInfo.orderNum
                }
              );
              },
              balanceConfrim(){
                this.$router.push({name:'balanceConfrim'});
                this.$store.dispatch("SPARE_DATA", // 通过store传值
                  {
                      orderNum:this.orderInfo.orderNum,
                      deposit:this.capitalInfo.deduction
                  }
                );
              this.$store.dispatch("SUCCESS_URL",{
                  tag:"displayDetail",
                  id:this.orderInfo.orderNum
              });//补余款进来标识
            },
            fullData(){
            	var data = {
	                token:this.Token,
	                order_num:this.orderNum
	            }
	            this.$http({
	                url:"order/show/detail",
	                method:"GET",
	                params:data
	            }).then(function (response) {
	                this.address = response.body.data.address;
	                this.bankInfo = response.body.data.bankInfo;
	                for(var i in response.body.data.capitalInfo){
		              response.body.data.capitalInfo[i]=Number(response.body.data.capitalInfo[i]).toLocaleString();
		              var arr=response.body.data.capitalInfo[i].split('.');
		              if(arr[1]){
		                if(arr[1].length==2){
		                  arr[1]=arr[1];
		                }else if(arr[1].length==1){
		                  arr[1]=arr[1]+'0';
		                }else{
		                  arr[1]=arr[1].substring(0,2);
		                }
		              }else{
		                arr[1]='00';
		              }
		              response.body.data.capitalInfo[i]=arr.join('.');
		            }
	                this.capitalInfo =response.body.data.capitalInfo ;
	                this.record = response.body.data.record;
	                this.statusAactive = response.body.data.orderInfo;
	                this.statusAdd(this.statusAactive);
	                this.orderInfo=response.body.data.orderInfo;
	            }).catch(function (error) {
	                this.showAlert = true;
           			this.alertText = error.body.msg||"请求失败了"
	            });
            },
            statusAdd(item){
            	if(item.status == 28){
           			this.statusText = '补款中';
           			this.vinActive = '审核中';
           			this.process = !this.process;
            	}else if(item.status == 7){
            		if(item.remainingTime == '' || item.remainingTime == '0'){
            			this.statusText = '已取消';
	            		this.payment = '未支付';
	            		this.paymentActive = !this.paymentActive;
	            		this.timeShow = false;
	            		this.btmBtn = false;
	            		this.carCancel = false;
            		}else{
            			this.statusText = '等待支付保证金';
	            		this.countNum=item.remainingTime;
		                item.remaining=this.remaining;
		                this.remainingTime(item);
		                this.payment = '未支付';
		                this.paymentActive = !this.paymentActive;
	            		this.timeShow = !this.timeShow;
	            		this.btmBtn = !this.btmBtn;
	            		this.carCancel = !this.carCancel;
            		}
            	}else if(item.status == 27){
            		this.statusText = '请重新提交';
            		this.countNum=item.remainingTime;
	                item.remaining=this.remaining;
	                this.remainingTime(item);
	                this.payment = '未支付';
	                this.paymentActive = !this.paymentActive;
            		this.timeShow = !this.timeShow;
            		this.btmBtn = !this.btmBtn;
            		this.carCancel = !this.carCancel;
            	}else if(item.status == 8){
            		this.statusText = '付款审核中，请耐心等待';
            		this.payment = '等待审核';
            		this.btmBtn = !this.btmBtn;
            	}else if(item.status == 3){
            		this.statusText = '车辆出库中';
            	}else if(item.status == 4){
            		this.statusText = '车辆在途';
            		this.countNum=item.remainingTime;
	                item.remaining=this.remaining;
	                this.remainingTime(item);
	                this.vinActive = '已发货';
	                this.payment = '已支付';
	                this.paymentActive = !this.paymentActive;
            		this.timeShow = !this.timeShow;
            		this.btmBtn = !this.btmBtn;
            		this.btnText = '确认收货'
            	}else if(item.status == 5){
            		this.statusText = '展车在展';
            		this.vinActive = '在展';
            		this.btnText = '补余款';
            		this.timeShow = false;
            		this.btmBtn = !this.btmBtn;
            		this.process = !this.process;
            		this.vanShow = !this.vanShow;
            	}else if(item.status == 6){
            		this.statusText = '已取消';
            		this.payment = '未支付';
            		this.paymentActive = !this.paymentActive;
            		this.timeShow = false;
            		this.btmBtn = false;
            		this.carCancel = false;
            	}else if(item.status == 9){
            		this.statusText = '已购买';
            		this.vinActive = '已购买';
            	}else if(item.status == 10){
            		this.statusText = '展车退订已受理，等待接车';
            		this.payment = '正在退款';
            		this.vinActive = '退订受理';
            		this.process = !this.process;
            	}else if(item.status == 11){
            		this.statusText = '已完成退车';
            		this.payment = '已退款';
            		this.vinActive = '已退车';
            	}

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

            },
            cancelTime(item){ //毫秒数转换成时间
            	var that=this;
				var unixTimestamp = new Date(parseInt(item.time)*1000) ;

				Date.prototype.toLocaleString = function() {
			        return this.getFullYear() + "-" + (this.getMonth() + 1) + "-" + this.getDate() + " " + that.toDouble(this.getHours() )+ ":" + that.toDouble(this.getMinutes());
			    };
			    var commonTime = unixTimestamp.toLocaleString();
			    return commonTime;
            },
            toDouble(num){
		        if(num>9){
		          return num;
		        }else{
		          return '0'+num;
		        }
		      },
            cancelOrder(){//取消申请展车
            	this.orderInfo.status = 6;
            	this.maskShow = !this.maskShow;
            	var data = {
	                token:this.Token,
	                order_num:this.orderInfo.orderNum
	            }
	            this.$http.post(
	                "order/full/cancel",data
	            ).then(function (response) {
	            	this.statusText = '已取消';
            		this.payment = '未支付';
            		this.paymentActive = !this.paymentActive;
            		this.timeShow = false;
            		this.btmBtn = false;
            		this.carCancel = false;
	            }).catch(function (error) {
	                this.showAlert = true;
           			this.alertText = error.body.msg||"请求失败了"
	            });
            },
            confirmCar(){ //确认收货弹框信息
				this.receiptShow = !this.receiptShow;
				var data = {
	                token:this.Token,
	                orderNum:this.orderInfo.orderNum
	            }
	            this.$http({
	                url:"order/full/receiptDetail",
	                method:"GET",
	                params:data
	            }).then(function (response) {
	            	this.receiptData = response.body.data;
	            }).catch(function (error) {
	                this.showAlert = true;
           			this.alertText = error.body.msg||"请求失败了"
	            });
            },
            receiptStatus(){
            	this.orderInfo.status = 5;
            	this.receiptShow = !this.receiptShow;
            	var data = {
	                token:this.Token,
	                goods_stock_id:this.receiptData.id
	            }
	            this.$http.post(
	                "order/full/receipt",data
	            ).then(function (response) {
	            	//该状态
	            	this.statusText = '展车在展';
            		this.vinActive = '在展';
            		this.btnText = '补余款';
            		this.timeShow = false;
            		this.btmBtn = true;
            		this.process = !this.process;
            		this.vanShow = !this.vanShow;
	            }).catch(function (error) {
	                this.showAlert = true;
           			this.alertText = error.body.msg||"请求失败了"
	            });
            },
            vanLayer(){ //展车退订
            	this.vanMask = !this.vanMask;
            	var data = {
	                token:this.Token,
	                orderNum:this.orderNum
	            }
	            this.$http({
	                url:"order/show/unsubscribeContact",
	                method:"GET",
	                params:data
	            }).then(function (response) {
	                this.vanInfo = response.body.data;
	            }).catch(function (error) {
	                this.showAlert = true;
           			this.alertText = error.body.msg||"请求失败了"
	            });
            },
            sendMes(){
            	if(this.huang){
			        this.$http.post("message/send",{
			          	token:sessionStorage.token,
			          	content:'汇款信息：'+'\n'+'汇款银行：'+this.bankInfo.bankName+'\n'+'公司名称:'+this.bankInfo.companyName+'\n'+'汇款账户:'+this.bankInfo.account,
			          	phone:''
			        }).then(function (response) {
			            var num=60;
			            let timer = setInterval(()=>{
			              	num--;
			              	this.huang = false;
			              	this.sendText = num+"s";
			              	if(!num){
				                this.sendText = "发送到手机";
				                this.huang = true;
				                clearInterval(timer);
				                return false;
			              	}
			            },1000);
			        }).catch(function (error) {
			            this.showAlert = true;
	           			this.alertText = error.body.msg||"请求失败了"
			        });
		        }
   			},
        },
        mounted(){
        //组件初始完成需要做什么
            this.fullData();
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
		},
		beforeRouteEnter(to, from, next){
		    next(vm => {
			    if(/*from.name == 'resultSuccess' || */from.name == 'paymentSubmit'){
		            sessionStorage.infoUrl = 'resultSuccess';
		        }else{
		            sessionStorage.infoUrl = '';
		        }
		    });
		}


    }
</script>

<style>
/*展车详情*/
.pending p{
	text-align:center;
	font-size:0.453333rem;
	color:#999;
	margin-top:6.666667rem;
}
.receipt-title{
	font-size:0.453333rem;
	color:#2c2c2c;
	border-bottom:1px solid #eee;
	padding-bottom:0.533333rem;
	margin-bottom:0.533333rem;
}
.details-tit{
	padding:0.533333rem 0.4rem;
	background:#d5aa5c;
}
.details-tit h4{
	font-size:0.506667rem;
	color:#fff;
	line-height:0.533333rem;
}
.details-tit h4 span{
	float:right;
	font-size:0.346667rem;
}
.details-tit p{
	font-size:0.346667rem;
	color:#fff;
	margin-top:0.533333rem;
}
.details-addres{
	padding:0 0.4rem 0.533rem 0.4rem;
	background:#fff;
	margin-bottom:0.4rem;
	font-size:0.4rem;
	color:#2c2c2c;
	position:relative;
}
.details-user span{
	float:right;
}
.details-addres p{
	margin-top:0.533333rem;
	color:#999;
}
.details-addres .white-rt{
	position:absolute;
	right:0.4rem;
	top:1.306667rem;
}
.order-ct{
	padding:0.533333rem 0.4rem;
	background:#fff;
}
.order-number{
	font-size:0.373333rem;
	color:#999;
	overflow:hidden;
	padding-bottom:0.533333rem;
	border-bottom:1px solid #e0e0e0;
}
.order-number span{
	float:right;
}
.leave{
    border-bottom: 1px solid #e0e0e0;
    overflow: hidden;
    padding: 0.533333rem 0;
}
.order-full h3 {
    font-size: 0.426667rem;
}
.order-full .interior {
    color: #999;
    font-size: 0.346667rem;
    margin-top:0.133rem;
}
.order-full .payment {
    border-bottom: 1px solid #e0e0e0;
    color: #2c2c2c;
    font-size: 0.373333rem;
    padding: 0.533333rem 0;
}
.order-full .payment span{
    color: #fc3036;
}
.order-full .payment em{
	float:right;
}
.order-full .payment,.order-full .car-vin{
    border-bottom: 1px solid #e0e0e0;
    color: #2c2c2c;
    overflow:hidden;
    font-size:0.373333rem;
    padding: 0.533333rem 0;
}
.order-full .car-vin span{
	color:#999;
	float:right;
}
.leave{
	font-size:0.32rem;
	color:#999;
}
.leave span{
	color:#2c2c2c;
}
.request-ct{
	padding:0 0.4rem;
	background:#fff;
	margin-top:0.4rem;
	overflow:hidden;
}
.remit-tit{
	font-size:0.453333rem;
	padding:0.533333rem 0;
	border-bottom:1px solid #e0e0e0;
}
.bond{
	font-size:0.373333rem;
	color:#999;
	margin-top:0.533333rem;
}
.bond-bt{
	padding-bottom:0.533333rem;
}
.bond span{
	float:right;
}
.bond.active{
	color:#2c2c2c;
}
.bond.active span{
	color:#fc3036;
}
.settlement p:last-child{
	color:#2c2c2c;
}
.settlement p:last-child span{
	color:#fc3036;
}
.send-to{
	border:1px solid #d5aa5c;
	margin:0 auto 0.533333rem;
}
.send-to p{
	overflow:hidden;
	font-size:0.4rem;
	color:#2c2c2c;
	margin-top:0.533333rem;
}
.send-to p label,.send-to span{
	display:block;
	float:left;
}
.send-to p label{
	color:#999;
	width:2.266667rem;
	text-align:right;
}
.send-to span{
	width:6.333333rem;
}
.nstructions{
	color:#999;
	font-size:0.32rem;
	padding-bottom:0.4rem;
	border-bottom:1px solid #e0e0e0;
	line-height:0.6rem;
}
.nstructions span,.nstructions em{
	display:block;
}
.nstructions em{
	padding-left:0.266667rem;
}
.cancel{
	text-align:center;
	padding:0.4rem 0;
	font-size:0.453333rem;
	color:#2c2c2c;
	background:#fff;
}
.mask{
	width:100%;
	height:100%;
	background:rgba(0,0,0,0.8);
	position:fixed;
	left:0;
	top:0;
}
.cancel-car{
	position:fixed;
	width:7.2rem;
	height:3.733333rem;
	background:#fff;
	border-radius:0.133333rem;
	overflow:hidden;
	left:50%;
	top:50%;
	margin-top:-1.866667rem;
	margin-left:-3.6rem;
}
.prompt-tit{
	text-align:center;
	font-size:0.453333rem;
	color:#2c2c2c;
	margin:0.986667rem 0;
}
.prompt-btn{
	background:#f5f5f5;
	overflow:hidden;
	height:1.173333rem;
	line-height:1.173333rem;
}
.prompt-btn span{
	display:block;
	width:50%;
	float:left;
	text-align:center;
	font-size:0.453333rem;
}
.prompt-btn span.confirm{
	background:#d6ab55;
	color:#fff;
}
.record{
	background:#fff;
	padding-bottom:0.4rem;
	margin-top:0.4rem;
}
.record span{
	display:block;
	padding:0.533333rem 0.4rem;
	font-size:0.453333rem;
	color:#2c2c2c;
	border-bottom:1px solid #e0e0e0;
}
.record span em{
	float:right;
	color:#999;
}
.record span.record-time{
	font-size:0.373333rem;
}

/*第二种状态*/
.ayment-info{
	border:1px solid #d5aa5c;
	margin:0 0 0.533333rem 0;
}
.ayment-info a{
	display:block;
}
.ayment-info p {
    color: #2c2c2c;
    font-size: 0.4rem;
    margin-top: 0.533333rem;
    overflow: hidden;
}
.ayment-info p label, .ayment-info span {
    display: block;
    float: left;
}
.ayment-info p label {
    color: #999;
    text-align: right;
    width: 2.26667rem;
}
.ayment-info span {
    width: 6.33333rem;
}
.ayment-details {
    background: #f5f5f5;
    font-size: 0.453333rem;
    height: 1.17333rem;
    line-height: 1.17333rem;
    text-align: center;
}

.send-to p.send-phone ,.ayment-info p.send-phone{
	font-size:0.453333rem;
	color:#fff;
	text-align:center;
	height:1.173333rem;
	line-height:1.173333rem;
	background: #dbdbdb;
}
.ayment-info p.send-phone.huang{
  background:#d5aa5c;
}
/*退订展车*/
.website{
	background:#fff;
	margin-top:0.4rem;
	padding-bottom:0.533333rem;
}
.website span{
	display:block;
	padding:0.533333rem 0.4rem;
	font-size:0.453333rem;
	color:#2c2c2c;
	border-bottom:1px solid #e0e0e0;
}
.website span.website-info{
	font-size:0.373333rem;
	color:#999;
	border:none;
	padding:0.533333rem 0.4rem 0 0.4rem;
}

/*补款订单*/
.replen{
	margin-top:0.4rem;
	padding:0.533333rem 0.4rem;
	font-size:0.373333rem;
	color:#d5aa5c;
	background:#fff;
	overflow:hidden;
}
.replen i{
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

/*退订弹框*/
.unsub-mask{
	position:fixed;
	left:0;
	top:0;
	width:100%;
	height:100%;
	background:rgba(0,0,0,0.8);
}
.unsub-ct{
	position:fixed;
	left:50%;
	top:50%;
	margin-left:-3.6rem;
	margin-top:-2.866667rem;
	width:7.2rem;
	background:#fff;
	overflow:hidden;
	border-radius:0.133333rem;
}
.unsub-tp{
	width:4.133333rem;
	height:1.733333rem;
	margin:0.866667rem auto 0.533333rem auto;
	border-bottom:1px solid #2c2c2c;
	font-size:0.453333rem;
	color:#2c2c2c;
	line-height:0.6rem;
	padding:0 0.533333rem;
	text-align:center;
}
.unsub-adviser{
	padding:0 0.533333rem;
	font-size:0.346667rem;
	color:#2c2c2c;
	margin-bottom:1.066667rem;
}
.unsub-adviser em{
	color:#999;
	margin-left:0.266667rem;
}
.unsub-adviser span{
	float:right;
}
.unsub-btn{
	background:#f5f5f5;
	height:1.173333rem;
}
.unsub-btn span{
	display:block;
	float:left;
	width:50%;
	text-align:center;
	font-size:0.453333rem;
	line-height:1.173333rem;
}
.unsub-btn span.active{
	color:#fff;
	background:#d6ab55;
}
.remits-fixed a{
	color:#fff;
}
</style>
