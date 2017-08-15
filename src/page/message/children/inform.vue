<template>
    <div class="rating_page">
		<!--头部-->
		<header class="user-tit">
			<a @click="resetIndex" href="javascript:;" class="white-lt"></a>通知
		</header>
		<!--订单提醒-->
	    <section class="notice" v-scroll="getMore">
	        <div class="notice-item" v-for="(item,index) in infoData">
	            <div class="notice-tit">{{item.created_at}}</div>
	            <div class="notice-ct">
	                <div class="notice-tp">{{item.content_header}}</div>
	                <div class="notice-bt"><i class="white-rt" v-if="item.type != 603"></i> {{item.content_body}}</div>
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
/*通知*/
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
