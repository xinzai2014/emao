<template>
        
	<section class="index-slider">
		<div class="swiper-container swiperWrap1">
			<div class="swiper-wrapper">
				<a v-for="(item,index) in circular" :circuid=item.id  class="swiper-slide" @click="lookFull()">
					<img  :src=item.imgUrl  >
				</a>
			</div>
			<ul class="index-icon">
            </ul>
		</div>

		<div class="swiper-fullpage"  @click="closeFull" :class="{translateY:showFull}">
			<div class="swiper-container swiperWrap2">
				<div class="swiper-wrapper">
					<a v-for="(item,index) in circular" :circuid=item.id  class="swiper-slide">
						<img  :src=item.imgUrl  >
					</a>
				</div>
				<ul class="index-icon">
	            </ul>
			</div>
		</div>

	 </section>
</template>

<script>

export default {
	  name: 'brand',
	  props:["circular"],
	  data () {
	    return {
	     	showFull:false,
	     	mySwiper1:null,
	     	mySwiper2:null
	    }
	  },
	  methods:{
	  	lookFull(){ //打开全屏模式
	  		var activeIndex = this.mySwiper1.activeIndex;
	  		this.mySwiper2.slideTo(activeIndex);
	  		this.showFull = true;
	  	},
	  	closeFull(index){
	  		this.showFull = false;
	  	}
	  },
	  mounted(){
	  	console.log("数据取到了");
		this.mySwiper1 = new Swiper('.swiperWrap1', {
			autoplay: 3000,//可选选项，自动滑动
			pagination : '.index-icon',
			paginationElement:"li",
			loop:true
		});

		this.mySwiper2 = new Swiper('.swiperWrap2', {
			autoplay: 3000,//可选选项，自动滑动
			pagination : '.index-icon',
			paginationElement:"li",
			loop:true
		});
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

.news_title h3{
	font-size:0.5rem;
}

.swiper-fullpage{
	position: fixed;
	top:0;
	left:0;
	width:100%;
	height:100%;
	z-index:20;
	background:#000;
	transform:translateX(100%);
}

.swiper-fullpage .swiper-container{
	top:50%;
	transform:translateY(-50%);
}

.swiper-fullpage .swiper-container .index-icon{
	position:fixed;
}

.swiper-fullpage .swiper-container .swiper-slide img{
	height:auto;
}


</style>