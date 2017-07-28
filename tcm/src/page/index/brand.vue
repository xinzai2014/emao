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