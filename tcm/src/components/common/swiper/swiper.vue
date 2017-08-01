<template>
        
	<section class="index-slider">
		<div class="swiper-container">
			<div class="swiper-wrapper">
				<a v-for="(item,index) in circular" :circuid=item.id  class="swiper-slide">
					<img  :src=item.imgUrl  >
				</a>
			</div>
			<ul class="index-icon">

            </ul>
		</div>
	 </section>
</template>

<script>


export default {
	  name: 'brand',
	  props:["circular"],
	  data () {
	    return {
	      
	    }
	  },
	  methods:{

	  },
	  mounted(){
	  	console.log("数据取到了");
			setTimeout(function(){
			var mySwiper = new Swiper('.swiper-container', {
			autoplay: 5000,//可选选项，自动滑动
			pagination : '.index-icon',
			paginationElement:"li"
			});
		},1000);
	  },
	  watch:{
	   circular(){
	   		
	   }
	  }
}
</script>

<style>
/*首页图片滚动*/
.index-slider{position:relative;height:4.5333rem;}
.index-slider img{width:100%;height:4.5333rem;}
.index-icon{position:absolute;left:.4rem !important;bottom:.24rem !important;z-index:1;}
.index-icon li{float:left;width:.1333rem;height:.1333rem;background-color:red;margin:0 .1333rem 0 0 !important;border-radius:0.0666rem;}
.index-icon li.swiper-pagination-bullet-active{width:.2666rem;background-color:#d6ab55;}
</style>