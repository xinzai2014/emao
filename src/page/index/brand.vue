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
            <p class="index-more-brand brand-collect" @click="seeMore" v-if="collect">收起<i class="yellow-bt"></i></p>
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
  		this.$router.push('brand/' + index); //车系路由跳转
      this.$store.dispatch("DEFAULT_BRAND", // 通过store传值
        name
      );
  	}
  },
  mounted(){
  	this.look = this.brandList.length>this.brandLen?true:false;
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
.index-more-brand{margin-top:.8rem;text-align:center;color:#d5aa5c;}
.index-more-brand i{margin-left:.1333rem;}
.brand-collect i{transform:rotateX(180deg)}
</style>