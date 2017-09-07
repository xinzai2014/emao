<template>
	<div class="rating_page">
		<header class="user-tit">
			<a href="javascript:;" class="white-lt" @click="goback"></a>设置密码
		</header>
		<section class="set-code">
			<div>
				<input type="text" placeholder="请输入注册的手机号码">
			</div>
			<div>
				<input type="text" placeholder="验证码">
			</div>
			<button class="close-bt">确认</button>
		</section>
	</div>
</template>
;
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
	.set-code div{
		padding:0.533333rem 0.4rem;
		background:#fff;
		font-size:0.4rem;
		color:#2c2c2c;
		border-bottom:1px solid #eee;
	}
	.set-code div span{	
		color:#999;
	}
	.set-code div input{
		width:7.466667rem;
		margin-left:0.266667rem;
		border:none;
		line-height:0.4rem;
	}
</style>