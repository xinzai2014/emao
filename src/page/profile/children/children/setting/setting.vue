<template>
	<div class="rating_page">
		<header class="user-tit">
			<a href="javascript:;" class="white-lt" @click="goback"></a>设置
		</header>
		<!--设置-->
		<section class="set-wrap" @click="goAbout">
			<div><i class="yellow-rt"></i>关于车商猫</div>
		</section>
		<transition name="router-slid">
            <router-view></router-view>
        </transition>
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
        	},
        	goAbout(){
        		this.$router.push({name:"about"});
        	}
        },
        mounted(){

        }
    }
</script>
<style>
	.set-wrap div{
		padding:0.533333rem 0.4rem;
		background:#fff;
		font-size:0.4rem;
		color:#2c2c2c;
		margin-bottom:0.4rem;
	}
	.set-wrap div i{
		float:right;
		margin-top:0.066667rem;
	}
</style>