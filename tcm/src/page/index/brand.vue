<template>

	<section class="index-brand">
        <div class="index-brand-in">
            <ul class="clearfix" :class='{"index-brand-info":lookAll}'>
                <li v-for="(item,index) in brandList" :brand=item.id @click="goBrand(item.id)">
                    <img :src=item.logoUrl >
                    <span>{{item.name}}</span>
                </li>
            </ul>
            <p class="index-more-brand" @click="seeMore" v-show="lookAll">更多品牌 <i class="yellow-bt"></i></p>
        </div>
    </section>

</template>

<script>
export default {
	  name: 'brand',
	  props:["brandList"],
	  data () {
	    return {
	      lookAll:true
	    }
	  },
	  methods:{
	  	seeMore(){
	  		this.lookAll = false;
	  	}
	  },
	  mounted(){
		
	  },
	  watch:{
	   
	  }
}
</script>