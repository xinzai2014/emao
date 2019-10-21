<template>
    <div class="rating_page">
		<!--头部-->
		<header class="user-tit">
			<a @click="resetIndex" href="javascript:;" class="white-lt"></a>汇款账户管理
		</header>
		<!--汇款账户管理-->
		<section class="remits-wrap">
			<div class="adres-ct" v-if="showRemit">
				<div class="remits-item" v-for="(item,index) in infoData">
					<div class="remite-lt" v-show="isCheck">
						<i :class="remitId == item.id ? 'icon active' :'icon'" @click="iconId(item)"></i>
					</div>
					<div :class="isCheck ? 'remits-rt':''">
						<p class="remits-info" v-if="item.account_type == 1">{{item.pay_company}}</p>
						<p class="remits-info" v-else>{{item.name}}</p>
						<p class="remits-add">汇款账户：{{item.account}}</p>
						<p class="remits-add"  v-if="item.account_type == 1">开户行：{{item.bank_name}}</p>
						<p class="remits-add"  v-else>银行：{{item.bank_name}}</p>
						<p class="remits-btn">
							<i class="del" @click="remitDel(index,item.id)" >删除</i>
							<router-link tag="i" class="edit" :to="{name:'remitEdit',params:{id:item.id}}">
								编辑
							</router-link>
						</p>
					</div>
				</div>
			</div>
			<section v-else class="no-auto server-no-response">
		        <img src="../../../../../assets/no-remit.png" alt="">
		        <p>尚未添加汇款账户</p>
		    </section>
			<p class="visib-98"></p>
			<router-link :to="{name:'remitAdd'}">
					<div class="remits-fixed">新增汇款账户</div>
			</router-link>
		</section>
		<transition name="router-slid">
            <router-view></router-view>
        </transition>
        <alert-tip v-if="showAlert" @closeTip="showAlert = false" :alertText="alertText"></alert-tip>
    </div>
</template>

<script>
import alertTip from '../../../../../components/common/alertTip/alertTip'
    export default {
        data () {
            return {
              //初始数据结构
	            infoData:[],
	            showRemit:true, //有没有数据
	            isCheck:false, //判断是否显示选择按钮
	            btnIcon:false,
	            url:'',
	            showAlert: false, //弹出框
	            alertText: null, //弹出信息
	            remitId:sessionStorage.paymentId
            }
        },
        components:{
	    	alertTip
	    },
        created : function(){
            //初始化
            this.mountedData();
        },
        methods:{
            //组件方法
            resetIndex(){
            	if(this.isCheck){
            		this.$router.push({name:sessionStorage.remitName});
            	}else{
            		this.$router.push({name:'info'});
            	} 
            },
            iconId(item){
            	this.$router.push({
            		path:this.url,
            		query:{
            			'id':item.id
            		}
            	});
            },
            remitDel(index,remit_id){ //删除
            	if(window.confirm('你确定要删除汇款账户吗')){
	            	var Token = sessionStorage.getItem('token');
		            var data = {
		                token:Token,
		                id:remit_id
		            }
		            this.$http.post("dealerBank/deleteById",data
		            ).then(function (response) {
		            	this.infoData.splice(index,1)
		            	this.dataLength();
		            }).catch(function (error) {
		                this.showAlert = true;
                    	this.alertText = error.body.msg
		            });
	           	}else{
	                 return false;
	            }
            },
            mountedData(){
            	var Token = sessionStorage.getItem('token');
	            var data = {
	                token:Token,
	            }
	            this.$http({
	                url:"dealerBank/listByDealerId",
	                method:"GET",
	                params:data
	            }).then(function (response) {
	                this.infoData = response.body.data;
	                this.dataLength();
	            }).catch(function (error) {
	                this.showAlert = true;
                    this.alertText = error.body.msg
	            });
           
            },
            dataLength(){
            	if(this.infoData.length > 0){
	           		this.showRemit = true
	           	}else{
	           		this.showRemit = false
	           	}
            }
        },
        watch:{
        	$route(){
        		this.mountedData();
        		this.dataLength();
        	}
        },
        beforeRouteEnter(to, from, next){
        	next(vm => {
			    if(from.name=='paymentSubmit'){
	        		vm.isCheck=true; 
	        		vm.url=from.fullPath;
	        		sessionStorage.remitName = from.name;
	        		sessionStorage.url = from.fullPath;
	        	}else{
	        		vm.isCheck=false;
	        		sessionStorage.remitName = '';
	        		sessionStorage.url = '';
	        	}
			  });
        },
        
    }   
</script>

<style>

.router-slid-enter-active, .router-slid-leave-active {
        transition: all .4s;
    }
.router-slid-enter, .router-slid-leave-active {
    transform: translate3d(2rem, 0, 0);
    opacity: 0;
}
.remits-wrap{
	position: absolute;
    width: 10rem;
    top: 1.173333rem;
    bottom: 0;
    overflow-y: auto;
    background-color: #f5f5f5;
}
/*汇款账户管理*/
.remits-item{
	background:#fff;
	padding:0.533333rem 0.4rem;
	overflow:hidden;
	margin-bottom:0.4rem;
}
.remits-info{
	font-size:0.453333rem;
	color:#2c2c2c;
}
.remits-add{
	font-size:0.373333rem;
	color:#999;
	margin-top:0.266667rem;
}
.remits-btn{
	margin-top:0.8rem;
	overflow:hidden;
}
.remits-btn i{
	display:block;
	float:right;
	width:1.573333rem;
	height:0.773333rem;
	line-height:0.773333rem;
	border:1px solid #27282f;
	color:#27282f;
	font-size:0.373333rem;
	text-align:center;
	border-radius:0.066667rem;
	margin-left:0.4rem;
	cursor:pointer;
}
.remits-fixed{
	width:10.0rem;
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
.no-auto{padding-top:3.867rem;}
.no-auto img{display:block;width:3.0667rem;height:3.0667rem;margin:0 auto .4rem;}
.no-auto p{color:#2c2c2c;font-size:.4533rem;line-height:.8667rem;text-align:center;}
.no-auto input{display:block;width:3.893rem;height:1.1733rem;margin:2.3467rem auto 0;color:#d6ab55;font-size:.4533rem;line-height:1.1733rem;text-align:center;background-color:transparent;border:1px solid #d6ab55;border-radius:.533rem;}

.server-no-response .reflash{color:#d6ab55;}
.no-auto p span{color:#d6ab55;border-bottom:1px solid #d6ab55;}
.remite-lt{
	width:0.586667rem;
	height:0.586667rem;
	display:inline-block;
	float:left;
	margin-top:0.4rem;
}
.remite-lt i{
	display: block;
	width:0.586667rem;
	height:0.586667rem;
}
.remite-lt i.icon{
	background:url(../../../../../assets/check.png) no-repeat;
	background-size:contain;
}
.remite-lt i.icon:hover,.remite-lt i.icon.active{
	background:url(../../../../../assets/check-active.png) no-repeat;
	background-size:contain;
}

.remits-rt{
	float:right;
	overflow:hidden;
	width:90%;
}
</style>
