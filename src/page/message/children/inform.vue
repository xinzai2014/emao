<template>
    <div class="rating_pages">
		<!--头部-->
		<header class="user-tit">
			<a @click="resetIndex" href="javascript:;" class="white-lt"></a>通知提醒
		</header>
		<!--订单提醒-->
	    <section class="notice" v-scroll="getMore" ref="load">
	        <div class="notice-item" v-for="(item,index) in infoData">
	        	<div v-if="item.content_body !='通知'">
		            <div class="notice-tit">{{item.created_at}}</div>
			            <div class="notice-ct" @click="refresh(item.url)">
			                <div v-if="item.content_header" class="notice-tp">{{item.content_header}}</div>
			                <div v-if="item.content_body" class="notice-bt notice-bts"><i class="white-rt" v-if="item.type != 603"></i> {{item.content_body}}</div>
			            </div>
		        </div>
		        <div v-else>
		        	<div v-if="item.type ==603">
			            <div class="notice-tit">{{item.created_at}}</div>
			            <div class="notice-ct">
			                <div class="notice-tp">{{item.content_header}}</div>
			            </div>
		            </div>
		            <!--<div v-else>-->
			            <!--<div class="notice-tit">{{item.created_at}}</div>-->
			            <!--<div class="notice-ct">-->
			            	<!--<router-link v-if="item.type == 607" :to="{name:'soldCarDetail',params:{id:item.order_num}}">-->
				                <!--<div class="notice-tp notice-tps"><i class="white-rt"></i>{{item.content_header}}</div>-->
				                <!--&lt;!&ndash; <div v-if="item.content_body" class="notice-bt notice-bts"><i class="white-rt"></i> {{item.content_body}}</div> &ndash;&gt;-->
				            <!--</router-link>-->
				            <!--<router-link v-else :to="{path:'/rejectDeclare',query:{id:item.order_num}}">-->
				                <!--<div class="notice-tp notice-tps"><i class="white-rt"></i> {{item.content_header}}</div>-->
				                <!--&lt;!&ndash; <div v-if="item.content_body" class="notice-bt notice-bts"><i class="white-rt"></i> {{item.content_body}}</div> &ndash;&gt;-->
				            <!--</router-link>-->
				        <!--</div>-->
			             <!-- -->
		            <!--</div>-->


					<div v-else-if="item.type ==607">
						<div class="notice-tit">{{item.created_at}}</div>
						<div class="notice-ct">
							<router-link :to="{name:'soldCarDetail',params:{id:item.order_num}}">
								<div class="notice-tp notice-tps"><i class="white-rt"></i>{{item.content_header}}</div>
							</router-link>
						</div>
					</div>



					<div v-else-if="item.type ==608">
						<div class="notice-tit">{{item.created_at}}</div>
						<div class="notice-ct">
							<router-link :to="{path:'/rejectDeclare',query:{id:item.order_num}}">
								<div class="notice-tp notice-tps"><i class="white-rt"></i> {{item.content_header}}</div>
							</router-link>
						</div>
					</div>


					<div v-else-if="item.type ==617">
						<div class="notice-tit">{{item.created_at}}</div>
						<div class="notice-ct">
							<router-link :to="{name:'/empower/empowerSuccess'}">
								<div class="notice-tp notice-tps"><i class="white-rt"></i>{{item.content_header}}</div>
							</router-link>
						</div>
					</div>



					<div v-else="item.type ==618">
						<div class="notice-tit">{{item.created_at}}</div>
						<div class="notice-ct">
							<router-link :to="{path:'/empower'}">
								<div class="notice-tp notice-tps"><i class="white-rt"></i> {{item.content_header}}</div>
							</router-link>
						</div>
					</div>



		        </div>
	        </div>
	        <div  class="frameCon translateY" v-show="showFrame">
				<div class="user-tit">
					<i class="white-lt" @click="closeFrame"></i>
				</div>
				<div class="buy-agreement-con">
			 		<iframe :src = "frameURL"  class="frame" scrolling="auto"></iframe>
			 	</div>
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
                typeId:6, //用户信息分类
                infoData:[],
                token : sessionStorage.token,
	           	perPage : 10, //每页条数，默认10
	            nowPage : 1, //第几页
	            lastPage : 0,
	            loadingData : false,
	            showFrame:false,
	      		frameURL:"",
				scrollTimer: null
                
            }
        },
        methods:{
            //组件方法
            resetIndex(){
                this.$router.push({name:'message'});
            },
            refresh(url){
		  		this.showFrame = true;
		  		this.frameURL = url;
		  		document.body.style.overflow = 'hidden';
		  		document.body.style.position = 'fixed';
		  	},
		  	closeFrame(){
		  		this.showFrame = false;
		  		document.body.style.overflow = 'inherit';
		  		document.body.style.position = 'initial';
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
	cursor:pointer;
	overflow:hidden;
}
.notice-ct a{
	display:block;
}
.notice-tp{
	padding:0.8rem 0.4rem;
	font-size:0.426667rem;
	border-bottom:1px solid #eee;
	font-weight:bold;
}
.notice-bts{
	padding:0.533333rem 0.8rem 0 0.4rem;
	font-size:0.4rem;
	color:#2c2c2c;
	max-height:1.1rem;
	overflow:hidden;
	margin-bottom:0.533333rem;
	position:relative;
}
.notice-tps{
	position:relative;
	padding:0.533333rem 0.8rem 0.4rem 0.4rem;
}
.notice-bts i,.notice-tps i{
	position: absolute;
	top: 0;
	bottom: 0;
	right: 0.4rem;
	margin:auto;

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
.frameCon{
	position:fixed;
	top:0;
	left:0;
	right:0;
	bottom:0;
	width:100%;
	height:100%;
	background:#FFF;
	z-index:20;
	transform:translateX(100%);
	-webkit-user-select: none;
	-moz-user-select: none;
}

.buy-agreement-con{
    -webkit-overflow-scrolling: touch;
    overflow-y: scroll;
    height:94%;
}
.frame{
    width:100%;
    border:none;
    height:100%;
}
</style>

