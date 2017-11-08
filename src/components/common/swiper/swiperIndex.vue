<template>

	<section class="index-slider">
		<div class="swiper-container">
			<div class="swiper-wrapper">
				<a v-for="(item,index) in circular" :circuid=item.id  class="swiper-slide" @click="refresh(item.url)">
					<img  :src=item.imgUrl  >
				</a>
			</div>
			<ul class="index-icon">
            </ul>
		</div>
		<div class="frameCon translateY" v-show="showFrame">
			<div class="user-tit">
				<i class="white-lt" @click="closeFrame"></i>
			</div>
			<div class="buy-agreement-con">
		 		<iframe :src = "frameURL"  class="frame" scrolling="auto"></iframe>
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
	      showFrame:false,
	      frameURL:""
	    }
	  },
	  methods:{
	  	refresh(url){
	  		this.showFrame = true;
	  		this.frameURL = url+"&token=" + sessionStorage.token;
        console.log(this.frameURL);
	  		document.body.style.overflow = 'hidden';
		  	document.body.style.position = 'fixed';
	  	},
	  	closeFrame(){
	  		this.showFrame = false;
	  		document.body.style.overflow = 'inherit';
		  	document.body.style.position = 'initial';
	  	}
	  },
	  mounted(){

		var mySwiper = new Swiper('.swiper-container', {
			autoplay: 5000,//可选选项，自动滑动
			pagination : '.index-icon',
      loop:true,
			paginationElement:"li"
		});
	  }
}
</script>

<style>
/*首页图片滚动*/
.index-slider{position:relative;height:4.5333rem;}
.index-slider img{width:100%;height:4.5333rem;}
.index-icon{position:absolute;left:.4rem !important;bottom:.24rem !important;z-index:1;}
.index-icon li{float:left;width:.1333rem;height:.1333rem;background-color:#fff;margin:0 .1333rem 0 0 !important;border-radius:0.0666rem;opacity:1 !important}
.index-icon li.swiper-pagination-bullet-active{width:.2666rem;background-color:#d6ab55;}

.news_title h3{
	font-size:0.5rem;
}
.frameCon{
	position:fixed;
	top:0;
	left:0;
	right:0;
	bottom:0;
	width:100%;
	height:100%;
	background:#FFF;
	z-index:20;
	transform:translateX(100%);
	-webkit-user-select: none;
	-moz-user-select: none;
}

.buy-agreement-con{
    -webkit-overflow-scrolling: touch;
    overflow-y: scroll;
    height:94%;
}
.frame{
    width:100%;
    border:none;
    height:100%;
}

</style>
