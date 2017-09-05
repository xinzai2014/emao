<template>

	<section class="index-car-source">
        <p class="index-car-title">本地车源</p>
        <ul class="index-car-con">
            <li v-for="(item,index) in serieList" :serieID = item.id  @click="goSerie(item.id)">
                <img :src= item.imgUrl alt="">
                <div class="index-car-back">
	                <p class="index-car-name">{{item.name}}</p>
	                <p class="index-car-price"><span>{{item.minPrice}}</span>万<em v-if="item.saleCars>1">起</em></p>
	                <p class="index-car-count">共<i>{{item.saleCars}}</i>个车型在售</p>
	                <p class="index-car-sale" v-if="item.maxFall>0">最高下 <strong>{{item.maxFall}}万</strong></p>
                </div>
            </li>
        </ul>
        <p class="index-more-brand" v-show="serieMore" @click="getSerie">查看更多 <i class="yellow-bt"></i></p>
    </section>

</template>

<script>
export default {
	  name: 'serie',
	  props:["serieList","initData","serieMore"],
	  data () {
	    return {
	      lookAll:true
	    }
	  },
	  methods:{
	  	seeMore(){
	  		this.lookAll = false;
	  	},
	  	getSerie(){ //获取车系数据
	       this.initData.token = sessionStorage.token;
	       this.initData.offset += this.initData.len;
	        this.$http({
	            url:"index",
	            method:"GET",
	            params:this.initData
	        }).then(function (response) {
	            this.serieList = this.serieList.concat(response.body.data.series);
	            if(response.body.data.series.length<this.initData.len){
	            	this.serieMore = !this.serieMore;
	            }
	          }).catch(function (error) {

	          });
	    },
	   	goSerie(index){ //点击车系跳转

	        this.$router.push('/serie/'+index); //车系路由跳转
	    },
	  },
	  mounted(){
		
	  }
}
</script>

<style>
/*首页本地车源*/
.index-car-back{position:absolute;top:0;left:0;right:0;bottom:0;background: -webkit-linear-gradient(left, rgba(0,37,111,0.4) , rgba(255,255,255,0)); /* Safari 5.1 - 6.0 */}
.index-car-source{padding-top:.5333rem;padding-bottom:.5333rem;background-color:#fff;}
.index-car-title{padding-left:.4rem;margin:0 0 .5333rem .4rem;font-size:.5066rem;color:#2c2c2c;border-left:2px solid #2c2c2c;}
.index-car-con li{margin-bottom:.1333rem;color:#fff;height:5.333rem;}
.index-car-con li{display:block;position:relative;color:#fff;}
.index-car-con li img{display:block;width:10rem;height:100%;}
.index-car-name{position:absolute;top:.5333rem;left:.5333rem;font-size:.5066rem;}
.index-car-price{position:absolute;top:1.8rem;left:.5333rem;font-size:.4rem;}
.index-car-price span{font-size:.5866rem;}
.index-car-count{position:absolute;top:2.8666rem;left:.5333rem;font-size:.4rem;}

.index-car-sale{position:absolute;top:3.7333rem;left:.5333rem;display:block;padding:.0666rem .3333rem .0666rem .1333rem;font-size:.3866rem;color:#fff;border-top-right-radius:.4rem;border-bottom-right-radius:.4rem;background-color:#d6ab55;}


</style>