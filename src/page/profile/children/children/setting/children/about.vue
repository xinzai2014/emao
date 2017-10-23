<template>
	<div class="rating_page about-page">
			<header class="user-tit">
				<a href="javascript:;" class="white-lt" @click="goback"></a>关于淘车猫
			</header>

		<section class="about-wrap">
			<div class="about-tp">
				<i class="about-logo"></i>
				<span>version 1.0</span>
			</div>
			<div class="about-ct">
				<p>淘车猫是"一猫汽车网"为综合经销商提供优质自营车源的服务平台，使用平台可方便快速的完成订车、安全高效的管理车辆。淘车猫还提供店内展车服务，减少经销商资金压力。
				</p>
				<p>
				自建物流仓储，保证车辆交付及及时性，闪电发车，3日必达！
				</p>
			</div>
		</section>
	</div>
</template>
<script>
	export default {
        data () {
            return {
            	
            }
        },
        methods:{
        	goback(){
        		this.$router.go(-1);
        	}
        },
        mounted(){

        }
    }
</script>
<style>
	.about-page{
		background:#fff;
	}
	.about-wrap{
		font-size:0.4rem;
		color:#999;
	}
	.about-tp{
		height:3.533333rem;
		text-align:center;
		overflow:hidden;
		background:#f5f5f5;
	}
	.about-logo{
		display:inline-block;
		background:url("../../../../../../assets/icon-about.png") no-repeat;
		background-size:contain;
		width:3.64rem;
		height:1.30rem;
		margin-top:1.066667rem;
	}
	.about-tp span{
		display:block;
	}
	.about-ct{
		padding:0.533333rem 0.4rem;
		max-height:99999px;
		line-height:0.65rem;
	}
	.about-ct p{
		text-indent:0.75rem;
	}
</style>