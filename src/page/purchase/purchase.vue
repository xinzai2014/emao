<template>
    <div class="rating_page">
		<!--头部-->
		<header class="user-tit">
			<a @click="resetIndex" href="javascript:;" class="white-lt"></a>已购展车
		</header>
		<!--退订展车-->
	    <section v-if="infoData.length" class="bought" v-scroll="getMore">
	        <div class="bought-item" v-for="(item,index) in infoData">
	            <router-link :to="{name:'displayDetail',params:{id:item.orderNum}}">
		            <div class="bought-ct">
		                <p class="bought-tit">{{item.name}}</p>
		                <p class="bought-color">{{item.color}}</p>
		            </div>
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
	            loadingData : false //是否加载完

            }
        },
        methods:{
            //组件方法
            resetIndex(){
                this.$router.push({name:'display'});
            },
            moreFn: function (itemIndex) {
				var data = {
	                token : this.token,
	                perPage : this.perPage,
	                page : itemIndex
	            }
	            this.$http({
	                url:"order/show/sold",
	                method:"GET",
	                params:data
	            }).then(function (response) {
	            	console.log(response)
	                this.infoData = this.infoData.concat(response.body.data.list);
	                this.lastPage = response.body.data.page.lastPage;
	                this.switchShow=!this.switchShow;
	                this.loadingData = !this.loadingData;
	            }).catch(function (error) {
	                console.log("请求失败了");
            	});
			},
			getMore: function () {
				if(this.nowPage >= this.lastPage){
					this.switchShow=this.switchShow;
				}else{
					if(this.loadingData){
						this.switchShow=!this.switchShow;
						this.nowPage++;
						this.moreFn(this.nowPage);
						this.loadingData = !this.loadingData;
					}
				}
				
			},
			init: function () {
				this.moreFn(this.nowPage);
			}

        },
        mounted(){
        //组件初始完成需要做什么
            this.moreFn(this.nowPage);

        },
        directives: {// 自定义指令
			scroll: {
				bind: function (el, binding){
					window.addEventListener('scroll', function () {
						if(document.body.scrollTop + window.innerHeight >= el.clientHeight) {
							var fnc = binding.value; 
							fnc(); 
						}
					})
				}
			}
		}
    }   
</script>
<style>
/*已购展车*/
.bought-item{
	padding:0.533333rem 0.4rem;
	background:#fff;
	overflow:hidden;
	border-bottom:1px solid #2c2c2c;
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
