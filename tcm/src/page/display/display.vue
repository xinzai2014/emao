<template>
    <div class="rating_page">
		<!--头部-->
		<header class="user-tit">
			<a @click="resetIndex" href="javascript:;" class="white-lt"></a>我的展车
		</header>
		<!--我的展车-->
	    <section class="full-wrap">
	        <div class="condition">
	            <div class="condition-tit">
	                <b>申请中</b>
	            </div>
	            <div class="full-item" v-for="(item,index) in games">
	                <h3>{{item.name}}</h3>
	                <p class="interior">{{item.color}}</p>
	                <p class="payment" v-if="item.status == 7 || item.status ==2">需付保证金：<span>{{item.price}}元</span></p>
	                <p class="payment payment-active" v-else>已付保证金：<span>{{item.price}}元{{item.status}}</span></p>
	                <div class="full-state">
	                    <div class="state-lt wait-active">
	                        <p class="state-wait">{{item.waitActive}}</p>
	                        <p class="state-time"  v-if="item.status == 7 || item.status ==27">剩余：{{remaining(item)}} {{item.times}}</p>
	                    </div>
	                    <div v-if="item.status != 3" :class="item.status == 8? 'state-rt active' : 'state-rt'">{{item.btnActive}}</div>
	                </div>
	            </div>
	        </div>
	        <div class="branch">
	            <router-link to="/cancel"><p><i class="white-rt"></i>退订&取消展车</p></router-link>
	            <router-link to="/purchase"><p><i class="white-rt"></i>已购展车</p></router-link>
	        </div>
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
        		countNum:900
                
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
		                		continue;
		                	}else if(this.arr[i] == 3){
							  	list[a].waitActive = '出库中';
							  	list[a].btnActive = '审核通过';
		                		continue;
		                	}else if(this.arr[i] == 4){
							  	list[a].waitActive = '在途';
							  	list[a].btnActive = '等待收货';
		                		continue;
		                	} else if(this.arr[i] == 5){
		                		list[a].waitActive = '在展';
							  	list[a].btnActive = '收货成功';
		                		continue;
		                	}else if(this.arr[i] == 6){
							  	list[a].waitActive = '退订';
							  	list[a].btnActive = '取消展车申请';
		                		continue;
		                	}else if(this.arr[i] == 7){
							  	list[a].waitActive = '等待付款';
							  	list[a].btnActive = '提交汇款凭证';
		                		continue;
		                	}else if(this.arr[i] == 8){
							  	list[a].waitActive = '补款中';
							  	list[a].btnActive = '补款中';
		                		continue;
		                	}else if(this.arr[i] == 9){
							  	list[a].waitActive = '已购买';
								list[a].btnActive = '补余款凭证通过';
		                		continue;
		                	}else if(this.arr[i] == 10){
							  	list[a].waitActive = '退订展车';
								list[a].btnActive = '在展车辆退订';
		                		continue;
		                	}else if(this.arr[i] == 11){
							  	list[a].waitActive = '已完成退车';
								list[a].btnActive = '退订展车完成';
		                		continue;
		                	}else if(this.arr[i] == 28){
							  	list[a].waitActive = '补款中';
							  	list[a].btnActive = '补款中';
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
            remainingTime(){
                clearInterval(this.timer);
                this.timer = setInterval(() => {
                    this.countNum --;
                    if (this.countNum == 0) {
                        clearInterval(this.timer);                    
                    }
                }, 1000);
            },
            //转换时间成分秒
            remaining: function (item){
            	this.countNum = item.remainingTime;
            	let days = parseInt(this.countNum / 60 / 60 / 24, 10); //天
                let hours = parseInt(this.countNum / 60 / 60 % 24, 10); //时
                let minute = parseInt(this.countNum / 60 % 60, 10); //分
                if (hours < 10) {
                    hours = '0' + hours;
                }
                if (minute < 10) {
                    minute = '0' + minute;
                }
                return days + '天' + hours + '时' + minute + '分'
            },
            //订单返回时间秒分分别处理
           /* numTime: function (){
                if (this.time.toString().indexOf('分钟') !== -1) {
                    return parseInt(this.time)*60;
                }else{
                    return parseInt(this.time);
                }
            }*/
        },
        mounted(){
        //组件初始完成需要做什么
        	this.showData();
        	//this.countNum -= this.numTime;
            this.remainingTime();
        	
        }
    }   
</script>

<style>
/*返利资金*/
body,html{
	background:#fff;
}
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
