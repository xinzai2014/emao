<template>
	<div class="record" v-show="recordData!=null">
		<header class="brand-list-header header-fixed" v-show="">
			<i class="white-lt brand-left-cion"></i> 
			<strong class="brand-list-title">邀请好友</strong>
		</header>
		<div class="record-top" v-if="recordData!=null">
			<div class="record-top-l">
				<p>
					<span class="number">{{recordData.couponTotal}}</span><span class="zi">元</span>
				</p>
				<p>累计奖励优惠券</p>
			</div>
			<div class="record-top-r">
				<p>
					<span class="number">{{recordData.invitedNum}}</span><span class="zi">人</span>
				</p>
				<p>成功邀请</p>
			</div>
		</div>	
		<div class="invitation">
			<div class="invitation-btn" @click="toInvitation">去邀请好友获得更多奖励</div>
			<div class="invitation-list">
				<div class="invitation-title">
					<ul>
						<li>时间</li>
						<li>姓名</li>
						<li>手机号</li>
						<li>我获得的奖励</li>
					</ul>
				</div>
				<div class="invitation-in" v-load-more="loaderMore">
					<ul v-for="(item,index) in recordList">	
						<li>
							<span>{{item.date}}</span>
							<span>{{item.userName}}</span>
							<span>{{item.phone}}</span>
							<span>{{item.couponPrice}}元优惠券</span>
						</li>
					</ul>
					<transition name="loading">
		            <div v-show="showLoading" class="center">正在加载中</div>
		          </transition>
		          <p v-if="touchend" class="empty_data">没有更多了</p>
					</div>
				</div>
				</div>
		<section class="no-auto server-no-response" @click="toInvitation" v-if="recordList.length==0">
            <img src="../../assets/record_null.jpg" alt="">
        </section>
	</div>
</template>
<script>
	export default {
		data () {
		    return{
		    	token:'',
		    	recordData:null,
		    	recordList:[],
		    	currentPage:'1',
		        lastPage:'0',
		        perPage:'10',
		        touchend: false,
		        preventRepeatReuqest: false,
		        showLoading:true,
		        activityId:''
		    }
		},
		methods:{
			fullData(){
            	var data = {
			        token:this.token,
			        activityId:this.activityId,
			        perPage:this.perPage,
            		page:this.currentPage, 
			    }
            	this.$http({
			        url:"invited/invitedList",
			        method:"GET",
			        params:data
			    }).then(function (response) { 
			    	this.recordData = response.body.data;
			    	var list=response.body.data.list;
			    	this.recordList=this.recordList.concat(list);
			    	this.currentPage=response.body.data.page.currentPage;
		            this.lastPage=response.body.data.page.lastPage;
		            this.perPage=response.body.data.page.perPage;
		            this.hideLoading();
		            this.preventRepeatReuqest = false;
		            if (this.currentPage === this.lastPage) {
		              this.touchend = true;
		              return
		             }
			    })
            },
            toInvitation(){
            	this.$router.push({name:'invitation',query:{token:this.token,activityId:this.activityId}});
            },
		    loaderMore(){
		      if (this.touchend) {
		        return
		      }
		      //防止重复请求
		      if (this.preventRepeatReuqest) {
		        return 
		      }
		      this.showLoading = true;
		      this.preventRepeatReuqest = true;

		      this.currentPage=parseInt(this.currentPage)+1;
		      this.fullData();   
		    },
		    hideLoading(){
		      this.showLoading = false;
		    }
		},
		mounted(){
			this.token = this.$route.query.token||sessionStorage.token;
			this.activityId=this.$route.query.activityId;
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
	.invitation-in{
		height: 8.5rem;
		overflow-y: scroll;
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
	.no-auto {
	height:100%;
	background:white;
	position:absolute;
	top:0;
	lfet:0;
}
	.no-auto img{
	width:100%;
}
.center{
	text-align: center;
}
.empty_data{
    color:#666;
    text-align: center;
    line-height: 2rem;
  }
</style>