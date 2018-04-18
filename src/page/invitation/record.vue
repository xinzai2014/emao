<template>
	<div class="record">
		<div class="record-top">
			<div class="record-top-l">
				<p>
					<span class="number">200</span><span class="zi">元</span>
				</p>
				<p>累计奖励优惠券</p>
			</div>
			<div class="record-top-r">
				<p>
					<span class="number">2</span><span class="zi">人</span>
				</p>
				<p>成功邀请</p>
			</div>
		</div>	
		<div class="invitation">
			<div class="invitation-btn">去邀请好友获得更多奖励</div>
			<div class="invitation-list">
				<div class="invitation-title">
					<ul>
						<li>时间</li>
						<li>姓名</li>
						<li>手机号</li>
						<li>我获得的奖励</li>
					</ul>
				</div>
				<div class="invitation-in">
					<ul>
						<li>
							<span>2018-09-09</span>
							<span>巴拉巴拉巴拉</span>
							<span>13111111111</span>
							<span>200元优惠券</span>
						</li>
						<li>
							<span>2018-09-09</span>
							<span>巴拉巴拉巴拉</span>
							<span>13111111111</span>
							<span>200元优惠券</span>
						</li>
						<li>
							<span>2018-09-09</span>
							<span>巴拉巴拉巴拉</span>
							<span>13111111111</span>
							<span>200元优惠券</span>
						</li>
						<li>
							<span>2018-09-09</span>
							<span>巴拉巴拉巴拉</span>
							<span>13111111111</span>
							<span>200元优惠券</span>
						</li>
						<li>
							<span>2018-09-09</span>
							<span>巴拉巴拉巴拉</span>
							<span>13111111111</span>
							<span>200元优惠券</span>
						</li>
					</ul>
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
		    	token:sessionStorage.token
		    }
		},
		methods:{
			fullData(){
            	var data = {
			        token:this.token
			    }
            	this.$http({
			        url:"dealer/show",
			        method:"GET",
			        params:data
			    }).then(function (response) { 
			    	var data = response.body.data;
			    	console.log(data);

			    },function(){
			    })
            }
		},
		mounted(){
			//组件初始化
	        this.fullData();
		}
	}

</script>
<style>
	html,body{	
		height: 100%;
	}
	.record{
		width: 100%;
		height: 100%;
		background: #241e2a;
	}
	.record-top{
		width: 100%;
		height: 1.893333rem;
		padding-top: 0.933333rem;
		overflow: hidden;
		background: #fff;
	}
	.record-top p{
		text-align:center;
		width: 100%;
		margin: 0 auto;
	}
	.record-top-l{
		width: 50%;
		float: left;
	}
	.number{
		font-size: 0.426667rem;
		color: #000;
		margin-right:0.066667rem; 
	}
	.zi{
		font-size: 0.293333rem;
		color: #000;
	}
	.record-top-l p:nth-of-type(2){
		font-size: 0.32rem;
		line-height: 0.826667rem;
		color: #999999;
	}
	.record-top-r{
		width: 50%;
		float: left;
	}
	.record-top-r p:nth-of-type(2){
		font-size: 0.32rem;
		line-height: 0.826667rem;
		color: #999999;
	}
	.invitation{
		width: 100%;
		background: #241e2a;
		padding-top: 0.653333rem;
		overflow: hidden;
	}
	.invitation-btn{
		width: 6.8rem;
		line-height: 1.173333rem;
		background: #f8dd50;
		border-radius: 0.666667rem;
		text-align: center;
		font-size: 0.4rem;
		margin: 0 auto;
		margin-bottom: 0.666667rem;
	}
	.invitation-list{
		width: 9.2rem;
		height: 10.053333rem;
		border-radius: 0.133333rem;
		background: #fff;
		margin: 0 auto;
	}
	.invitation-title ul{
		overflow: hidden;
		border-radius: 0.133333rem 0.133333rem 0 0;
	}
	.invitation-title li{
		line-height: 1.066667rem;
		font-size: 0.32rem;
		text-align: center;
		color: #000;
		width: 25%;
		background: #feee8f;
		float: left;
	}
	.invitation-in li{
		height: 1.04rem;		
		color: #000;
		border-bottom: 1px solid #e0e0e0;
	}
	.invitation-in li span{
		font-size: 0.32rem;
		display: inline-block;
		width: 24%;
		line-height: 1.04rem;
		text-align: center;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
</style>