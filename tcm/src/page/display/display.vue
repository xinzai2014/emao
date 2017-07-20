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
	                <p class="payment">需付保证金：<span>{{item.price}}元</span></p>
	                <div class="full-state">
	                    <div class="state-lt wait-active">
	                        <p class="state-wait">等待付款</p>
	                        <p class="state-time">剩余：{{item.remainingTime}}</p>
	                    </div>
	                    <div class="state-rt">提交汇款凭证</div>
	                </div>
	            </div>
	            <!-- <div class="full-item">
	                <h3>奇瑞 艾瑞泽3 2015款 1.5L 自动够炫版</h3>
	                <p class="interior">闪光黑/黑色内饰</p>
	                <p class="payment">需付保证金：<span>29,000.00元</span></p>
	                <div class="full-state">
	                    <div class="state-lt">
	                        <p class="state-wait">付款审核中</p>
	                    </div>
	                    <div class="state-rt active">提交汇款凭证</div>
	                </div>
	            </div>
	            <div class="full-item">
	                <h3>奇瑞 艾瑞泽3 2015款 1.5L 自动够炫版</h3>
	                <p class="interior">闪光黑/黑色内饰</p>
	                <p class="payment">需付保证金：<span>29,000.00元</span></p>
	                <div class="full-state">
	                    <div class="state-lt wait-active">
	                        <p class="state-wait">请重新提交</p>
	                        <p class="state-time">剩余：23小时21分钟自动取消</p>
	                    </div>
	                    <div class="state-rt">提交汇款凭证</div>
	                </div>
	            </div>
	            <div class="full-item">
	                <h3>奇瑞 艾瑞泽3 2015款 1.5L 自动够炫版</h3>
	                <p class="interior">闪光黑/黑色内饰</p>
	                <p class="payment payment-active">已付保证金：<span>29,000.00元</span></p>
	                <div class="full-state">
	                    <div class="state-lt">
	                        <p class="state-wait">车辆出库中</p>
	                    </div>
	                </div>
	            </div>
	            <div class="full-item">
	                <h3>奇瑞 艾瑞泽3 2015款 1.5L 自动够炫版</h3>
	                <p class="interior">闪光黑/黑色内饰</p>
	                <p class="payment">已付保证金：<span>29,000.00元</span></p>
	                <div class="full-state">
	                    <div class="state-lt">
	                        <p class="state-wait">车辆在途</p>
	                    </div>
	                    <div class="state-rt">确认收货</div>
	                </div>
	            </div> -->
	        </div>
	        <!-- <div class="condition">
	            <div class="condition-tit">
	                <b>在展</b>
	            </div>
	            <div class="full-item">
	                <h3>奇瑞 艾瑞泽3 2015款 1.5L 自动够炫版</h3>
	                <p class="interior">闪光黑/黑色内饰</p>
	                <p class="payment payment-active">需付保证金：<span>29,000.00元</span></p>
	                <div class="full-state">
	                    <div class="state-lt">
	                        <p class="state-wait">展车在展</p>
	                    </div>
	                    <div class="state-rt">补余款</div>
	                </div>
	            </div>
	            <div class="full-item">
	                <h3>奇瑞 艾瑞泽3 2015款 1.5L 自动够炫版</h3>
	                <p class="interior">闪光黑/黑色内饰</p>
	                <p class="payment payment-active">需付保证金：<span>29,000.00元</span></p>
	                <div class="full-state">
	                    <div class="state-lt">
	                        <p class="state-wait">补款中</p>
	                    </div>
	                    <div class="state-rt active">补余款</div>
	                </div>
	            </div>
	            <div class="full-item">
	                <h3>奇瑞 艾瑞泽3 2015款 1.5L 自动够炫版</h3>
	                <p class="interior">闪光黑/黑色内饰</p>
	                <div class="full-state">
	                    <div class="state-lt">
	                        <p class="state-wait">展车退订已受理，等待接车</p>
	                    </div>
	                </div>
	            </div>
	        </div> -->
	        <div class="branch">
	            <p><i class="white-rt"></i>退订&取消展车</p>
	            <p><i class="white-rt"></i>已购展车</p>
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
                switchShow:false,
        		games: []
                
            }
        },
        methods:{
            //组件方法
            resetIndex(){
                this.$router.push({name:'profile'});
            },
            fullData(){
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
	                this.games = response.body.data.list
	            }).catch(function (error) {
	                console.log("请求失败了");
	            });
            }
            
        },
        mounted(){
        //组件初始完成需要做什么
        	this.fullData();
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
.full-item p{
	max-height:9999px;
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
