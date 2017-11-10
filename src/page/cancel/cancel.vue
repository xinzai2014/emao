<template>
    <div class="rating_page">
		<!--头部-->
		<header class="user-tit">
			<a @click="resetIndex" href="javascript:;" class="white-lt"></a>已退展车
		</header>
		<!--退订展车-->
	    <section v-if="infoData.length" class="bought" v-scroll="getMore" ref="load" @click="cancelUrl">
	        <div class="bought-item" v-for="(item,index) in infoData">
	            <router-link :to="{name:'displayDetail',params:{id:item.orderNum}}">
		            <div class="bought-ct bought-bt">
		                <p class="bought-tit">{{item.name}}</p>
		                <p class="bought-color">{{item.color}}</p>
		            </div>
		            <p class="bought-spend" v-if="item.status == 6">已取消</p>
		            <p class="bought-spend" v-else><span>交接时间：{{cancelTime(item)}}</span>已退订</p>
	            </router-link>
	        </div>
	    </section>
	    <section class="no-auto server-no-response" v-else>
            <img src="../../assets/no-order.png" alt="">
            <p>暂无展车</p>
        </section>
    </div>
</template>
<script>
    export default {
        data () {
            return {
	            //初始数据结构
	            infoData:[],
	            token : sessionStorage.token,
	           	perPage : 10, //每页条数，默认10
	            nowPage : 1, //第几页
	            lastPage : 0,
	            switchShow :false, //加载更多
	            loadingData : false,
				scrollTimer: null

            }
        },
        methods:{
            //组件方法
            resetIndex(){
                this.$router.push({name:'display'});
            },
            cancelTime(item){ //毫秒数转换成时间
				var unixTimestamp = new Date(parseInt(item.time)*1000) ;
				Date.prototype.toLocaleString = function() {
			        return this.getFullYear() + "-" + (this.getMonth() + 1) + "-" + this.getDate() + " " + this.getHours() + ":" + this.getMinutes() + ":" + this.getSeconds();
			    };
			    var commonTime = unixTimestamp.toLocaleString();
			    return commonTime;
            },
            moreFn: function (itemIndex) {
				var data = {
	                token : this.token,
	                perPage : this.perPage,
	                page : itemIndex
	            }
	            this.$http({
	                url:"order/show/unsubscribe",
	                method:"GET",
	                params:data
	            }).then(function (response) {
	                this.infoData = this.infoData.concat(response.body.data.list);
	                this.lastPage = response.body.data.page.lastPage;
	                this.switchShow=!this.switchShow;
	                this.loadingData = !this.loadingData;
	            }).catch(function (error) {
	               
            	});
			},
			getMore: function (el) {
				clearTimeout(this.scrollTimer);
				this.scrollTimer = setTimeout(() => {
					var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
					if(scrollTop + window.innerHeight >= this.$refs.load.clientHeight ) {
		                if(this.nowPage >= this.lastPage){
		                  this.switchShow=this.switchShow;
		                }else{
		                  if(this.loadingData){
		                    this.switchShow=!this.switchShow;
		                    this.nowPage = parseInt(this.nowPage)+1;
		                    this.moreFn(this.nowPage);
		                    this.loadingData = !this.loadingData;
		                  }
		                }
					}
				}, 0);
			},
			init: function () {
				this.moreFn(this.nowPage);
			},
            cancelUrl(){
            	this.$store.dispatch("ORDER_URL",{
                  tag:"cancel",
                  id:""
                });
            }
        },
        mounted(){
        //组件初始完成需要做什么
            this.moreFn(this.nowPage);

        },
        directives: {// 自定义指令
			scroll: {
	        	inserted: function (el, binding){
	          		window.addEventListener('scroll',binding.value,false);
				}
			}
		},
		beforeRouteLeave(to,form,next){
	      	window.removeEventListener('scroll',this.getMore,false);
	      	next();
	    }
    }   
</script>
<style>
/*已购展车*/
.bought-item{
	padding:0.533333rem 0.4rem;
	background:#fff;
	overflow:hidden;
	border-bottom:1px solid #c0c0c0;
}
.bought-item:last-child{
	border-bottom:none;
}
.bought-tit{
	font-size:0.453333rem;
	color:#2c2c2c;
}
.bought-color{
	font-size:0.346667rem;
	color:#999;
	margin-top:0.266667rem;
}
.bought-ct{
	padding-bottom:0.533333rem;
	border-bottom:1px solid #e0e0e0;
}
.bought-bt{
	border-bottom:none;
}
.bought-state{
	padding-top:0.533333rem;
	font-size:0.373333rem;
}
.bought-state span,.bought-spend{
	color:#fc3036;
}
.bought-spend{
	font-size:0.373333rem;
	padding-top:0.533333rem;
}
.bought-spend span{
	float:right;
	font-size:0.32rem;
	color:#999;
}
.loading{
	text-align:center;
	line-height:1.0rem;
	font-size:0.266667rem;
}
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
</style>
