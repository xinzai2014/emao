<template>
    <div class="rating_pages">
		<!--头部-->
		<header class="user-tit">
			<a @click="resetIndex" href="javascript:;" class="white-lt"></a>账户资金变动提醒
		</header>
	    <!--账户资金变动提醒-->
	    <section class="change" v-scroll="getMore">
	        <div class="change-item" v-for="(item,index) in infoData">
	        	<div v-if="item.order_num">
	        		<router-link  :to="'/orderDetail/'+item.url">
			            <p class="change-tit">{{item.created_at}}</p>
			            <div class="change-ct">
			                <p class="change-tp">{{item.content_header}}</p>
			                <div class="change-bt">
			                    <p>{{item.content}}：<span>{{item.content1}}</span></p>
			                    <p><i class="white-rt"></i>到账时间：{{item.updated_at}}</p>
			                </div>
			            </div>
		            </router-link>
	            </div>
		        <div v-else>
	        		<router-link  :to="'/'+item.url">
			            <p class="change-tit">{{item.created_at}}</p>
			            <div class="change-ct">
			                <p class="change-tp">{{item.content_header}}</p>
			                <div class="change-bt">
			                    <p>{{item.content}}：<span>{{item.content1}}</span></p>
			                    <p><i class="white-rt"></i>到账时间：{{item.updated_at}}</p>
			                </div>
			            </div>
		            </router-link>
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
                typeId:4, //用户信息分类
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
		        	var list = response.body.data.list;

		        	this.typeLink(list);

		            this.infoData = this.infoData.concat(list);
	                this.lastPage = response.body.data.page.last_page;
	                this.loadingData = !this.loadingData;

		        }).catch(function (error) {
		            console.log("请求失败了");
		        });
            },
            typeLink(arr){
			    for(var i=0;i<arr.length;i++){
			    	var content = arr[i].content_body.split('：');
			    	arr[i].content = content[0];
			    	arr[i].content1 = content[1];
			        switch (arr[i].type){
			            case '401' : 
			            	arr[i].url = 'rebate';
			            break;
			            case '402' : 
			                arr[i].url = 'marketing';       
			            break;
			            case '403' : 
			                arr[i].url = arr[i].order_num;
			            break; 
			            case '404' : 
			                arr[i].url = arr[i].order_num;
			            break; 
			        }
			          
			    } 
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
/*变动提醒*/
.change-item{
	background:#f5f5f5;
}
.change-tit{
	text-align:center;
	font-size:0.346667rem;
	color:#999;
	padding-top:0.4rem;
}
.change-ct{
	background:#fff;
	width:8.533333rem;
	padding:0 0.2rem;
	border-radius:0.133333rem;
	margin:0.4rem auto 0 auto;
}
.change-tp{
	color:#2c2c2c;
	font-size:0.426667rem;
	padding:0.466667rem 0.266667rem;
	border-bottom:1px solid #eee;
	font-weight:bold;
}
.change-bt{
	padding:0.133333rem 0.266667rem 0.533333rem 0.266667rem;
}
.change-bt p{
	font-size:0.4rem;
	line-height:0.4rem;
	margin-top:0.4rem;
}
.change-bt p span{
	color:#d5aa5c;
}
.change-bt p i{
	float:right;
	margin-right:0.133333rem;
}
</style>
