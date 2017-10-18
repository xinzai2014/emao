<template>
    <div class="rating_page1">
		<!--头部-->
		<header class="user-tit">
			<a @click="resetIndex" href="javascript:;" class="white-lt"></a>营销支持费
		</header>
		<!--返利资金-->
		<section class="rebate-wrap">
			<div class="rebate-ct">
				<div class="rebate-tp">
					<span>可用金额（元）</span>
					<b>{{amount}}</b>
				</div>
				<p class="bg-ee"></p>
				<div class="rebate-bt">
					<div class="rebate-tit">
						<b>收支明细</b>
					</div>
					<!--有内容-->
					<div class="rebate-wrap" v-show="rebate">
						<div class="rebate-item" v-for="(item,index) in rebate">
							<div class="category">
								<b>{{item.amount}}<em>元</em></b>{{item.note}}
							</div>
							<div class="category-info">
								<div class="category-time">
									<p class="detailed-tit">{{item.updated_at}}</p>
									<div class="detailed active" v-if="item.detail.length">
										<p class="detailed-p" @click="show(item)" v-show="item.active">
											<a href="javascript:;">收起</a>
											<i class='yellow-bt active'></i>
										</p>
										<p class="detailed-p" @click="show(item)" v-show="!item.active">
											<a href="javascript:;">展开详细</a>
											<i class='yellow-bt'></i>
										</p>
										<div class="detailed-info" v-show="item.active" v-for="(val,key) in item.detail">
											<p><span><em v-for="(v,k) in val.des">{{v}}</em></span>{{val.title}}</p>
										</div>
									</div>
									<div class="detailed active" v-else>
										<p class="detailed-p">
											<a href="javascript:;"> </a>
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					<!--无内容-->
					<p class="rebate-no" v-show="!rebate">
						暂无
					</p>
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
                rebate:[],
                amount:'', //可用资金
                nodata:false 
            }
        },
        methods:{
            //组件方法
            resetIndex(){
                this.$router.go(-1);
            },
		    show(item) {
			    if(!item.active){　　
			        item.active = !item.active
			    }else{
			        item.active = !item.active
			    }	
		    }
            
        },
        mounted(){
        //组件初始完成需要做什么
            var token = sessionStorage.token;
            var data = {
            	token:token,
            	capital_history:1

            }
            this.$http({
                url:"dealer/capital",
                method:"GET",
                params:data
            }).then(function (response) {
                var num = response.body.data.capital_history;
                if(response.body.data.amount.length == 7){
				    var str="";
			        var tmp1 = response.body.data.amount.substring(0,1);
			        var end1 = response.body.data.amount.substring(1)
			        str+=tmp1+','+end1;
				    response.body.data.amount = str
				}
                this.amount = response.body.data.amount||'0.00';
                for(var i =0;i<num.length;i++){
                	num[i].updated_at = num[i].updated_at.substring(5);
                	num[i].active = false;
                	if(num[i].amount > 0){
                		if(num[i].amount.length == 7){
						    var newstr="";
					        var tmp = num[i].amount.substring(0,1);
					        var end = num[i].amount.substring(1)
					        newstr+=tmp+','+end;
						    num[i].amount = newstr
                		}
                		num[i].amount = '+'+num[i].amount;
                	}
                	for(var k =0;k<num[i].detail.length;k++){
                		num[i].detail[k].des=num[i].detail[k].des.split(',');
                	}
                }
                this.rebate = num;
                if(this.rebate.length > 0){
                	this.nodata = true
                }else{
                	this.nodata = false
                }
            }).catch(function (error) {
                console.log("请求失败了");
            });

        }
    }   
</script>

<style>
/*返利资金*/
.rating_page1{
	background:#fff;
	height:100%;
}
.rebate-wrap{
	margin-top:-0.026667rem;
	background:#fff;
}
.rebate-tp{
	background:#27282f;
	padding:0.4rem 0.666667rem;
}
.rebate-tp span,.rebate-tp b{
	display:block;
	font-size:0.373333rem;
	color:#999;
}
.rebate-tp b{
	font-size:1.333333rem;
	color:#d5aa5c;
	line-height:2.0rem;
}
/*内容*/
.bg-ee{
	height:0.4rem;
	background:#f5f5f5;
}
.rebate-tit{
	display:inline-block;
	width:4.0rem;
	padding-top:0.533333rem;
	font-size:0.506667rem;
	color:#2c2c2c;
	margin:0 0.4rem;
	padding-bottom:0.533333rem;
	border-bottom:1px solid #2c2c2c;
}
.rebate-tit b{
	height:0.533333rem;
	line-height:0.533333rem;
	padding:0 0.4rem;
	padding-left:0.266667rem;
	border-left:0.066667rem solid #2c2c2c;
	
}
.rebate-item{
	overflow:hidden;
	padding-top:0.533333rem;
	border-bottom:1px solid #eee;
}
.category{
	height:0.533333rem;
	line-height:0.533333rem;
	font-size:0.4rem;
	color:#2c2c2c;
	padding:0 0.4rem;
}
.category b{
	float:right;
	font-size:0.533333rem;
}
.category b em{
	font-size:0.32rem;
	margin-left:0.04rem;
}
.category-time{
	position:relative;
	padding-top:0.4rem;
}
.category-time .detailed-tit{
	position:absolute;
	left:0.4rem;
	top:0.426667rem;
	font-size:0.32rem;
	color:#999;
}
.category-time .detailed-tit em{
	margin-left:0.4rem;
}
.detailed .detailed-p{
	text-align:right;
	font-size:0.32rem;
	color:#d5aa5c;
	padding:0 0.4rem 0.4rem 0.4rem;
}
.detailed .detailed-p a{
	font-size:0.32rem;
	color:#d5aa5c;
}
.yellow-bt.active {
	-webkit-transform: rotateZ(180deg);
    -moz-transform: rotateZ(180deg);
    -o-transform: rotateZ(180deg);
    -ms-transform: rotateZ(180deg);
    transform: rotateZ(180deg);
}
.detailed-info{
	background:#f5f5f5;
	padding:0.4rem;
	font-size:0.373333rem;
	color:#2c2c2c;
	display:none;
}
.detailed-info p{
	overflow:hidden;
	margin-bottom:0.4rem;
}
.detailed-info p:last-child{
	margin-bottom:0;
}
.detailed-info span{
	float:right;
	color:#999;
	max-width:8.0rem;
}
.detailed-info span em{
	display:block;
	line-height:0.6rem;
}
.active .detailed-info{
	display:block;
}
.rebate-no{
	text-align:center;
	font-size:0.453333rem;
	padding:4.0rem 0;
}

</style>
