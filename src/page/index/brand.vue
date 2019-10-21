<template>

	<section class="index-brand">
        <div class="index-brand-in">
            <ul class="clearfix index-brand-info">
                <li v-for="(item,index) in brandList" :brand=item.id @click="goBrand(item.id,item.name)">
                    <img :src=item.logoUrl alt="">
                    <span>{{item.name}}</span>
                </li>
            </ul>
            <p class="index-more-brand" @click="goBrand(brandList[0].id,brandList[0].name)" v-if="look">更多品牌 <i class="yellow-bt"></i></p>
            <!-- <p class="index-more-brand brand-collect" @click="seeMore" v-if="collect">收起<i class="yellow-bt"></i></p> -->
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
  	/*seeMore(){ //查看更多 一个变量怎么做呢
  		this.look = !this.look;
  		this.collect = !this.collect
  	},*/
  	goBrand(index,name){ //去品牌列表页
  		this.$router.push({
        path:"/" + 'brand/' + index
      }); //车系路由跳转
      this.$store.dispatch("DEFAULT_BRAND", { // 通过store传值
          brandName: name,
          brandId: index
        }
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
.index-brand{padding:.5333rem 0.4rem;}
.index-brand-in{padding-bottom:.5333rem;background-color:#fff;}
.index-brand-in li{float:left;width:20%;text-align:center;overflow:hidden;}
.index-brand-in li img{display:block;width:1.067rem;height:1.067rem;margin:.533rem auto 0;overflow:hidden;}
.index-brand-in li span{display:block;line-height:0.4rem;color:#2c2c2c;font-size:0.3rem;white-space:nowrap;margin:0.133rem auto 0;overflow:hidden;text-overflow:ellipsis;}
.index-more-brand{margin-top:.8rem;text-align:center;color:#d5aa5c;font-size:0.373rem;}
.index-more-brand i{margin-left:.1333rem;position:relative;top:-0.04rem;}
.brand-collect i{transform:rotateX(180deg)}

.index-brand-info{
  height:2.1rem;
  overflow:hidden;
}
</style>
