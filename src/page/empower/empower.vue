<template>
	<div>
		<header class="brand-list-header header-fixed">
			<i class="white-lt brand-left-cion"></i> 
			<strong class="brand-list-title">授权店认证</strong>
	        <a href="javascript:;" class="auth-tel"></a>
		</header>
	    <section class="empower">
	        <div class="empower-tit">
	            <em>审核未通过</em>
	            <span>原因：经核对，您提交的审核资料存在以下问题：1.二手车经纪资质与实际不符； 2.用品加装与汽车美容资质与实际不符 ，以上信息请重新填写后上传。</span>
	        </div>
	        <div class="empower-info">
	        	<div class="empower-item empower-stall">
	        		<label>选择意向授权产品档位</label>
	        		<p>
	        			<span>普通档产品</span>
	        			<em>（16万以内）</em>
	        		</p>
	        	</div>
	        </div>
	    </section>
	</div>
</template>
<script>
	import uploader from '@/components/common/uploader/uploader'

	export default {
		name: 'app',
			data () {
			    return{

			    }
			},
		mounted(){

		},
		components:{
		    uploader
		}
	}

</script>
<style lang="scss">
	@import '../../../style/mixin';
	.empower{
		background:$white;
		overflow:hidden;
	}
	.empower-info{
		padding:0 0.4rem;
	}
	.brand-list-header {
	    position: relative;
	    z-index: 25;
	    overflow: hidden;
	    height: 1.1733rem;
	    text-align: center;
	    @include font(0.4rem,1.1733rem);
	    color: $white;
	    background-color: #27282f;
	}
	.brand-left-cion {
	    position: absolute;
	    left: .4666rem;
	    top: .4rem;
	}
	.auth-tel{
	    display:block;
	    @include WH(0.546rem,0.546rem);
	    @include bgPic('../../assets/icon-s3.png');
	    position:absolute;
	    top:0;
	    bottom:0;
	    left:auto;
	    right:0.45rem;
	    margin:auto;
	}

	/*内容*/
	.empower-tit{
	    padding:0.533333rem 0.4rem;
	    background:$orange;
	    overflow:hidden;
	    color:$white;
	}
	.empower-tit em{
	    display:block;
	    @include font-dpr(38px);
		padding-bottom:0.533333rem;
	}
	.empower-tit span{
	    display:block;
	    @include font-dpr(26px);
		line-height:1.5;
	}
	.empower-item{
		padding:0.4rem 0;
		overflow:hidden;
	}
	.empower-item label{
		@include font-dpr(32px);
		display:block;
	}
	.empower-stall p{
		display:inline-block;
		text-align:center;
		width:4.373333rem;
    	padding:0.266667rem 0;
    	@include borderRadius(0.133333rem);
    	border:1px solid $orange;
	}
	.empower-stall p span,.empower-stall p em{
		@include font-dpr(28px);
		display:block;
	}
	.empower-stall p em{
		@include font-dpr(24px);
		padding-top:0.133333rem;
	}
</style>