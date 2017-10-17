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
		 		<iframe :src = "frameURL"  class="frame"></iframe>
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
	  		this.frameURL = url;
	  	},
	  	closeFrame(){
	  		this.showFrame = false;
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
	width:100%;
	height:100%;
	background:#FFF;
	z-index:20;
	transform:translateX(100%);
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

192.168.0.134 ssh-rsa AAAAB3NzaC1yc2EAAAABIwAAAQEAyV2MunKIT5TrU7warBJdGmZ80Taq7U7dMwfUNd2Qswh9L5JGOe93IMpcO41lDJU34hO9NiJln/wXB/uwgkCXq1QtmyhpXDc+7S6YupiMlFJvhPwyR0eNfRZquh2WOzsWaOQNtsXJLIsNzlBG2FMc4U9yKCJNAGXAKBsv5pzUB8ZxhnuMG8UhxtJFJpb1U2LN60G83k2WNuNC10GqLDkXk3M2TcQjlYohks0BE/wSINrbilpt46djjXcvj7Msl5HsyExTMYxCo4z47eJwMFbvXKdGmoydERKodovq4IPPwtwjC+LLYKzmwno4623p/lQcbz4UMQxHw5T5LAX/3u9h2Q==
192.168.0.92 ssh-rsa AAAAB3NzaC1yc2EAAAABIwAAAQEAyV2MunKIT5TrU7warBJdGmZ80Taq7U7dMwfUNd2Qswh9L5JGOe93IMpcO41lDJU34hO9NiJln/wXB/uwgkCXq1QtmyhpXDc+7S6YupiMlFJvhPwyR0eNfRZquh2WOzsWaOQNtsXJLIsNzlBG2FMc4U9yKCJNAGXAKBsv5pzUB8ZxhnuMG8UhxtJFJpb1U2LN60G83k2WNuNC10GqLDkXk3M2TcQjlYohks0BE/wSINrbilpt46djjXcvj7Msl5HsyExTMYxCo4z47eJwMFbvXKdGmoydERKodovq4IPPwtwjC+LLYKzmwno4623p/lQcbz4UMQxHw5T5LAX/3u9h2Q==
192.168.0.29 ssh-rsa AAAAB3NzaC1yc2EAAAABIwAAAQEAyV2MunKIT5TrU7warBJdGmZ80Taq7U7dMwfUNd2Qswh9L5JGOe93IMpcO41lDJU34hO9NiJln/wXB/uwgkCXq1QtmyhpXDc+7S6YupiMlFJvhPwyR0eNfRZquh2WOzsWaOQNtsXJLIsNzlBG2FMc4U9yKCJNAGXAKBsv5pzUB8ZxhnuMG8UhxtJFJpb1U2LN60G83k2WNuNC10GqLDkXk3M2TcQjlYohks0BE/wSINrbilpt46djjXcvj7Msl5HsyExTMYxCo4z47eJwMFbvXKdGmoydERKodovq4IPPwtwjC+LLYKzmwno4623p/lQcbz4UMQxHw5T5LAX/3u9h2Q==
192.168.0.43 ssh-rsa AAAAB3NzaC1yc2EAAAABIwAAAQEA5FFXshf4CO1sl4lVsfMyOgJy1KRL1HbmhHYK8YeZJVYSa/1/yiC8N9+/wpnMblJfbZEGxXQTG897Mspg0FEPs57OHbIy1C7ZosddQvRvNcFf0BE7lCia2ad2P9pZZ84BwIzoT2jE8AkYDw5esS1WLp3XpxLViuXkOoWryZhymIjmWzKrfAz13EJBZg7dBPjXFAhLhhEaqiyIQEbe0x8LvBZfMPQNQcZMedRu68PgjW6+f6E3nPEWqT6/RZ8erMDK5R8p1ZazISewz4xVTQQJOIais1S/Wk2VdZhSjsa9/MANEdEjMjmU9iGPbnoMCHWfhqCKha61TBr4w+2l77Kp5Q==
192.168.0.142 ssh-rsa AAAAB3NzaC1yc2EAAAABIwAAAQEA5FFXshf4CO1sl4lVsfMyOgJy1KRL1HbmhHYK8YeZJVYSa/1/yiC8N9+/wpnMblJfbZEGxXQTG897Mspg0FEPs57OHbIy1C7ZosddQvRvNcFf0BE7lCia2ad2P9pZZ84BwIzoT2jE8AkYDw5esS1WLp3XpxLViuXkOoWryZhymIjmWzKrfAz13EJBZg7dBPjXFAhLhhEaqiyIQEbe0x8LvBZfMPQNQcZMedRu68PgjW6+f6E3nPEWqT6/RZ8erMDK5R8p1ZazISewz4xVTQQJOIais1S/Wk2VdZhSjsa9/MANEdEjMjmU9iGPbnoMCHWfhqCKha61TBr4w+2l77Kp5Q==
git.emao.net,123.56.146.50 ssh-rsa AAAAB3NzaC1yc2EAAAABIwAAAQEAno0ib1i1ES5HROSqNYcTaI+iKEFpBMeTEuFfQ7FlbLFb6qCb1o9Dkq8qfNCfcRDNeDGL0LcDmglSWacCnqPwC8h9lxAFpU9AIYkwMmWP76ofn5RrfLQ1IuoK65VDkcX68DW2vtRwfcTI3CSS/YJYj0u+BfwOhm46T49z1Jns1Xs60W9bz7xq+q2tBWMJqViBIjYQgwhJIwgppBYSYSEw6zioa5y+Ip2kzHkZe6WF83Mp8OIpEEYZUt+/bJs4+FzNe+kmw+9rHCd1ObsjlMXZT2hAARKkz6N9f5/3iilhbaQnPob23odu06zrdTl20jR5eCZsSezRNaBbKu6qPnKLHw==
192.168.0.67 ssh-rsa AAAAB3NzaC1yc2EAAAABIwAAAQEA3R5O5B6l8MWCkvpxPTsF2rcKYID+7tUESChXwUnD/jyYqk6Zb0NMMPgoQbVgG9sjyiDsSbcfR88ASVoEBjG7LhHU/gUO7SKJMEnoGZvSbWgbSl6WlPTvBWZ7WmahEsCpBXjbMcDY8NmrEMeGtsPWyPXj8cKhcnQXeDIYbHDRx1H5fGTbjvtc5sJojk/MhXGPrV42VwVm127kKU+SW+tiMaQ5ZR3sGRosKdF/HP/OUBgP/wtcwFNxYjWz00JtB8pWTIJomjgGujH6mKQzKBd9/ZptgU5qfHOFBBjwIFB4ScV0J4/NzknRhpBz1RZX5kD2a7VqaiTKpBk4L3y+RdRt3Q==
192.168.0.216 ssh-rsa AAAAB3NzaC1yc2EAAAABIwAAAQEA8jOFnNkmQQ3wl9GdTbOBZu/wHMqd82k2YjPmKQ4LqPPRoV6rykKhkNdeyYsHKNQsNoltXmybA9+ctjxKE90OCM+j1CHOJ6HnhK0buueKXuEhpr/UhaKtUvXT+apdfSIxRIJTjUfWUgWgexY6UtQwmcdSz8fgDC3GMrxkW5EJa24LrKK4auIfqQNaCduFT/7MnTNwKFhZc+7t9h7pypROPR9WOeIZIIj8GzneTUAEHJ51XOBpS97Do2Ze5IZ4l9b5wXuz/a0tP6ECYuzEWcQcljCqqUrwXybGX8HMfBYecB+seq82/PFJ3+sM2rsyssxycC+3Y34eAB/wjyN/sil/dQ==
~
