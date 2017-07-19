<template>

	<section class="index-car-source">
        <p class="index-car-title">本地车源</p>
        <ul class="index-car-con">
            <li v-for="(item,index) in serieList" :serieID = item.id  @click="goSerie(item.id)">
                <img :src= item.imgUrl alt="">
                <p class="index-car-name">{{item.name}}</p>
                <p class="index-car-price"><span>{{item.minPrice}}</span>万起</p>
                <p class="index-car-count">共<i>{{item.saleCars}}</i>个车型在售</p>
                <p class="index-car-sale">最高下降 <strong>{{item.maxFall}}万</strong></p>
            </li>
        </ul>
        <p class="index-more-brand">查看更多 <i class="yellow-bt"></i></p>
    </section>

</template>

<script>
export default {
	  name: 'serie',
	  props:["serieList"],
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