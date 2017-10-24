<template>
    <div class="rating_pages">
		<!--头部-->
		<header class="user-tit">
			<a @click="resetIndex" href="javascript:;" class="white-lt"></a>优惠券
		</header>
		<!--订单提醒-->
	    <section class="remind" v-scroll="getMore" ref="load">
	        <div class="remind-item" v-for="(item,index) in infoData">
		        <router-link  :to="'/coupon/'">
		            <div class="remind-tit">{{item.created_at}}</div>
		            <div class="remind-cts">
		                <div class="remind-tp">{{item.content_header}}</div>
		                <div class="remind-bt">
		                    <p class="remind-autos">{{item.content}}：<span>{{item.content1}}</span></p>
		                    <p class="remind-stat">
		                        <i class="white-rt"></i>
		                        {{item.content_footer}}
		                    </p>
		                </div>
		            </div>
		        </router-link>    
	        </div>
	    </section>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                //初始数据结构
                typeName:this.$route.name, //当前页面name
                typeId:3, //用户信息分类
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
		        	var arr = response.body.data.list;
		        	for(var i=0;i<arr.length;i++){
				    	var content = arr[i].content_body.split('：');
				    	arr[i].content = content[0];
				    	arr[i].content1 = content[1];
				    } 
		            this.infoData = this.infoData.concat(response.body.data.list);
	                this.lastPage = response.body.data.page.last_page;
	                this.switchShow=!this.switchShow;
	                this.loadingData = !this.loadingData;

		        }).catch(function (error) {
		            console.log("请求失败了");
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
				}, 100);
			},
			init: function () {
				this.moreFn(this.nowPage);
			}
            
        },
        mounted(){
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
/*订单提醒*/
.remind-item{
	background:#f5f5f5;
}
.remind{
	padding-bottom:0.666667rem;
}
.remind-tit{
	padding-top:0.4rem;
	text-align:center;
	color:#999;
	font-size:0.346667rem;
}
.remind-cts{
	background:#fff;
	width:8.586667rem;
	padding:0 0.133333rem;
	margin:0.4rem auto 0 auto;
}
.remind-tp{
	color:#2c2c2c;
	padding:0.533333rem 0.2rem;
	font-size:0.426667rem;
	border-bottom:1px solid #eee;
	font-weight:bold;
}
.remind-bt{
	padding:0.533333rem 0.2rem;
}
.remind-autos{
	width:7.333333rem;
	height:0.6rem;
	line-height:0.6rem;
	font-size:0.4rem;
	overflow:hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}
.remind-autos span{
	color:#d5aa5c;
}
.remind-stat{
	font-size:0.32rem;
	color:#999;
	margin-top:0.4rem;
	width:100%;
}
.remind-stat span{
	color:#fc3036;
}
.remind-stat i{
	float:right !important;
}
.color-red{
	color:#ff6469;
}
.color-green{
	color:#70d788;
}
.loading{
	text-align:center;
	line-height:1.0rem;
	font-size:0.266667rem;
}
{
	color:#d7a95b;
}
</style>
