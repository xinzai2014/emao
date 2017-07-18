<template>
    <div class="rating_page">
		<!--头部-->
		<header class="user-tit">
			<a href="javascript:;" class="white-lt"></a>收货地址管理
		</header>
		<!--收货地址管理-->
		<section class="adders-wrap">
			<div class="adres-ct">
				<div class="addres-item">
					<p class="addres-info">李云龙<span>13878965874</span></p>
					<p class="addres-add">地址：内蒙古自治区呼和浩特北四环西路52号方正国际08号</p>
					<p class="addres-btn"><i class="edit">编辑</i><i class="del">删除</i></p>
				</div>
				<div class="addres-item">
					<p class="addres-info">李云龙<span>13878965874</span></p>
					<p class="addres-add">地址：内蒙古自治区呼和浩特北四环西路52号方正国际08号</p>
					<p class="addres-btn"><i class="edit">编辑</i><i class="del">删除</i></p>
				</div>
			</div>
			<p class="visib-98"></p>
			<div class="addres-fixed">新增收货地址</div>
		</section>
    </div>
</template>

<script>
    export default {
        data () {
            return {
              //初始数据结构
              infoData:{}
            }
        },
        methods:{
            //组件方法
            resetIndex(){
                this.$router.go(-1);
            }
        },
        mounted(){
        //组件初始完成需要做什么
           

        }
    }   
</script>

<style>
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
