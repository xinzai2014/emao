<template>
	<div class="rating_page">
		<header class="user-tit">
			<a href="javascript:;" class="white-lt"></a>设置密码
		</header>
		<section class="set-code">
			<div>
				<span>原密码</span>
				<input type="text">
			</div>
			<div>
				<span>新密码</span>
				<input type="text">
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