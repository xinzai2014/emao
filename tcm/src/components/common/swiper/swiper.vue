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
		var mySwiper = new Swiper('.swiper-container', {
			autoplay: 5000,//可选选项，自动滑动
			pagination : '.index-icon',
			paginationElement:"li"
		})
	  },
	  watch:{
	   
	  }
}
</script>