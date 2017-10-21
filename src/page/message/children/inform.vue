<template>
    <div class="rating_pages">
		<!--头部-->
		<header class="user-tit">
			<a @click="resetIndex" href="javascript:;" class="white-lt"></a>通知提醒
		</header>
		<!--订单提醒-->
	    <section class="notice" v-scroll="getMore">
	        <div class="notice-item" v-for="(item,index) in infoData">
	        	<div v-if="item.content_body !='通知'">
		            <div class="notice-tit">{{item.created_at}}</div>
			            <div class="notice-ct" @click=refresh(item.url)>
			                <div class="notice-tp">{{item.content_header}}</div>
			                <div v-if="item.content_body" class="notice-bt"><i class="white-rt" v-if="item.type != 603"></i> {{item.content_body}}</div>
			            </div>
		        </div>
		        <div v-else>
		            <div class="notice-tit">{{item.created_at}}</div>
		            <div class="notice-ct">
		                <div class="notice-tp">{{item.content_header}}</div>
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
		        	console.log(response)
		            this.infoData = this.infoData.concat(response.body.data.list);
	                this.lastPage = response.body.data.page.last_page;
	                this.loadingData = !this.loadingData;

		        }).catch(function (error) {
		            console.log("请求失败了");
		        });
            },
            getMore: function () {
				if(this.nowPage >= this.lastPage){
				}else{
					if(this.loadingData){
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
         	this.moreFn(this.nowPage);
        },
        directives: {// 自定义指令
			scroll: {
				bind: function (el, binding){
					window.addEventListener('scroll', function () {
						clearTimeout(this.scrollTimer);
						this.scrollTimer = setTimeout(function(){
							var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
							if(scrollTop + window.innerHeight >= el.clientHeight ) {
								var fnc = binding.value;
								fnc();
							}
						}, 1000);
					})
				}
			}
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
}
.notice-bt{
	padding:0.533333rem 0.4rem;
	font-size:0.4rem;
	color:#2c2c2c;
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

