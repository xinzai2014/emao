<template>
    <div class="rating_page">
		<!--头部-->
		<header class="user-tit">
			<a href="javascript:;" class="white-lt" @click="resetIndex"></a>收货地址管理
		</header>
		<!--收货地址管理-->
		<section class="adders-wrap" v-if="!show">
			<div class="adres-ct">
				<div class="addres-item" v-for="(item,index) in addressList">
					<p class="addres-info">{{item.name}}<span>{{item.phone}}</span></p>
					<p class="addres-add">地址：{{item.address}}</p>
					<p class="addres-btn">
						<router-link :to="{name:'addressEdit',params:{id:item.id}}">
							<i class="edit">编辑</i>
						</router-link>
				        <i class="del" @click="remove(item,index)">删除</i>
					</p>
				</div>
			</div>	
		</section>

		<section class="no-auto server-no-response" v-if="show">
	        <img src="../../../../../assets/no-order.png" alt="">
	        <p>未添加收货地址</p>
	    </section>

	    <p class="visib-98"></p>
		<router-link to="/profile/info/address/add">
			<div class="addres-fixed">新增收货地址</div>
		</router-link>

		<transition name="router-slid">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    export default {
        data () {
            return {
              //初始数据结构
              addressList:[],
              show:true
            }
        },
        methods:{
            //组件方法
            resetIndex(){
                this.$router.push({ name: 'info'});
            },
            remove(item,index){
            	if(confirm('确认要删除么?')){
	            	var token = sessionStorage.getItem('token');
	            	var id = item.id;
			        var data = {
			            token:token,
			            id:id
			        }
	            	this.$http.post(
			            "dealer/deleteById?token="+token,
			            data
			        ).then(function (response) {
			            this.addressList.splice(index, 1);
			        }).catch(function (error) {
			            console.log("请求失败了");
			        });
		    	}
            },
            fillData(){
            	var token = sessionStorage.getItem('token');
		        var id = sessionStorage.getItem('phone');
		        var data = {
		            token:token,
		            id:id
		        }
		        this.$http({
		            url:"dealer/listByDealerId",
		            method:"GET",
		            params:data
		        }).then(function (response) {
		            this.addressList = response.body.data;
		        }).catch(function (error) {
		            console.log("请求失败了");
		        });
            }
        },
        mounted(){
        //组件初始完成需要做什么
        	this.fillData();
        },
        watch:{
        	addressList(curVal,oldVal){
        		var length = curVal.length;
        		if(!length){
	            	this.show=true;
	            }else{
	            	this.show=false;
	            }
        	},
        	$route(){
        		this.fillData();
        	}
        },
        beforeRouteEnter(to, from, next){
        	next();
        	//this.fillData();
        },
        created(){
        	//this.fillData();
        }
   	 }   
</script>

<style>
.no-auto{position: absolute;
    width: 10rem;
    top: 1.173333rem;
    bottom: 1.306667rem;
    overflow-y: auto;
    background-color: #fff;
    padding-top: 3.867rem;}
.no-auto img{display:block;width:3.0667rem;height:3.0667rem;margin:0 auto .4rem;}
.no-auto p{color:#2c2c2c;font-size:.4533rem;line-height:.8667rem;text-align:center;}
.no-auto input{display:block;width:3.893rem;height:1.1733rem;margin:2.3467rem auto 0;color:#d6ab55;font-size:.4533rem;line-height:1.1733rem;text-align:center;background-color:transparent;border:1px solid #d6ab55;border-radius:.533rem;}

.adders-wrap{
	position: absolute;
    width: 10rem;
    top: 1.173333rem;
    bottom: 1.306667rem;
    overflow-y: auto;
    background-color: #f5f5f5;
}
.rating_page{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #f5f5f5;
    width:10.0rem;
    z-index: 203;
}
/*收货地址管理*/
.addres-item{
	background:#fff;
	padding:0.533333rem 0.4rem;
	overflow:hidden;
	margin-bottom:0.4rem;
}
.addres-info{
	font-size:0.453333rem;
	color:#2c2c2c;
}
.addres-info span{
	margin-left:0.4rem;
}
.addres-add{
	font-size:0.373333rem;
	color:#999;
	margin:0.4rem 0;
}
.addres-btn{
	text-align:right;
	margin-top:0.8rem;
}
.addres-btn i{
	display:inline-block;
	width:1.573333rem;
	height:0.773333rem;
	line-height:0.773333rem;
	border:1px solid #27282f;
	color:#27282f;
	font-size:0.373333rem;
	text-align:center;
	border-radius:0.066667rem;
	margin-left:0.4rem;
}
.addres-fixed{
	width:100%;
	height:1.306667rem;
	background:#d5aa5c;
	text-align:center;
	line-height:1.306667rem;
	color:#fff;
	font-size:0.453333rem;
	position:fixed;
	left:0;
	bottom:0;
}
</style>
