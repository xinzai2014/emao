<template>
    <div class="rating_pages">
		<!--头部-->
		<header class="user-tit">
			<a @click="resetIndex" href="javascript:;" class="white-lt"></a>中转库变动提醒
		</header>
		<!--订单提醒-->
	    <section class="notice" v-scroll="getMore" ref="load">
	        <div class="notice-item" v-for="(item,index) in infoData">
		        <router-link  :to="'/storage/'">
		            <div class="notice-tit">{{item.created_at}}</div>
		            <div class="notice-ct">
		                <div class="notice-tp">{{item.content_header}}</div>
		                <div class="notice-bt"><i class="white-rt"></i> {{item.content_body}}</div>
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
                typeId:5, //用户信息分类
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
/*通知*/
.notice-item{
	background:#f5f5f5;
}
.notice-tit{
	padding-top:0.4rem;
	color:#999;
	font-size:0.346667rem;
	text-align:center;
}
.notice-ct{
	background:#fff;
	width:8.933333rem;
	margin:0.4rem auto 0 auto;
}
.notice-tp{
	padding:0.8rem 0.4rem;
	font-size:0.426667rem;
	border-bottom:1px solid #eee;
	font-weight:bold;
}
.notice-bt{
	padding:0.533333rem 0.4rem;
	font-size:0.346667rem;
	color:#2c2c2c;
	line-height:0.4rem;
}
.notice-bt i{
	float:right;
}
.notice-bt span{
	color:#fc3036;
	margin-left:0.266667rem;
}
.loading{
	text-align:center;
	line-height:1.0rem;
	font-size:0.266667rem;
}
</style>
