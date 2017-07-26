<template>
    <div class="rating_page">
		<!--头部-->
		<header class="user-tit">
			<a @click="resetIndex" href="javascript:;" class="white-lt"></a>我的展车
		</header>
		<!--我的展车-->
	    <section class="full-wrap" v-if="games.length">
	        <div class="condition">
	            <div class="condition-tit">
	                <b>申请中</b>
	            </div>
	            <div class="full-item" v-for="(item,index) in games">
	            <router-link :to="{name:'displayDetail',params:{id:item.orderNum}}">
	                <h3>{{item.name}}</h3>
	                <p class="interior">{{item.color}}</p>
	                <p class="payment" v-if="item.status == 7 || item.status ==2">需付保证金：<span>{{item.price}}元</span></p>
	                <p class="payment payment-active" v-else>已付保证金：<span>{{item.price}}元</span></p>
	                <div class="full-state">
	                    <div class="state-lt wait-active">
	                        <p class="state-wait">{{item.waitActive}}</p>
	                        <p class="state-time"  v-if="item.status == 7 || item.status ==27">剩余：{{item.remaining}}自动取消</p>
	                    </div>
	                    <div v-show="item.btnActive" v-if="item.status != 3" :class="item.status == 8? 'state-rt active' : 'state-rt'">{{item.btnActive}}</div>
	                </div>
                </router-link>
	            </div>
	        </div>
	        <div class="branch">
	            <router-link to="/cancel"><p><i class="white-rt"></i>退订&取消展车</p></router-link>
	            <router-link to="/purchase"><p><i class="white-rt"></i>已购展车</p></router-link>
	        </div>
	    </section>
	    <section class="no-auto server-no-response" v-if="!games.length">
            <img src="../../assets/no-order.png" alt="">
            <p>暂无此类订单</p>
        </section>
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
        		games: [],
        		arr:[], //用于判断状态
        		countNum:0
                
            }
        },
        methods:{
            //组件方法
            resetIndex(){
                this.$router.push({name:'profile'});
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
	            	console.log(response)
	                var list = response.body.data.list
	                for(var a in list){
	                	this.arr.push(list[a].status);
                		for(var i =0;i<=a;i++){
		                	if(this.arr[i] == 27){
		                		list[a].waitActive = '请重新提交';
						  		list[a].btnActive = '提交汇款凭证';
						  		this.countNum=list[a].remainingTime;
				                list[a].remaining=this.remaining;
				                this.remainingTime(list[a]);
		                		continue;
		                	}else if(this.arr[i] == 3){
							  	list[a].waitActive = '出库中';
							  	list[a].btnActive = '';
		                		continue;
		                	}else if(this.arr[i] == 4){
							  	list[a].waitActive = '在途';
							  	list[a].btnActive = '确认收货';
		                		continue;
		                	} else if(this.arr[i] == 5){
		                		list[a].waitActive = '展车在展';
							  	list[a].btnActive = '补余款';
		                		continue;
		                	}else if(this.arr[i] == 6){
							  	list[a].waitActive = '已取消';
							  	list[a].btnActive = '';
		                		continue;
		                	}else if(this.arr[i] == 7){
							  	list[a].waitActive = '等待付款';
							  	list[a].btnActive = '提交汇款凭证';
							  	this.countNum=list[a].remainingTime;
				                list[a].remaining=this.remaining;
				                this.remainingTime(list[a]);
		                		continue;
		                	}else if(this.arr[i] == 8){
							  	list[a].waitActive = '待付款审核中';
							  	list[a].btnActive = '提交汇款凭证';
		                		continue;
		                	}else if(this.arr[i] == 9){
							  	list[a].waitActive = '已购买';
								list[a].btnActive = '';
		                		continue;
		                	}else if(this.arr[i] == 10){
							  	list[a].waitActive = '展车退订已受理，等待接车';
								list[a].btnActive = '';
		                		continue;
		                	}else if(this.arr[i] == 11){
							  	list[a].waitActive = '已完成退车';
								list[a].btnActive = '';
		                		continue;
		                	}else if(this.arr[i] == 28){
							  	list[a].waitActive = '补款中';
							  	list[a].btnActive = '补余款';
		                		continue;
		                	}
		                }
					}
					this.games = list
	            }).catch(function (error) {
	                console.log("请求失败了");
	            });
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
	          	let hours = parseInt(this.countNum/60/60);
	          	let minutes = parseInt((this.countNum-hours*3600)/60);
	          	if (hours < 10) {
	              	hours = '0' + hours;
	          	}
	          	if (minutes < 10) {
	              	minutes = '0' + minutes;
	          	}
	          	return hours + '小时' + minutes + '分钟';
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
.no-auto{background-color: #fff;
    text-align: center;
    font-size: 0.453333rem;
    padding: 4.0rem 0;
    position: absolute;
    width: 100%;
    left: 0;
    height: 100%;}
.no-auto img{display:block;width:3.0667rem;height:3.0667rem;margin:0 auto .4rem;}
.no-auto p{color:#2c2c2c;font-size:.4533rem;line-height:.8667rem;text-align:center;}
.no-auto input{display:block;width:3.893rem;height:1.1733rem;margin:2.3467rem auto 0;color:#d6ab55;font-size:.4533rem;line-height:1.1733rem;text-align:center;background-color:transparent;border:1px solid #d6ab55;border-radius:.533rem;}

/*我的展车*/
.full-item{
	padding:0.533333rem 0.4rem;
	border-top:1px solid #2c2c2c;
	overflow:hidden;
	background:#fff;
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
	border-bottom:1px solid #e0e0e0;
	padding:0.533333rem 0;
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
	padding:0.533333rem 0.4rem;
	border-top:1px solid #2c2c2c;
	background:#fff;
}
.condition-tit b{
	display:block;
	font-size:0.453333rem;
	border-left:0.066667rem solid #2c2c2c;
	padding-left:0.4rem;
	font-size:0.453333rem;
	font-weight:normal;
	line-height:0.466667rem;
}
.condition:last-child .full-item:last-child{
	border-bottom:none;
}
.branch{
	margin-top:0.4rem;
	background:#fff;
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
}

</style>
