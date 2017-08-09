<template>

	<section class="index-brand">
        <div class="index-brand-in">
            <ul class="clearfix" :class='{"index-brand-info":look}'>
                <li v-for="(item,index) in brandList" :brand=item.id @click="goBrand(item.id,item.name)">
                    <img :src=item.logoUrl >
                    <span>{{item.name}}</span>
                </li>
            </ul>
            <p class="index-more-brand" @click="seeMore" v-if="look">更多品牌 <i class="yellow-bt"></i></p>
            <p class="index-more-brand brand-collect" @click="seeMore" v-if="collect">收取 <i class="yellow-bt"></i></p>
        </div>
    </section>

</template>

<script>
export default {
	  name: 'brand',
	  props:["brandList"],
	  data () {
	    return {
	      brandLen:5,
	      look:false,
	      collect:false
	    }
	  },
	  methods:{  
	  	seeMore(){ //查看更多 一个变量怎么做呢
	  		this.look = !this.look;
	  		this.collect = !this.collect
	  	},
	  	goBrand(index,name){ //去品牌列表页
	  		this.$router.push('/brand/'+index+"?brandName="+name); //车系路由跳转
	  	}
	  },
	  mounted(){
	  },
	  watch:{ //父节点ajax后的数据在子组件里面进行监控
	   	brandList(){
	   		this.look = this.brandList.length>this.brandLen?true:false;
	   	}
	  }
}
</script>
<style>
/*首页品牌*/
.index-brand{padding:.5333rem;}
.index-brand-in{padding-bottom:.5333rem;background-color:#fff;}
.index-brand-in li{float:left;width:20%;margin-bottom:0.1333rem;text-align:center;overflow:hidden;}
.index-brand-in li img{display:block;width:.5333rem;height:.5333rem;margin:.666rem auto 0;margin-bottom:.1333rem;}
.index-brand-in li span{color:#2c2c2c;font-size:0.3733rem;white-space:nowrap;}
.index-more-brand{margin-top:.8rem;text-align:center;}
.index-more-brand i{margin-left:.1333rem;}
.brand-collect i{transform:rotateX(180deg)}
/*首页本地车源*/
.index-car-source{padding-top:.5333rem;padding-bottom:.5333rem;background-color:#fff;}
.index-car-title{padding-left:.4rem;margin:0 0 .5333rem .4rem;font-size:.5066rem;color:#2c2c2c;border-left:2px solid #2c2c2c;}
.index-car-con li{margin-bottom:.1333rem;color:#fff;}
.index-car-con li{display:block;position:relative;color:#fff;}
.index-car-con li img{display:block;width:10rem;height:5.333rem;}
.index-car-name{position:absolute;top:.5333rem;left:.5333rem;font-size:.5066rem;}
.index-car-price{position:absolute;top:2.333rem;left:.5333rem;font-size:.4rem;}
.index-car-price span{margin-left:.2rem;font-size:.5866rem;}
.index-car-count{position:absolute;top:3.0666rem;left:.5333rem;font-size:.4rem;}
.index-car-sale{position:absolute;top:3.7333rem;left:.5333rem;display:block;padding:.0666rem .3333rem .0666rem .1333rem;font-size:.5066rem;color:#fff;border-top-right-radius:.4rem;border-bottom-right-radius:.4rem;background-color:#d6ab55;}

.index-brand-info{
	height:1.8266rem;
	overflow:hidden;
}
</style>