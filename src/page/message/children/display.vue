<template>
    <div class="rating_page">
		<!--头部-->
		<header class="user-tit">
			<a @click="resetIndex" href="javascript:;" class="white-lt"></a>展车提醒
		</header>
		<!--订单提醒-->
	    <section class="remind" v-scroll="getMore">
	        <div class="remind-item" v-for="(item,index) in infoData">
		        <router-link  :to="'/displayDetail/'+item.order_num">
		            <div class="remind-tit">{{item.created_at}}</div>
		            <div :class="isActive(item)">
		                <div class="remind-tp">{{item.content_header}}</div>
		                <div class="remind-bt">
		                    <p class="remind-auto">购买车辆：{{item.content_body}}</p>
		                    <p class="remind-stat" v-if="item.type == 201">
		                        <i class="white-rt"></i>
		                        需支付：{{item.content_footer}}
		                    </p>
		                    <p class="remind-stat" v-else>
		                        <i class="white-rt"></i>
		                        {{item.content_footer}}
		                    </p>
		                </div>
		            </div>
		        </router-link>
	        </div>
	    </section>
	    <p class="loading" v-show="switchShow">数据已加载完</p>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                //初始数据结构
                typeName:this.$route.name, //当前页面name
                typeId:2, //用户信息分类
                infoData:[],
                token : sessionStorage.token,
	           	perPage : 10, //每页条数，默认10
	            nowPage : 1, //第几页
	            lastPage : 0,
	            switchShow :false, //加载更多
	            loadingData : false
                
            }
        },
        methods:{
            //组件方法
            resetIndex(){
                this.$router.push({name:'message'});
            },
            moreFn(itemIndex){
		        var data = {
		            token:this.token, 
		            typeId:this.typeId,
		            perPage:this.perPage,
		            page:itemIndex         
		        }
		        this.$http({
		            url:"dealerMessage/detail",
		            method:"GET",
		            params:data
		        }).then(function (response) {
		        	console.log(response);
		            this.infoData = this.infoData.concat(response.body.data.list);
	                this.lastPage = response.body.data.page.last_page;
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
			},
			isActive(item){
				if(item.type == 204){ //已取消
					return 'remind-ct remind-green'
				}else if(item.type == 201){ //未支付
					return 'remind-ct remind-red'
				}else{
					return 'remind-ct'
				}
			}
            
        },
        mounted(){
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
/*订单提醒*/
.remind{
	padding-bottom:0.666667rem;
}
.remind-tit{
	padding-top:0.4rem;
	text-align:center;
	color:#999;
	font-size:0.346667rem;
}
.remind-ct{
	background:#fff;
	width:8.586667rem;
	padding:0 0.133333rem;
	margin:0.4rem auto 0 auto;
	border-radius:0.133333rem;
	border-left:0.053333rem solid #ccc;
}
.remind-tp{
	color:#2c2c2c;
	padding:0.533333rem 0.2rem;
	font-size:0.426667rem;
	border-bottom:1px solid #eee;
}
.remind-bt{
	padding:0.533333rem 0.2rem;
}
.remind-auto{
	width:7.333333rem;
	height:0.4rem;
	line-height:0.4rem;
	font-size:0.4rem;
	overflow:hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}
.remind-stat{
	font-size:0.4rem;
	color:#999;
	margin-top:0.4rem;
}
.remind-stat span{
	color:#fc3036;
}
.remind-stat i{
	float:right;
}
.remind-red{
	border-color:#ff6469;
}
.remind-green{
	border-color:#70d788;
}
.loading{
	text-align:center;
	line-height:1.0rem;
	font-size:0.266667rem;
}
</style>
