<template>
	<div class="franch-wrap">
		<header class="brand-list-header header-fixed" v-show="titHide">
			<i class="white-lt brand-left-cion"></i> 
			<strong class="brand-list-title">权益选择</strong>
		</header>
		<div class="franch-ct">
			<router-link to="/storesH5/authorize" tag='p' class="link-auth"></router-link>
			<p class="franch-text">300*3优惠券</p>
			<div class="franch-btn">成为加盟店</div>
		</div>
		
	</div>
</template>
<script>
	export default {
		data () {
		    return{
		    	titHide:true, //是否显示导航
		    	token:sessionStorage.token
		    }
		},
		methods:{
			fullData(){
            	var data = {
			        token:this.token
			    }
            	this.$http({
			        url:"dealer/show",
			        method:"GET",
			        params:data
			    }).then(function (response) { 
			    	var data = response.body.data;
			    	console.log(data);

			    },function(){
			    })
            }
		},
		mounted(){
			//组件初始化
	        this.fullData();
		}
	}

</script>
<style>
	.franch-wrap{
		width: 100%;
		height: 100%;
		background: #000;
		position: absolute;
		left: 0;
		bottom: 0;

	}
	.brand-list-header {
	    position: relative;
	    z-index: 25;
	    overflow: hidden;
	    height: 1.1733rem;
	    text-align: center;
	    font-size: 0.4rem;
	    line-height:1.1733rem;
	    color: #fff;
	    background-color: #27282f;
	}
	.brand-left-cion {
	    position: absolute;
	    left: .4666rem;
	    top: .4rem;
	}
	.franch-ct{
		background: url('../../assets/franch.png');
		height: 16.52rem;
		width: 10.0rem;
		background-size: contain;
		position: relative;
		overflow: hidden;
	}
	.link-auth{
		cursor: pointer;
		width: 3.6rem;
		height: 0.866667rem;
		margin: 10.533333rem auto 0 auto;
	}
	.franch-text{
		text-align: center;
		color: #fff;
		height: 0.466667rem;
		line-height: 0.466667rem;
		font-size: 0.426667rem;
		margin: 1.67rem auto 0 auto;
	}
	.franch-btn{
		width: 6.133333rem;
		height: 1.2rem;
		line-height: 1.2rem;
		color: #fff;
		margin: 0.533333rem auto 0 auto;
		font-size: 0.586667rem;
		text-align: center;
	}
</style>